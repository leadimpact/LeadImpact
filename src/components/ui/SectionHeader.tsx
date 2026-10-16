import clsx from "clsx";

interface SectionHeaderProps {
  /** Two-digit section number shown in orange beside the title on desktop ("01"). */
  number?: string;
  eyebrow: string;
  /** Shorter eyebrow for phones, where the designs abbreviate it. */
  mobileEyebrow?: string;
  title?: React.ReactNode;
  /** Button/link shown at the right on desktop. */
  action?: React.ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
}

/**
 * Numbered section header (signature motif): "01" in orange beside an uppercase title.
 * On phones the number drops away and the eyebrow gets its orange square (SM1).
 */
export function SectionHeader({
  number,
  eyebrow,
  mobileEyebrow,
  title,
  action,
  tone = "light",
  as: Heading = "h2",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={clsx("mb-6 flex items-end justify-between gap-8 md:mb-12", className)}>
      <div className="flex items-start gap-7">
        {number && (
          <span
            aria-hidden
            className={clsx(
              "hidden pt-1.5 font-display text-[20px] font-extrabold tracking-[-0.02em] md:block",
              dark ? "text-orange" : "text-orange-numeral",
            )}
          >
            {number}
          </span>
        )}
        <div>
          <p
            className={clsx(
              "eyebrow text-[12px] md:text-[13px] md:tracking-[0.18em] md:before:hidden",
              dark ? "text-orange" : "text-orange-text",
            )}
          >
            {mobileEyebrow ? (
              <>
                <span className="md:hidden">{mobileEyebrow}</span>
                <span className="hidden md:inline">{eyebrow}</span>
              </>
            ) : (
              eyebrow
            )}
          </p>
          {title && (
            <Heading
              className={clsx(
                "mt-3 max-w-[820px] font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[44px] md:uppercase md:leading-none xl:text-[54px]",
                dark ? "text-white" : "text-black",
                titleClassName,
              )}
            >
              {title}
            </Heading>
          )}
        </div>
      </div>
      {action && <div className="hidden flex-none md:block">{action}</div>}
    </div>
  );
}

interface TitleBlockProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

/** Inner-page heading (S06–S24): eyebrow with orange square, sentence-case title, optional intro. */
export function TitleBlock({ eyebrow, title, intro, tone = "light", id, className }: TitleBlockProps) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <p className={clsx("eyebrow text-[12px] md:text-[13px]", dark ? "text-orange" : "text-orange-text")}>{eyebrow}</p>
      <h2
        id={id}
        className={clsx(
          "mt-3.5 max-w-[800px] font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[42px] xl:text-[50px]",
          dark ? "text-white" : "text-black",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={clsx("mt-3.5 max-w-[720px] text-[19px] leading-relaxed", dark ? "text-on-dark" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}
