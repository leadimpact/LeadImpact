import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { COLLEGES, collegeHref, collegePrograms } from "@/content/colleges";
import { COLLEGE_ICONS } from "@/components/programs/collegeIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";


/** 03 Seven colleges — numbered list on charcoal (S01); icon list on phones (SM1). */
export function Colleges() {
  return (
    <section className="on-dark bg-charcoal px-page py-10 text-white md:py-[100px]">
      <SectionHeader
        number="03"
        eyebrow="Academics"
        tone="dark"
        title={
          <>
            <span className="md:hidden">Seven colleges</span>
            <span className="hidden md:inline">Seven colleges. One calling.</span>
          </>
        }
        action={
          <Link href="/programs" className="btn btn-outline-light">
            All programs
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />

      {/* Desktop / tablet: numbered two-column list */}
      <ul className="hidden border-t border-[#34363C] md:grid md:grid-cols-2 md:gap-x-16">
        {COLLEGES.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={collegeHref(c.slug)}
              className="group flex h-full items-center gap-6 border-b border-[#34363C] py-[26px] hover:shadow-[inset_0_-3px_0_var(--color-orange)]"
            >
              <span className="w-10 font-display text-[22px] font-extrabold tracking-[-0.02em] text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block font-display text-[21px] font-extrabold tracking-[-0.01em]">{c.name}</span>
                <span className="mt-1 block text-[15px] text-[#B9B6B1]">{collegePrograms(c)}</span>
              </span>
              <ArrowRight size={20} aria-hidden className="text-on-dark-muted group-hover:text-orange" />
            </Link>
          </li>
        ))}
        <li>
          <WhatsAppLink
            pageName="Home › Which college fits me?"
            className="flex h-full items-center gap-6 bg-orange px-7 py-[26px] text-black hover:bg-orange-hover"
          >
            <span className="flex-1">
              <span className="block font-display text-[19px] font-extrabold uppercase tracking-[0.04em]">
                Not sure which fits your calling?
              </span>
              <span className="mt-1 block text-[15px]">Talk to an admissions adviser by phone or WhatsApp.</span>
            </span>
            <MessageCircle size={24} aria-hidden />
          </WhatsAppLink>
        </li>
      </ul>

      {/* Phones: first five with icons, then "See all 7" */}
      <ul className="md:hidden">
        {COLLEGES.slice(0, 5).map((c) => {
          const Icon = COLLEGE_ICONS[c.slug];
          return (
            <li key={c.slug}>
              <Link href={collegeHref(c.slug)} className="flex items-center gap-3.5 border-b border-white/[0.12] py-4">
                <span aria-hidden className="flex size-[42px] flex-none items-center justify-center rounded-[6px] bg-orange text-black">
                  <Icon size={20} />
                </span>
                <span className="flex-1 font-display text-[16px] font-extrabold leading-[1.3] tracking-[-0.01em]">{c.name}</span>
                <ChevronRight size={20} aria-hidden className="text-orange" />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/programs" className="mt-4 inline-flex min-h-12 items-center gap-2 font-display font-bold text-orange md:hidden">
        See all 7 colleges
        <ArrowRight size={18} aria-hidden />
      </Link>
    </section>
  );
}
