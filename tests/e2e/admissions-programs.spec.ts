import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 768;

test.describe("admissions (S09 / SM4)", () => {
  test("Start application is in the hero on phones, and the form PDF downloads", async ({ page }) => {
    await page.goto("/admissions");
    const start = page.getByRole("link", { name: isMobile(page) ? "Start application" : "Apply online" }).first();
    await expect(start).toHaveAttribute("href", /\/portal\/apply$/);
    const pdf = page.getByRole("link", { name: /Download (admission )?form \(PDF\)/ }).first();
    await expect(pdf).toHaveAttribute("href", "/forms/liu-admission-form.pdf");
    const res = await page.request.get("/forms/liu-admission-form.pdf");
    expect(res.headers()["content-type"]).toContain("pdf");
  });

  test("admissions policy and FAQs are on the page; answers open and close", async ({ page }) => {
    await page.goto("/admissions");
    // Desktop: 8 policy items in a grid; phones: 8 tap-to-open items.
    const policy = isMobile(page) ? page.locator("#policy details") : page.locator("#policy li");
    await expect(policy).toHaveCount(8);
    const faq = page.locator("#faqs details").nth(1);
    await expect(faq).not.toHaveAttribute("open", "");
    await faq.locator("summary").click();
    await expect(faq).toHaveAttribute("open", "");
    await expect(faq).toContainText("C (2.0) or higher");
  });

  test("emails use the new domain", async ({ page }) => {
    await page.goto("/admissions");
    const mail = page.locator('a[href^="mailto:admissions@"]').first();
    await expect(mail).toHaveAttribute("href", "mailto:admissions@leadimpactuniversity.education");
  });
});

test("tuition shows the bundle saving and the selected country's estimate", async ({ page }) => {
  await page.goto("/admissions/tuition");
  await expect(page.getByText("Best value · save $100")).toBeVisible();
  const nigeria = page.getByRole("row", { name: /Nigeria/ });
  await expect(nigeria).toContainText("₦750,000");
  await expect(nigeria).toHaveAttribute("aria-current", "true");
  await expect(page.getByRole("row", { name: /Tanzania/ })).toContainText("TSh");
});

test.describe("programs (S12)", () => {
  test("lists 12 programs over two pages", async ({ page }) => {
    await page.goto("/programs");
    await expect(page.getByRole("status").filter({ hasText: "programs" })).toHaveText("12 programs");
    await expect(page.getByRole("link", { name: /View program/ })).toHaveCount(9);
    await expect(page.getByRole("link", { name: /View program/ }).locator("img")).toHaveCount(9);
    await page.getByRole("link", { name: "Page 2" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByRole("link", { name: /View program/ })).toHaveCount(3);
  });

  test("college chips and menu links filter the list via the URL", async ({ page }) => {
    await page.goto("/programs?college=theology");
    await expect(page.getByRole("button", { name: "Theology & Biblical Studies" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("link", { name: /View program/ })).toHaveCount(3);
    await page.getByRole("button", { name: "Multimedia" }).click();
    await expect(page).toHaveURL(/college=multimedia/);
    await expect(page.getByText(/College of Multimedia Technology are coming soon/)).toBeVisible();
  });

  test("search narrows the results", async ({ page }) => {
    await page.goto("/programs");
    await page.getByRole("searchbox", { name: "Search programs" }).fill("chaplain");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page).toHaveURL(/q=chaplain/);
    await expect(page.getByRole("link", { name: /View program/ })).toHaveCount(1);
  });
});

test.describe("program detail (S13 / SM3)", () => {
  test("choosing a level updates the application link", async ({ page }) => {
    await page.goto("/programs/theology");
    const picker = page.getByRole("group", { name: "Choose a level" }).filter({ visible: true });
    await expect(picker.getByRole("radio", { checked: true })).toHaveValue("bachelor");
    await picker.getByText("Master’s", { exact: false }).first().click();
    await expect(page.getByRole("link", { name: /Apply for this program/ }).filter({ visible: true })).toHaveAttribute(
      "href",
      "/portal/apply?program=theology&level=master",
    );
  });

  test("shows the curriculum, faculty and credit transfer link", async ({ page }) => {
    await page.goto("/programs/theology");
    await expect(page.getByText("Systematic Theology I", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Dr\. Edem Ndem/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Credit transfer policy/ })).toHaveAttribute(
      "href",
      "/academics/academic-affairs#credit-transfer",
    );
  });

  test("phones show four courses until expanded (SM3)", async ({ page }) => {
    test.skip(!isMobile(page), "mobile only");
    await page.goto("/programs/theology");
    await expect(page.getByText("Hermeneutics")).toBeHidden();
    await page.getByRole("button", { name: "Show all courses" }).click();
    await expect(page.getByText("Hermeneutics")).toBeVisible();
  });
});

test.describe("academics (S14–S16)", () => {
  test("academic affairs has every tab target, including the home page's accreditation link", async ({ page }) => {
    await page.goto("/academics/academic-affairs");
    for (const id of ["office", "credit-transfer", "calendar", "grading", "policies", "accreditation"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("faculty directory searches by name and filters by college", async ({ page }) => {
    await page.goto("/academics/faculty");
    await page.getByRole("searchbox", { name: "Search by name or college" }).fill("Ojo");
    await expect(page.getByRole("link", { name: /Dr\. Paul Ojo/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Dr\. Edem Ndem/ })).toHaveCount(0);
    await page.getByRole("searchbox", { name: "Search by name or college" }).fill("");
    await page.getByLabel("Filter by college").selectOption("counseling");
    await expect(page.getByRole("heading", { name: "College of Christian Counseling" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /College of Theology/ })).toHaveCount(0);
  });

  test("honorary doctorate lists the seven degrees", async ({ page }) => {
    await page.goto("/academics/honorary-doctorate");
    await expect(page.getByText(/^Doctor of /)).toHaveCount(7);
    const recent = page.getByRole("region", { name: "Angela Ashong Ashong" });
    await expect(recent.getByRole("link", { name: "View the album" })).toHaveAttribute("href", "/media/gallery/honorary-doctorate-2026");
  });
});
