import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  MapPin,
  MessageCircle,
  Newspaper,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { EXPLORE, type ExploreIcon } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS: Record<ExploreIcon, LucideIcon> = {
  university: Landmark,
  admissions: ClipboardCheck,
  academics: GraduationCap,
  programs: BookOpen,
  students: UserRound,
  affiliates: MapPin,
  media: Newspaper,
  contact: MessageCircle,
};

/**
 * Phones only: every section of the desktop menu, with its key pages as large tap targets, so
 * students reach everything from the home page without opening the menu. Desktop has the menu bar.
 */
export function ExploreLiu() {
  return (
    <section aria-labelledby="explore-liu" className="bg-bg px-page py-10 md:hidden">
      <SectionHeader eyebrow="Everything in one place" title={<span id="explore-liu">Explore LIU</span>} className="mb-5" />
      <ul className="space-y-3">
        {EXPLORE.map((section) => {
          const Icon = ICONS[section.icon];
          return (
            <li key={section.title} className="rounded-[10px] border-[1.5px] border-line bg-white p-4">
              <div className="flex items-center gap-3">
                <span aria-hidden className="flex size-10 flex-none items-center justify-center rounded-[8px] bg-orange-soft text-orange-text">
                  <Icon size={20} />
                </span>
                <h3 className="flex-1 font-display text-[18px] font-extrabold tracking-[-0.01em]">{section.title}</h3>
                <Link
                  href={section.href}
                  aria-label={`See all: ${section.title}`}
                  className="flex min-h-11 items-center gap-1 font-display text-[13px] font-extrabold uppercase tracking-[0.06em] text-orange-text"
                >
                  See all
                  <ChevronRight size={16} aria-hidden />
                </Link>
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex min-h-12 items-center rounded-[6px] bg-[#F4F2EF] px-3 py-2 text-[14.5px] font-bold leading-tight text-ink active:bg-line"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
