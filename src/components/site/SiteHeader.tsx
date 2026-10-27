import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { APP_LINKS } from "@/content/site";
import { ActiveDesktopNav, DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileHeader } from "./MobileHeader";
import { ActiveMobileBackArrow, ActiveMobileSectionTabs } from "./MobileSectionTabs";
import { UtilityBar } from "./UtilityBar";

export function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-orange focus:px-4 focus:py-3 focus:font-display focus:font-extrabold focus:text-black"
      >
        Skip to content
      </a>

      <header className="relative z-30 hidden nav:block">
        <UtilityBar />
        <div className="relative flex h-24 items-center justify-between border-b border-line bg-white pl-[var(--page-gutter)]">
          {/* The crest overhangs the bar's top and bottom edges, like a badge; UtilityBar shows the name beside it. */}
          <Logo
            crestClassName="relative z-10 h-[150px] drop-shadow-[0_10px_16px_rgba(14,15,18,0.35)]"
            crestSizes="128px"
            priority
            wordmarkClassName="hidden"
          />
          <Suspense fallback={<DesktopNav pathname={null} />}>
            <ActiveDesktopNav />
          </Suspense>
          <div className="flex h-24">
            <Link
              href="/search"
              aria-label="Search the website"
              className="flex h-24 w-[72px] items-center justify-center border-l border-line hover:bg-bg min-[1400px]:w-20"
            >
              <Search size={22} aria-hidden />
            </Link>
            <Link
              href={APP_LINKS.apply}
              className="flex h-24 items-center gap-2.5 whitespace-nowrap bg-orange px-5 font-display text-[15px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-orange-hover min-[1400px]:px-7"
            >
              Apply now
              <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      {/* The whole header sticks (the crest spans both rows), so Apply and Login stay on screen. */}
      <header className="sticky top-0 z-40 nav:hidden">
        <MobileHeader />
        <Suspense fallback={null}>
          <ActiveMobileBackArrow />
        </Suspense>
      </header>
      <Suspense fallback={null}>
        <ActiveMobileSectionTabs />
      </Suspense>
    </>
  );
}
