import {
  BookOpen,
  Church,
  GraduationCap,
  HeartHandshake,
  Mic,
  MonitorPlay,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CollegeSlug } from "@/content/colleges";

export const COLLEGE_ICONS: Record<CollegeSlug, LucideIcon> = {
  theology: BookOpen,
  counseling: HeartHandshake,
  education: GraduationCap,
  leadership: Users,
  communication: Mic,
  ministry: Church,
  multimedia: MonitorPlay,
};
