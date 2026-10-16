import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { NEWS, newsHref } from "@/content/news";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

/** 07 News & events (S01); "Coming up" event list on phones (SM1). All dates are placeholders. */
export function NewsEvents() {
  return (
    <section className="bg-white px-page py-10 md:py-[100px]">
      <SectionHeader
        number="07"
        eyebrow="News & events"
        title={
          <>
            <span className="md:hidden">Coming up</span>
            <span className="hidden md:inline">What’s happening at LIU</span>
          </>
        }
        action={
          <Link href="/media/blog" className="btn btn-dark">
            All news & events
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />

      <ul className="hidden grid-cols-2 gap-6 md:grid xl:grid-cols-4">
        {NEWS.map((n, i) => (
          <li key={n.slug}>
            <Link href={newsHref(n)} className="group block h-full border border-line hover:border-charcoal">
              <div className="relative">
                {n.photo ? (
                  <Photo asset={n.photo} alt="" sizes="(min-width: 1280px) 25vw, 50vw" className="h-[200px]" />
                ) : (
                  <ImagePlaceholder label={n.imageLabel} iconSize={28} className="h-[200px] justify-start! pt-6" />
                )}
                <div
                  className={clsx(
                    "absolute -bottom-px left-0 flex size-[84px] flex-col items-center justify-center",
                    i === 0 ? "bg-orange text-black" : "bg-black text-white",
                  )}
                >
                  <Tbc>
                    <span className="block text-center font-display text-[32px] font-extrabold leading-none tracking-[-0.02em]">
                      {n.date.day}
                    </span>
                    <span className="block text-center font-display text-[12px] font-extrabold uppercase tracking-[0.12em]">
                      {n.date.month}
                    </span>
                  </Tbc>
                </div>
              </div>
              <div className="p-[22px]">
                <p className="font-display text-[12px] font-extrabold uppercase tracking-[0.12em] text-orange-text">{n.category}</p>
                <h3 className="mt-2 font-display text-[19px] font-extrabold leading-tight tracking-[-0.01em] group-hover:text-orange-text">
                  {n.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] text-muted">{n.meta}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="md:hidden">
        {NEWS.filter((n) => n.isEvent).map((n) => (
          <li key={n.slug} className="mt-3">
            <Link href={newsHref(n)} className="flex items-center gap-3.5 rounded-[8px] border-[1.5px] border-line p-3.5">
              <span className="flex h-[66px] w-[62px] flex-none flex-col items-center justify-center rounded-[6px] bg-charcoal text-white">
                <Tbc>
                  <span className="block text-center font-display text-[24px] font-extrabold leading-none">
                    {n.date.day === "TBC" ? "—" : n.date.day}
                  </span>
                  <span className="block text-center font-display text-[11px] font-extrabold uppercase text-orange">
                    {n.date.month}
                  </span>
                </Tbc>
              </span>
              <span>
                <span className="block font-display text-[16px] font-extrabold tracking-[-0.01em]">{n.shortTitle}</span>
                <span className="block text-[14px] text-muted">{n.shortMeta}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
