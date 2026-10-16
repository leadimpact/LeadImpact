"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, Search, User } from "lucide-react";
import { COLLEGES, findCollege, type CollegeSlug } from "@/content/colleges";
import { FACULTY, facultyHref } from "@/content/faculty";
import { FACULTY_PAGE } from "@/content/academics";
import { EMAILS, mailto } from "@/config/domains";
import { COLLEGE_ICONS } from "@/components/programs/collegeIcons";

/** S15 directory: search by name or college, filter by college. State lives in the URL. */
export function FacultyDirectory() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const collegeParam = params.get("college");
  const college = findCollege(collegeParam ?? "")?.slug;

  // router.replace updates the URL asynchronously, so remember the latest requested query and
  // build each change on top of it — otherwise quick successive changes overwrite each other.
  const latest = useRef(params.toString());
  useEffect(() => {
    latest.current = params.toString();
  }, [params]);

  const set = (key: "q" | "college", value: string) => {
    const next = new URLSearchParams(latest.current);
    if (value) next.set(key, value);
    else next.delete(key);
    const s = next.toString();
    latest.current = s;
    router.replace(`${pathname}${s ? `?${s}` : ""}`, { scroll: false });
  };

  const groups = COLLEGES.filter((c) => !college || c.slug === college)
    .map((c) => ({
      college: c,
      people: FACULTY.filter(
        (f) =>
          f.colleges.includes(c.slug) &&
          (!q || f.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)),
      ),
    }))
    .filter((g) => g.people.length > 0);

  return (
    <div className="px-page py-10 md:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-h-[52px] items-center gap-3 rounded-[6px] border-[1.5px] border-line px-4 sm:w-[420px]">
          <Search size={18} aria-hidden className="text-muted" />
          <span className="sr-only">Search by name or college</span>
          <input
            type="search"
            defaultValue={params.get("q") ?? ""}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Search by name or college"
            className="h-full flex-1 bg-transparent outline-none"
          />
        </label>
        <label className="relative flex min-h-[52px] items-center">
          <span className="sr-only">Filter by college</span>
          <select
            value={college ?? ""}
            onChange={(e) => set("college", e.target.value)}
            className="min-h-[52px] appearance-none bg-transparent pl-2 pr-8 text-right font-display font-bold outline-none"
          >
            <option value="">All colleges</option>
            {COLLEGES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.short}
              </option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-0" />
        </label>
      </div>

      <p role="status" className="sr-only">
        {groups.reduce((n, g) => n + g.people.length, 0)} people found
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {groups.map(({ college: c, people }) => {
          const Icon = COLLEGE_ICONS[c.slug as CollegeSlug];
          return (
            <section key={c.slug} aria-labelledby={`college-${c.slug}`} className="rounded-[8px] border-[1.5px] border-line p-5 md:p-6">
              <h2 id={`college-${c.slug}`} className="flex items-center gap-3 border-b border-line pb-4 font-display text-[21px] font-extrabold leading-tight tracking-[-0.02em]">
                <span aria-hidden className="flex size-9 flex-none items-center justify-center rounded-[6px] bg-orange-soft text-orange-text">
                  <Icon size={18} />
                </span>
                {c.name}
              </h2>
              <ul>
                {people.map((f) => (
                  <li key={f.slug} className="border-b border-line last:border-b-0">
                    <Link href={facultyHref(f)} className="group flex min-h-[72px] items-center gap-4 py-3">
                      <span aria-hidden className="placeholder size-[54px] flex-none rounded-[6px]">
                        <User size={24} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-[17px] font-extrabold group-hover:text-orange-text">{f.name}</span>
                        <span className="block text-[14px] text-muted">{f.role}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-display text-[14px] font-bold text-orange-text">
                        Profile <ArrowRight size={14} aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {!q && !college && (
          <section aria-labelledby="teach" className="on-dark rounded-[8px] bg-charcoal p-7 text-white">
            <h2 id="teach" className="font-display text-[26px] font-extrabold tracking-[-0.02em]">
              {FACULTY_PAGE.teach.title}
            </h2>
            <p className="mt-3 text-on-dark">{FACULTY_PAGE.teach.text}</p>
            <a href={mailto(EMAILS.info, "Adjunct faculty enquiry")} className="btn btn-orange mt-5">
              Join our faculty
              <ArrowRight size={18} aria-hidden />
            </a>
          </section>
        )}
      </div>

      {groups.length === 0 && <p className="mt-6 text-muted">No one matches “{params.get("q")}”. Try another name or college.</p>}
    </div>
  );
}
