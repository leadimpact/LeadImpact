import type { Metadata } from "next";
import { ArrowRight, Play } from "lucide-react";
import { VIDEOS } from "@/content/gallery";
import { SITE } from "@/content/site";
import { photo } from "@/content/media";
import { PageHero } from "@/components/ui/PageHero";
import { AnchorTabs } from "@/components/ui/AnchorTabs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Albums } from "./Albums";

export const metadata: Metadata = {
  title: "Photo & video gallery",
  description: "Moments from classes, conferences and graduations across our campuses.",
};

/** S22 — photo albums here; videos live on LIU's YouTube channel (addendum v5 §6). */
export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Photo & video gallery"
        subtitle="Moments from classes, conferences and graduations across our campuses."
        bannerLabel="Photo & video gallery · banner photo"
        banner={photo("masterclass", 3)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Media", href: "/media/blog" }, { label: "Gallery" }]}
      />
      <AnchorTabs
        label="Gallery sections"
        tabs={[
          { label: "Photos", href: "#photos" },
          { label: "Videos", href: "#videos" },
        ]}
      />
      <section id="photos" aria-label="Photo albums" className="scroll-mt-36 px-page py-10 md:py-14">
        <Albums />
      </section>
      <section id="videos" className="scroll-mt-36 px-page pb-14 md:pb-[100px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[30px] font-extrabold tracking-[-0.02em] md:text-[36px]">Latest videos</h2>
          <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            All videos on YouTube
            <ArrowRight size={16} aria-hidden />
          </a>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {VIDEOS.map((v) => (
            <li key={v.title}>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative">
                  <ImagePlaceholder label={v.title} icon={null} className="h-[200px] rounded-[6px] justify-end! pb-4" />
                  <span aria-hidden className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange text-black group-hover:scale-105">
                    <Play size={22} />
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-[4px] bg-black/80 px-2 py-1 font-display text-[12px] font-bold text-white">
                    {v.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[18px] font-extrabold group-hover:text-orange-text">{v.title}</h3>
                <span className="sr-only">(opens YouTube)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
