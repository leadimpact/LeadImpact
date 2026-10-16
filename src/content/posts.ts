import { COUNTRY_COUNT_WORD } from "./countries";

export type PostCategory = "university" | "campus" | "graduates" | "devotionals" | "newsletter";

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  university: "University news",
  campus: "Campus news",
  graduates: "Graduate stories",
  devotionals: "Devotionals",
  newsletter: "Newsletter",
};

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  /** ISO date. */
  date: string;
  readMinutes: number;
  excerpt: string;
  featured?: boolean;
}

/**
 * Sample stories from S21. Every article (and its body) is a placeholder until LIU's media team
 * supplies real stories (CHANGES_NEEDED.md).
 */
export const POSTS: Post[] = [
  {
    slug: "liu-learn-launch",
    title: "LIU launches LIU Learn — study anywhere, even offline",
    category: "university",
    date: "2026-10-12",
    readMinutes: 4,
    excerpt: `A new e-learning portal brings video, audio, reading and live classes to students in ${COUNTRY_COUNT_WORD} countries, with downloads for low-connectivity areas.`,
    featured: true,
  },
  {
    slug: "new-affiliate-study-centre",
    title: "[News story] A new affiliate study centre opens",
    category: "campus",
    date: "2026-12-05",
    readMinutes: 3,
    excerpt: "[Placeholder summary of a campus news story.]",
  },
  {
    slug: "graduate-spotlight-serving-in-kampala",
    title: "From Kampala to the nations: a graduate’s journey",
    category: "graduates",
    date: "2026-11-20",
    readMinutes: 4,
    excerpt: "[Placeholder summary of a graduate story — needs the graduate’s consent.]",
  },
  {
    slug: "chaplaincy-diploma-approved",
    title: "Board of Regents approves new Chaplaincy diploma",
    category: "university",
    date: "2026-11-02",
    readMinutes: 3,
    excerpt: "[Placeholder summary of a university news story.]",
  },
  {
    slug: "leading-like-nehemiah",
    title: "Leading like Nehemiah in difficult times",
    category: "devotionals",
    date: "2026-10-28",
    readMinutes: 5,
    excerpt: "[Placeholder summary of a devotional.]",
  },
  {
    slug: "power-bible-college-leadership-week",
    title: "Power Bible College hosts leadership week",
    category: "campus",
    date: "2026-10-15",
    readMinutes: 3,
    excerpt: "[Placeholder summary of a campus news story.]",
  },
  {
    slug: "october-newsletter",
    title: "October newsletter: admissions, events and more",
    category: "newsletter",
    date: "2026-10-01",
    readMinutes: 2,
    excerpt: "[Placeholder summary of the monthly newsletter.]",
  },
];

export const postHref = (p: Post) => `/media/blog/${p.slug}`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** "12 Oct 2026" — fixed format so server and browser render the same text. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${String(d).padStart(2, "0")} ${month} ${y}`;
}
