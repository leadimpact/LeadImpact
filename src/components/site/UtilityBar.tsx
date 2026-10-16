"use client";

import Link from "next/link";
import clsx from "clsx";
import { Mail } from "lucide-react";
import { SITE, APP_LINKS } from "@/content/site";
import { UTILITY_LINKS } from "@/content/navigation";
import { CountryPicker } from "./CountryPicker";
import { PhoneTicker } from "./PhoneTicker";
import { SocialLinks } from "./SocialLinks";
import { WhatsAppLink } from "./WhatsAppLink";

const cell =
  "flex h-11 items-center whitespace-nowrap border-l border-line-dark px-3 min-[1600px]:px-4 font-display text-[12.5px] font-bold uppercase tracking-[0.08em] hover:text-white";

/** Desktop black utility bar (S01–S24). */
export function UtilityBar() {
  // Left padding clears the header crest, which overhangs this bar; the name sits beside it.
  return (
    <div className="flex h-11 items-center justify-between bg-black pl-[calc(var(--page-gutter)+150px)] text-[13.5px] text-on-dark">
      <div className="flex h-full items-center gap-[18px]">
        {/* Duplicate of the crest link's accessible name, so hidden from assistive tech and the tab order. */}
        <Link
          href="/"
          tabIndex={-1}
          aria-hidden
          className="whitespace-nowrap border-r border-line-dark pr-[18px] font-display text-[19px] font-extrabold tracking-[-0.01em] text-white"
        >
          LeadImpact <span className="text-orange">University</span>
        </Link>
        <PhoneTicker />
        <a
          href={`mailto:${SITE.email}`}
          className="hidden items-center gap-[7px] whitespace-nowrap hover:text-white min-[1900px]:flex"
        >
          <Mail size={14} aria-hidden />
          {SITE.email}
        </a>
      </div>
      <nav aria-label="Quick links" className="flex h-full items-center">
        {UTILITY_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={clsx(cell, l.href === APP_LINKS.learn && "text-orange hover:text-orange", l.wideOnly && "max-[1359px]:hidden")}
          >
            {l.label}
          </Link>
        ))}
        <WhatsAppLink className={cell}>WhatsApp</WhatsAppLink>
        <SocialLinks
          className="hidden h-11 gap-3 border-l border-line-dark pl-4 pr-5 min-[1600px]:flex"
          linkClassName="size-6"
        />
      </nav>
    </div>
  );
}

/** Thin mobile utility row (SM1/SM2): country picker, login and WhatsApp. */
export function MobileUtilityBar() {
  return (
    <div className="flex h-[38px] items-center justify-between bg-black px-4 font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-on-dark">
      <CountryPicker compact />
      <div className="flex h-full items-center gap-[14px]">
        <Link href={APP_LINKS.studentPortal} className="flex h-full items-center">
          Login
        </Link>
        <WhatsAppLink className="flex h-full items-center text-whatsapp-on-dark">WhatsApp</WhatsAppLink>
      </div>
    </div>
  );
}
