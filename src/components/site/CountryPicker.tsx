"use client";

import { useId } from "react";
import clsx from "clsx";
import { ChevronDown, Globe } from "lucide-react";
import { COUNTRY_LIST, isCountryCode } from "@/content/countries";
import { useCountry } from "@/lib/country";

interface CountryPickerProps {
  className?: string;
  /** Uppercase compact label for the mobile utility row. */
  compact?: boolean;
}

/**
 * Native <select> layered over a styled label: one tap opens the phone's own picker,
 * which is the most familiar control for less tech-confident users.
 */
export function CountryPicker({ className, compact }: CountryPickerProps) {
  const { country, setCountry } = useCountry();
  const id = useId();

  return (
    <div className={clsx("relative flex h-full items-center", className)}>
      <label htmlFor={id} className="sr-only">
        Your country — sets currency, payment methods and campus contacts
      </label>
      <span aria-hidden className="pointer-events-none flex items-center gap-2">
        <Globe size={compact ? 14 : 15} />
        <span className={clsx(compact && "uppercase")}>{country.name}</span>
        <ChevronDown size={13} />
      </span>
      <select
        id={id}
        value={country.code}
        onChange={(e) => isCountryCode(e.target.value) && setCountry(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {COUNTRY_LIST.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
            {c.comingSoon ? " (coming soon)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
