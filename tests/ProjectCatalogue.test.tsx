import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ProjectCatalogue } from "@/components/ProjectCatalogue";
import { projects } from "@/data/projects";

describe("ProjectCatalogue", () => {
  it("filters by category and searches project metadata", async () => {
    const user = userEvent.setup();
    render(<ProjectCatalogue projects={projects} />);

    await user.click(screen.getByRole("button", { name: "Control/RL" }));
    expect(screen.getByRole("button", { name: /Double Pendulum RL/ })).toBeVisible();
    expect(screen.queryByRole("button", { name: /RSA Key Generation/ })).toBeNull();

    await user.click(screen.getByRole("button", { name: "All" }));
    await user.type(screen.getByRole("searchbox", { name: /search projects/i }), "cryptography");
    expect(screen.getByRole("button", { name: /KMACoin/ })).toBeVisible();
    expect(screen.getByRole("button", { name: /RSA Key Generation/ })).toBeVisible();
    expect(screen.queryByRole("button", { name: /RUKA-v2/ })).toBeNull();
  });

  it("renders equal card shells with status-aligned current-work markers and no dates", () => {
    render(<ProjectCatalogue projects={projects} />);

    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(9);
    expect(cards.every((card) => card.classList.contains("project-card"))).toBe(true);
    expect(within(cards[0]).getByText("Current work")).toBeVisible();
    expect(within(cards[0]).getByText("In Progress")).toBeVisible();
    expect(within(cards[0]).queryByText("Spring 2026–Present")).toBeNull();
    expect(within(cards[4]).queryByText("Current work")).toBeNull();
    expect(within(cards[4]).queryByText("Prior work")).toBeNull();
  });

  it("opens an accessible drawer and closes with Escape while restoring focus", async () => {
    const user = userEvent.setup();
    render(<ProjectCatalogue projects={projects} />);

    const opener = screen.getByRole("button", { name: /Open RUKA-v2 details/i });
    await user.click(opener);

    const drawer = screen.getByRole("dialog", { name: "RUKA-v2" });
    expect(drawer).toBeVisible();
    expect(document.body).toHaveClass("drawer-open");
    expect(within(drawer).getByRole("heading", { name: "My contribution" })).toBeVisible();
    expect(
      within(drawer).getByRole("heading", { name: "Media and links" }),
    ).toBeVisible();
    expect(within(drawer).getByRole("link", { name: /Project site/ })).toBeVisible();
    expect(within(drawer).getByTitle("RUKA-v2 project video")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/WKVG-CsXR4E",
    );
    expect(within(drawer).queryByText(/yourusername/i)).toBeNull();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body).not.toHaveClass("drawer-open");
    expect(opener).toHaveFocus();
  });

  it("opens from pointer activation even when the browser does not focus buttons", () => {
    render(<ProjectCatalogue projects={projects} />);

    const opener = screen.getByRole("button", { name: /Open RUKA-v2 details/i });
    fireEvent.click(opener);

    expect(screen.getByRole("dialog", { name: "RUKA-v2" })).toBeVisible();
  });

  it("closes from the overlay and keeps Tab focus inside the drawer", async () => {
    const user = userEvent.setup();
    render(<ProjectCatalogue projects={projects} />);

    await user.click(screen.getByRole("button", { name: /Open YOR v3 details/i }));
    const dialog = screen.getByRole("dialog", { name: "YOR v3" });
    expect(
      within(dialog).getByRole("heading", { name: "Media and links" }),
    ).toBeVisible();
    expect(within(dialog).getByText("Repository link coming soon")).toBeVisible();
    const close = within(dialog).getByRole("button", { name: /close project details/i });
    close.focus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.click(screen.getByTestId("drawer-overlay"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
