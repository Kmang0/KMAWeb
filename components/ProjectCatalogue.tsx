"use client";

import { useCallback, useMemo, useState } from "react";

import type { Project } from "@/data/projects";

import { FilterBar, type ProjectFilter } from "./FilterBar";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";

type ProjectCatalogueProps = {
  projects: Project[];
};

export function ProjectCatalogue({ projects }: ProjectCatalogueProps) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [drawerOpener, setDrawerOpener] = useState<HTMLButtonElement | null>(null);
  const closeDrawer = useCallback(() => setSelected(null), []);

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        filter === "All" || project.categories.includes(filter);
      const searchable = [
        project.title,
        project.purpose,
        project.role,
        ...project.categories,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [filter, projects, search]);

  const openProject = (project: Project, opener: HTMLButtonElement) => {
    setDrawerOpener(opener);
    setSelected(project);
  };

  return (
    <section id="projects" className="section catalogue" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="section-index" data-reveal>02 / PROJECT CATALOGUE</p>
        <h2 id="projects-title" className="reveal-delay-1" data-reveal>
          Some neat stuff I have had the fortune to work on.
        </h2>
        <p className="reveal-delay-2" data-reveal>
          Filter by discipline or search the record. Every entry opens a technical
          breakdown of ownership, architecture, and outcomes.
        </p>
      </div>

      <FilterBar
        activeFilter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
      />

      <p className="catalogue-count reveal-delay-4" aria-live="polite" data-reveal>
        {String(filteredProjects.length).padStart(2, "0")} records shown
      </p>
      {filteredProjects.length ? (
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              revealIndex={index}
              onOpen={(opener) => openProject(project, opener)}
            />
          ))}
        </div>
      ) : (
        <div className="catalogue-empty" data-reveal>
          <strong>No matching records.</strong>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearch("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {selected ? (
        <ProjectDrawer
          project={selected}
          onClose={closeDrawer}
          returnFocusTo={drawerOpener}
        />
      ) : null}
    </section>
  );
}
