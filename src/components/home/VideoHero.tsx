"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Pause, Play } from "lucide-react";
import { HERO, HERO_VIDEO_COPY, HOME_TABS } from "@/content/home";
import { MobileSectionTabs } from "@/components/site/MobileSectionTabs";
import { useLiteMode } from "@/lib/lite-mode";

export interface VideoSources {
  /** Phones get a 9:16 crop; the rest the full frame. */
  phone: { webm: string; mp4: string; poster: string };
  wide: { webm: string; mp4: string; poster: string };
}

/**
 * Full-bleed video hero (as on risd.edu / jhu.edu): a silent montage from LIU's YouTube channel
 * behind a dark gradient, with the headline and one call to action at the bottom. The video only
 * loads after mounting, and never with reduced motion or Lite mode (they keep the still poster).
 * A pause button is always available while it plays (WCAG 2.2.2). On phones the section tabs can
 * sit over the video instead of under the header (HOME_TABS).
 */
export function VideoHero({ sources }: { sources: VideoSources | undefined }) {
  const lite = useLiteMode();
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!mq.matches && !lite);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [lite]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const showVideo = sources && allowed;
  const tabsOnVideo = HOME_TABS !== "bar";

  return (
    <section
      aria-label="Welcome to LeadImpact University"
      // Phones: a fixed height filling the first screen under the sticky header (110px), and the
      // section tabs (76px) unless they sit on the video.
      className={clsx(
        "relative flex flex-col justify-end overflow-hidden bg-black text-white md:h-[820px]",
        tabsOnVideo ? "h-[max(calc(100svh-110px),600px)]" : "h-[max(calc(100svh-186px),480px)]",
      )}
    >
      {sources && (
        <picture className="lite-hide absolute inset-0">
          <source media="(min-width: 768px)" srcSet={sources.wide.poster} />
          <img src={sources.phone.poster} alt="" className="size-full object-cover" fetchPriority="high" />
        </picture>
      )}
      {showVideo && (
        <video
          ref={videoRef}
          data-testid="hero-video"
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={sources.phone.poster}
          aria-hidden
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source media="(min-width: 768px)" src={sources.wide.webm} type="video/webm" />
          <source media="(min-width: 768px)" src={sources.wide.mp4} type="video/mp4" />
          <source src={sources.phone.webm} type="video/webm" />
          <source src={sources.phone.mp4} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,15,18,.95) 0%, rgba(14,15,18,.75) 38%, rgba(14,15,18,.2) 70%, rgba(14,15,18,.35) 100%)",
        }}
      />

      {showVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute bottom-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75 md:bottom-6 md:right-[var(--page-gutter)]"
        >
          {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
      )}

      {tabsOnVideo && (
        <div data-hero-tabs className="nav:hidden">
          <MobileSectionTabs pathname="/" layout={HOME_TABS} />
        </div>
      )}

      <div className="relative px-page pb-6 md:pb-16">
        <p className="flex items-center gap-2 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] text-on-dark md:text-[13px]">
          <span aria-hidden className="size-[7px] bg-orange md:size-2" />
          <span className="md:hidden">{HERO.intakeShort}</span>
          <span className="hidden md:inline">{HERO.intake}</span>
        </p>
        <h1 className="mt-3 max-w-[11ch] font-display text-[clamp(44px,13vw,120px)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] md:mt-5">
          <span className="sr-only">LeadImpact University — </span>
          {HERO_VIDEO_COPY.headline}
        </h1>
        <p className="mt-3 max-w-[560px] text-[18px] leading-normal text-[#EDEAE6] md:mt-5 md:text-[22px]">{HERO_VIDEO_COPY.copy}</p>
        <Link
          href={HERO.cta.href}
          className="mt-5 flex h-[60px] w-full items-center justify-center gap-3.5 bg-orange px-4 font-display text-[15px] font-extrabold uppercase tracking-[0.04em] text-black hover:bg-orange-hover md:mt-8 md:inline-flex md:h-[68px] md:w-auto md:px-10 md:text-[19px] md:tracking-[0.08em]"
        >
          {HERO.cta.label}
          <ArrowRight size={22} aria-hidden />
        </Link>
        <p className="mt-2.5 text-center text-[13.5px] text-on-dark md:mt-3.5 md:text-left md:text-[15px]">
          {HERO.reassuranceShort}
        </p>
      </div>
    </section>
  );
}
