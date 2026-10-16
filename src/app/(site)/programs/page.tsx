import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramFinder } from "@/components/programs/ProgramFinder";
import { photo } from "@/content/media";

export const metadata: Metadata = {
  title: "Find your program",
  description: "Twelve programs in seven colleges — from Certificate to Doctorate, online or on campus.",
};

/** S12 */
export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Find your program"
        subtitle="Twelve programs in seven colleges — from Certificate to Doctorate, online or on campus."
        bannerLabel="Find your program · banner photo"
        banner={photo("masterclass", 11)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "All programs" }]}
        hideCrumbTab
      />
      {/* useSearchParams needs a Suspense boundary so the hero stays in the static shell. */}
      <Suspense fallback={<div className="h-[600px]" />}>
        <ProgramFinder />
      </Suspense>
    </>
  );
}
