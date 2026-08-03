import type { Ref } from "react";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  onOpen: (opener: HTMLButtonElement) => void;
  buttonRef?: Ref<HTMLButtonElement>;
  revealIndex?: number;
};

export function ProjectCard({
  project,
  onOpen,
  buttonRef,
  revealIndex = 0,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card reveal-delay-${Math.min(revealIndex, 8)}${project.currentWork ? " project-card--current" : ""}`}
      data-reveal
      data-testid="project-card"
    >
      <button
        ref={buttonRef}
        className="project-card__button"
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-label={`Open ${project.title} details`}
      >
        <span className="project-card__meta">
          {project.currentWork ? (
            <span className="project-card__current">Current work</span>
          ) : null}
          <span>{project.status}</span>
        </span>
        <span className="project-card__title">{project.title}</span>
        <span className="project-card__purpose">{project.purpose}</span>
        <span className="project-card__footer">
          <span>{project.categories.join(" / ")}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </button>
    </article>
  );
}
