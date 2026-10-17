import { expect, test } from "@playwright/test";

test.describe("affiliates (S17 / S18)", () => {
  test("country page lists the real campuses with call, map and WhatsApp links", async ({ page }) => {
    await page.goto("/affiliates/nigeria");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/LIU Nigeria/);
    const campuses = page.getByRole("list", { name: "Campuses in Nigeria" }).getByRole("listitem");
    await expect(campuses).toHaveCount(4);
    const vision = campuses.filter({ hasText: "Vision Christian College" });
    await expect(vision.getByRole("link", { name: "+234 803 250 7326" })).toHaveAttribute("href", "tel:+2348032507326");
    await expect(vision.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /wa\.me\/2348032507326/);
    await expect(vision.getByRole("link", { name: /Directions/ })).toHaveAttribute("href", /google\.com\/maps/);
  });

  test("country tabs switch countries; Kenya stays hidden behind its flag", async ({ page }) => {
    await page.goto("/affiliates/uganda");
    const tabs = page.getByRole("navigation", { name: "Countries" });
    await expect(tabs.getByRole("link", { name: /Uganda/ })).toHaveAttribute("aria-current", "page");
    await expect(tabs.getByRole("link", { name: /Kenya/ })).toHaveCount(0);
    await tabs.getByRole("link", { name: /Ghana/ }).click();
    await expect(page).toHaveURL(/\/affiliates\/ghana$/);
    await expect(page.getByText("LeadImpact Christian Leadership Fellowship")).toBeVisible();
  });

  test("become-an-affiliate form validates, then confirms", async ({ page }) => {
    await page.goto("/affiliates/become-an-affiliate");
    await page.getByRole("button", { name: "Submit application" }).click();
    await expect(page.getByLabel(/Full name/)).toHaveAttribute("aria-invalid", "true");
    await page.getByLabel(/Full name/).fill("Rev. Samuel Okello");
    await page.getByLabel(/Email/).fill("samuel@ministry.org");
    await page.getByLabel(/Phone/).fill("+256 772 483 248");
    await page.getByLabel(/Name of organisation/).fill("Kampala Bible College");
    await page.getByLabel(/Address/).fill("Kampala");
    await page.getByLabel(/About your organisation/).fill("120 students");
    await page.getByRole("button", { name: "Submit application" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you for your partnership interest");
  });
});

test("LIU Learn page advertises only: it leads to Apply and Sign in, never to the Learn platform", async ({ page }) => {
  await page.goto("/learn-online");
  await expect(page.getByRole("link", { name: /Apply to study/ }).first()).toHaveAttribute("href", "/portal/apply");
  await expect(page.getByRole("link", { name: /Sign in to your dashboard/ })).toHaveAttribute("href", "/portal/sign-in");
  await expect(page.locator('a[href^="/learn"]:not([href^="/learn-online"])')).toHaveCount(0);
  await expect(page.getByText("Android app · coming soon").first()).toHaveAttribute("aria-disabled", "true");
});

test("activities: WOBICON links to wobicon.org and filters work", async ({ page }) => {
  await page.goto("/activities");
  await expect(page.getByRole("link", { name: /Visit wobicon\.org/ })).toHaveAttribute("href", "https://www.wobicon.org");
  await page.getByRole("button", { name: "Masterclasses" }).click();
  await expect(page.getByRole("link", { name: /^Register for/ })).toHaveCount(1);
});

test("blog filters by category and opens an article", async ({ page }) => {
  await page.goto("/media/blog");
  await page.getByRole("button", { name: "Campus news" }).click();
  await expect(page).toHaveURL(/category=campus/);
  await expect(page.getByRole("link", { name: /Read more/ })).toHaveCount(2);
  await page.getByRole("link", { name: /Power Bible College hosts/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Power Bible College hosts leadership week/);
});

test("gallery videos open LIU's YouTube channel", async ({ page }) => {
  await page.goto("/media/gallery");
  await expect(page.locator("#videos a[href*='youtube.com']").first()).toBeVisible();
});

test.describe("contact (S23)", () => {
  test("cards use the new-domain emails and the anchors other pages link to exist", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("main").getByText("info@leadimpactuniversity.education").first()).toBeVisible();
    for (const id of ["campuses", "careers"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  });

  test("message form validates email-or-phone, then confirms", async ({ page }) => {
    await page.goto("/contact?topic=events");
    await expect(page.getByLabel("I’m asking about")).toHaveValue("events");
    await page.getByLabel(/Full name/).fill("Grace Udo");
    await page.getByLabel(/Email or phone/).fill("not sure");
    await page.getByLabel(/Message/).fill("When is WOBICON?");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Enter an email address or a phone number.")).toBeVisible();
    await page.getByLabel(/Email or phone/).fill("+234 803 250 7326");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you");
  });
});

test("prospective students links to the right next steps", async ({ page }) => {
  await page.goto("/prospective-students");
  await expect(page.getByRole("link", { name: /Explore programs/ })).toHaveAttribute("href", "/programs");
  await expect(page.getByRole("link", { name: /Start application/ })).toHaveAttribute("href", "/portal/apply");
});
