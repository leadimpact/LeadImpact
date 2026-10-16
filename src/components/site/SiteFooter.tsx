import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { APP_LINKS, SITE } from "@/content/site";
import { FOOTER_COLUMNS, MOBILE_FOOTER_LINKS } from "@/content/navigation";
import { COUNTRY_LIST } from "@/content/countries";
import { CountryPicker } from "./CountryPicker";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { WhatsAppLink } from "./WhatsAppLink";
import { NewsletterForm } from "./NewsletterForm";

const columnTitle =
  "mb-[18px] inline-block border-b-2 border-orange pb-3 font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-white";

function Headline({ className }: { className: string }) {
  return (
    <p className={`font-display font-extrabold uppercase leading-none tracking-[-0.02em] text-white ${className}`}>
      Time to take the <span className="text-orange">lead.</span>
    </p>
  );
}

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="on-dark border-t-[6px] border-orange bg-black text-on-dark">
      {/* Desktop and tablet */}
      <div className="hidden md:block">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line-dark px-page py-14">
          <div>
            <Headline className="text-[38px] xl:text-[46px]" />
            <p className="mt-2.5">Apply in about 15 minutes. No application fee.</p>
          </div>
          <div className="flex gap-3">
            <Link href={APP_LINKS.apply} className="btn btn-orange">
              Apply now
              <ArrowRight size={18} aria-hidden />
            </Link>
            <WhatsAppLink className="btn btn-outline-light">
              <MessageCircle size={18} aria-hidden />
              Talk to us
            </WhatsAppLink>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-9 px-page py-14 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.4fr]">
          <div className="col-span-3 xl:col-span-1">
            <Logo tone="dark" crestClassName="h-[150px]" crestSizes="128px" />
            <p className="mt-5 max-w-[300px] leading-relaxed">{SITE.tagline}</p>
            <NewsletterForm className="mt-[22px] max-w-[360px]" />
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className={columnTitle}>{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label} className="mb-3">
                    <Link href={l.href} className="hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 xl:col-span-1">
            <p className={columnTitle}>Contact</p>
            <address className="not-italic">
              <ContactRow icon={<MapPin size={16} />}>{SITE.address}</ContactRow>
              <ContactRow icon={<Phone size={16} />}>
                <a href={`tel:+${SITE.phone}`} className="hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail size={16} />}>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {/* Break after "@" rather than mid-word in the narrow column. */}
                  {SITE.email.split("@")[0]}@<wbr />
                  {SITE.email.split("@")[1]}
                </a>
              </ContactRow>
              <ContactRow icon={<Clock size={16} />}>{SITE.officeHours}</ContactRow>
            </address>
          </div>
        </div>

        <div className="flex items-center justify-between bg-charcoal px-page py-5 text-[13.5px] text-on-dark-muted">
          <div className="flex items-center gap-6">
            <span>© {year} LeadImpact University</span>
            {/* Where desktop visitors change the country the site guessed (prices, contacts, campus). */}
            <CountryPicker className="font-bold text-white" />
          </div>
          <ul aria-label="Countries we serve" className="flex gap-[18px]">
            {COUNTRY_LIST.map((c) => (
              <li key={c.code} title={c.name} className="font-display font-extrabold tracking-[0.1em] text-on-dark">
                {c.code}
              </li>
            ))}
          </ul>
          <SocialLinks className="gap-3.5" linkClassName="size-8" />
        </div>
      </div>

      {/* Mobile (SM1) */}
      <div className="px-5 py-8 md:hidden">
        <Headline className="text-[30px] leading-[1.05]" />
        <Link href={APP_LINKS.apply} className="btn btn-orange mt-4 w-full">
          Apply now
          <ArrowRight size={18} aria-hidden />
        </Link>
        <div className="mt-[26px]">
          <Logo size="sm" tone="dark" crestClassName="h-[110px]" crestSizes="96px" />
        </div>
        <nav aria-label="Footer" className="mt-4">
          <ul>
            {MOBILE_FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="flex min-h-[52px] items-center justify-between border-b border-line-dark py-[15px] font-display text-[14px] font-extrabold uppercase tracking-[0.1em] text-white"
                >
                  {l.label}
                  <ChevronRight size={18} aria-hidden className="text-orange" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks size={18} className="mt-4 gap-2 text-white" linkClassName="size-12" />
        <p className="mt-3 text-[13px] text-on-dark-muted">© {year} LeadImpact University</p>
      </div>
    </footer>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <span aria-hidden className="mt-[3px] text-orange">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}
