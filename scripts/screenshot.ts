/**
 * Captures every route at 1440px and 390px (plus open-menu states) into ./screenshots
 * for side-by-side comparison with the design PNGs.
 *
 *   pnpm build && pnpm start -p 3100 &   # then:
 *   pnpm screenshot [--base=http://localhost:3100] [--only=S02,SM2] [--scale=1]
 */
import { mkdir } from "node:fs/promises";
import { chromium, type Page } from "@playwright/test";

interface Shot {
  id: string; // design screen id, e.g. "S02" — matches the PNG being compared against
  path: string;
  width: 1440 | 390;
  fullPage?: boolean;
  prepare?: (page: Page) => Promise<void>;
}

const openDropdown = (name: string) => async (page: Page) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name }).click();
  await page.waitForTimeout(350);
};

const SHOTS: Shot[] = [
  { id: "S01", path: "/", width: 1440, fullPage: true },
  {
    id: "S01b",
    path: "/",
    width: 1440,
    prepare: async (page) => {
      await page.getByRole("button", { name: /^Slide 2 of 3/ }).click();
      await page.waitForTimeout(900);
    },
  },
  { id: "S02", path: "/", width: 1440, prepare: openDropdown("The University") },
  { id: "S03", path: "/", width: 1440, prepare: openDropdown("Admissions") },
  { id: "S04", path: "/", width: 1440, prepare: openDropdown("Programs") },
  { id: "S05", path: "/", width: 1440, prepare: openDropdown("Affiliates") },
  { id: "academics-menu", path: "/", width: 1440, prepare: openDropdown("Academics") },
  { id: "media-menu", path: "/", width: 1440, prepare: openDropdown("Media") },
  { id: "SM1", path: "/", width: 390, fullPage: true },
  { id: "S06", path: "/about", width: 1440, fullPage: true },
  { id: "S07", path: "/about/president", width: 1440, fullPage: true },
  { id: "S08", path: "/about/board-of-regents", width: 1440, fullPage: true },
  { id: "S09", path: "/admissions", width: 1440, fullPage: true },
  { id: "SM4", path: "/admissions", width: 390, fullPage: true },
  { id: "S10", path: "/admissions/scholarships", width: 1440, fullPage: true },
  { id: "S11", path: "/admissions/tuition", width: 1440, fullPage: true },
  { id: "S12", path: "/programs", width: 1440, fullPage: true },
  { id: "S13", path: "/programs/theology", width: 1440, fullPage: true },
  { id: "SM3", path: "/programs/theology", width: 390, fullPage: true },
  { id: "S14", path: "/academics/academic-affairs", width: 1440, fullPage: true },
  { id: "S15", path: "/academics/faculty", width: 1440, fullPage: true },
  { id: "S16", path: "/academics/honorary-doctorate", width: 1440, fullPage: true },
  { id: "S17", path: "/affiliates/nigeria", width: 1440, fullPage: true },
  { id: "S18", path: "/affiliates/become-an-affiliate", width: 1440, fullPage: true },
  { id: "S19", path: "/learn-online", width: 1440, fullPage: true },
  { id: "S20", path: "/activities", width: 1440, fullPage: true },
  { id: "S21", path: "/media/blog", width: 1440, fullPage: true },
  { id: "S22", path: "/media/gallery", width: 1440, fullPage: true },
  { id: "S23", path: "/contact", width: 1440, fullPage: true },
  { id: "S24", path: "/prospective-students", width: 1440, fullPage: true },
  {
    id: "SM2",
    path: "/",
    width: 390,
    fullPage: true,
    prepare: async (page) => {
      await page.getByRole("button", { name: "Menu" }).click();
      // The menu is a fixed, scrollable panel: expand it so the full list is captured.
      await page.addStyleTag({ content: "#mobile-menu{position:absolute!important;bottom:auto!important}" });
    },
  },
  { id: "search", path: "/search?q=apply", width: 1440, fullPage: true },
];

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=") as [string, string]),
);
const base = args.base ?? "http://localhost:3100";
const only = args.only?.split(",");
/** Device pixel ratio; the design PNGs are 2×, use --scale=1 for smaller files. */
const scale = Number(args.scale ?? 2);

async function main() {
  await mkdir("screenshots", { recursive: true });
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : "chrome" });

  for (const shot of SHOTS.filter((s) => !only || only.includes(s.id))) {
    const mobile = shot.width === 390;
    const context = await browser.newContext({
      // Static first slide, so captures are repeatable.
      reducedMotion: "reduce",
      viewport: { width: shot.width, height: mobile ? 844 : 900 },
      deviceScaleFactor: scale,
      isMobile: mobile,
      hasTouch: mobile,
    });
    const page = await context.newPage();
    await page.goto(base + shot.path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await shot.prepare?.(page);
    const file = `screenshots/${shot.id}-${shot.width}.png`;
    await page.screenshot({ path: file, fullPage: shot.fullPage });
    console.log("✓", file);
    await context.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
