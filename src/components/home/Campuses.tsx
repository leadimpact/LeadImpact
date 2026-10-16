"use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { COUNTRY_LIST } from "@/content/countries";
import { COUNTRY_PHOTOS } from "@/content/affiliates";
import { affiliateHref } from "@/content/navigation";
import { useCountry } from "@/lib/country";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";

/** 05 Affiliate campuses (S01). The visitor's selected country gets the orange top bar. */
export function Campuses() {
  const { country } = useCountry();
  return (
    <section className="hidden bg-bg px-page py-[100px] md:block">
      <SectionHeader
        number="05"
        eyebrow="Our affiliate campuses"
        title="Online — or on a campus near you"
        action={
          <Link href="/contact#campuses" className="btn btn-dark">
            All locations
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />
      <ul className="grid grid-cols-3 border border-line bg-white lg:grid-cols-5">
        {COUNTRY_LIST.map((c) => (
          <li
            key={c.code}
            className={clsx(
              "border-r border-line border-t-[6px] last:border-r-0",
              c.code === country.code ? "border-t-orange" : "border-t-black",
            )}
          >
            <Photo asset={COUNTRY_PHOTOS[c.code]} alt="" sizes="(min-width: 1024px) 20vw, 33vw" className="h-40" />
            <div className="p-[22px]">
              <h3 className="flex items-center gap-2.5 font-display text-[17px] font-extrabold uppercase tracking-[0.04em]">
                <span
                  aria-hidden
                  className={clsx("flex size-8 flex-none items-center justify-center rounded-full text-[11px]", c.badge)}
                >
                  {c.code}
                </span>
                {c.name}
              </h3>
              <p className="mt-2.5 text-[15px] leading-normal text-muted">{c.campusDetail}</p>
              <Link
                href={affiliateHref(c.code)}
                aria-label={`${c.name} campus page`}
                className="mt-3 inline-flex min-h-10 items-center gap-2 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-orange-text hover:underline"
              >
                Campus page
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
