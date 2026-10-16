import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Map as MapIcon, Phone } from "lucide-react";
import { COUNTRY_LIST } from "@/content/countries";
import { CAMPUSES } from "@/content/affiliates";
import { affiliateHref } from "@/content/navigation";
import { SITE } from "@/content/site";
import { photo } from "@/content/media";
import { EMAILS, mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Tbc } from "@/components/ui/Tbc";
import { ContactCards } from "./ContactCards";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, email, WhatsApp or visit. We reply to every message within one working day.",
};

/** S23 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        title="We’re here to help"
        subtitle="Call, email, WhatsApp or visit. We reply to every message within one working day."
        bannerLabel="We’re here to help · banner photo"
        banner={photo("masterclass", 13)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ContactCards />

      <section className="px-page py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex-1 rounded-[10px] border-[1.5px] border-line p-6 md:p-9">
            <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] md:text-[32px]">Send us a message</h2>
            <Suspense fallback={<div className="h-[420px]" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="flex flex-col gap-5 lg:w-[420px] lg:flex-none">
            <ImagePlaceholder label="Map · Denver headquarters" icon={MapIcon} className="h-[240px] rounded-[8px]" />
            <div className="rounded-[8px] border-[1.5px] border-line p-5">
              <p className="eyebrow text-[12px]">Headquarters</p>
              <p className="mt-2 font-display text-[18px] font-extrabold">Denver, Colorado</p>
              <p className="text-muted">{SITE.address}</p>
            </div>
            <div className="rounded-[8px] border-[1.5px] border-line p-5">
              <p className="eyebrow text-[12px]">Texas office</p>
              <p className="mt-2 font-display text-[18px] font-extrabold">Texas</p>
              <p className="text-muted">
                <Tbc>906 Avenue A, Houston, TX — address to confirm</Tbc>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="campuses" className="scroll-mt-28 bg-[#F4F2EF] px-page py-14 md:py-[80px]">
        <TitleBlock eyebrow="Campuses" title="Talk to someone near you" className="mb-8" />
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {COUNTRY_LIST.map((c) => (
            <li key={c.code} className="flex flex-col rounded-[8px] border-[1.5px] border-line bg-white p-5">
              <h3 className="flex items-center gap-2.5 font-display text-[18px] font-extrabold">
                <span aria-hidden className={clsx("flex size-8 items-center justify-center rounded-full text-[11px]", c.badge)}>
                  {c.code}
                </span>
                {c.name}
              </h3>
              <p className="mt-2 text-[15px] text-muted">{CAMPUSES[c.code].map((x) => x.name.replace(/^LeadImpact University — /, "")).join(" · ")}</p>
              <a href={`tel:+${c.phone}`} className="mt-3 flex min-h-11 items-center gap-2 font-bold hover:text-orange-text">
                <Phone size={16} aria-hidden /> {c.phoneDisplay}
              </a>
              <Link href={affiliateHref(c.code)} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-2 font-display font-bold text-orange-text hover:underline">
                Campus details <ArrowRight size={16} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="careers" className="scroll-mt-28 px-page py-14">
        <TitleBlock
          eyebrow="Careers"
          title="Work or teach with LIU"
          intro="We welcome experienced ministers, scholars and professionals — as faculty, staff or volunteers, online or at a campus."
        />
        <a href={mailto(EMAILS.info, "Careers at LeadImpact University")} className="btn btn-dark mt-6">
          Ask about opportunities
          <ArrowRight size={18} aria-hidden />
        </a>
      </section>
    </>
  );
}
