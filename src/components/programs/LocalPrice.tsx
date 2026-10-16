"use client";

import { TUITION } from "@/content/colleges";
import { formatLocal } from "@/lib/currency";
import { useCountry } from "@/lib/country";
import { Tbc } from "@/components/ui/Tbc";

/** Approximate tuition in the visitor's currency (sample rates). Hidden for US visitors. */
export function LocalPrice() {
  const { country } = useCountry();
  if (country.code === "US") return null;
  return (
    <p className="mt-3 text-[15px] text-muted">
      In {country.name}:{" "}
      <Tbc>
        ≈ {formatLocal(TUITION.perCourse, country.code)} per course · ≈ {formatLocal(TUITION.bundlePrice, country.code)} for{" "}
        {TUITION.bundleCourses}
      </Tbc>{" "}
      (charged in US dollars at the day’s rate).
    </p>
  );
}
