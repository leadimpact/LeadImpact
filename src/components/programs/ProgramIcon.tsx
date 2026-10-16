import {
  BookOpen,
  Briefcase,
  Church,
  Globe2,
  GraduationCap,
  Heart,
  Music,
  ScrollText,
  Shield,
  Star,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ProgramIcon as IconName } from "@/content/programs";

const ICONS: Record<IconName, LucideIcon> = {
  book: BookOpen,
  scroll: ScrollText,
  star: Star,
  heart: Heart,
  shield: Shield,
  cap: GraduationCap,
  sun: Sun,
  users: Users,
  briefcase: Briefcase,
  church: Church,
  globe: Globe2,
  music: Music,
};

export function ProgramIcon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  const Icon = ICONS[name];
  return <Icon size={size} aria-hidden className={className} />;
}
