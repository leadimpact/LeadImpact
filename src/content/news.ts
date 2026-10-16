import { photo, type MediaAsset } from "./media";

export type NewsCategory = "Masterclass" | "Conference" | "News" | "Newsletter";

export interface NewsItem {
  slug: string;
  category: NewsCategory;
  title: string;
  /** Short title for compact mobile cards. */
  shortTitle: string;
  meta: string;
  shortMeta: string;
  /** Day and month for the date badge; "TBC" when not yet fixed. */
  date: { day: string; month: string };
  /** Events appear in the mobile "Coming up" list. */
  isEvent: boolean;
  imageLabel: string;
  photo?: MediaAsset;
}

/**
 * Sample items from the designs. Every date is a placeholder (CHANGES_NEEDED.md) and is
 * rendered with the dotted "to be confirmed" marking.
 */
export const NEWS: NewsItem[] = [
  {
    slug: "leadership-masterclass-critical-thinking",
    category: "Masterclass",
    title: "Leadership Masterclass: Critical Thinking",
    shortTitle: "Leadership Masterclass",
    meta: "Online · LIU Learn live class",
    shortMeta: "Online",
    date: { day: "14", month: "Nov" },
    isEvent: true,
    imageLabel: "Leadership Masterclass: Critical Thinking · photo",
    photo: photo("masterclass", 18),
  },
  {
    slug: "wobicon-2027",
    category: "Conference",
    title: "WOBICON 2027 — World Bible Conference",
    shortTitle: "WOBICON 2027",
    meta: "Details coming soon",
    shortMeta: "Details soon",
    date: { day: "TBC", month: "2027" },
    isEvent: true,
    imageLabel: "WOBICON 2027 — World Bible Conference · photo",
    photo: photo("wobicon", 3),
  },
  {
    slug: "new-affiliate-study-centre",
    category: "News",
    title: "[News story] A new affiliate study centre opens",
    shortTitle: "New affiliate study centre",
    meta: "Blog · 3 min read",
    shortMeta: "Blog",
    date: { day: "05", month: "Dec" },
    isEvent: false,
    imageLabel: "New affiliate study centre · photo",
    photo: photo("executiveMasterclass", 7),
  },
  {
    slug: "graduate-spotlight-serving-in-kampala",
    category: "Newsletter",
    title: "Graduate spotlight: serving in Kampala",
    shortTitle: "Graduate spotlight: Kampala",
    meta: "Blog · 4 min read",
    shortMeta: "Blog",
    date: { day: "20", month: "Nov" },
    isEvent: false,
    imageLabel: "Graduate spotlight: serving in Kampala · photo",
    photo: photo("tanzania", 4),
  },
];

export const newsHref = (item: NewsItem) =>
  item.isEvent ? "/activities" : `/media/blog/${item.slug}`;
