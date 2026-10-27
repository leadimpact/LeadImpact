import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO, HERO_B, HERO_SLIDES } from "@/content/home";
import { Photo } from "@/components/ui/Photo";

/**
 * S01c (Option B): a light, centred hero with one call to action and a tilted dark strip of the
 * slider photos scrolling slowly underneath. The strip pauses on hover; reduced motion or Lite
 * mode keeps it still (Lite also drops the photos, leaving the words).
 */
export function LightStripHero() {
  // Two copies of the set, so the strip loops seamlessly when it has scrolled one set's width.
  const strip = [...HERO_SLIDES, ...HERO_SLIDES];

  return (
    <section
      aria-label="Welcome to LeadImpact University"
      // Phones: a fixed height filling the first screen under the sticky header (110px) and section tabs (76px).
      className="relative flex h-[max(calc(100svh-186px),520px)] flex-col overflow-hidden bg-bg text-black md:h-[860px]"
    >
      <div className="relative flex flex-1 flex-col items-center justify-center px-page py-5 text-center md:flex-none md:pb-0 md:pt-[70px]">
        <p className="flex items-center gap-3.5 font-display text-[11px] font-extrabold uppercase leading-relaxed tracking-[0.14em] text-balance text-orange-text md:text-[13px] md:tracking-[0.2em]">
          <span aria-hidden className="hidden h-[3px] w-9 bg-orange md:block" />
          {HERO_B.countries.join(" · ")}
          <span aria-hidden className="hidden h-[3px] w-9 bg-orange md:block" />
        </p>

        <h1 className="mt-4 font-display text-[clamp(40px,13vw,112px)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:mt-[26px]">
          <span className="sr-only">LeadImpact University — </span>
          {HERO_B.headline[0]} <br />
          {HERO_B.headline[1]}{" "}
          <span className="text-orange-numeral">{HERO_B.accent}</span>
        </h1>

        <p className="mt-4 max-w-[640px] text-[17px] leading-normal text-muted md:mt-[22px] md:text-[22px]">
          {HERO_B.copy}
        </p>

        <Link
          href={HERO.cta.href}
          className="mt-5 flex h-[60px] w-full items-center justify-center gap-3.5 bg-orange px-4 font-display text-[15px] font-extrabold uppercase tracking-[0.04em] text-black hover:bg-orange-hover md:mt-[30px] md:inline-flex md:h-[68px] md:w-auto md:px-10 md:text-[19px] md:tracking-[0.08em]"
        >
          {HERO.cta.label}
          <ArrowRight size={22} aria-hidden />
        </Link>
        <p className="mt-2.5 text-[13.5px] text-muted md:mt-3.5 md:text-[15px]">
          {HERO.reassuranceShort}
        </p>
      </div>

      {/* The tilted strip: wider than the screen so its rotated ends never show. */}
      <div
        aria-hidden
        className="relative -mx-12 mb-6 -rotate-3 md:mt-auto border-t-4 border-orange bg-black py-3.5 md:mb-[30px] md:border-t-[6px] md:py-[22px]"
      >
        <div
          className="hero-strip flex w-max"
          style={{ animationDuration: `${HERO_B.stripSeconds}s` }}
        >
          {strip.map((s, i) => (
            <Fragment key={i}>
              <div className="relative h-[120px] w-[170px] flex-none md:h-[230px] md:w-[330px]">
                <Photo
                  asset={s.image}
                  alt=""
                  sizes="(min-width: 768px) 330px, 170px"
                  priority={i < HERO_SLIDES.length}
                  icon={null}
                  className="lite-hide hero-strip-photo size-full"
                />
                <span className="absolute bottom-0 left-0 bg-black px-2.5 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-white md:px-3.5 md:py-[9px] md:text-[13px]">
                  {s.word}
                </span>
              </div>
              <span className="flex-none self-center px-3 font-display text-[22px] font-extrabold text-orange md:px-[22px] md:text-[30px]">
                ✦
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
