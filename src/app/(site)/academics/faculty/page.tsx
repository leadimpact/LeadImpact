import type { Metadata } from "next";
import { Suspense } from "react";
import { FACULTY_PAGE } from "@/content/academics";
import { PageHero } from "@/components/ui/PageHero";
import { FacultyDirectory } from "./FacultyDirectory";

export const metadata: Metadata = {
  title: "Faculty & Staff",
  description: FACULTY_PAGE.hero.subtitle,
};

/** S15 */
export default function FacultyPage() {
  return (
    <>
      <PageHero
        title={FACULTY_PAGE.hero.title}
        subtitle={FACULTY_PAGE.hero.subtitle}
        bannerLabel={FACULTY_PAGE.hero.bannerLabel}
        banner={FACULTY_PAGE.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Academics", href: "/academics/academic-affairs" }, { label: "Faculty & Staff" }]}
      />
      <Suspense fallback={<div className="h-[800px]" />}>
        <FacultyDirectory />
      </Suspense>
    </>
  );
}
