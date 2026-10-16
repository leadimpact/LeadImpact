"use client";

import { useId, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, MessageCircle } from "lucide-react";
import { LEVELS, type LevelId } from "@/content/programs";
import { TUITION } from "@/content/colleges";
import { APP_LINKS } from "@/content/site";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

interface Props {
  programSlug: string;
  programName: string;
  levels: LevelId[];
  /** "card" = desktop white card in the hero (S13); "plain" = phone layout (SM3). */
  variant: "card" | "plain";
}

const detail = (id: LevelId, short: boolean) => {
  const l = LEVELS[id];
  if (!l.courses) return l.duration;
  if (short || !l.credits) return `${l.courses} courses`;
  return `${l.courses} courses · ${l.credits} credits`;
};

/** S13/SM3 "Choose a level" — the chosen level is carried into the application link. */
export function LevelPicker({ programSlug, programName, levels, variant }: Props) {
  const [level, setLevel] = useState<LevelId>(levels.includes("bachelor") ? "bachelor" : levels[0]);
  const name = useId();
  const card = variant === "card";
  const applyHref = `${APP_LINKS.apply}?program=${programSlug}&level=${level}`;

  return (
    <div className={clsx(card && "rounded-[8px] bg-white p-6 text-ink shadow-[0_20px_50px_rgba(0,0,0,0.25)]")}>
      <fieldset>
        <legend className="eyebrow mb-3 text-[12px]">Choose a level</legend>
        <div className="flex flex-col gap-2">
          {levels.map((id) => {
            const on = id === level;
            return (
              <label
                key={id}
                className={clsx(
                  "flex min-h-14 cursor-pointer items-center gap-3.5 rounded-[6px] border-[1.5px] px-4 py-2.5",
                  on ? "border-orange-text bg-orange-soft" : "border-line bg-white hover:border-charcoal",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={id}
                  checked={on}
                  onChange={() => setLevel(id)}
                  className="size-5 flex-none accent-[var(--color-orange-text)]"
                />
                <span className={clsx("flex-1", !card && "flex items-center justify-between gap-3")}>
                  <span className="block font-bold">{card ? LEVELS[id].label : LEVELS[id].short}</span>
                  <span className={clsx("block text-muted", card ? "text-[13.5px]" : "text-[14px]")}>{detail(id, !card)}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div
        className={clsx(
          "mt-4 flex items-center justify-between gap-3 text-[15px]",
          !card && "rounded-[6px] bg-[#F4F2EF] px-4 py-3.5",
        )}
      >
        <span className="text-muted">Tuition</span>
        <b>
          ${TUITION.perCourse}/course · ${TUITION.bundlePrice} for {TUITION.bundleCourses}
        </b>
      </div>

      <Link href={applyHref} className="btn btn-orange mt-4 w-full">
        Apply for this program
        <ArrowRight size={18} aria-hidden />
      </Link>
      <WhatsAppLink
        pageName={`Programs › ${programName}`}
        className="mt-2 flex min-h-12 items-center justify-center gap-2 font-display font-bold text-success hover:underline"
      >
        <MessageCircle size={18} aria-hidden />
        {card ? "Ask a question" : "Ask a question on WhatsApp"}
      </WhatsAppLink>
    </div>
  );
}
