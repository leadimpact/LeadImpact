"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Phone } from "lucide-react";
import { COUNTRIES, COUNTRY_LIST, type Country } from "@/content/countries";
import { useCountry } from "@/lib/country";
import { useLiteMode } from "@/lib/lite-mode";

/** Seconds each number stays on screen. */
const INTERVAL = 4;

/** Countries with their own number (those on the HQ line are covered by the US entry), visitor's first. */
export function tickerCountries(selected: Country, list: Country[] = COUNTRY_LIST): Country[] {
  const own = list.filter((c) => c.code === "US" || c.phone !== COUNTRIES.US.phone);
  const first = own.find((c) => c.phone === selected.phone) ?? own[0];
  return [first, ...own.filter((c) => c !== first)];
}

/**
 * Top bar (desktop and mobile): one phone number at a time, rolling upwards through each country's line,
 * starting with the visitor's country. Stops on hover or focus, and stays still for
 * reduced-motion and Lite visitors (who see their own country's number).
 */
export function PhoneTicker({ className, compact }: { className?: string; compact?: boolean }) {
  const { country } = useCountry();
  // Restart from the visitor's country whenever they pick another.
  return <Ticker key={country.code} items={tickerCountries(country)} className={className} compact={compact} />;
}

function Ticker({ items, className, compact }: { items: Country[]; className?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const lite = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!mq.matches && !lite && items.length > 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [lite, items.length]);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
      setMoved(true);
    }, INTERVAL * 1000);
    return () => clearInterval(id);
  }, [autoplay, paused, items.length]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      className={clsx("grid h-full items-center overflow-hidden", className)}
    >
      {/* Every number sits in the same grid cell, so the box is as wide as the longest one. */}
      {items.map((c, i) => {
        const current = i === index;
        return (
          <a
            key={c.code}
            href={`tel:+${c.phone}`}
            aria-label={`Call ${c.name}: ${c.phoneDisplay}`}
            aria-hidden={!current}
            tabIndex={current ? undefined : -1}
            data-testid={current ? "phone-ticker-current" : undefined}
            className={clsx(
              "col-start-1 row-start-1 flex items-center whitespace-nowrap hover:text-white",
              compact ? "gap-[5px] tracking-[0.02em]" : "gap-[7px]",
              !current && "invisible",
            )}
            style={current && moved ? { animation: "ticker-in .45s cubic-bezier(.2,.7,.2,1)" } : undefined}
          >
            <Phone size={compact ? 13 : 14} aria-hidden />
            <span className={clsx("font-display font-extrabold tracking-[0.06em] text-orange", compact ? "text-[11.5px]" : "text-[12px]")}>{c.code3}</span>
            {c.phoneDisplay}
          </a>
        );
      })}
    </div>
  );
}
