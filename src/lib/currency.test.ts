import { describe, expect, it } from "vitest";
import { formatLocal, formatUsd, toLocal } from "./currency";

describe("local currency estimates (S11 sample rates)", () => {
  it("matches the design's per-course and bundle figures", () => {
    expect(formatLocal(200, "NG")).toBe("₦300,000");
    expect(formatLocal(500, "NG")).toBe("₦750,000");
    expect(formatLocal(200, "UG")).toBe("USh 740,000");
    expect(formatLocal(500, "UG")).toBe("USh 1.85M");
    expect(formatLocal(200, "GH")).toBe("GH₵ 3,000");
    expect(formatLocal(500, "KE")).toBe("KSh 65,000");
    expect(formatLocal(500, "TZ")).toBe("TSh 1,300,000");
    expect(formatLocal(200, "US")).toBe("$200");
  });

  it("converts and formats USD", () => {
    expect(toLocal(1, "KE")).toBe(130);
    expect(formatUsd(1500)).toBe("$1,500");
  });
});
