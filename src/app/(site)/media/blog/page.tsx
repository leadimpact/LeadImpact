import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { BlogList } from "./BlogList";
import { NewsletterBand } from "./NewsletterBand";
import { photo } from "@/content/media";

export const metadata: Metadata = {
  title: "News, stories & newsletter",
  description: "Updates from our colleges, campuses and graduates around the world.",
};

/** S21 */
export default function BlogPage() {
  return (
    <>
      <PageHero
        title="News, stories & newsletter"
        subtitle="Updates from our colleges, campuses and graduates around the world."
        bannerLabel="News, stories & newsletter · banner photo"
        banner={photo("executiveMasterclass", 4)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Media", href: "/media/blog" }, { label: "Blog & newsletter" }]}
      />
      <Suspense fallback={<div className="h-[900px]" />}>
        <BlogList />
      </Suspense>
      <NewsletterBand />
    </>
  );
}
