import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { ArrowRight, Award, CalendarClock, GraduationCap, Globe, Wallet, type LucideIcon } from "lucide-react";
import { CERTIFIED, WHY_CHOOSE, type WhyIcon } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS: Record<WhyIcon, LucideIcon> = {
  cost: Wallet,
  faculty: GraduationCap,
  schedule: CalendarClock,
  anywhere: Globe,
  scholarship: Award,
};

/** 09 Why choose LIU (S01). */
export function WhyChoose() {
  return (
    <section className="hidden bg-white px-page py-[100px] md:block">
      <SectionHeader number="09" eyebrow="Why choose LIU" title="A wealth of experience. A reputation for excellence." />
      <ul className="grid grid-cols-3 border-t-2 border-black xl:grid-cols-5">
        {WHY_CHOOSE.map((w) => {
          const Icon = ICONS[w.icon];
          return (
            <li key={w.title} className="pb-2.5 pr-[26px] pt-[30px]">
              <Icon size={30} aria-hidden className="text-orange-text" />
              <h3 className="mt-[18px] font-display text-[18px] font-extrabold uppercase tracking-[0.04em]">{w.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{w.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** 10 Certified programs (S01). */
export function Certified() {
  return (
    <section className="on-dark hidden bg-charcoal text-white md:flex md:items-center">
      <div className="flex-1 px-page py-[90px]">
        <SectionHeader number="10" eyebrow={CERTIFIED.eyebrow} title={CERTIFIED.title} tone="dark" className="md:mb-6" />
        <p className="max-w-[600px] text-[19px] leading-relaxed text-on-dark">{CERTIFIED.text}</p>
        <div className="mt-[30px] flex flex-wrap gap-3">
          <Link href="/academics/academic-affairs#accreditation" className="btn btn-orange">
            See accreditation
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/academics/academic-affairs#credit-transfer" className="btn btn-outline-light">
            Credit transfer
          </Link>
        </div>
      </div>
      <div className="relative hidden aspect-[620/540] w-[43%] max-w-[620px] flex-none lg:block">
        <Photo asset={CERTIFIED.image} sizes="43vw" className="size-full" />
      </div>
    </section>
  );
}
