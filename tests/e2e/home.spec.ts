import { expect, test } from "@playwright/test";
import { HERO_VARIANT, HOME_TABS } from "../../src/content/home";

type Page = import("@playwright/test").Page;
const word = (page: Page) => page.getByTestId("hero-word");
/** The slide timer is a CSS animation on the active navigator bar. */
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 768;
const timerAnimation = (page: Page) =>
  page
    .getByRole("button", { name: /^Slide 1 of 3/ })
    .locator("span")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);

test.describe("home hero (word window)", () => {
  test.skip(HERO_VARIANT !== "word-window", "another hero is live");
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

test("phones: the hero fills the first screen, has one call to action and keeps its layout on every slide", async ({ page }) => {
  test.skip(isDesktop(page), "mobile only");
  test.skip(HERO_VARIANT !== "word-window", "another hero is live");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Welcome to LeadImpact University" });
  await expect(hero.getByRole("link")).toHaveCount(1);
  await expect(hero.getByRole("group", { name: "Choose a slide" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Quick actions" })).not.toBeInViewport();

  const cta = hero.getByRole("link", { name: /Start your application/ });
  const before = { hero: await hero.boundingBox(), cta: await cta.boundingBox() };
  await expect(word(page)).toHaveText("Transform", { timeout: 10_000 });
  await page.waitForTimeout(900); // let the wipe-in finish
  expect(await hero.boundingBox()).toEqual(before.hero);
  expect((await cta.boundingBox())!.y).toBeCloseTo(before.cta!.y, 0);
});

test.describe("home hero (Option B, light with photo strip)", () => {
  test.skip(HERO_VARIANT !== "light-strip", "another hero is live");

  test("headline is the page heading, with one call to action", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("region", { name: "Welcome to LeadImpact University" });
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("Time to take the lead.");
    await expect(hero.getByRole("link")).toHaveCount(1);
    await expect(hero.getByRole("link", { name: /Start your application/ })).toBeVisible();
  });

  test("the photo strip scrolls, and stays still with reduced motion or Lite mode", async ({ page }) => {
    const strip = page.locator(".hero-strip");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(strip).toHaveCSS("animation-name", "strip-scroll");

    await page.addInitScript(() => {
      Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" } });
    });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-lite", "");
    await expect(strip).toHaveCSS("animation-name", "none");
  });

  test("phones: the hero fills the first screen without scrolling sideways", async ({ page }) => {
    test.skip(isDesktop(page), "mobile only");
    await page.goto("/");
    const hero = page.getByRole("region", { name: "Welcome to LeadImpact University" });
    const box = (await hero.boundingBox())!;
    expect(box.y + box.height).toBeCloseTo(page.viewportSize()!.height, -1);
    await expect(page.getByRole("navigation", { name: "Quick actions" })).not.toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  });
});

test.describe("home hero (video)", () => {
  test.skip(HERO_VARIANT !== "video", "another hero is live");
  const hero = (page: Page) => page.getByRole("region", { name: "Welcome to LeadImpact University" });

  test("headline is the page heading, with one call to action", async ({ page }) => {
    await page.goto("/");
    await expect(hero(page).getByRole("heading", { level: 1 })).toContainText("Time to take the lead.");
    await expect(hero(page).getByRole("link", { name: /Start your application/ })).toHaveCount(1);
  });

  test("plays muted on a loop and can be paused", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    test.skip((await hero(page).locator("picture").count()) === 0, "no Cloudinary cloud name, so no video");
    const video = page.getByTestId("hero-video");
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveJSProperty("loop", true);
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 30_000 }).toBe(true);

    await page.getByRole("button", { name: "Pause background video" }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(page.getByRole("button", { name: "Play background video" })).toBeVisible();
  });

  test("reduced motion and Lite mode never load the video", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(hero(page).getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("hero-video")).toHaveCount(0);

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" } });
    });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-lite", "");
    await expect(page.getByTestId("hero-video")).toHaveCount(0);
  });

  test("phones: the section tabs sit on the video instead of under the header", async ({ page }) => {
    test.skip(isDesktop(page), "mobile only");
    test.skip(HOME_TABS === "bar", "the tabs stay under the header");
    await page.goto("/");
    const tabs = page.getByRole("navigation", { name: "Sections" });
    // Only the hero's copy is visible; the bar under the header is hidden on this page.
    await expect(tabs).toHaveCount(1);
    const heroBox = (await hero(page).boundingBox())!;
    const homeBox = (await tabs.getByRole("link", { name: "Home", exact: true }).boundingBox())!;
    expect(homeBox.y).toBeGreaterThan(heroBox.y);

    await tabs.getByRole("button", { name: "Admissions" }).click();
    await expect(tabs.getByRole("link", { name: "Scholarships" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tabs.getByRole("link", { name: "Scholarships" })).toBeHidden();

    const box = (await hero(page).boundingBox())!;
    expect(box.y + box.height).toBeCloseTo(page.viewportSize()!.height, -1);
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
  for (const name of ["Pay tuition", "Sign in", "Learn online"]) {
    await expect(quick.getByRole("link", { name: new RegExp(name) })).toBeVisible();
  }
  // The hero's "Start your application" is the apply button; it isn't repeated here.
  await expect(quick.getByRole("link", { name: /Apply/ })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /See all 7 colleges/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your calling is waiting." })).toBeVisible();
});
