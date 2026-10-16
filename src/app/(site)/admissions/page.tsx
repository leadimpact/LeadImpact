import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  Compass,
  Download,
  Mail,
  MessageCircle,
  PenLine,
  Phone,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { ADMISSIONS, ADMISSIONS_FAQS, ADMISSIONS_POLICY } from "@/content/admissions";
import { APP_LINKS, SITE } from "@/content/site";
import { EMAILS, mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { AnchorTabs } from "@/components/ui/AnchorTabs";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";
import { Faq } from "@/components/ui/Faq";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

export const metadata: Metadata = {
  title: "How to apply",
  description: ADMISSIONS.hero.subtitle,
};

const STEP_ICONS: Record<string, LucideIcon> = { compass: Compass, pen: PenLine, upload: Upload, mail: Mail };

const TABS = [
  { label: "How to apply", href: "#how-to-apply" },
  { label: "Requirements", href: "#requirements" },
  { label: "International students", href: "#international" },
  { label: "Admissions policy", href: "#policy" },
  { label: "FAQs", href: "#faqs" },
];

/** S09 (desktop) / SM4 (mobile) */
export default function AdmissionsPage() {
  const a = ADMISSIONS;
  return (
    <>
      <PageHero
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        mobileSubtitle={a.hero.mobileSubtitle}
        bannerLabel={a.hero.bannerLabel}
        banner={a.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: "How to apply" }]}
        mobileActions={
          <>
            <Link href={APP_LINKS.apply} className="btn btn-orange btn-lg w-full">
              Start application
              <ArrowRight size={18} aria-hidden />
            </Link>
            <a href={a.formPdf} download className="btn btn-outline-light btn-lg w-full">
              <Download size={18} aria-hidden />
              Download form (PDF)
            </a>
          </>
        }
      />
      <AnchorTabs label="On this page" tabs={TABS} hideOnMobile />

      <div className="hidden items-center gap-4 bg-orange-tint px-page py-4 md:flex">
        <Bell size={20} aria-hidden className="flex-none text-orange-text" />
        <p className="flex-1 text-[15px]">
          <b>{a.intakeNotice.lead}</b> {a.intakeNotice.text}
        </p>
        <Link href={APP_LINKS.apply} className="btn btn-orange btn-sm">
          Start application
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>

      <section id="how-to-apply" className="scroll-mt-36 px-5 py-10 md:px-page md:py-[100px]">
        <TitleBlock eyebrow="How to apply" title="Four simple steps" className="mb-10 hidden md:block" />
        <h2 className="sr-only md:hidden">Four simple steps</h2>
        <ol className="grid gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {a.steps.map((step, i) => {
            const Icon = STEP_ICONS[step.icon];
            const first = i === 0;
            return (
              <li
                key={step.title}
                className={clsx(
                  "relative flex gap-4 rounded-[8px] p-5 md:block md:p-6",
                  first ? "on-dark bg-charcoal text-white" : "bg-[#F4F2EF]",
                )}
              >
                <span
                  aria-hidden
                  className={clsx(
                    "font-display text-[40px] font-extrabold leading-none",
                    first ? "text-orange" : "text-orange-numeral",
                  )}
                >
                  {i + 1}
                </span>
                <Icon
                  size={22}
                  aria-hidden
                  className={clsx("absolute right-6 top-6 hidden md:block", first ? "text-orange" : "text-orange-text")}
                />
                <div>
                  <h3 className="font-display text-[18px] font-extrabold tracking-[-0.01em] md:mt-4">{step.title}</h3>
                  <p className={clsx("mt-1.5 text-[15px] leading-normal", first ? "text-on-dark" : "text-muted")}>
                    <span className="md:hidden">{step.mobileText}</span>
                    <span className="hidden md:inline">{step.text}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 hidden flex-wrap gap-3 md:flex">
          <Link href={APP_LINKS.apply} className="btn btn-orange">
            Apply online
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a href={a.formPdf} download className="btn btn-outline">
            <Download size={18} aria-hidden />
            Download admission form (PDF)
          </a>
          <WhatsAppLink pageName="Admissions › How to apply" className="btn btn-whatsapp">
            <MessageCircle size={18} aria-hidden />
            Ask on WhatsApp
          </WhatsAppLink>
        </div>

        {/* Phones (SM4): short list and help card */}
        <div className="md:hidden">
          <h2 className="mt-9 font-display text-[28px] font-extrabold tracking-[-0.02em]">What you’ll need</h2>
          <CheckList items={a.mobileRequirements} />
          <Link href="#requirements" className="mt-4 inline-flex min-h-12 items-center gap-2 font-display font-bold text-orange-text">
            Full requirements
            <ArrowRight size={18} aria-hidden />
          </Link>
          <div className="mt-6 rounded-[10px] bg-success-soft p-5">
            <p className="font-display text-[19px] font-extrabold text-success">Need help applying?</p>
            <p className="mt-1.5 text-success">Chat with an admissions officer — we reply within a working day.</p>
            <WhatsAppLink pageName="Admissions › How to apply" className="btn btn-whatsapp mt-4 w-full">
              <MessageCircle size={18} aria-hidden />
              Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section id="requirements" className="scroll-mt-36 bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow="Requirements" title="What you’ll need" />
            <CheckList items={a.requirements} />
            <p className="mt-5 text-[15px] text-muted">{a.requirementsNote}</p>
          </div>
          <div className="flex flex-col gap-5 lg:w-[440px] lg:flex-none">
            <div id="international" className="on-dark scroll-mt-36 rounded-[10px] bg-charcoal p-7 text-white">
              <h2 className="eyebrow">International students</h2>
              <ul className="mt-2">
                {a.international.map((item) => (
                  <li key={item} className="mt-3 flex gap-3 text-[16px] leading-normal">
                    <Check size={18} aria-hidden className="mt-0.5 flex-none text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14.5px] text-on-dark-muted">{a.internationalNote}</p>
            </div>
            <div className="rounded-[10px] border-[1.5px] border-line bg-white p-7">
              <h2 className="font-display text-[19px] font-extrabold">Talk to Admissions</h2>
              <ul className="mt-3 flex flex-col gap-1">
                <ContactRow icon={Mail} href={mailto(EMAILS.admissions)} label={EMAILS.admissions} />
                <ContactRow icon={Phone} href={`tel:+${SITE.phone}`} label={SITE.phoneDisplay} />
                <li>
                  <WhatsAppLink
                    pageName="Admissions"
                    className="flex min-h-11 items-center gap-3 text-[15.5px] hover:text-orange-text"
                  >
                    <MessageCircle size={18} aria-hidden className="text-orange-text" />
                    WhatsApp · replies within 1 working day
                  </WhatsAppLink>
                </li>
                <ContactRow
                  icon={CalendarDays}
                  href={mailto(EMAILS.admissions, "Book a meeting with an admissions officer")}
                  label="Book a meeting with an admissions officer"
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="policy" className="scroll-mt-36 px-page py-14 md:py-[100px]">
        <TitleBlock
          eyebrow="Admissions policy"
          title="How we admit students"
          intro="Our admissions policies in brief. Admissions will confirm anything specific to your program."
          className="mb-10"
        />
        {/* Phones: titles first, tap to read (keeps the page short). */}
        <Faq items={ADMISSIONS_POLICY.map((p, i) => ({ q: `${i + 1}. ${p.title}`, a: p.text }))} firstOpen={false} className="md:hidden" />
        <ol className="hidden gap-x-10 gap-y-7 md:grid md:grid-cols-2">
          {ADMISSIONS_POLICY.map((item, i) => (
            <li key={item.title} className="flex gap-5 border-t-2 border-black pt-5">
              <span aria-hidden className="font-display text-[22px] font-extrabold text-orange-numeral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[18px] font-extrabold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="faqs" className="scroll-mt-36 bg-white px-page pb-14 md:pb-[100px]">
        <div className="flex flex-col gap-8 border-t border-line pt-14 lg:flex-row lg:gap-16 md:pt-[100px]">
          <TitleBlock eyebrow="FAQs" title="Questions applicants ask" className="lg:w-[360px] lg:flex-none" />
          <div className="flex-1">
            <Faq items={ADMISSIONS_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, href, label }: { icon: LucideIcon; href: string; label: string }) {
  return (
    <li>
      <a href={href} className="flex min-h-11 items-center gap-3 break-all text-[15.5px] hover:text-orange-text">
        <Icon size={18} aria-hidden className="flex-none text-orange-text" />
        {label}
      </a>
    </li>
  );
}
