import Link from "next/link";
import { ArrowRight, Globe, WifiOff } from "lucide-react";
import { findCollege } from "@/content/colleges";
import { LEVELS, programHref, type Program } from "@/content/programs";
import { TUITION } from "@/content/colleges";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ProgramIcon } from "./ProgramIcon";

/** Program card (S12). */
export function ProgramCard({ program }: { program: Program }) {
  const college = findCollege(program.college);
  return (
    <Link
      href={programHref(program)}
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border-[1.5px] border-line bg-white hover:border-charcoal"
    >
      <ImagePlaceholder label={program.imageLabel} iconSize={26} className="h-[150px] flex-none" />
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-orange-text">{college?.name}</p>
        <h2 className="mt-2.5 flex items-center gap-3 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em]">
          <span aria-hidden className="flex size-[34px] flex-none items-center justify-center rounded-[6px] bg-orange-soft text-orange-text">
            <ProgramIcon name={program.icon} />
          </span>
          {program.name}
        </h2>
        <ul aria-label="Levels" className="mt-4 flex flex-wrap gap-1.5">
          {program.levels.map((l) => (
            <li key={l} className="chip chip-orange px-2.5 py-1 text-[10.5px]">
              {LEVELS[l].short}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-muted">
          <span className="flex items-center gap-1.5">
            <Globe size={14} aria-hidden /> Online & campus
          </span>
          <span className="flex items-center gap-1.5">
            <WifiOff size={14} aria-hidden /> Offline lessons
          </span>
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span>
            <b>${TUITION.perCourse}</b> <span className="text-muted">/ course</span>
          </span>
          <span className="flex items-center gap-1.5 font-display text-[15px] font-bold text-orange-text group-hover:underline">
            View program
            <ArrowRight size={16} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
