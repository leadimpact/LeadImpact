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

/** 05 Affiliate campuses (S01); a swipeable row on phones. The visitor's country gets the orange top bar. */
export function Campuses() {
  const { country } = useCountry();
  return (
    <section className="bg-bg px-page py-10 md:py-[100px]">
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
      <div
        role="region"
        aria-label="Affiliate campuses"
        tabIndex={0}
        className="-mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
      >
        <ul className="flex gap-3 md:grid md:grid-cols-3 md:gap-0 md:border md:border-line md:bg-white lg:grid-cols-5">
          {COUNTRY_LIST.map((c) => (
            <li
              key={c.code}
              className={clsx(
                "w-[78%] flex-none snap-start border border-t-[6px] border-line bg-white md:w-auto md:border-0 md:border-r md:border-t-[6px] md:last:border-r-0",
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
      </div>
      <Link href="/contact#campuses" className="btn btn-dark mt-5 w-full md:hidden">
        All locations
        <ArrowRight size={18} aria-hidden />
      </Link>
    </section>
  );
}
