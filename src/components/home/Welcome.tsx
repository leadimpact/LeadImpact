import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOBILE_STATS, PILLARS, STATS, WELCOME } from "@/content/home";
import { COUNTRY_COUNT } from "@/content/countries";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tbc } from "@/components/ui/Tbc";
import { Crest } from "@/components/site/Crest";

/** 01 Welcome (S01) — mobile variant with stat cards (SM1). */
export function Welcome() {
  return (
    <section className="bg-white px-page py-10 md:py-[100px]">
      <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-20">
        {/* Visual: orange block, centre image and "N countries" badge */}
        <div className="relative hidden aspect-[600/560] w-full max-w-[600px] flex-none md:block">
          <div aria-hidden className="absolute left-0 top-0 size-1/2 bg-orange" />
          {/* 540×500 box offset 40px into the 600×560 frame, kept proportional */}
          <div className="placeholder absolute left-[6.67%] top-[7.14%] h-[89.3%] w-[90%]">
            <Crest className="h-[62%] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]" />
          </div>
          <div className="absolute bottom-0 right-0 border-l-[6px] border-orange bg-black px-[30px] py-[26px] text-white">
            <p className="font-display text-[52px] font-extrabold leading-none tracking-[-0.02em]">{COUNTRY_COUNT}</p>
            <p className="mt-1 font-display text-[13px] font-extrabold uppercase tracking-[0.12em]">
              Countries · One university
            </p>
          </div>
        </div>

        <div className="flex-1">
          <SectionHeader number="01" eyebrow={WELCOME.eyebrow} mobileEyebrow={WELCOME.mobileEyebrow} title={WELCOME.title} className="md:mb-6" />
          <p className="text-[17px] leading-relaxed text-muted md:hidden">{WELCOME.mobileText}</p>
          <p className="hidden text-[19px] leading-relaxed text-muted md:block">{WELCOME.text}</p>

          <dl className="mt-[34px] hidden grid-cols-3 border-t-2 border-black md:grid">
            {PILLARS.map((p) => (
              <div key={p.title} className="pr-[18px] pt-[22px]">
                <dt className="font-display text-[15px] font-extrabold uppercase tracking-[0.1em]">{p.title}</dt>
                <dd className="mt-1.5 text-[15.5px] leading-snug text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 hidden flex-wrap items-center gap-[18px] md:flex">
            <Link href="/about" className="btn btn-dark">
              About LeadImpact
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/about#statement-of-faith"
              className="inline-flex min-h-12 items-center gap-2 font-display font-bold text-orange-text hover:underline"
            >
              Statement of faith
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>

          {/* Phones: stat cards */}
          <dl className="mt-5 grid grid-cols-2 gap-3 md:hidden">
            {MOBILE_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-[8px] bg-[#F4F2EF] p-4">
                <dt className="text-[14px] text-muted">{s.label}</dt>
                <dd className="font-display text-[32px] font-extrabold tracking-[-0.02em] text-orange-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Stats bar on black (S01). Alumni and instructor counts are placeholders. */
export function StatsBar() {
  return (
    <section aria-label="LIU in numbers" className="hidden bg-black px-page md:block">
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse border-l border-line-dark px-8 py-11">
            <dt className="mt-3 font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-orange">{s.label}</dt>
            <dd className="font-display text-[60px] font-extrabold leading-none tracking-[-0.02em] text-white">
              {s.tbc ? <Tbc>{s.value}</Tbc> : s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
