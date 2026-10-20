import { describe, expect, it } from "vitest";
import { COUNTRIES } from "@/content/countries";
import { tickerCountries } from "./PhoneTicker";

const codes = (list: { code: string }[]) => list.map((c) => c.code);
const ALL = [COUNTRIES.US, COUNTRIES.NG, COUNTRIES.UG, COUNTRIES.GH, COUNTRIES.KE, COUNTRIES.TZ];

describe("tickerCountries", () => {
  it("starts with the visitor's country, then the rest in order", () => {
    expect(codes(tickerCountries(COUNTRIES.GH, ALL))).toEqual(["GH", "US", "NG", "UG"]);
  });

  it("drops countries that share the HQ line, and starts on HQ for them", () => {
    expect(codes(tickerCountries(COUNTRIES.KE, ALL))).toEqual(["US", "NG", "UG", "GH"]);
    expect(codes(tickerCountries(COUNTRIES.TZ, ALL))).toEqual(["US", "NG", "UG", "GH"]);
  });
});
