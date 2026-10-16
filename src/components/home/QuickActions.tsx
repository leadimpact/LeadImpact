import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ChevronRight, CreditCard, PenLine, Play, User, type LucideIcon } from "lucide-react";
import { QUICK_ACTIONS, type QuickActionIcon } from "@/content/home";

const ICONS: Record<QuickActionIcon, LucideIcon> = { apply: PenLine, pay: CreditCard, login: User, learn: Play };

/** Orange quick-action bar under the hero (S01); stacked cards on phones (SM1), without Apply (the hero has it). */
export function QuickActions() {
  return (
    <nav aria-label="Quick actions">
      {/* Desktop / tablet */}
      <ul className="hidden grid-cols-2 bg-orange md:grid xl:grid-cols-4">
        {QUICK_ACTIONS.map((a, i) => {
          const Icon = ICONS[a.icon];
          const first = i === 0;
          return (
            <li key={a.href} className={clsx(!first && "border-l-2 border-black/15")}>
              <Link
                href={a.href}
                className={clsx(
                  "group flex h-full items-center gap-4 px-8 py-7",
                  first ? "bg-black text-white hover:bg-charcoal" : "text-black hover:bg-orange-hover",
                )}
              >
                <Icon size={30} aria-hidden className={first ? "text-orange" : "text-black"} />
                <span className="flex-1">
                  <span className="block font-display text-[17px] font-extrabold uppercase tracking-[0.06em]">
                    {a.label}
                  </span>
                  <span className={clsx("mt-[3px] block text-[15px]", first ? "text-on-dark" : "text-[#3A2410]")}>
                    {a.detail}
                  </span>
                </span>
                <ArrowRight size={22} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Phones: the hero's "Start your application" is the apply button, so it isn't repeated here. */}
      <ul className="bg-charcoal px-5 pb-5 pt-1.5 md:hidden">
        {QUICK_ACTIONS.filter((a) => a.icon !== "apply").map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <li key={a.href} className="mt-2.5">
              <Link href={a.href} className="flex min-h-[64px] items-center gap-3.5 rounded-[8px] bg-white/[0.07] p-4 text-white">
                <Icon size={22} aria-hidden className="text-orange" />
                <span className="flex-1">
                  <span className="block font-display text-[17px] font-extrabold tracking-[-0.02em]">{a.mobileLabel}</span>
                  <span className="block text-[13.5px] text-[#B9B6B1]">{a.mobileDetail}</span>
                </span>
                <ChevronRight size={20} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
