"use client";

import { useEffect, useRef } from "react";

import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/paths";

type ProjectDrawerProps = {
  project: Project;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectDrawer({
  project,
  onClose,
  returnFocusTo,
}: ProjectDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasMedia = Boolean(project.media?.length);
  const hasLinks = Boolean(project.links?.length);
  const hasLinkContent = hasLinks || Boolean(project.repositoryComingSoon);
  const showMediaPlaceholder = Boolean(project.mediaComingSoon && !hasMedia);

  useEffect(() => {
    document.body.classList.add("drawer-open");
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("drawer-open");
      returnFocusTo?.focus();
    };
  }, [onClose, returnFocusTo]);

  return (
    <div className="drawer-layer">
      <button
        type="button"
        className="drawer-overlay"
        data-testid="drawer-overlay"
        aria-label="Close project details"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="project-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`drawer-title-${project.id}`}
      >
        <div className="project-drawer__header">
          <div>
            <p className="eyebrow">
              {project.status} · {project.date}
            </p>
            <h2 id={`drawer-title-${project.id}`}>{project.title}</h2>
          </div>
          <button
            ref={closeRef}
            className="drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p className="project-drawer__purpose">{project.purpose}</p>
        <p className="project-drawer__role">{project.role}</p>

        <div className="drawer-section">
          <h3>Challenge</h3>
          <p>{project.challenge}</p>
        </div>
        <div className="drawer-section">
          <h3>My contribution</h3>
          <ul>
            {project.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </div>
        <div className="drawer-section">
          <h3>System design</h3>
          <ul>
            {project.systemDesign.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="drawer-section">
          <h3>Results and team outcomes</h3>
          <ul>
            {project.teamOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
        {hasMedia || hasLinkContent || showMediaPlaceholder ? (
          <div className="drawer-section">
            <h3>
              {hasMedia || showMediaPlaceholder
                ? hasLinkContent || showMediaPlaceholder
                  ? "Media and links"
                  : "Media"
                : "Links"}
            </h3>
            {hasMedia ? (
              <div className="drawer-media-list">
                {project.media?.map((media) => (
                  <figure className="drawer-media-item" key={media.src}>
                    {media.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={withBasePath(
                          media.src,
                          process.env.NEXT_PUBLIC_BASE_PATH ?? "",
                        )}
                        alt={media.alt}
                      />
                    ) : media.type === "video" ? (
                      <video
                        src={withBasePath(
                          media.src,
                          process.env.NEXT_PUBLIC_BASE_PATH ?? "",
                        )}
                        title={media.title}
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <div className="drawer-video">
                        <iframe
                          src={media.src}
                          title={media.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    )}
                    {media.caption ? <figcaption>{media.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : showMediaPlaceholder ? (
              <div className="media-fallback" role="note">
                <span>MEDIA COMING SOON</span>
                <strong>Project photography pending.</strong>
              </div>
            ) : null}
            {hasLinkContent ? (
              <div className="drawer-links">
                {project.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
                {project.repositoryComingSoon ? (
                  <span className="drawer-link-pending">
                    Repository link coming soon
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
