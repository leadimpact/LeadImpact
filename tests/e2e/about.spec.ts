import { expect, test } from "@playwright/test";

test("About page has the anchors the menus link to", async ({ page }) => {
  await page.goto("/about");
  for (const id of ["who-we-are", "mission", "vision", "values", "statement-of-faith"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.getByRole("heading", { name: "Statement of Faith" })).toBeVisible();
  await expect(page.locator("#statement-of-faith li")).toHaveCount(6);
});

test("in-page tabs follow the section in view", async ({ page }) => {
  await page.goto("/about");
  const tabs = page.getByRole("navigation", { name: "On this page" });
  await expect(tabs.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
  await tabs.getByRole("link", { name: "Statement of Faith" }).click();
  await expect(tabs.getByRole("link", { name: "Statement of Faith" })).toHaveAttribute("aria-current", "location");
});

test("breadcrumb marks the current page", async ({ page }) => {
  await page.goto("/about/president");
  const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(crumbs.locator("[aria-current=page]")).toHaveText("President’s Desk");
  // Desktop shows the full trail in the tab; phones show "parent › current" (SM4).
  const firstLink = (page.viewportSize()?.width ?? 0) >= 768 ? "Home" : "The University";
  await expect(crumbs.getByRole("link", { name: firstLink })).toBeVisible();
});

test("Board of Regents lists 8 members, each with a profile page", async ({ page }) => {
  await page.goto("/about/board-of-regents");
  const members = page.getByRole("region", { name: "Members of the Board" }).getByRole("link");
  await expect(members).toHaveCount(8);
  await members.filter({ hasText: "Dr. Coral Wilkins" }).click();
  await expect(page).toHaveURL(/\/about\/board-of-regents\/coral-wilkins$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dr. Coral Wilkins");
});

// Under Cache Components the shell has already streamed, so Next keeps a 200 status but
// renders the not-found page with noindex (documented behaviour in Next 16).
test("unknown board member shows the not-found page, marked noindex", async ({ page }) => {
  await page.goto("/about/board-of-regents/nobody");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("We couldn’t find that");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test("unknown URL returns a 404 with the branded page", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Apply now" }).first()).toBeVisible();
});
