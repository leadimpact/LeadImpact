"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { COUNTRY_LIST, countryNames } from "@/content/countries";
import { affiliateHref } from "@/content/navigation";
import { SITE } from "@/content/site";
import { EMAILS, mailto } from "@/config/domains";
import { useCountry } from "@/lib/country";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const card = "flex flex-col rounded-[8px] border-[1.5px] border-line bg-white p-6 shadow-[0_20px_40px_rgba(14,15,18,0.08)]";
const action = "mt-auto inline-flex min-h-11 items-center gap-2 pt-3 font-display font-bold hover:underline";

/** S23 four contact routes, overlapping the hero's bottom edge. */
export function ContactCards() {
  const { country } = useCountry();
  const local = COUNTRY_LIST.filter((c) => c.code !== "US");
  return (
    <ul className="relative grid gap-4 px-page pt-8 sm:grid-cols-2 md:bg-[linear-gradient(180deg,var(--color-charcoal)_0_45%,transparent_45%)] md:pt-0 xl:grid-cols-4">
      <li className={card}>
        <Icon icon={MessageCircle} tone="bg-success-soft text-success" />
        <h2 className="mt-4 font-display text-[20px] font-extrabold">WhatsApp</h2>
        <p className="mt-1 text-muted">Fastest reply — chat with Admissions</p>
        <WhatsAppLink pageName="Contact" className={`${action} text-success`}>
          Start chat <ArrowRight size={16} aria-hidden />
        </WhatsAppLink>
      </li>
      <li className={card}>
        <Icon icon={Phone} />
        <h2 className="mt-4 font-display text-[20px] font-extrabold">Call us</h2>
        <p className="mt-1 text-muted">
          {SITE.phoneDisplay}
          <br />
          {SITE.officeHours}
        </p>
        <a href={`tel:+${SITE.phone}`} className={`${action} text-orange-text`}>
          Call now <ArrowRight size={16} aria-hidden />
        </a>
      </li>
      <li className={card}>
        <Icon icon={Mail} />
        <h2 className="mt-4 font-display text-[20px] font-extrabold">Email</h2>
        <p className="mt-1 text-muted">
          {[EMAILS.info, EMAILS.admissions].map((e) => (
            <span key={e} className="block">
              {/* Break after "@" rather than mid-word. */}
              {e.split("@")[0]}@<wbr />
              {e.split("@")[1]}
            </span>
          ))}
        </p>
        <a href={mailto(EMAILS.info)} className={`${action} text-orange-text`}>
          Send email <ArrowRight size={16} aria-hidden />
        </a>
      </li>
      <li className={card}>
        <Icon icon={MapPin} />
        <h2 className="mt-4 font-display text-[20px] font-extrabold">Local campus</h2>
        <p className="mt-1 text-muted">Speak to someone in {countryNames(local).replace(/ and ([^ ]+)$/, " or $1")}</p>
        <Link href={country.code === "US" ? "#campuses" : affiliateHref(country.code)} className={`${action} text-orange-text`}>
          Find a campus <ArrowRight size={16} aria-hidden />
        </Link>
      </li>
    </ul>
  );
}

function Icon({ icon: I, tone = "bg-orange-soft text-orange-text" }: { icon: LucideIcon; tone?: string }) {
  return (
    <span aria-hidden className={`flex size-12 items-center justify-center rounded-[6px] ${tone}`}>
      <I size={22} />
    </span>
  );
}
