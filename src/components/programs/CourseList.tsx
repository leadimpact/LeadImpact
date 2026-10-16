"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Tbc } from "@/components/ui/Tbc";

/**
 * "Courses you'll take" (S13/SM3). Phones show the first four until expanded; the expanded
 * state also reveals the note that the full curriculum is still to be published.
 */
export function CourseList({ courses }: { courses: { title: string; credits: number }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ol className="grid gap-x-3 md:mt-4 md:grid-cols-2 md:gap-y-3">
        {courses.map((c, i) => (
          <li
            key={c.title}
            className={clsx(
              "items-center gap-4 border-b border-line py-3.5 md:rounded-[6px] md:border-[1.5px] md:px-4",
              i >= 4 && !open ? "hidden md:flex" : "flex",
            )}
          >
            <span aria-hidden className="w-8 font-display text-[20px] font-extrabold text-orange-numeral">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-bold">{c.title}</span>
            <span className="text-[14px] text-muted">{c.credits} cr</span>
          </li>
        ))}
      </ol>
      {open && (
        <p className="mt-4 text-[15px] text-muted">
          <Tbc>The full course list for each level will be published here.</Tbc>
        </p>
      )}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="btn btn-outline mt-5 w-full md:hidden"
      >
        {open ? "Show fewer courses" : "Show all courses"}
        <ChevronDown size={18} aria-hidden className={clsx("transition-transform", open && "rotate-180")} />
      </button>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="mt-4 hidden min-h-11 items-center gap-2 font-display font-bold text-orange-text hover:underline md:inline-flex"
      >
        {open ? "Hide the full course list" : "See the full course list"}
        <ChevronDown size={16} aria-hidden className={clsx("transition-transform", open && "rotate-180")} />
      </button>
    </>
  );
}
