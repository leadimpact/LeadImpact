"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Search } from "lucide-react";
import { COLLEGES, findCollege } from "@/content/colleges";
import { LEVELS, LEVEL_ORDER } from "@/content/programs";
import { filterPrograms, paginate, parseFilters, toSearch, type ProgramFilters } from "@/lib/programs-filter";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { ProgramCard } from "./ProgramCard";

const fieldLabel = "block font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted";

/** S12 filter bar, college chips, results grid and pagination. Filters live in the URL. */
export function ProgramFinder() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filters = parseFilters(params);
  const results = useMemo(() => filterPrograms(filters), [filters.q, filters.college, filters.level]); // eslint-disable-line react-hooks/exhaustive-deps
  const { items, page, pages } = paginate(results, filters.page);

  // router.replace updates the URL asynchronously; build each change on the latest requested
  // query so quick successive changes combine instead of overwriting each other.
  const latest = useRef(params.toString());
  useEffect(() => {
    latest.current = params.toString();
  }, [params]);

  const update = (next: Partial<ProgramFilters>) => {
    // Any filter change returns to page 1 unless the page itself is changing.
    const merged = { ...parseFilters(new URLSearchParams(latest.current)), page: 1, ...next };
    const search = toSearch(merged);
    latest.current = search.replace(/^\?/, "");
    router.replace(`${pathname}${search}`, { scroll: false });
  };
  const pageHref = (n: number) => `${pathname}${toSearch({ ...filters, page: n })}`;
  const emptyCollege = filters.college ? findCollege(filters.college) : undefined;

  return (
    <>
      <form
        role="search"
        aria-label="Find a program"
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: String(new FormData(e.currentTarget).get("q") ?? "").trim() });
        }}
        className="relative z-10 mx-[var(--page-gutter)] -mt-8 grid grid-cols-1 overflow-hidden rounded-[8px] bg-white shadow-[0_20px_50px_rgba(14,15,18,0.18)] sm:grid-cols-2 lg:flex lg:items-stretch"
      >
        <label className="flex min-h-[64px] items-center gap-3 border-b border-line px-5 sm:col-span-2 lg:flex-[1.4] lg:border-b-0 lg:border-r lg:border-t-4 lg:border-t-orange">
          <Search size={20} aria-hidden className="flex-none text-muted" />
          <span className="sr-only">Search programs</span>
          <input
            key={filters.q}
            name="q"
            type="search"
            defaultValue={filters.q}
            placeholder="Search programs, e.g. “counseling”"
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none"
          />
        </label>
        <Select
          label="Level"
          value={filters.level}
          onChange={(v) => update({ level: v as ProgramFilters["level"] })}
          options={[["", "Any level"], ...LEVEL_ORDER.map((l) => [l, LEVELS[l].label] as [string, string])]}
        />
        <Select
          label="College"
          value={filters.college}
          onChange={(v) => update({ college: v as ProgramFilters["college"] })}
          options={[["", "All colleges"], ...COLLEGES.map((c) => [c.slug, c.short] as [string, string])]}
        />
        {/* Every program runs online and on campus, so study mode is information, not a filter. */}
        <div className="flex min-h-[64px] flex-col justify-center border-b border-line px-5 lg:flex-1 lg:border-b-0 lg:border-r">
          <span className={fieldLabel}>Study mode</span>
          <span className="text-[16px] font-bold">Online or campus</span>
        </div>
        <div className="flex items-center p-3 sm:col-span-2 lg:col-span-1">
          <button type="submit" className="btn btn-dark w-full lg:w-auto">
            Search
          </button>
        </div>
      </form>

      <div className="px-page pb-16 pt-8 md:pb-[100px]">
        <ul aria-label="Filter by college" className="flex flex-wrap gap-2">
          {[{ slug: "", short: "All colleges" }, ...COLLEGES].map((c) => {
            const on = filters.college === c.slug;
            return (
              <li key={c.slug || "all"}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => update({ college: c.slug as ProgramFilters["college"] })}
                  className={clsx(
                    "min-h-10 rounded-[4px] px-3.5 font-display text-[12.5px] font-bold uppercase tracking-[0.05em]",
                    on ? "bg-orange text-black" : "bg-[#EFEDEA] text-ink hover:bg-line",
                  )}
                >
                  {c.short}
                </button>
              </li>
            );
          })}
        </ul>

        <p role="status" className="mt-6 text-[15px] text-muted">
          {results.length} {results.length === 1 ? "program" : "programs"}
          {filters.q && <> matching “{filters.q}”</>}
        </p>

        {items.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug}>
                <ProgramCard program={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-[10px] border-[1.5px] border-dashed border-line p-8 text-center">
            <p className="font-display text-[20px] font-extrabold">
              {emptyCollege && !filters.q && !filters.level
                ? `Programs in the ${emptyCollege.name} are coming soon.`
                : "No programs match these filters."}
            </p>
            <p className="mt-2 text-muted">Ask us and an adviser will help you find the right program.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <WhatsAppLink pageName="Programs" className="btn btn-whatsapp">
                <MessageCircle size={18} aria-hidden />
                Ask on WhatsApp
              </WhatsAppLink>
              <Link href="/programs" className="btn btn-outline">
                Show all programs
              </Link>
            </div>
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
            <PageLink href={pageHref(page - 1)} disabled={page === 1} label="Previous page">
              <ChevronLeft size={18} aria-hidden />
            </PageLink>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <PageLink key={n} href={pageHref(n)} current={n === page} label={`Page ${n}`}>
                {n}
              </PageLink>
            ))}
            <PageLink href={pageHref(page + 1)} disabled={page === pages} label="Next page">
              <ChevronRight size={18} aria-hidden />
            </PageLink>
          </nav>
        )}
      </div>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="relative flex min-h-[64px] flex-col justify-center border-b border-line px-5 sm:border-r lg:flex-1 lg:border-b-0">
      <span className={fieldLabel}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-[16px] font-bold outline-none"
      >
        {options.map(([v, text]) => (
          <option key={v || "any"} value={v}>
            {text}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
    </label>
  );
}

function PageLink({
  href,
  current,
  disabled,
  label,
  children,
}: {
  href: string;
  current?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const cls = clsx(
    "flex size-12 items-center justify-center rounded-[4px] border-[1.5px] font-display font-extrabold",
    current ? "border-orange bg-orange text-black" : "border-line bg-white hover:border-charcoal",
    disabled && "pointer-events-none opacity-40",
  );
  if (disabled) {
    return (
      <span role="link" aria-disabled="true" aria-label={label} className={cls}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} scroll={false} aria-label={label} aria-current={current ? "page" : undefined} className={cls}>
      {children}
    </Link>
  );
}
