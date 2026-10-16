import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SITE_PAGES } from "./site-pages";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1280;

test.describe("mobile header", () => {
  test.beforeEach(({ page }) => test.skip(!isMobile(page), "mobile only"));

  for (const path of SITE_PAGES) {
    test(`Apply is visible without scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      const apply = page.getByRole("banner").getByRole("link", { name: "Apply", exact: true });
      await expect(apply).toBeInViewport();
      const box = await apply.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(48);
    });
  }

  test("Apply stays on screen after scrolling", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 2000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole("banner").getByRole("link", { name: "Apply", exact: true })).toBeInViewport();
  });

  test("section tabs: Home links, a section opens its pages, Esc closes", async ({ page }) => {
    await page.goto("/about");
    const tabs = page.getByRole("navigation", { name: "Sections" });
    for (const name of ["The University", "Admissions", "Academics", "Programs", "Affiliates", "Media"]) {
      await expect(tabs.getByRole("button", { name })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Menu" })).toHaveCount(0);

    const admissions = tabs.getByRole("button", { name: "Admissions" });
    await admissions.click();
    await expect(admissions).toHaveAttribute("aria-expanded", "true");
    await expect(tabs.getByRole("link", { name: "Scholarships" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tabs.getByRole("link", { name: "Scholarships" })).toBeHidden();

    await tabs.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Affiliates tab lists each campus country", async ({ page }) => {
    await page.goto("/");
    const tabs = page.getByRole("navigation", { name: "Sections" });
    await tabs.getByRole("button", { name: "Affiliates" }).click();
    await expect(tabs.getByRole("link", { name: "Uganda" })).toHaveAttribute("href", "/affiliates/uganda");
    await expect(tabs.getByRole("link", { name: "Become an affiliate" })).toBeVisible();
  });
});

test.describe("desktop header", () => {
  test.beforeEach(({ page }) => test.skip(isMobile(page), "desktop only"));

  test("dropdown opens on click, shows columns and closes on Esc", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Admissions" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: /Tuition & fees/ })).toBeVisible();
    await expect(page.getByText("Costs & support")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("dropdown opens on hover", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: /College of Theology/ });
    // Hover only works once React has hydrated; re-hover until the page is interactive.
    await expect(async () => {
      await page.mouse.move(0, 0);
      await page.getByRole("button", { name: "Programs" }).hover();
      await expect(link).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15_000 });
  });

  test("arrow keys move between menu triggers", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "The University" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("button", { name: "Admissions" })).toBeFocused();
  });

  test("affiliates dropdown lists the campus countries (Kenya behind its flag)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Affiliates" }).click();
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: /Kenya/ })).toHaveCount(0);
    for (const name of ["United States", "Nigeria", "Uganda", "Ghana"]) {
      await expect(
        page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: new RegExp(name) }),
      ).toBeVisible();
    }
  });

  test("Apply now and quick links are in the header", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("banner").first();
    await expect(banner.getByRole("link", { name: "Apply now" })).toBeInViewport();
    for (const name of ["Student Portal", "Pay Tuition", "LIU Learn", "Become an Affiliate", "WhatsApp"]) {
      await expect(banner.getByRole("link", { name, exact: true })).toBeVisible();
    }
  });
});

test("country choice is remembered after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(/Your country/).filter({ visible: true }).first().selectOption("GH");
  await page.reload();
  await expect(page.getByLabel(/Your country/).filter({ visible: true }).first()).toHaveValue("GH");
});

test("WhatsApp link names the current page", async ({ page }) => {
  await page.goto("/search");
  const href = await page.getByRole("link", { name: "WhatsApp" }).first().getAttribute("href");
  expect(decodeURIComponent(href!)).toContain('"Search" page');
});

// Radix NavigationMenu renders a visually hidden, aria-hidden focus proxy (tabindex=0) that
// immediately forwards focus into the open panel; axe flags it, but it is never a focus stop.
const axe = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude('nav[aria-label="Main"] span[aria-hidden="true"][tabindex="0"]');

for (const path of SITE_PAGES) {
  test(`no axe violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await axe(page).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test("no axe violations with the menu open", async ({ page }) => {
  await page.goto("/");
  if (isMobile(page)) await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: "The University" }).click();
  else await page.getByRole("button", { name: "The University" }).click();
  const results = await axe(page).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});
