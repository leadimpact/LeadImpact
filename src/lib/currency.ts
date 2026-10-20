import type { CountryCode } from "@/content/countries";

/**
 * SAMPLE exchange rates (local units per US$1), from the S11 design. Tuition is charged in USD
 * and converted by the payment provider on the day; these only drive "≈" estimates.
 * They also make the demo consistent: 3 courses = $500 ≈ ₦750,000 (Grace Udo, P08–P12).
 * Replace with a live rates feed before launch (CHANGES_NEEDED.md).
 */
export const SAMPLE_RATES: Record<CountryCode, number> = {
  US: 1,
  NG: 1500,
  UG: 3700,
  GH: 15,
  KE: 130,
  TZ: 2600,
};

const SYMBOLS: Record<CountryCode, string> = { US: "$", NG: "₦", UG: "USh ", GH: "GH₵ ", KE: "KSh ", TZ: "TSh " };

export function toLocal(usd: number, country: CountryCode): number {
  return usd * SAMPLE_RATES[country];
}

/**
 * Format a USD amount in the country's currency. Large UGX amounts use "M" as in the design
 * ("USh 1.85M"); everything else is grouped with commas.
 */
export function formatLocal(usd: number, country: CountryCode): string {
  const amount = toLocal(usd, country);
  const symbol = SYMBOLS[country];
  if (country === "UG" && amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  return `${symbol}${Math.round(amount).toLocaleString("en-US")}`;
}

/** "$200" style USD formatting. */
export const formatUsd = (usd: number) => `$${usd.toLocaleString("en-US")}`;
