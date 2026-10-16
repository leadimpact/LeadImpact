import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { ARCHIVE, WOBICON } from "@/content/events";
import { SITE } from "@/content/site";
import { photo } from "@/content/media";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";
import { EventsList } from "./EventsList";

export const metadata: Metadata = {
  title: "Activities & conferences",
  description: "Conferences, masterclasses and gatherings that equip leaders across Africa, America and beyond.",
};

/** S20 */
export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        title="Activities & conferences"
        subtitle="Conferences, masterclasses and gatherings that equip leaders across Africa, America and beyond."
        bannerLabel="Activities & conferences · banner photo"
        banner={photo("wobicon", 11)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "Activities & conferences" }]}
      />

      <section aria-labelledby="wobicon" className="px-page py-14 md:py-[80px]">
        <div className="on-dark flex flex-col overflow-hidden rounded-[10px] bg-black text-white lg:flex-row">
          <Photo asset={WOBICON.photo} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="h-[240px] lg:h-auto lg:w-1/2" />
          <div className="flex-1 p-7 md:p-10">
            <span className="chip chip-orange">Flagship conference</span>
            <h2 id="wobicon" className="mt-4 font-display text-[40px] font-extrabold uppercase leading-none tracking-[-0.02em] md:text-[48px]">
              {WOBICON.title}
            </h2>
            <p className="mt-4 text-on-dark">{WOBICON.text}</p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                ["Date", WOBICON.date, true],
                ["Venue", WOBICON.venue, true],
                ["Join", WOBICON.join, false],
              ].map(([k, v, tbc]) => (
                <div key={String(k)}>
                  <dt className="font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-on-dark-muted">{k}</dt>
                  <dd className="font-display font-extrabold">{tbc ? <Tbc>{v}</Tbc> : v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={WOBICON.url} target="_blank" rel="noopener noreferrer" className="btn btn-orange">
                Visit wobicon.org
                <ArrowRight size={18} aria-hidden />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <Play size={18} aria-hidden />
                Watch 2025 highlights
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-page pb-14 md:pb-[100px]">
        <EventsList />
      </section>

      <section className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <TitleBlock eyebrow="Previous activities" title="From our archive" />
          <Link href="/media/gallery" className="btn btn-dark">
            Full gallery
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {ARCHIVE.map((item, i) => {
            const box = i === 0 ? "h-[240px] rounded-[6px] md:h-full md:min-h-[420px]" : "h-[200px] rounded-[6px]";
            return (
              <li key={item.label} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                {item.photo ? (
                  <Photo asset={item.photo} alt={item.label} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"} className={box} />
                ) : (
                  <ImagePlaceholder label={item.label} className={box} />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
