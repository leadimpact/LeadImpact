import { expect, test } from "@playwright/test";

type Page = import("@playwright/test").Page;
const word = (page: Page) => page.getByTestId("hero-word");
/** The slide timer is a CSS animation on the active navigator bar. */
const timerAnimation = (page: Page) =>
  page
    .getByRole("button", { name: /^Slide 1 of 3/ })
    .locator("span")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);

test.describe("home hero (word window)", () => {
  test("the word is real text inside the page heading, with one call to action", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("region", { name: "Welcome to LeadImpact University" });
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("Lead");
    await expect(hero.getByRole("link", { name: /Start your application/ })).toHaveCount(1);
  });

  test("navigator jumps to a slide and the word stays on one line", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /^Slide 2 of 3/ }).click();
    await expect(word(page)).toHaveText("Transform");
    await expect(page.getByRole("button", { name: /^Slide 2 of 3/ })).toHaveAttribute("aria-current", "true");

    const box = await word(page).boundingBox();
    const lineHeight = await word(page).evaluate((el) => parseFloat(getComputedStyle(el.parentElement!).fontSize));
    expect(box!.height).toBeLessThan(lineHeight * 1.3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      page.viewportSize()!.width,
    );
  });

  test("advances on its own after 7 seconds", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(word(page)).toHaveText("Lead");
    await expect(word(page)).toHaveText("Transform", { timeout: 10_000 });
  });

  test("pauses while hovered", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    // Wait for hydration to start the timer before hovering.
    await expect.poll(() => timerAnimation(page)).toBe("progress");
    await word(page).hover();
    const state = await page
      .getByRole("button", { name: /^Slide 1 of 3/ })
      .locator("span")
      .first()
      .evaluate((el) => getComputedStyle(el).animationPlayState);
    expect(state).toBe("paused");
  });

  test("reduced motion shows a static LEAD slide", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(word(page)).toHaveText("Lead");
    expect(await timerAnimation(page)).toBe("none");
  });

  test("Lite mode drops the hero photos and autoplay", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" } });
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-lite", "");
    await expect(word(page)).toHaveCSS("background-image", "none");
    await expect(word(page)).toHaveText("Lead");
    expect(await timerAnimation(page)).toBe("none");
  });
});

test("tuition is shown as $200 per course or $500 for 3", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 768, "featured programs are desktop-only (SM1)");
  await page.goto("/");
  await expect(page.getByText("$500 for 3 courses")).toBeVisible();
});

test("mobile home follows SM1: quick actions, colleges and closing CTA", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, "mobile only");
  await page.goto("/");
  const quick = page.getByRole("navigation", { name: "Quick actions" });
  for (const name of ["Apply for admission", "Pay tuition", "Student portal", "LIU Learn"]) {
    await expect(quick.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: /See all 7 colleges/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your calling is waiting." })).toBeVisible();
});

test("phones get every menu section under Explore LIU", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, "mobile only — desktop has the menu bar");
  await page.goto("/");
  const explore = page.getByRole("region", { name: "Explore LIU" });
  for (const section of ["The University", "Admissions", "Programs", "Students", "Academics", "Affiliates", "Media", "Contact"]) {
    await expect(explore.getByRole("heading", { name: section })).toBeVisible();
  }
  await explore.getByRole("link", { name: "Scholarships" }).click();
  await expect(page).toHaveURL(/\/admissions\/scholarships$/);
});

