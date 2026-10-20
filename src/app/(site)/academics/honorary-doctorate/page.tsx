import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { HONORARY_DOCTORATE } from "@/content/academics";
import { EMAILS, mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Honorary Doctorate",
  description: HONORARY_DOCTORATE.hero.subtitle,
};

/** S16 */
export default function HonoraryDoctoratePage() {
  const h = HONORARY_DOCTORATE;
  const r = h.recent;
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

      <section aria-labelledby="recent-conferral" className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <Photo asset={r.photos[2]} sizes="(min-width: 1024px) 460px, 100vw" position="top" className="h-[420px] rounded-[10px] md:h-[520px] lg:w-[460px] lg:flex-none" />
          <div className="flex-1">
            <TitleBlock id="recent-conferral" eyebrow={`Recently conferred · ${r.date}`} title={r.recipient} intro={`${r.degree}. ${r.text}`} />
            <ul className="mt-8 grid max-w-[560px] grid-cols-2 gap-4">
              {r.photos.slice(0, 2).map((p) => (
                <li key={p.id}>
                  <Photo asset={p} sizes="(min-width: 1024px) 280px, 50vw" position="top" className="h-[180px] rounded-[8px] md:h-[240px]" />
                </li>
              ))}
            </ul>
            <Link href={r.album} className="btn btn-outline mt-8">
              View the album
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
