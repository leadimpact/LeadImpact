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
const tab =
  "flex min-h-11 w-full flex-col items-center justify-center rounded-[4px] px-0.5 text-center font-display text-[11px] font-extrabold uppercase leading-none tracking-[0.01em] max-[379px]:text-[10px] max-[339px]:text-[9px]";

/** Reads the current path (needs Suspense under Cache Components); SiteHeader wraps it. */
export function ActiveMobileSectionTabs() {
  const pathname = usePathname();
  // Remount per page, so an open panel closes after navigating.
  return <MobileSectionTabs key={pathname} pathname={pathname} />;
}

/**
 * Phones: the desktop menu as orange tabs, two rows of four, on the dark band under the header.
 * Home and Contact are links; the others open a panel of that section's pages, like the
 * desktop dropdowns. Replaces the old full-screen menu.
 */
export function MobileSectionTabs({ pathname }: { pathname: string | null }) {
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

  return (
    <nav aria-label="Sections" className="bg-black px-3 pb-3 pt-2.5 nav:hidden">
      <ul className="grid grid-cols-4 gap-1.5">
        {MAIN_NAV.map((item) => (
          <li key={item.label}>
            <Tab
              item={item}
              current={isCurrentSection(item, pathname)}
              expanded={open === item.label}
              panelId={panelId}
              onToggle={() => setOpen((o) => (o === item.label ? null : item.label))}
            />
          </li>
        ))}
      </ul>

      {openItem && openItem.kind !== "link" && (
        <div id={panelId} className="mt-2 rounded-[6px] bg-white p-3 text-ink">
          <ul className="grid grid-cols-2 gap-1.5">
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
  current,
  expanded,
  panelId,
  onToggle,
}: {
  item: NavItem;
  current: boolean;
  expanded: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  const label = item.kind === "link" ? item.label : (item.shortLabel ?? item.label);
  const tone = expanded ? "bg-white text-ink" : current ? "bg-orange text-black ring-2 ring-white ring-inset" : "bg-orange text-black";

  if (item.kind === "link") {
    return (
      <Link href={item.href} aria-current={current ? "page" : undefined} className={clsx(tab, tone)}>
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
      className={clsx(tab, tone)}
    >
      {label}
      <ChevronDown size={13} aria-hidden className={clsx("mt-0.5 flex-none transition-transform", expanded && "rotate-180")} />
    </button>
  );
}
