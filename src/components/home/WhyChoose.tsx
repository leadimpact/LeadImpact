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

/** 09 Why choose LIU (S01); an icon list on phones. */
export function WhyChoose() {
  return (
    <section className="bg-white px-page py-10 md:py-[100px]">
      <SectionHeader number="09" eyebrow="Why choose LIU" title="A wealth of experience. A reputation for excellence." />
      <ul className="border-t-2 border-black md:grid md:grid-cols-3 xl:grid-cols-5">
        {WHY_CHOOSE.map((w) => {
          const Icon = ICONS[w.icon];
          return (
            <li key={w.title} className="flex gap-4 border-b border-line py-4 md:block md:border-0 md:pb-2.5 md:pr-[26px] md:pt-[30px]">
              <Icon size={30} aria-hidden className="mt-0.5 flex-none text-orange-text" />
              <div>
                <h3 className="font-display text-[16px] font-extrabold uppercase tracking-[0.04em] md:mt-[18px] md:text-[18px]">{w.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted md:mt-2 md:text-[15.5px]">{w.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** 10 Certified programs (S01); certificate photo on top on phones. */
export function Certified() {
  return (
    <section className="on-dark flex flex-col-reverse bg-charcoal text-white md:flex-row md:items-center">
      <div className="flex-1 px-page py-10 md:py-[90px]">
        <SectionHeader number="10" eyebrow={CERTIFIED.eyebrow} title={CERTIFIED.title} tone="dark" className="md:mb-6" />
        <p className="max-w-[600px] text-[17px] leading-relaxed text-on-dark md:text-[19px]">{CERTIFIED.text}</p>
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
      <div className="relative aspect-[620/540] w-full md:hidden lg:block lg:w-[43%] lg:max-w-[620px] lg:flex-none">
        <Photo asset={CERTIFIED.image} sizes="(min-width: 1024px) 43vw, 100vw" className="size-full" />
      </div>
    </section>
  );
}
