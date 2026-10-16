"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, User } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import {
  MAIN_NAV,
  affiliateHref,
  type FeatureCard as FeatureCardData,
  type NavGroup,
  type NavLink,
  type NavMenu,
  isCurrentSection,
} from "@/content/navigation";
import { COUNTRY_LIST } from "@/content/countries";

const topItem =
  "flex h-24 items-center gap-[5px] whitespace-nowrap px-1.5 font-display text-[12.5px] font-bold uppercase tracking-[0.05em] text-ink transition-colors hover:text-orange-text min-[1400px]:px-2.5 min-[1400px]:text-[13.5px]";

const current =
  "text-orange-text after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-orange";

/** Nav with the current section highlighted (needs the pathname, so it may suspend). */
export function ActiveDesktopNav() {
  return <DesktopNav pathname={usePathname()} />;
}

/** S02–S05: labelled dropdown columns with one-line descriptions plus a feature card. */
export function DesktopNav({ pathname }: { pathname: string | null }) {
  const [value, setValue] = useState("");

  return (
    <NavigationMenu.Root
      value={value}
      onValueChange={setValue}
      delayDuration={120}
      aria-label="Main"
      // Static so the viewport positions against the full-width header row.
      className="static"
    >
      <NavigationMenu.List className="flex items-center">
        {MAIN_NAV.map((item) =>
          item.kind === "link" ? (
            <NavigationMenu.Item key={item.label}>
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  aria-current={isCurrentSection(item, pathname) ? "page" : undefined}
                  className={clsx(topItem, "relative", isCurrentSection(item, pathname) && current)}
                >
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={item.label} value={item.label.toLowerCase().replace(/\W+/g, "-")}>
              <NavigationMenu.Trigger
                className={clsx(
                  topItem,
                  "group relative data-[state=open]:bg-orange-soft data-[state=open]:text-orange-deep",
                  isCurrentSection(item, pathname) && current,
                )}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  aria-hidden
                  className="transition-transform group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="flex gap-6 px-[var(--page-gutter)] py-[30px]">
                <MenuPanel menu={item} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>

      {/* Dim the page behind an open dropdown; clicking it closes the menu. */}
      <div
        aria-hidden
        onClick={() => setValue("")}
        className={clsx(
          "absolute inset-x-0 top-full z-10 h-screen bg-black/60 transition-opacity",
          value ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div className="absolute inset-x-0 top-full z-20">
        <NavigationMenu.Viewport className="border-t-[6px] border-orange bg-white shadow-[0_30px_60px_rgba(14,15,18,0.3)]" />
      </div>
    </NavigationMenu.Root>
  );
}

function MenuPanel({ menu }: { menu: NavMenu }) {
  if (menu.kind === "countries") {
    return (
      <>
        <div className="flex-[2]">
          <p className="eyebrow px-3.5 pb-3 text-[12px]">{menu.title}</p>
          <ul className="grid grid-cols-2 gap-x-6">
            {COUNTRY_LIST.map((c) => (
              <li key={c.code}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={affiliateHref(c.code)}
                    className="group flex items-center gap-4 rounded-[6px] px-3.5 py-3.5 hover:bg-orange-soft"
                  >
                    <span
                      aria-hidden
                      className={clsx(
                        "flex size-10 flex-none items-center justify-center rounded-full font-display text-[14px] font-extrabold",
                        c.badge,
                      )}
                    >
                      {c.code}
                    </span>
                    <span>
                      <span className="block font-display text-[17px] font-extrabold leading-tight text-ink">
                        {c.name}
                      </span>
                      <span className="block text-[15px] text-muted">{c.campusSummary}</span>
                    </span>
                  </Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
        <FeatureCard card={menu.feature} />
      </>
    );
  }

  return (
    <>
      {menu.groups.map((g) => (
        <MenuGroup key={g.title} group={g} />
      ))}
      <FeatureCard card={menu.feature} />
    </>
  );
}

function MenuGroup({ group }: { group: NavGroup }) {
  return (
    <div className={group.twoColumn ? "flex-[2.7]" : "flex-1"}>
      <p className="eyebrow px-3.5 pb-3 text-[12px]">{group.title}</p>
      <ul className={clsx(group.twoColumn && "grid grid-cols-2 gap-x-6 gap-y-2")}>
        {group.links.map((l) => (
          <li key={l.label}>
            <MenuLink link={l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuLink({ link }: { link: NavLink }) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={link.href}
        className="group flex items-center gap-3 rounded-[6px] px-3.5 py-[11px] hover:bg-orange-soft focus-visible:bg-orange-soft"
      >
        <span className="flex-1">
          <span className="block font-display text-[16px] font-bold leading-snug text-ink group-hover:font-extrabold group-hover:text-orange-deep group-focus-visible:text-orange-deep">
            {link.label}
          </span>
          {link.description && (
            <span className="mt-[3px] block text-[14px] leading-snug text-muted">{link.description}</span>
          )}
        </span>
        <ArrowRight
          size={18}
          aria-hidden
          className="flex-none text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </Link>
    </NavigationMenu.Link>
  );
}

function FeatureCard({ card }: { card: FeatureCardData }) {
  const dark = card.tone === "dark";
  return (
    <div
      className={clsx(
        "flex w-[330px] flex-none flex-col gap-3 rounded-[8px] p-6",
        dark ? "on-dark bg-charcoal text-white" : "bg-[#F4F2EF] text-ink",
      )}
    >
      {card.image && (
        <Photo asset={card.image} alt="" icon={User} sizes="282px" position="center 30%" className="h-[130px] w-full rounded-[6px]" />
      )}
      <span className="chip chip-orange self-start">{card.chip}</span>
      <p className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em]">{card.title}</p>
      <p className={clsx("leading-normal", dark ? "text-on-dark" : "text-muted")}>{card.text}</p>
      <NavigationMenu.Link asChild>
        <Link href={card.cta.href} className="btn btn-orange btn-sm mt-auto self-start">
          {card.cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}
