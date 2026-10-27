"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COUNTRY_LIST } from "@/content/countries";
import { MAIN_NAV, affiliateHref, isCurrentSection, sectionLinks, type NavItem } from "@/content/navigation";
import { useCountry } from "@/lib/country";

// Text sized so "ADMISSIONS" fits a quarter of the narrowest phones (320px).
const barTab =
  "flex min-h-9 w-full flex-col items-center justify-center px-0.5 py-1 text-center font-display text-[11px] font-extrabold uppercase leading-none tracking-[0.01em] max-[379px]:text-[10px] max-[339px]:text-[9px]";
// Side columns (as on jhu.edu): label left, chevron right. See-through (75%, the least that keeps
// black labels at AA contrast over the darkest video frames) so the hero text behind still shows.
const sideTab =
  "flex h-10 w-full items-center justify-between gap-2 px-3.5 font-display text-[12px] font-extrabold uppercase leading-none tracking-[0.06em]";

/**
 * "bar": two rows of four under the header (every page). On the home page the tabs can instead sit
 * over the hero video: "side" stacks all eight down the right edge, "split" puts four on each side.
 */
export type SectionTabsLayout = "bar" | "side" | "split";

/** Reads the current path (needs Suspense under Cache Components); SiteHeader wraps it. */
export function ActiveMobileSectionTabs() {
  const pathname = usePathname();
  // Remount per page, so an open panel closes after navigating.
  return <MobileSectionTabs key={pathname} pathname={pathname} />;
}

/**
 * Phones: the desktop menu as orange tabs. Home and Contact are links; the others open a panel of
 * that section's pages, like the desktop dropdowns. Replaces the old full-screen menu.
 * The bar is flush with the header's edges so it reads as its second row (2px hairlines between tabs);
 * a hero that shows the tabs itself (data-hero-tabs) hides the bar (see globals.css).
 */
export function MobileSectionTabs({ pathname, layout = "bar" }: { pathname: string | null; layout?: SectionTabsLayout }) {
  const [open, setOpen] = useState<string | null>(null);
  const { country } = useCountry();
  const panelId = useId();

  // Escape closes the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openItem = MAIN_NAV.find((i) => i.kind !== "link" && i.label === open);
  const bar = layout === "bar";

  const list = (items: NavItem[], className: string) => (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label}>
          <Tab
            item={item}
            className={bar ? barTab : sideTab}
            fill={bar ? "bg-orange" : "bg-orange/75"}
            current={isCurrentSection(item, pathname)}
            expanded={open === item.label}
            panelId={panelId}
            onToggle={() => setOpen((o) => (o === item.label ? null : item.label))}
          />
        </li>
      ))}
    </ul>
  );

  const half = Math.ceil(MAIN_NAV.length / 2);

  return (
    <nav
      aria-label="Sections"
      className={clsx(
        "nav:hidden",
        bar ? "section-tabs-bar bg-black pb-0.5" : "absolute inset-x-0 top-3 z-10 flex",
        layout === "side" && "justify-end",
        layout === "split" && "justify-between",
      )}
    >
      {bar && list(MAIN_NAV, "grid grid-cols-4 gap-0.5")}
      {layout === "side" && list(MAIN_NAV, "flex w-[150px] flex-col gap-1")}
      {layout === "split" && (
        <>
          {list(MAIN_NAV.slice(0, half), "flex w-[136px] flex-col gap-1")}
          {list(MAIN_NAV.slice(half), "flex w-[136px] flex-col gap-1")}
        </>
      )}

      {openItem && openItem.kind !== "link" && (
        <div
          id={panelId}
          className={clsx(
            "bg-white p-3 text-ink",
            bar && "mt-0.5",
            // Side: a flyout to the left of the column. Split: a card under both columns.
            !bar && "absolute max-h-[60svh] overflow-y-auto shadow-[0_8px_24px_rgba(14,15,18,0.35)]",
            layout === "side" && "left-3 right-[162px] top-0",
            layout === "split" && "inset-x-3 top-full mt-2",
          )}
        >
          <ul className={clsx("grid gap-1.5", layout === "side" ? "grid-cols-1" : "grid-cols-2")}>
            {sectionLinks(openItem, COUNTRY_LIST).map((l) => {
              const href = l.countryAffiliate ? affiliateHref(country.code) : l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className="flex min-h-11 items-center rounded-[4px] bg-[#F4F2EF] px-3 py-2 text-[14px] font-bold leading-tight aria-[current=page]:bg-orange-soft aria-[current=page]:text-orange-text"
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={openItem.href}
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-display text-[13px] font-extrabold uppercase tracking-[0.06em] text-orange-text"
          >
            {openItem.label} overview
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      )}
    </nav>
  );
}

function Tab({
  item,
  className,
  fill,
  current,
  expanded,
  panelId,
  onToggle,
}: {
  item: NavItem;
  className: string;
  fill: string;
  current: boolean;
  expanded: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  const label = item.kind === "link" ? item.label : (item.shortLabel ?? item.label);
  const tone = expanded ? "bg-white text-ink" : clsx(fill, "text-black", current && "ring-2 ring-white ring-inset");

  if (item.kind === "link") {
    return (
      <Link href={item.href} aria-current={current ? "page" : undefined} className={clsx(className, tone)}>
        {label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={expanded ? panelId : undefined}
      aria-label={item.label}
      className={clsx(className, tone)}
    >
      {label}
      <ChevronDown size={11} aria-hidden className={clsx("flex-none transition-transform", expanded && "rotate-180")} />
    </button>
  );
}
