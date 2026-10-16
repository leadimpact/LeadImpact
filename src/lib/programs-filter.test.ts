import { describe, expect, it } from "vitest";
import { filterPrograms, paginate, parseFilters, toSearch } from "./programs-filter";

const params = (q: string) => new URLSearchParams(q);

describe("program filters", () => {
  it("parses URL params and ignores unknown values", () => {
    expect(parseFilters(params("college=theology&level=doctorate&q=god&page=2"))).toEqual({
      q: "god",
      college: "theology",
      level: "doctorate",
      page: 2,
    });
    expect(parseFilters(params("college=nope&level=phd&page=-3"))).toEqual({ q: "", college: "", level: "", page: 1 });
  });

  it("round-trips through the query string", () => {
    expect(toSearch({ q: "youth", college: "education", level: "", page: 1 })).toBe("?q=youth&college=education");
    expect(toSearch({ q: "", college: "", level: "", page: 1 })).toBe("");
  });

  it("lists all 12 programs by default", () => {
    expect(filterPrograms(parseFilters(params("")))).toHaveLength(12);
  });

  it("filters by college, level and search text", () => {
    expect(filterPrograms(parseFilters(params("college=theology"))).map((p) => p.slug)).toEqual([
      "theology",
      "biblical-studies",
      "prophetic-ministry",
    ]);
    expect(filterPrograms(parseFilters(params("level=doctorate"))).map((p) => p.slug)).toEqual(["theology"]);
    expect(filterPrograms(parseFilters(params("q=counseling"))).map((p) => p.slug)).toContain("christian-counseling");
    expect(filterPrograms(parseFilters(params("college=communication")))).toEqual([]);
  });

  it("paginates 9 per page, clamping out-of-range pages", () => {
    const all = filterPrograms(parseFilters(params("")));
    expect(paginate(all, 1).items).toHaveLength(9);
    expect(paginate(all, 2)).toMatchObject({ page: 2, pages: 2 });
    expect(paginate(all, 2).items).toHaveLength(3);
    expect(paginate(all, 9).page).toBe(2);
  });
});
