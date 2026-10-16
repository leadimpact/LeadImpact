"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Quote, User } from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";
import { COUNTRIES } from "@/content/countries";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

/** 08 Testimonial carousel (S01). Manual only — no autoplay. All entries are placeholders. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Graduate testimonials"
      className="hidden bg-bg px-page py-[100px] md:block"
    >
      <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-20">
        <div className="xl:w-[380px] xl:flex-none">
          <SectionHeader number="08" eyebrow="Satisfied learners" title="Leaders who took the lead" className="md:mb-8" />
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

        <figure className="flex flex-1 items-stretch border-l-8 border-orange bg-white">
          <Photo asset={t.photo} alt="" icon={User} sizes="280px" className="hidden w-[280px] min-h-[360px] flex-none lg:flex" />
          <div className="flex-1 p-11">
            <Quote size={34} aria-hidden className="text-orange" />
            <blockquote className="mt-3.5 font-display text-[22px] font-semibold leading-normal xl:text-[24px]">
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
