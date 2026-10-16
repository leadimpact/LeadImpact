"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Search } from "lucide-react";
import { POSTS, POST_CATEGORY_LABELS, formatPostDate, postHref, type PostCategory } from "@/content/posts";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const CATEGORIES = Object.keys(POST_CATEGORY_LABELS) as PostCategory[];
const isCategory = (v: string | null): v is PostCategory => CATEGORIES.includes(v as PostCategory);

/** S21 category chips, search, featured story and grid. Filters live in the URL. */
export function BlogList() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = isCategory(params.get("category")) ? (params.get("category") as PostCategory) : undefined;
  const q = (params.get("q") ?? "").trim().toLowerCase();

  // Build each change on the latest requested query (router.replace is asynchronous).
  const latest = useRef(params.toString());
  useEffect(() => {
    latest.current = params.toString();
  }, [params]);
  const set = (key: "category" | "q", value: string) => {
    const next = new URLSearchParams(latest.current);
    if (value) next.set(key, value);
    else next.delete(key);
    latest.current = next.toString();
    router.replace(`${pathname}${latest.current ? `?${latest.current}` : ""}`, { scroll: false });
  };

  const filtered = POSTS.filter(
    (p) => (!category || p.category === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)),
  );
  const showFeatured = !category && !q;
  const featured = showFeatured ? filtered.find((p) => p.featured) : undefined;
  const rest = filtered.filter((p) => p !== featured);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-line px-page py-5 lg:flex-row lg:items-center lg:justify-between">
        <ul aria-label="Filter stories" className="flex flex-wrap gap-2">
          {[undefined, ...CATEGORIES].map((c) => {
            const on = c === category;
            return (
              <li key={c ?? "all"}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("category", c ?? "")}
                  className={clsx(
                    "min-h-10 rounded-[4px] px-3.5 font-display text-[12.5px] font-bold uppercase tracking-[0.05em]",
                    on ? "bg-orange-text text-white" : "bg-[#EFEDEA] text-ink hover:bg-line",
                  )}
                >
                  {c ? POST_CATEGORY_LABELS[c] : "All"}
                </button>
              </li>
            );
          })}
        </ul>
        <label className="flex min-h-12 items-center gap-2.5 rounded-[6px] border-[1.5px] border-line px-4 lg:w-[300px]">
          <Search size={18} aria-hidden className="text-muted" />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            defaultValue={params.get("q") ?? ""}
            onChange={(e) => set("q", e.target.value.trim())}
            placeholder="Search articles"
            className="h-full flex-1 bg-transparent outline-none"
          />
        </label>
      </div>

      <div className="px-page py-10 md:py-14">
        <p role="status" className="sr-only">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        </p>
        {featured && (
          <article className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <ImagePlaceholder label="Featured · LIU Learn launch" className="h-[260px] rounded-[8px] lg:h-[340px] lg:w-[56%]" />
            <div className="flex-1">
              <p className="flex items-center gap-3 text-[14px] text-muted">
                <span className="chip chip-orange">Featured</span>
                {formatPostDate(featured.date)} · {featured.readMinutes} min read
              </p>
              <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[38px]">{featured.title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">{featured.excerpt}</p>
              <Link href={postHref(featured)} className="btn btn-dark mt-6">
                Read story
                <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </article>
        )}

        {rest.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={postHref(p)} className="group block">
                  <ImagePlaceholder label={POST_CATEGORY_LABELS[p.category]} iconSize={26} className="h-[190px] rounded-[6px]" />
                  <p className="mt-4 flex items-center gap-3 text-[13.5px] text-muted">
                    <span className="chip chip-orange px-2 py-1 text-[10.5px]">{POST_CATEGORY_LABELS[p.category]}</span>
                    {formatPostDate(p.date)}
                  </p>
                  <h2 className="mt-3 font-display text-[20px] font-extrabold leading-tight tracking-[-0.02em] group-hover:text-orange-text">
                    {p.title}
                  </h2>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-display text-[14.5px] font-bold text-orange-text">
                    Read more <ArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !featured && <p className="text-muted">No stories match. Try another category or search.</p>
        )}
      </div>
    </>
  );
}
