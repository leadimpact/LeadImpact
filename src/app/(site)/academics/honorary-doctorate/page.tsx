import type { Metadata } from "next";
import { ArrowRight, Award } from "lucide-react";
import { HONORARY_DOCTORATE } from "@/content/academics";
import { EMAILS, mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";

export const metadata: Metadata = {
  title: "Honorary Doctorate",
  description: HONORARY_DOCTORATE.hero.subtitle,
};

/** S16 */
export default function HonoraryDoctoratePage() {
  const h = HONORARY_DOCTORATE;
  return (
    <>
      <PageHero
        title={h.hero.title}
        subtitle={h.hero.subtitle}
        bannerLabel={h.hero.bannerLabel}
        banner={h.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Academics", href: "/academics/academic-affairs" }, { label: "Honorary Doctorate" }]}
      />
      <section className="px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow="Eligibility" title="Who may be nominated" />
            <CheckList items={h.eligibility} />

            <h2 className="mt-14 font-display text-[30px] font-extrabold tracking-[-0.02em] md:text-[36px]">Nomination process</h2>
            <ol className="mt-4">
              {h.steps.map((step, i) => (
                <li key={step.title} className="mt-6 flex gap-6">
                  <span aria-hidden className="w-6 font-display text-[34px] font-extrabold leading-none text-orange-numeral">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-extrabold">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col gap-5 lg:w-[440px] lg:flex-none">
            <div className="on-dark rounded-[10px] bg-charcoal p-7 text-white">
              <h2 className="eyebrow">Degrees awarded</h2>
              <ul className="mt-2">
                {h.degrees.map((d) => (
                  <li key={d} className="flex min-h-12 items-center gap-3 border-b border-line-dark">
                    <Award size={18} aria-hidden className="text-orange" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-[10px] bg-orange-tint p-6 leading-relaxed">
              <b className="text-orange-deep">Our integrity commitment.</b> {h.integrity}
            </p>
            <a href={mailto(EMAILS.info, "Honorary doctorate nomination")} className="btn btn-orange w-full">
              Nominate someone
              <ArrowRight size={18} aria-hidden />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
