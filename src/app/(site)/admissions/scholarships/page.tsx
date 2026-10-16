import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Star, Target, Users, type LucideIcon } from "lucide-react";
import { SCHOLARSHIPS } from "@/content/admissions";
import { APP_LINKS } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";

export const metadata: Metadata = {
  title: "Full-tuition scholarships",
  description: SCHOLARSHIPS.hero.subtitle,
};

const CRITERIA_ICONS: Record<string, LucideIcon> = { award: Award, users: Users, star: Star, target: Target };

/** S10 */
export default function ScholarshipsPage() {
  const s = SCHOLARSHIPS;
  return (
    <>
      <PageHero
        title={s.hero.title}
        subtitle={s.hero.subtitle}
        bannerLabel={s.hero.bannerLabel}
        banner={s.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: "Scholarships" }]}
        aside={
          <div className="rounded-[10px] bg-orange p-7 text-black md:p-8">
            <p className="font-display text-[64px] font-extrabold leading-none tracking-[-0.03em] md:text-[76px]">100%</p>
            <p className="mt-2 font-display text-[19px] font-extrabold">of tuition, for three years</p>
            <p className="mt-4 text-[16px]">Awarded competitively to admitted students.</p>
          </div>
        }
      />

      <section className="px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow="Who can apply" title="Eligibility" />
            <CheckList items={[...s.eligibility]} />

            <h2 className="mt-14 font-display text-[30px] font-extrabold tracking-[-0.02em] md:text-[36px]">How we choose</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {s.criteria.map((c) => {
                const Icon = CRITERIA_ICONS[c.icon];
                return (
                  <li key={c.title} className="rounded-[8px] bg-[#F4F2EF] px-5 py-6">
                    <Icon size={24} aria-hidden className="text-orange-text" />
                    <p className="mt-3 font-display text-[18px] font-extrabold tracking-[-0.01em]">{c.title}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside aria-labelledby="scholarship-steps" className="rounded-[10px] border-[1.5px] border-line p-7 lg:w-[430px] lg:flex-none">
            <h2 id="scholarship-steps" className="font-display text-[21px] font-extrabold tracking-[-0.01em]">
              How to apply
            </h2>
            <ol className="mt-4">
              {s.steps.map((step, i) => (
                <li key={step.title} className="mt-4 flex items-start gap-4">
                  <span
                    aria-hidden
                    className={
                      i === 0
                        ? "flex size-[38px] flex-none items-center justify-center rounded-full bg-orange font-display font-extrabold text-black"
                        : "flex size-[38px] flex-none items-center justify-center rounded-full bg-orange-soft font-display font-extrabold text-black"
                    }
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold">{step.title}</p>
                    <p className="text-[15px] text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href={APP_LINKS.apply} className="btn btn-orange mt-7 w-full">
              Apply for admission
              <ArrowRight size={18} aria-hidden />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
