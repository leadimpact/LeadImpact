"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface AnchorTab {
  label: string;
  /** "#section-id" for an on-page section, or a path for another page. */
  href: string;
}

/**
 * Sticky in-page tabs (S06). The tab for the section in view is underlined in orange;
 * links to other pages sit at the end.
 */
export function AnchorTabs({
  tabs,
  label,
  hideOnMobile,
}: {
  tabs: AnchorTab[];
  label: string;
  /** Some mobile designs (SM4) have no tab bar. */
  hideOnMobile?: boolean;
}) {
  const [active, setActive] = useState(tabs[0]?.href);

  useEffect(() => {
    const ids = tabs.filter((t) => t.href.startsWith("#")).map((t) => t.href.slice(1));
    let frame = 0;
    // The current section is the last one whose top has scrolled past the sticky bars.
    const update = () => {
      frame = 0;
      let current = `#${ids[0]}`;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = `#${id}`;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [tabs]);

  return (
    <nav
      aria-label={label}
      className={clsx(
        "sticky top-[72px] z-20 overflow-x-auto border-b-[1.5px] border-line bg-white px-page nav:top-0",
        hideOnMobile && "hidden md:block",
      )}
    >
      <ul className="flex gap-7 whitespace-nowrap md:gap-9">
        {tabs.map((t) => {
          const on = t.href === active;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={on ? "location" : undefined}
                onClick={() => t.href.startsWith("#") && setActive(t.href)}
                className={clsx(
                  "flex min-h-[60px] items-center font-display text-[15px] font-bold md:text-[16px]",
                  on ? "font-extrabold text-orange-text shadow-[inset_0_-4px_0_var(--color-orange)]" : "text-muted hover:text-ink",
                )}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
