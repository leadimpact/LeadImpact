import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { PRESIDENT } from "@/content/people";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";

/** 06 From the President's desk — black band (S01); warm card on phones (SM1). */
export function PresidentBand() {
  const { quote } = PRESIDENT;
  return (
    <>
      <section className="on-dark hidden bg-black text-white md:flex">
        <div className="relative w-[38%] max-w-[560px] flex-none">
          <Photo asset={PRESIDENT.photo} sizes="38vw" position="top" icon={User} className="h-full min-h-[640px]" />
          <div aria-hidden className="absolute -right-1.5 top-20 h-[180px] w-3 bg-orange" />
        </div>
        <div className="flex-1 px-10 py-[100px] xl:px-20">
          <SectionHeader number="06" eyebrow="From the President’s desk" tone="dark" className="md:mb-4" />
          <blockquote>
            <p className="font-display text-[34px] font-extrabold uppercase leading-[1.15] tracking-[-0.02em] xl:text-[44px]">
              “{quote.before}
              <span className="text-orange">{quote.highlight}</span>
              {quote.after}”
            </p>
          </blockquote>
          <p className="mt-6 max-w-[640px] text-[19px] leading-relaxed text-on-dark">{PRESIDENT.summary}</p>
          <div className="mt-[30px] flex items-center gap-4">
            <div aria-hidden className="h-14 w-1.5 bg-orange" />
            <div>
              <p className="font-display text-[19px] font-extrabold uppercase tracking-[0.04em]">{PRESIDENT.name}</p>
              <p className="text-[#B9B6B1]">{PRESIDENT.role}</p>
            </div>
          </div>
          <Link href="/about/president" className="btn btn-orange mt-[30px]">
            Read the full message
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="bg-[#F4F2EF] px-5 py-10 md:hidden" aria-labelledby="president-mobile">
        <p id="president-mobile" className="eyebrow text-[12px]">
          From the President
        </p>
        <Photo asset={PRESIDENT.photo} sizes="100vw" position="top" icon={User} className="mt-4 h-[300px] rounded-[8px]" />
        <blockquote className="mt-[18px] font-display text-[26px] font-extrabold leading-[1.3] tracking-[-0.02em] text-black">
          “{PRESIDENT.shortQuote}”
        </blockquote>
        <p className="mt-3 font-bold">{PRESIDENT.name}</p>
        <p className="text-muted">{PRESIDENT.shortRole}</p>
        <Link href="/about/president" className="mt-2 inline-flex min-h-12 items-center gap-2 font-display font-bold text-orange-text">
          Read the full message
          <ArrowRight size={18} aria-hidden />
        </Link>
      </section>
    </>
  );
}
