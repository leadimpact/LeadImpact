import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { APP_LINKS } from "@/content/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="on-dark flex-1 bg-black px-page py-20 text-white md:py-28">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(36px,6vw,66px)] font-extrabold uppercase leading-[1.02] tracking-[-0.01em]">
          We couldn’t find that <span className="text-orange">page.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[19px] text-on-dark">
          The link may be old or mistyped. These will get you back on track:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={APP_LINKS.apply} className="btn btn-orange">
            Apply now
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/" className="btn btn-outline-light">
            Home page
          </Link>
          <Link href="/search" className="btn btn-outline-light">
            <Search size={18} aria-hidden />
            Search
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
