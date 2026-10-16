import { COLLECTIONS, type MediaAsset } from "./media";

export type AlbumTag = "commencement" | "wobicon" | "campuses" | "classes" | "outreach";

export const ALBUM_FILTERS: { label: string; tag?: AlbumTag }[] = [
  { label: "All albums" },
  { label: "Commencement", tag: "commencement" },
  { label: "WOBICON", tag: "wobicon" },
  { label: "Campuses", tag: "campuses" },
  { label: "Classes", tag: "classes" },
  { label: "Outreach", tag: "outreach" },
];

export interface Album {
  title: string;
  meta: string;
  tag: AlbumTag;
  /** Supplied photos, cover first. Albums without photos keep S22's sample count (to confirm). */
  photos?: MediaAsset[];
  sampleCount?: number;
}

const cover = (set: MediaAsset[], n: number) => [set[n - 1], ...set.filter((_, i) => i !== n - 1)];

/** S22 albums. Albums with LIU's photos come first; the rest are design samples. */
export const ALBUMS: Album[] = [
  { title: "Leadership masterclass", meta: "Classes & certificate presentations", tag: "classes", photos: cover([...COLLECTIONS.masterclass, ...COLLECTIONS.masterclassAwards], 2) },
  { title: "WOBICON", meta: "Conference", tag: "wobicon", photos: cover(COLLECTIONS.wobicon, 11) },
  { title: "Exclusive Leadership Masterclass", meta: "Classes", tag: "classes", photos: cover(COLLECTIONS.executiveMasterclass, 7) },
  { title: "LIU in Tanzania", meta: "Outreach & graduation", tag: "outreach", photos: cover(COLLECTIONS.tanzania, 8) },
  { title: "Commencement 2026", meta: "Denver · June 2026", tag: "commencement", sampleCount: 64 },
  { title: "Vision Christian College, Uyo", meta: "Campus life", tag: "campuses", sampleCount: 38 },
  { title: "Glorious School of Ministry, Kampala", meta: "Campus life", tag: "campuses", sampleCount: 42 },
  { title: "Teen Impact Camp", meta: "Outreach", tag: "outreach", sampleCount: 51 },
];

/** Videos live on LIU's YouTube channel (addendum v5 §6). Individual video links to supply. */
export const VIDEOS: { title: string; duration: string }[] = [
  { title: "Welcome from the President", duration: "3:12" },
  { title: "What is LIU Learn?", duration: "2:05" },
  { title: "WOBICON 2025 highlights", duration: "6:48" },
];
