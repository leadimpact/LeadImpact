import { describe, expect, it } from "vitest";
import { buildSearchIndex, searchSite } from "./search";

describe("site search", () => {
  it("indexes each destination once", () => {
    const hrefs = buildSearchIndex().map((e) => e.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("finds the application and tuition pages", () => {
    expect(searchSite("apply").map((r) => r.href)).toContain("/portal/apply");
    expect(searchSite("tuition fees").map((r) => r.href)).toContain("/admissions/tuition");
  });

  it("matches descriptions and requires every term", () => {
    expect(searchSite("prophetic").map((r) => r.href)).toContain("/programs?college=theology");
    expect(searchSite("prophetic chaplaincy")).toEqual([]);
  });

  it("returns nothing for a blank query", () => {
    expect(searchSite("   ")).toEqual([]);
  });
});
