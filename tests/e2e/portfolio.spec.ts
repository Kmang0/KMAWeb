import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("presents the robotics positioning and complete catalogue", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Hey, I am Kenny, I like building robots!/i,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("project-card")).toHaveCount(9);
  await expect(page.getByRole("button", { name: /Open RUKA-v2 details/i })).toBeVisible();
});

test("filters projects and exposes accessible project details", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Control/RL" }).click();
  await expect(page.getByRole("button", { name: /Open Double Pendulum RL details/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Open KMACoin details/i })).toBeHidden();

  await page.getByRole("button", { name: /Open RUKA-v2 details/i }).click();
  const drawer = page.getByRole("dialog", { name: "RUKA-v2" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("heading", { name: "My contribution" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page.getByRole("button", { name: /Open RUKA-v2 details/i })).toBeFocused();
});

test("mobile project details occupy the viewport", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only layout assertion");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await page.getByRole("button", { name: /Open YOR v3 details/i }).click();
  const drawer = page.getByRole("dialog", { name: "YOR v3" });
  await expect(drawer).toBeVisible();
  const box = await drawer.boundingBox();
  const viewport = page.viewportSize();

  expect(box?.x).toBe(0);
  expect(box?.y).toBe(0);
  expect(box?.width).toBe(viewport?.width);
  expect(box?.height).toBe(viewport?.height);
});

test("has no serious or critical automated accessibility violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );

  expect(blocking).toEqual([]);

  await page.getByRole("button", { name: /Open RUKA-v2 details/i }).click();
  const drawerResults = await new AxeBuilder({ page })
    .include(".drawer-layer")
    .exclude(".drawer-video iframe")
    .analyze();
  const drawerBlocking = drawerResults.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );

  expect(drawerBlocking).toEqual([]);
});

