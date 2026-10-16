import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, BookOpen, Check, ChevronDown, Download, Heart, Users, type LucideIcon } from "lucide-react";
import { ACADEMIC_AFFAIRS, ACADEMIC_POLICIES, CREDIT_TRANSFER_POLICY } from "@/content/academics";
import { EMAILS, mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { AnchorTabs } from "@/components/ui/AnchorTabs";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";
import { Tbc } from "@/components/ui/Tbc";

export const metadata: Metadata = {
  title: "Academic Affairs",
  description: ACADEMIC_AFFAIRS.hero.subtitle,
};

const PILLAR_ICONS: Record<string, LucideIcon> = { book: BookOpen, check: Check, users: Users, heart: Heart };

const TABS = [
  { label: "Academic Affairs", href: "#office" },
  { label: "Credit transfer", href: "#credit-transfer" },
  { label: "Academic calendar", href: "#calendar" },
  { label: "Grading", href: "#grading" },
  { label: "Policies", href: "#policies" },
];

/** S14 */
export default function AcademicAffairsPage() {
  const a = ACADEMIC_AFFAIRS;
  return (
    <>
      <PageHero
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        bannerLabel={a.hero.bannerLabel}
        banner={a.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Academics", href: "/academics/academic-affairs" }, { label: "Academic Affairs" }]}
      />
      <AnchorTabs label="On this page" tabs={TABS} />

      <section id="office" className="scroll-mt-36 px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow={a.office.eyebrow} title={a.office.title} intro={a.office.text} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {a.pillars.map((p) => {
                const Icon = PILLAR_ICONS[p.icon];
                return (
                  <li key={p.title} className="rounded-[8px] border-[1.5px] border-line p-6">
                    <span aria-hidden className="flex size-11 items-center justify-center rounded-[6px] bg-orange-soft text-orange-text">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-[18px] font-extrabold">{p.title}</h3>
                    <p className="mt-1 text-[15px] text-muted">{p.text}</p>
                  </li>
                );
              })}
            </ul>
            <div id="accreditation" className="mt-8 scroll-mt-36 rounded-[8px] border-l-[5px] border-orange bg-orange-tint p-6">
              <h3 className="font-display text-[19px] font-extrabold">Accreditation & recognition</h3>
              <p className="mt-2 text-[15.5px]">
                <Tbc>[Accreditation bodies, recognition and registration details to be supplied by LIU.]</Tbc>
              </p>
            </div>
          </div>

          <aside id="credit-transfer" aria-labelledby="ct-glance" className="scroll-mt-36 rounded-[10px] bg-[#F4F2EF] p-7 lg:w-[440px] lg:flex-none">
            <h2 id="ct-glance" className="eyebrow text-[12px]">
              Credit transfer at a glance
            </h2>
            <CheckList items={a.creditTransferGlance} />
            <div className="mt-6 rounded-[8px] border-[1.5px] border-line bg-white p-5">
              <p className="font-display font-extrabold">What to submit</p>
              <p className="mt-1.5 text-[15px] text-muted">{a.whatToSubmit}</p>
            </div>
            <a href={mailto(EMAILS.registrar, "Transfer credit evaluation request")} className="btn btn-dark mt-6">
              Request an evaluation
              <ArrowRight size={18} aria-hidden />
            </a>
            <details className="group mt-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-display font-bold text-orange-text [&::-webkit-details-marker]:hidden">
                Read the full credit transfer policy
                <ChevronDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2">
                {CREDIT_TRANSFER_POLICY.map((part) => (
                  <div key={part.title} className="mt-4">
                    <h3 className="font-display font-extrabold">{part.title}</h3>
                    <ul className="mt-1 list-disc pl-5 text-[15px] leading-relaxed text-muted">
                      {part.points.map((pt) => (
                        <li key={pt.slice(0, 24)} className="mt-1">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </aside>
        </div>
      </section>

      <section id="calendar" className="scroll-mt-36 bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <TitleBlock eyebrow="Academic calendar" title={a.calendar.title} />
          {/* The approved calendar PDF is still to come (CHANGES_NEEDED.md). */}
          <span aria-disabled="true" title="Available once the calendar is approved" className="btn btn-outline cursor-not-allowed opacity-60">
            <Download size={18} aria-hidden />
            Download calendar
          </span>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {a.calendar.terms.map((t, i) => (
            <li
              key={t.name}
              className={clsx("rounded-[10px] p-6", i === 0 ? "on-dark bg-charcoal text-white" : "border-[1.5px] border-line bg-white")}
            >
              <h3 className="eyebrow text-[12px]">{t.name}</h3>
              <p className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.02em]">
                <Tbc>{t.dates}</Tbc>
              </p>
              <p className={clsx("mt-3 text-[15px]", i === 0 ? "text-on-dark" : "text-muted")}>{t.registration}</p>
              <p className={clsx("mt-1 text-[15px]", i === 0 ? "text-on-dark" : "text-muted")}>{t.exams}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-muted">{a.calendar.note}</p>
      </section>

      <section id="grading" className="scroll-mt-36 px-page py-14 md:py-[100px]">
        <TitleBlock
          eyebrow="Grading"
          title="How your work is graded"
          intro="Grades use a 4.0 scale. You need a C or better for a course to count towards your program and to transfer elsewhere."
          className="mb-8"
        />
        <div role="region" aria-label="Grading scale" tabIndex={0} className="overflow-x-auto rounded-[10px] border border-line">
          <table className="w-full min-w-[560px] text-left">
            <caption className="sr-only">Grading scale</caption>
            <thead className="bg-black font-display text-[12px] font-extrabold uppercase tracking-[0.1em] text-white">
              <tr>
                <th scope="col" className="px-5 py-4">Grade</th>
                <th scope="col" className="px-5 py-4">Score</th>
                <th scope="col" className="px-5 py-4">Points</th>
                <th scope="col" className="px-5 py-4">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {a.grading.map((g) => (
                <tr key={g.grade} className="border-t border-line">
                  <th scope="row" className="px-5 py-3.5 font-display text-[18px] font-extrabold">{g.grade}</th>
                  <td className="px-5 py-3.5"><Tbc>{g.range}</Tbc></td>
                  <td className="px-5 py-3.5">{g.points}</td>
                  <td className="px-5 py-3.5 text-muted">{g.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-muted">
          <Tbc>Score bands are the standard US scale — to be confirmed by the Registrar.</Tbc>
        </p>
      </section>

      <section id="policies" className="scroll-mt-36 bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <TitleBlock eyebrow="Policies" title="Academic policies" className="mb-8" />
        <ul className="grid gap-4 md:grid-cols-2">
          {ACADEMIC_POLICIES.map((p) => (
            <li key={p.title}>
              <Link href={p.href} className="group flex h-full items-center gap-4 rounded-[8px] border-[1.5px] border-line bg-white p-5 hover:border-charcoal">
                <span className="flex-1">
                  <span className="block font-display text-[18px] font-extrabold group-hover:text-orange-text">{p.title}</span>
                  <span className="block text-[15px] text-muted">{p.text}</span>
                </span>
                <ArrowRight size={20} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
