import type { Metadata } from "next";
import { Check } from "lucide-react";
import { TUITION_PAGE } from "@/content/admissions";
import { TUITION } from "@/content/colleges";
import { formatUsd } from "@/lib/currency";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { Tbc } from "@/components/ui/Tbc";
import { CurrencyTable } from "./CurrencyTable";

export const metadata: Metadata = {
  title: "Tuition & fees",
  description: TUITION_PAGE.hero.subtitle,
};

/** S11 */
export default function TuitionPage() {
  const t = TUITION_PAGE;
  const saving = TUITION.perCourse * TUITION.bundleCourses - TUITION.bundlePrice;
  const perCourseInBundle = Math.round(TUITION.bundlePrice / TUITION.bundleCourses);

  return (
    <>
      <PageHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        bannerLabel={t.hero.bannerLabel}
        banner={t.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: "Tuition & fees" }]}
      />

      <section aria-label="Prices" className="px-page py-14 md:py-[80px]">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[10px] border-2 border-line p-8">
            <h2 className="eyebrow text-[12px]">Per course</h2>
            <p className="mt-3 font-display text-[64px] font-extrabold leading-none tracking-[-0.03em]">{formatUsd(TUITION.perCourse)}</p>
            <p className="mt-4 text-muted">Pay as you go — one course at a time.</p>
            <PriceList items={t.perCourse} />
          </article>

          <article className="on-dark relative rounded-[10px] bg-charcoal p-8 text-white">
            <span className="chip absolute -top-3.5 left-8 bg-orange text-black">Best value · save {formatUsd(saving)}</span>
            <h2 className="eyebrow text-[12px]">{TUITION.bundleCourses}-course bundle</h2>
            <p className="mt-3 font-display text-[64px] font-extrabold leading-none tracking-[-0.03em]">{formatUsd(TUITION.bundlePrice)}</p>
            <p className="mt-4 text-on-dark">A full term of study — about {formatUsd(perCourseInBundle)} per course.</p>
            <PriceList items={t.bundle} dark />
          </article>

          <article className="rounded-[10px] bg-orange-tint p-8">
            <h2 className="eyebrow text-[12px]">Also available</h2>
            <dl className="mt-2">
              {t.extras.map((e) => (
                <div key={e.label} className="flex justify-between gap-4 border-b border-[#F1D9C6] py-3.5 text-[15.5px]">
                  <dt>{e.label}</dt>
                  <dd className="font-bold">{e.tbc ? <Tbc>{e.value}</Tbc> : e.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <section id="local-currency" className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <TitleBlock
          eyebrow="Pay in your currency"
          title="What it costs where you are"
          intro="Amounts are charged in US dollars and converted at the day’s rate by your payment provider. Figures below are approximate."
          className="mb-10"
        />
        <CurrencyTable />
      </section>
    </>
  );
}

function PriceList({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-5">
      {items.map((item) => (
        <li key={item} className="mt-3 flex items-start gap-3 text-[15.5px]">
          <span
            aria-hidden
            className={
              dark
                ? "flex size-6 flex-none items-center justify-center rounded-full bg-orange text-black"
                : "flex size-6 flex-none items-center justify-center rounded-full bg-success-soft text-success"
            }
          >
            <Check size={14} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
