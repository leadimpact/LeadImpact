"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { searchSite } from "@/lib/search";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const results = useMemo(() => searchSite(query), [query]);

  return (
    <div className="max-w-3xl">
      <form
        role="search"
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          const q = new FormData(e.currentTarget).get("q");
          router.replace(`/search?q=${encodeURIComponent(String(q ?? ""))}`);
        }}
      >
        <label className="flex min-h-14 items-center gap-3 rounded-[6px] border-2 border-line px-4 focus-within:border-charcoal">
          <Search size={22} aria-hidden className="text-muted" />
          <span className="sr-only">Search the website</span>
          <input
            key={query}
            type="search"
            name="q"
            defaultValue={query}
            autoFocus
            placeholder="Try “apply”, “tuition” or “theology”"
            className="h-full flex-1 bg-transparent py-3 text-[17px] outline-none"
          />
          <button type="submit" className="btn btn-orange btn-sm">
            Search
          </button>
        </label>
      </form>

      {query && (
        <p role="status" className="mt-6 text-muted">
          {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
        </p>
      )}

      <ul className="mt-4">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="group flex items-center gap-4 border-b border-line py-4">
              <span className="flex-1">
                <span className="block font-display text-[18px] font-bold group-hover:text-orange-text">{r.label}</span>
                <span className="block text-[15px] text-muted">
                  {r.section}
                  {r.description ? ` · ${r.description}` : ""}
                </span>
              </span>
              <ArrowRight size={20} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      {query && results.length === 0 && (
        <p className="mt-4">
          Nothing matched. Ask us on{" "}
          <WhatsAppLink pageName="Search" className="font-bold text-orange-text underline">
            WhatsApp
          </WhatsAppLink>{" "}
          and a real person will point you to the right page.
        </p>
      )}
    </div>
  );
}
