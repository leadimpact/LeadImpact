import { photo, type MediaAsset } from "./media";

export type EventKind = "conference" | "masterclass" | "graduation" | "gathering" | "teens";

export const EVENT_KIND_LABELS: Record<EventKind, string> = {
  conference: "Conference",
  masterclass: "Masterclass",
  graduation: "Graduation",
  gathering: "Gathering",
  teens: "Teens",
};

/** Filter chips (S20). Gatherings and teens events show under "All". */
export const EVENT_FILTERS: { label: string; kind?: EventKind }[] = [
  { label: "All" },
  { label: "Conferences", kind: "conference" },
  { label: "Masterclasses", kind: "masterclass" },
  { label: "Graduations", kind: "graduation" },
];

export interface LiuEvent {
  slug: string;
  title: string;
  kind: EventKind;
  where: string;
  /** Date badge — every date is a placeholder until confirmed. */
  date: { day: string; month: string };
  /** External registration/details page, where one exists. */
  url?: string;
  photo?: MediaAsset;
}

export const WOBICON = {
  title: "WOBICON",
  text: "LIU’s annual world conference bringing together pastors, ministry leaders, students and alumni for teaching, worship and leadership training.",
  date: "[2027 dates TBC]",
  venue: "[Venue TBC]",
  join: "In person & online",
  url: "https://www.wobicon.org",
  photo: photo("wobicon", 4),
};

/** Sample events from S20 (the live site lists the East Africa Conference). Dates to confirm. */
export const EVENTS: LiuEvent[] = [
  { slug: "east-africa-leadership-conference", title: "East Africa Leadership Conference", kind: "conference", where: "Nairobi, Kenya", date: { day: "—", month: "TBC" } },
  { slug: "masterclass-critical-thinking", title: "Masterclass: Critical Thinking for Leaders", kind: "masterclass", where: "Online · LIU Learn", date: { day: "14", month: "Nov" }, photo: photo("masterclass", 1) },
  { slug: "wobicon-2027", title: "WOBICON 2027", kind: "conference", where: "[Venue TBC]", date: { day: "—", month: "2027" }, url: WOBICON.url, photo: photo("wobicon", 2) },
  { slug: "leadersync-summit", title: "LeaderSync Leaders’ Summit", kind: "gathering", where: "Houston, TX", date: { day: "06", month: "Dec" } },
  { slug: "teen-impact-camp", title: "Teen Impact Camp", kind: "teens", where: "Uyo, Nigeria", date: { day: "17", month: "Jan" } },
  { slug: "commencement-2027", title: "Commencement 2027", kind: "graduation", where: "Denver & online", date: { day: "20", month: "Jun" }, photo: photo("wobicon", 10) },
];

export const ARCHIVE: { label: string; photo?: MediaAsset }[] = [
  { label: "Leadership masterclass", photo: photo("masterclass", 2) },
  { label: "WOBICON", photo: photo("wobicon", 5) },
  { label: "LIU in Tanzania", photo: photo("tanzania", 9) },
  { label: "LeaderSync conference" },
  { label: "Teens event" },
];
