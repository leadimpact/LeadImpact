"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Quote, User } from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";
import { COUNTRIES } from "@/content/countries";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

/** 08 Testimonial carousel (S01); photo on top on phones. Manual only — no autoplay. All entries are placeholders. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Graduate testimonials"
      className="bg-bg px-page py-10 md:py-[100px]"
    >
      <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-20">
        <div className="xl:w-[380px] xl:flex-none">
          <SectionHeader number="08" eyebrow="Satisfied learners" title="Leaders who took the lead" className="mb-5 md:mb-8" />
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-14 items-center justify-center border-2 border-black hover:bg-white"
            >
              <ArrowLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-14 items-center justify-center border-2 border-orange bg-orange text-black hover:bg-orange-hover"
            >
              <ArrowRight size={20} aria-hidden />
            </button>
            <p className="ml-[18px] font-display font-extrabold tracking-[0.1em]" aria-live="polite">
              <span className="text-orange-text">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </p>
          </div>
        </div>

        <figure className="flex flex-1 flex-col border-t-8 border-orange bg-white lg:flex-row lg:items-stretch lg:border-l-8 lg:border-t-0">
          <Photo asset={t.photo} alt="" icon={User} sizes="(min-width: 1024px) 280px, 100vw" className="h-[260px] w-full flex-none lg:h-auto lg:min-h-[360px] lg:w-[280px]" />
          <div className="flex-1 p-6 md:p-11">
            <Quote size={34} aria-hidden className="text-orange" />
            <blockquote className="mt-3.5 font-display text-[19px] font-semibold leading-normal md:text-[22px] xl:text-[24px]">
              <Tbc>{t.quote}</Tbc>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-3">
              <span
                aria-hidden
                className={clsx(
                  "flex size-7 items-center justify-center rounded-full font-display text-[10px] font-extrabold",
                  COUNTRIES[t.country].badge,
                )}
              >
                {t.country}
              </span>
              <b className="font-display font-extrabold uppercase tracking-[0.06em]">
                <Tbc>{t.name}</Tbc>
              </b>
              <span className="text-muted">· {t.program}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
