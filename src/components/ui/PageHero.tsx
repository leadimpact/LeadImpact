import Link from "next/link";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import type { MediaAsset } from "@/content/media";
import { cloudinaryEnabled } from "@/config/media";
import { Photo } from "./Photo";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Shorter subtitle for phones (SM4). */
  mobileSubtitle?: string;
  /** Breadcrumb trail; the last item is the current page. */
  crumbs: Crumb[];
  /** What the banner shows; labels the placeholder when there is no photo (CHANGES_NEEDED.md). */
  bannerLabel: string;
  /** Banner photo behind the dark gradient. */
  banner?: MediaAsset;
  /** Right-hand card on desktop (S10 "100% of tuition"); stacks under the title on phones. */
  aside?: React.ReactNode;
  /** Buttons shown in the hero on phones only (SM4 "Start application"). */
  mobileActions?: React.ReactNode;
  /** Hide the desktop breadcrumb tab when a card overlaps the hero edge instead (S12 filters). */
  hideCrumbTab?: boolean;
}

/**
 * Dark page hero for inner pages (S06–S24): orange rule, uppercase title, and the breadcrumb
 * "tab" on the hero's bottom edge. On phones (SM3/SM4) it becomes compact: a short breadcrumb
 * line on top, a sentence-case title and the page's main buttons.
 */
export function PageHero({
  title,
  subtitle,
  mobileSubtitle,
  crumbs,
  bannerLabel,
  banner,
  aside,
  mobileActions,
  hideCrumbTab,
}: PageHeroProps) {
  const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : undefined;
  const current = crumbs[crumbs.length - 1];

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      {banner && cloudinaryEnabled() ? (
        <Photo asset={banner} alt="" sizes="100vw" priority className="lite-hide absolute! inset-0" />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${bannerLabel}`}
          className="placeholder absolute inset-0 items-end! justify-start! gap-2! pr-5 pt-5 md:pr-10 md:pt-6"
        >
          <ImageIcon size={28} aria-hidden className="hidden md:block" />
          <span className="placeholder-label hidden px-0! md:block">{bannerLabel}</span>
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,15,18,.96)_0%,rgba(14,15,18,.85)_50%,rgba(14,15,18,.45)_100%)]"
      />

      {/* Phones: short breadcrumb line (SM4) */}
      <nav aria-label="Breadcrumb" className="relative px-5 pt-6 md:hidden">
        <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-[#B9B6B1]">
          {parent && (
            <li className="flex items-center gap-2">
              {parent.href ? <Link href={parent.href}>{parent.label}</Link> : parent.label}
              <ChevronRight size={14} aria-hidden />
            </li>
          )}
          <li aria-current="page" className="font-bold text-orange">
            {current.label}
          </li>
        </ol>
      </nav>

      <div className="relative flex flex-col gap-8 px-page pb-8 pt-3 md:flex-row md:items-center md:gap-14 md:pb-[100px] md:pt-20">
        <div className="flex-1">
          <div aria-hidden className="hidden h-1.5 w-[72px] bg-orange md:block" />
          <h1 className="max-w-[1200px] font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.02em] md:mt-6 md:text-[52px] md:uppercase md:tracking-[-0.01em] xl:text-[66px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-[680px] text-[17px] leading-relaxed text-[#DAD7D2] md:mt-[18px] md:text-[20px]">
              {mobileSubtitle ? (
                <>
                  <span className="md:hidden">{mobileSubtitle}</span>
                  <span className="hidden md:inline">{subtitle}</span>
                </>
              ) : (
                subtitle
              )}
            </p>
          )}
          {mobileActions && <div className="mt-6 flex flex-col gap-3 md:hidden">{mobileActions}</div>}
        </div>
        {aside && <div className="md:w-[420px] md:flex-none">{aside}</div>}
      </div>

      {/* Desktop: breadcrumb tab on the bottom edge */}
      {!hideCrumbTab && (
      <nav
        aria-label="Breadcrumb"
        className="relative mx-[var(--page-gutter)] hidden max-w-[calc(100%-2*var(--page-gutter))] border-t-4 border-orange bg-white px-7 py-4 md:inline-flex"
      >
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-muted">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-2.5">
                {last ? (
                  <span aria-current="page" className="font-extrabold text-orange-text">
                    {c.label}
                  </span>
                ) : c.href ? (
                  <Link href={c.href} className="hover:text-ink hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      )}
    </section>
  );
}
