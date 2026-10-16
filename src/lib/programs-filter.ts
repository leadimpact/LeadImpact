import { COLLEGES, type CollegeSlug } from "@/content/colleges";
import { LEVEL_ORDER, PROGRAMS, type LevelId, type Program } from "@/content/programs";

export const PAGE_SIZE = 9;

export interface ProgramFilters {
  q: string;
  college: CollegeSlug | "";
  level: LevelId | "";
  page: number;
}

const isCollege = (v: string | null): v is CollegeSlug => COLLEGES.some((c) => c.slug === v);
const isLevel = (v: string | null): v is LevelId => LEVEL_ORDER.includes(v as LevelId);

/** Read filters from URL params; unknown values are ignored rather than erroring. */
export function parseFilters(params: { get(name: string): string | null }): ProgramFilters {
  const page = Number.parseInt(params.get("page") ?? "1", 10);
  return {
    q: (params.get("q") ?? "").trim(),
    college: isCollege(params.get("college")) ? (params.get("college") as CollegeSlug) : "",
    level: isLevel(params.get("level")) ? (params.get("level") as LevelId) : "",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function toSearch(filters: Partial<ProgramFilters>): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.college) params.set("college", filters.college);
  if (filters.level) params.set("level", filters.level);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  const s = params.toString();
  return s ? `?${s}` : "";
}

export function filterPrograms(filters: ProgramFilters, programs: Program[] = PROGRAMS): Program[] {
  const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
  return programs.filter((p) => {
    if (filters.college && p.college !== filters.college) return false;
    if (filters.level && !p.levels.includes(filters.level)) return false;
    if (terms.length === 0) return true;
    const college = COLLEGES.find((c) => c.slug === p.college)?.name ?? "";
    const haystack = `${p.name} ${college} ${p.summary}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), pages);
  return { items: items.slice((current - 1) * size, current * size), page: current, pages };
}
