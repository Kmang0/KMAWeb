"use client";

import { useLayoutEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function ScrollRevealObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observed = new WeakSet<Element>();

    const reveal = (element: Element) => {
      element.classList.add("is-revealed");
    };

    const observer =
      !reducedMotion && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                reveal(entry.target);
                observer?.unobserve(entry.target);
              });
            },
            {
              threshold: 0.12,
              rootMargin: "0px 0px -10% 0px",
            },
          )
        : null;

    const observeNewElements = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (observed.has(element)) return;

        observed.add(element);
        if (reducedMotion || !observer) {
          reveal(element);
        } else {
          observer.observe(element);
        }
      });
    };

    root.classList.add("reveal-enabled");
    observeNewElements();

    const mutationObserver = new MutationObserver(observeNewElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("reveal-enabled");
    };
  }, []);

  return null;
}
