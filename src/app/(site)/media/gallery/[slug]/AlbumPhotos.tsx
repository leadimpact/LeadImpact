"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaAsset } from "@/content/media";
import { cloudinaryEnabled } from "@/config/media";
import { Photo } from "@/components/ui/Photo";

/** Album grid; a photo opens full screen, with arrows (and arrow keys) to page through the album. */
export function AlbumPhotos({ title, photos }: { title: string; photos: MediaAsset[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | undefined>();
  const step = (by: number) => setOpen((i) => (i === undefined ? i : (i + by + photos.length) % photos.length));

  useEffect(() => {
    if (open !== undefined && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {photos.map((p, i) => {
          const thumb = <Photo asset={p} alt="" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-[160px] rounded-[6px] md:h-[220px]" />;
          return (
            <li key={p.id}>
              {/* Placeholders (no Cloudinary) have nothing to enlarge. */}
              {cloudinaryEnabled() ? (
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${photos.length}`} className="block w-full">
                  {thumb}
                </button>
              ) : (
                thumb
              )}
            </li>
          );
        })}
      </ul>
      <dialog
        ref={dialog}
        aria-label={title}
        onClose={() => setOpen(undefined)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 text-white backdrop:bg-black/80"
      >
        {open !== undefined && (
          <div className="relative h-full w-full">
            <Image src={photos[open].id} alt={photos[open].alt} fill sizes="100vw" className="object-contain p-4 md:p-16" />
            <p className="absolute left-4 top-4 font-display text-[14px] font-bold" aria-live="polite">
              {open + 1} / {photos.length}
            </p>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <X size={22} aria-hidden />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <ChevronLeft size={24} aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <ChevronRight size={24} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
