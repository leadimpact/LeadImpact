"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Image as ImageIcon } from "lucide-react";
import { ALBUMS, ALBUM_FILTERS, albumHref, type AlbumTag } from "@/content/gallery";
import { Photo } from "@/components/ui/Photo";

/** S22 album chips and grid; each album opens its own page (every photo, full screen). */
export function Albums() {
  const [tag, setTag] = useState<AlbumTag | undefined>();
  const albums = ALBUMS.filter((a) => !tag || a.tag === tag);
  return (
    <>
      <ul aria-label="Filter albums" className="flex flex-wrap gap-2">
        {ALBUM_FILTERS.map((f) => {
          const on = f.tag === tag;
          return (
            <li key={f.label}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setTag(f.tag)}
                className={clsx(
                  "min-h-10 rounded-[4px] px-3.5 font-display text-[12.5px] font-bold uppercase tracking-[0.05em]",
                  on ? "bg-orange-text text-white" : "bg-[#EFEDEA] text-ink hover:bg-line",
                )}
              >
                {f.label}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {albums.map((a) => (
          <li key={a.slug}>
            <Link href={albumHref(a)} className="group block">
              <div className="relative">
                <Photo asset={a.photos[0]} alt="" sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-[220px] rounded-[6px]" />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-[4px] bg-black/80 px-2 py-1 font-display text-[11px] font-extrabold uppercase text-white">
                  <ImageIcon size={12} aria-hidden />
                  {a.photos.length} photos
                </span>
              </div>
              <h2 className="mt-3 font-display text-[20px] font-extrabold tracking-[-0.02em] group-hover:text-orange-text">{a.title}</h2>
              <p className="text-[14.5px] text-muted">{a.meta}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

