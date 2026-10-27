"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { APP_LINKS } from "@/content/site";
import { Logo } from "./Logo";
import { MobileUtilityBar } from "./UtilityBar";

/**
 * Mobile header (SM1): the crest spans the top bar and the header row (overhanging upwards),
 * with Apply and Sign in (applicants and students) always visible. Navigation is the section tabs on the
 * home page, and a Back arrow on the header's edge everywhere else (MobileSectionTabs), so there is no menu button.
 */
export function MobileHeader() {
  return (
    <div className="relative">
      <MobileUtilityBar />
      <div className="flex h-[72px] items-center justify-between border-b border-line bg-white pl-4">
        <Logo
          size="xs"
          className="pl-[92px] max-[379px]:pl-[86px]"
          crestClassName="absolute bottom-[6px] left-3 z-10 h-[100px] drop-shadow-[0_8px_12px_rgba(14,15,18,0.35)]"
          crestSizes="88px"
          priority
        />
        <div className="flex h-full">
          <Link
            href={APP_LINKS.apply}
            className="flex h-full items-center bg-orange px-4 font-display text-[13.5px] max-[379px]:px-3 max-[379px]:text-[12.5px] max-[339px]:px-2.5 max-[339px]:text-[12px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-orange-hover"
          >
            Apply
          </Link>
          <Link
            href={APP_LINKS.signIn}
            aria-label="Sign in — applicants and students"
            className="flex w-[72px] flex-col items-center justify-center gap-[3px] bg-charcoal max-[379px]:w-[60px] max-[339px]:w-[52px] font-display text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white"
          >
            <User size={22} aria-hidden />
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
