import { describe, expect, it } from "vitest";

import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  projects,
  validateProjects,
} from "@/data/projects";

describe("project catalogue data", () => {
  it("contains the complete nine-project catalogue in the required order", () => {
    expect(projects.map((project) => project.title)).toEqual([
      "YOR v3",
      "BEBOP",
      "Double Pendulum RL",
      "RUKA-v2",
      "SPARK",
      "Puzzle Solving with Search Algorithms",
      "Blackjack Card Counting Monte Carlo",
      "RSA Key Generation and Message Encryption",
      "KMACoin",
    ]);
  });

  it("marks only active projects as current work", () => {
    const current = projects.filter((project) => project.currentWork);
    const ruka = projects.find((project) => project.id === "ruka-v2");

    expect(current.map((project) => project.id)).toEqual([
      "yor-v3",
      "bebop",
      "double-pendulum-rl",
    ]);
    expect(ruka?.currentWork).toBe(false);
    expect(ruka?.date).toBe("Prior work");
    expect(ruka?.status).toBe("Published");
  });

  it("has unique ids, supported metadata, and contribution content", () => {
    expect(validateProjects(projects)).toEqual([]);
    expect(new Set(projects.map((project) => project.id)).size).toBe(
      projects.length,
    );

    for (const project of projects) {
      expect(PROJECT_STATUSES).toContain(project.status);
      expect(project.categories.length).toBeGreaterThan(0);
      expect(
        project.categories.every((category) =>
          PROJECT_CATEGORIES.includes(category),
        ),
      ).toBe(true);
      expect(project.contributions.length).toBeGreaterThanOrEqual(3);
      expect(project.purpose).not.toMatch(/placeholder|yourusername/i);
      expect(project.links?.every((link) => /^https?:\/\//.test(link.href))).not
        .toBe(false);
    }
  });

  it("keeps personal contributions separate from team outcomes", () => {
    const ruka = projects.find((project) => project.id === "ruka-v2");

    expect(ruka?.contributions.join(" ")).toMatch(/wrist/i);
    expect(ruka?.contributions.join(" ")).toMatch(/teleoperation/i);
    expect(ruka?.teamOutcomes.join(" ")).toMatch(/project|team/i);
    expect(ruka?.teamOutcomes).not.toBe(ruka?.contributions);
    expect(ruka?.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Project site",
          href: "https://ruka-hand-v2.github.io/",
        }),
        expect.objectContaining({
          label: "Paper",
          href: "https://arxiv.org/abs/2603.26660",
        }),
      ]),
    );
  });
});
