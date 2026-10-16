"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, MapPin } from "lucide-react";
import { EVENTS, EVENT_FILTERS, EVENT_KIND_LABELS, type EventKind } from "@/content/events";
import { EMAILS, mailto } from "@/config/domains";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

/** S20 "What's coming up" with filter chips. */
export function EventsList() {
  const [kind, setKind] = useState<EventKind | undefined>();
  const events = EVENTS.filter((e) => !kind || e.kind === kind);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow text-[12px] md:text-[13px]">Upcoming</p>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-[-0.02em] md:text-[42px]">What’s coming up</h2>
        </div>
        <ul aria-label="Filter events" className="flex flex-wrap gap-2">
          {EVENT_FILTERS.map((f) => {
            const on = f.kind === kind;
            return (
              <li key={f.label}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setKind(f.kind)}
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
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((e) => {
          // External page where one exists; otherwise registration is by email for now.
          const register = e.url ?? mailto(EMAILS.info, `Registration: ${e.title}`);
          return (
            <li key={e.slug} className="flex flex-col overflow-hidden rounded-[8px] border-[1.5px] border-line">
              {e.photo ? (
                <Photo asset={e.photo} alt="" sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-[150px]" />
              ) : (
                <ImagePlaceholder label={e.title} iconSize={26} className="h-[150px]" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-[52px] w-[46px] flex-none flex-col items-center justify-center rounded-[4px] bg-black text-white">
                    <Tbc>
                      <span className="block text-center font-display text-[20px] font-extrabold leading-none">{e.date.day}</span>
                      <span className="block text-center font-display text-[10px] font-extrabold uppercase text-orange">{e.date.month}</span>
                    </Tbc>
                  </span>
                  <div>
                    <span className="chip chip-orange px-2 py-0.5 text-[10.5px]">{EVENT_KIND_LABELS[e.kind]}</span>
                    <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-muted">
                      <MapPin size={14} aria-hidden /> {e.where}
                    </p>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-[19px] font-extrabold leading-tight tracking-[-0.01em]">{e.title}</h3>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-display text-[15px] font-bold text-orange-text hover:underline">
                      Details <ArrowRight size={16} aria-hidden />
                    </a>
                  ) : (
                    <span className="text-[13.5px] text-muted">Details soon</span>
                  )}
                  <a
                    href={register}
                    {...(e.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`Register for ${e.title}`}
                    className="btn btn-orange btn-sm"
                  >
                    Register
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
