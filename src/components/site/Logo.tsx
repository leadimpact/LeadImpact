import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MEDIA } from "@/content/media";
import { cloudinaryEnabled } from "@/config/media";
import { Crest } from "./Crest";

interface LogoProps {
  /** xs: the phone header, where the name shares the row with Apply and Login. */
  size?: "md" | "sm" | "xs";
  tone?: "light" | "dark";
  /** Crest height and placement, e.g. a tall crest that overhangs the header edges. */
  crestClassName?: string;
  /** next/image sizes hint matching the crest's rendered width. */
  crestSizes?: string;
  /** Load the crest early (it is in the first screen in the header). */
  priority?: boolean;
  /** E.g. hide the name where space is tight; the link keeps its accessible name. */
  wordmarkClassName?: string;
  className?: string;
}

/** The official 3D crest (Cloudinary) and wordmark; the flat Crest stands in when Cloudinary is off. */
export function Logo({ size = "md", tone = "light", crestClassName, crestSizes = "64px", priority, wordmarkClassName, className }: LogoProps) {
  const sm = size === "sm" || size === "xs";
  const xs = size === "xs";
  const crestClass = crestClassName ?? (sm ? "h-[42px]" : "h-[52px]");
  return (
    <Link
      href="/"
      aria-label="LeadImpact University — home"
      className={clsx("flex shrink-0 items-center gap-3", className)}
    >
      {cloudinaryEnabled() ? (
        <Image
          src={MEDIA.crest.id}
          alt=""
          width={521}
          height={616}
          sizes={crestSizes}
          priority={priority}
          className={clsx("w-auto flex-none", crestClass)}
        />
      ) : (
        <Crest className={clsx("w-auto", crestClass)} />
      )}
      <span aria-hidden className={clsx("leading-[1.1]", wordmarkClassName)}>
        <span
          className={clsx(
            "block font-display font-extrabold tracking-[-0.02em]",
            xs ? "text-[16px]" : sm ? "text-[18px]" : "text-[21px]",
            tone === "dark" ? "text-white" : "text-charcoal",
          )}
        >
          LeadImpact
        </span>
        <span
          className={clsx(
            "mt-[3px] block font-display font-semibold",
            xs ? "text-[9.5px] tracking-[0.18em]" : sm ? "text-[10.5px] tracking-[0.2em]" : "text-[12.5px] tracking-[0.2em]",
            tone === "dark" ? "text-[#B9B6B1]" : "text-muted",
          )}
        >
          UNIVERSITY
        </span>
      </span>
    </Link>
  );
}
