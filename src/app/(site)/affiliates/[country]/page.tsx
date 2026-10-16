import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, ChevronRight, Map as MapIcon, MapPin, MessageCircle, Phone } from "lucide-react";
import { COUNTRIES, COUNTRY_LIST, PAYMENT_METHOD_LABELS, type CountryCode } from "@/content/countries";
import { COUNTRY_SLUGS, affiliateHref } from "@/content/navigation";
import { CAMPUSES, mapHref, phoneDigits } from "@/content/affiliates";
import { TUITION } from "@/content/colleges";
import { APP_LINKS } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Tbc } from "@/components/ui/Tbc";

const codeForSlug = (slug: string): CountryCode | undefined =>
  COUNTRY_LIST.find((c) => COUNTRY_SLUGS[c.code] === slug)?.code;

export function generateStaticParams() {
  return COUNTRY_LIST.map((c) => ({ country: COUNTRY_SLUGS[c.code] }));
}

export async function generateMetadata({ params }: PageProps<"/affiliates/[country]">): Promise<Metadata> {
  const code = codeForSlug((await params).country);
  return code ? { title: `LIU ${COUNTRIES[code].name}`, description: `LeadImpact University campuses in ${COUNTRIES[code].name}.` } : {};
}

const WORDS = ["No", "One", "Two", "Three", "Four", "Five"];

/** S17 — one page per country; Kenya only when FEATURE_KENYA is on. */
export default async function AffiliateCountryPage({ params }: PageProps<"/affiliates/[country]">) {
  const code = codeForSlug((await params).country);
  if (!code) notFound();
  const country = COUNTRIES[code];
  const campuses = CAMPUSES[code];
  const isUS = code === "US";
  const intro = isUS
    ? "Our headquarters in Denver and our Texas office serve students across the United States — online and on campus."
    : `${WORDS[campuses.length] ?? campuses.length} affiliate campus${campuses.length === 1 ? "" : "es"} teaching LeadImpact University courses — same course materials, same credit hours, same standards.`;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div aria-hidden className="absolute -right-40 -top-40 size-[640px] rounded-full border border-orange/25 max-md:hidden" />
        <div className="relative px-page pt-6 md:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-[#B9B6B1]">
              <li className="flex items-center gap-2">
                <Link href="/">Home</Link>
                <ChevronRight size={14} aria-hidden />
              </li>
              <li className="flex items-center gap-2">
                <Link href="/affiliates/become-an-affiliate">Affiliates</Link>
                <ChevronRight size={14} aria-hidden />
              </li>
              <li aria-current="page" className="font-bold text-orange">
                {country.name}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 flex items-center gap-4 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] md:text-[60px]">
            <span aria-hidden className={clsx("flex size-14 flex-none items-center justify-center rounded-full text-[18px] md:size-16 md:text-[22px]", country.badge)}>
              {code}
            </span>
            LIU {country.name}
          </h1>
          <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-[#DAD7D2] md:text-[19px]">{intro}</p>

          <nav aria-label="Countries" className="mt-8 overflow-x-auto">
            <ul className="flex gap-2.5">
              {COUNTRY_LIST.map((c) => {
                const on = c.code === code;
                return (
                  <li key={c.code}>
                    <Link
                      href={affiliateHref(c.code)}
                      aria-current={on ? "page" : undefined}
                      className={clsx(
                        "flex min-h-[52px] items-center gap-2.5 whitespace-nowrap rounded-t-[8px] px-4 font-display text-[16px] font-bold",
                        on ? "bg-white text-ink" : "bg-white/[0.08] text-white hover:bg-white/15",
                      )}
                    >
                      <span aria-hidden className={clsx("flex size-7 items-center justify-center rounded-full text-[10px] font-extrabold", c.badge)}>
                        {c.code}
                      </span>
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <div className="flex flex-col gap-10 px-page py-12 md:py-14 lg:flex-row lg:items-start">
        <ul className="flex flex-1 flex-col gap-5" aria-label={`Campuses in ${country.name}`}>
          {campuses.map((c) => {
            const tel = phoneDigits(c.phones[0], code);
            return (
              <li key={c.name} className="flex flex-col gap-5 rounded-[8px] border-[1.5px] border-line p-5 sm:flex-row">
                <ImagePlaceholder label="Campus photo" iconSize={26} className="h-[160px] flex-none rounded-[6px] sm:w-[210px]" />
                <div className="flex-1">
                  <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-[-0.02em]">{c.name}</h2>
                  {c.note && <p className="mt-1 text-[15px] text-muted">{c.note.startsWith("[") ? <Tbc>{c.note}</Tbc> : c.note}</p>}
                  <p className="mt-2 flex items-start gap-2.5 text-muted">
                    <MapPin size={18} aria-hidden className="mt-0.5 flex-none" />
                    {c.address}
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                    <Phone size={18} aria-hidden className="flex-none" />
                    {c.phones.map((p) => (
                      <a key={p} href={`tel:+${phoneDigits(p, code)}`} className="hover:text-ink hover:underline">
                        {p}
                      </a>
                    ))}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Link href={`${APP_LINKS.apply}?country=${code}`} className="btn btn-dark btn-sm">
                      Apply to this campus
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                    <a href={mapHref(c)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      <MapIcon size={16} aria-hidden />
                      Directions
                    </a>
                    <a href={whatsappHref(`Affiliates › ${c.name}`, tel)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                      <MessageCircle size={16} aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="flex flex-col gap-5 lg:w-[400px] lg:flex-none">
          <ImagePlaceholder label="Map of campuses" icon={MapIcon} className="hidden h-[300px] rounded-[8px] md:flex" />
          <div className="rounded-[8px] border-[1.5px] border-line p-6">
            <h2 className="font-display text-[19px] font-extrabold">Studying in {country.name}</h2>
            <dl className="mt-2">
              {[
                ["Tuition", `$${TUITION.perCourse} / course`],
                ["Pay in", `${country.currency.code === "USD" ? "US dollars ($)" : `${country.currency.code} (${country.currency.symbol})`}`],
                ["Pay with", country.paymentMethods.map((m) => PAYMENT_METHOD_LABELS[m]).join(" · ")],
                ["Study mode", "Campus + online"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[8px] bg-orange-tint p-6">
            <p className="font-display text-[18px] font-extrabold text-orange-deep">Start a campus in your city</p>
            <p className="mt-1.5">Churches and Bible colleges can become LIU affiliates.</p>
            <Link href="/affiliates/become-an-affiliate" className="mt-2 inline-flex min-h-11 items-center gap-2 font-display font-bold text-orange-deep hover:underline">
              Become an affiliate
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
