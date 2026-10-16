import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Compass, CreditCard, Download, Globe, PenLine, Play, Users, Video, type LucideIcon } from "lucide-react";
import { APP_LINKS } from "@/content/site";
import { COUNTRY_COUNT } from "@/content/countries";
import { TUITION } from "@/content/colleges";
import { photo } from "@/content/media";
import { EMAILS, mailto } from "@/config/domains";
import { whatsappHref } from "@/lib/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Prospective students",
  description: "Everything you need to decide about studying at LeadImpact University — in one place.",
};

/** S24 */
export default function ProspectiveStudentsPage() {
  const cards: { title: string; text: string; link: string; href: string; icon: LucideIcon; external?: boolean }[] = [
    { title: "Find your program", text: "12 programs across 7 colleges, Certificate to Doctorate.", link: "Explore programs", href: "/programs", icon: Compass },
    {
      title: "Understand the cost",
      text: `$${TUITION.perCourse} per course or $${TUITION.bundlePrice} for three, with scholarships.`,
      link: "Tuition & fees",
      href: "/admissions/tuition",
      icon: CreditCard,
    },
    { title: "Try LIU Learn", text: "See how online and offline study works.", link: "Take a tour", href: "/learn-online", icon: Play },
    { title: "Choose where to study", text: `Online, or at a campus in ${COUNTRY_COUNT} countries.`, link: "Locations", href: "/contact#campuses", icon: Globe },
    {
      title: "Talk to a student",
      text: "Hear from current students and alumni.",
      link: "Book a chat",
      href: whatsappHref("Prospective students › Talk to a student"),
      icon: Users,
      external: true,
    },
    { title: "Apply", text: "About 15 minutes, no fee.", link: "Start application", href: APP_LINKS.apply, icon: PenLine },
  ];

  return (
    <>
      <PageHero
        title="Thinking about LIU?"
        subtitle="Everything you need to decide — in one place."
        bannerLabel="Thinking about LIU? · banner photo"
        banner={photo("executiveMasterclass", 7)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Students", href: "/prospective-students" }, { label: "Prospective students" }]}
      />
      <section aria-label="Your next steps" className="px-page py-14 md:py-[80px]">
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((c, i) => {
            const first = i === 0;
            const cls = clsx("group flex h-full flex-col rounded-[8px] p-7", first ? "bg-orange text-black" : "bg-[#F4F2EF]");
            const inner = (
              <>
                <c.icon size={26} aria-hidden className={first ? "text-black" : "text-orange-text"} />
                <h2 className="mt-5 font-display text-[24px] font-extrabold tracking-[-0.02em]">{c.title}</h2>
                <p className={clsx("mt-2", first ? "text-[#3A2410]" : "text-muted")}>{c.text}</p>
                <span className={clsx("mt-4 inline-flex items-center gap-2 font-display font-bold group-hover:underline", first ? "text-black" : "text-orange-text")}>
                  {c.link} <ArrowRight size={16} aria-hidden />
                </span>
              </>
            );
            return (
              <li key={c.title}>
                {c.external ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={c.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          <Photo asset={photo("executiveMasterclass", 3)} alt="" icon={Video} sizes="(min-width: 1024px) 45vw, 100vw" className="h-[260px] rounded-[8px] lg:h-[300px] lg:w-[45%]" />
          <div className="flex-1">
            <TitleBlock
              eyebrow="Information sessions"
              title="Join a free online information session"
              intro="Every second Saturday · 45 minutes · ask anything about programs, fees and studying online."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={mailto(EMAILS.admissions, "Reserve a place at an information session")} className="btn btn-orange">
                Reserve a place
                <ArrowRight size={18} aria-hidden />
              </a>
              <span aria-disabled="true" title="The prospectus is being prepared" className="btn btn-outline cursor-not-allowed opacity-60">
                <Download size={18} aria-hidden />
                Prospectus · coming soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
