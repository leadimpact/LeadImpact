import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <section className="px-page py-14 md:py-20">
      <p className="eyebrow">Search</p>
      <h1 className="mt-3 font-display text-[clamp(32px,5vw,48px)] font-extrabold uppercase leading-none tracking-[-0.02em]">
        Find a page
      </h1>
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </section>
  );
}
