"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { HERO, HeroSlide } from "@/content/home";
import { useLiteMode } from "@/lib/lite-mode";

export interface HeroSlideView extends HeroSlide {
  /** CSS image-set() of the slide photo; undefined when photos are off (plain white word). */
  imageSet: string | undefined;
}

interface Props {
  slides: HeroSlideView[];
  hero: typeof HERO;
}

/**
 * S01 / SM1 "word window": one giant word with the slide photo showing through the letters.
 * Word and photo change together every 7s with a mask-wipe; hover or focus pauses; the
 * navigator jumps; swipe on touch. Reduced motion or Lite mode → static LEAD slide.
 */
export function WordWindowHero({ slides, hero }: Props) {
  const [index, setIndex] = useState(0);
  const [changed, setChanged] = useState(false);
  const [paused, setPaused] = useState(false);
  // Off until mounted: the server render and reduced-motion/Lite visitors get a static slide.
  const [autoplay, setAutoplay] = useState(false);
  const lite = useLiteMode();
  const touchX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!mq.matches && !lite);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [lite]);

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    setChanged(true);
  };

  // Phones have no navigator bar (whose animation drives desktop autoplay), so a timer advances them.
  useEffect(() => {
    if (!autoplay || paused || window.matchMedia("(min-width: 768px)").matches) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setChanged(true);
    }, hero.slideSeconds * 1000);
    return () => clearTimeout(id);
  }, [autoplay, paused, index, slides.length, hero.slideSeconds]);

  const slide = slides[index];
  // Every slide's word gets the box of the largest one (LEAD), so nothing below it moves between slides.
  const maxSize = Math.max(...slides.map((s) => s.maxSize));
  const minWidthEm = Math.min(...slides.map((s) => s.widthEm));

  return (
    <section
      ref={sectionRef}
      aria-label="Welcome to LeadImpact University"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!sectionRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
      // Phones: a fixed height filling the first screen under the sticky header (110px) and section tabs (88px).
      className="relative flex h-[max(calc(100svh-198px),440px)] flex-col justify-center overflow-hidden bg-black px-5 py-6 text-center text-white md:h-[820px] md:justify-start md:px-0 md:pb-[30px] md:pt-0"
    >
      {/* Faint, darkened copy of the slide photo behind everything */}
      <div
        key={`bg-${index}`}
        aria-hidden
        className="lite-hide absolute inset-0 bg-cover bg-center opacity-[0.16] grayscale-[0.3]"
        style={{ backgroundImage: slide.imageSet, animation: changed ? "fade-in .8s ease-out" : undefined }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(14,15,18,.2) 0%, rgba(14,15,18,.85) 70%, #0E0F12 100%)",
        }}
      />

      <div className="relative flex flex-col items-center justify-center md:flex-1 md:px-[var(--page-gutter)]">
        <p className="flex items-center gap-2 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] text-on-dark md:gap-2.5 md:border md:border-[#34363C] md:px-[18px] md:py-[9px] md:text-[13px]">
          <span aria-hidden className="size-[7px] bg-orange md:size-2" />
          <span className="md:hidden">{hero.intakeShort}</span>
          <span className="hidden md:inline">{hero.intake}</span>
        </p>

        <p
          key={`cap-${index}`}
          className="mt-[30px] font-display text-[13px] font-extrabold uppercase tracking-[0.24em] text-orange md:mt-10 md:text-[22px] md:tracking-[0.32em]"
          style={{ animation: changed ? "fade-in .6s ease-out" : undefined }}
        >
          {slide.caption}
        </p>

        <h1
          className="mt-1.5 flex w-full items-center justify-center font-display font-extrabold uppercase"
          style={{ height: `calc(min(${maxSize}px, (100vw - 2 * var(--page-gutter)) / ${minWidthEm}) * 0.9)` }}
        >
          <span className="sr-only">LeadImpact University — </span>
          <span
            key={`word-${index}`}
            className="inline-flex items-baseline whitespace-nowrap leading-[0.86] tracking-[-0.045em]"
            style={{
              fontSize: `min(${slide.maxSize}px, calc((100vw - 2 * var(--page-gutter)) / ${slide.widthEm}))`,
              animation: changed ? "wipe-in .7s cubic-bezier(.2,.7,.2,1)" : undefined,
            }}
          >
            {/* Photo fills only the word's own box; the live photos carry a dark overlay, so lift it. */}
            <span
              data-testid="hero-word"
              className="hero-word"
              style={slide.imageSet ? { backgroundImage: slide.imageSet } : { color: "var(--color-white)", filter: "none" }}
            >
              {slide.word}
            </span>
            <span className="text-orange">.</span>
          </span>
        </h1>

        <p className="mt-4 text-[18px] leading-normal text-[#EDEAE6] md:mt-[22px] md:max-w-[740px] md:text-[24px] md:leading-[1.45]">
          <span className="md:hidden">{hero.copy}</span>
          <span className="hidden md:inline">
            {hero.copyLines[0]}
            <br />
            {hero.copyLines[1]}
          </span>
        </p>

        <Link
          href={hero.cta.href}
          className="mt-6 flex h-[60px] w-full items-center justify-center gap-3.5 bg-orange px-4 font-display text-[15px] font-extrabold uppercase tracking-[0.04em] text-black hover:bg-orange-hover md:mt-[34px] md:inline-flex md:h-[68px] md:w-auto md:px-10 md:text-[19px] md:tracking-[0.08em]"
        >
          {hero.cta.label}
          <ArrowRight size={22} aria-hidden />
        </Link>
        <p className="mt-2.5 text-[13.5px] text-on-dark-muted md:mt-3.5 md:text-[15px]">
          <span className="md:hidden">{hero.reassuranceShort}</span>
          <span className="hidden md:inline">{hero.reassurance}</span>
        </p>
      </div>

      {/* Navigator: 01 LEAD · 02 TRANSFORM · 03 IMPACT — desktop only; phones swipe (and autoplay) */}
      <div className="relative hidden gap-7 px-[var(--page-gutter)] md:flex" role="group" aria-label="Choose a slide">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.word}
              type="button"
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1} of ${slides.length}: ${s.word} — ${s.caption}`}
              aria-current={active ? "true" : undefined}
              className="group relative min-h-12 flex-1 border-t-[3px] border-[#34363C] pt-2 text-left md:border-t-2 md:border-line-dark md:pt-[22px] md:text-center"
            >
              <span
                aria-hidden
                className="absolute -top-[3px] left-0 h-[3px] bg-orange md:-top-[2px] md:h-1"
                style={
                  active && autoplay
                    ? {
                        animation: `progress ${hero.slideSeconds}s linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }
                    : { width: active ? "100%" : 0 }
                }
                onAnimationEnd={() => go(index + 1)}
              />
              <span
                className={clsx(
                  "hidden font-display text-[14px] font-extrabold tracking-[0.14em] md:inline",
                  active ? "text-orange" : "text-on-dark-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={clsx(
                  "font-display text-[11px] font-extrabold uppercase tracking-[0.12em] md:ml-3 md:text-[15px]",
                  active ? "text-white" : "text-on-dark-muted",
                )}
              >
                {s.word}
              </span>
              <span className="ml-2.5 hidden text-[14.5px] text-on-dark-muted xl:inline">{s.caption}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
