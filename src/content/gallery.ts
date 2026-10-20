import { COLLECTIONS, OLD_ALBUMS, type MediaAsset } from "./media";

export type AlbumTag = "ceremonies" | "wobicon" | "campuses" | "classes" | "outreach";

export const ALBUM_FILTERS: { label: string; tag?: AlbumTag }[] = [
  { label: "All albums" },
  { label: "Ceremonies", tag: "ceremonies" },
  { label: "WOBICON", tag: "wobicon" },
  { label: "Campuses", tag: "campuses" },
  { label: "Classes", tag: "classes" },
  { label: "Outreach", tag: "outreach" },
];

export interface Album {
  slug: string;
  title: string;
  meta: string;
  tag: AlbumTag;
  /** Cover first. */
  photos: MediaAsset[];
}

const cover = (set: MediaAsset[], n: number) => [set[n - 1], ...set.filter((_, i) => i !== n - 1)];

/**
 * S22 albums: the current site's albums, LIU's supplied photos first, then the rest of that album
 * from the current site. Only albums with real photos are listed (no placeholders on the live site).
 */
export const ALBUMS: Album[] = [
  {
    slug: "honorary-doctorate-2026",
    title: "Honorary Doctorate Conferral – October 2026",
    meta: "Doctor in Ministry (Honoris Causa) · 16 October 2026",
    tag: "ceremonies",
    photos: cover(COLLECTIONS.honoraryDoctorate2026, 3),
  },
  {
    slug: "media-communication-masterclass",
    title: "Media Communication Masterclass for Leaders",
    meta: "Classes & certificate presentations",
    tag: "classes",
    photos: [...cover([...COLLECTIONS.masterclass, ...COLLECTIONS.masterclassAwards], 2), ...OLD_ALBUMS.masterclass],
  },
  {
    slug: "wobicon-2023",
    title: "World Bible Conference – WOBICON 2023",
    meta: "Conference",
    tag: "wobicon",
    photos: [...cover(COLLECTIONS.wobicon, 11), ...OLD_ALBUMS.wobicon],
  },
  {
    slug: "exclusive-leadership-masterclass",
    title: "Exclusive Leadership Masterclass",
    meta: "Classes",
    tag: "classes",
    photos: [...cover(COLLECTIONS.executiveMasterclass, 7), ...OLD_ALBUMS.executiveMasterclass],
  },
  {
    slug: "establish-conference-tanzania",
    title: "Establish Conference – Tanzania",
    meta: "Outreach & graduation",
    tag: "outreach",
    photos: [...cover(COLLECTIONS.tanzania, 8), ...OLD_ALBUMS.tanzania],
  },
  {
    // Both masterclasses were held at Vision Christian College, so its album reuses their photos.
    slug: "vision-christian-college",
    title: "Vision Christian College, Uyo",
    meta: "Campus life",
    tag: "campuses",
    photos: [...cover(COLLECTIONS.executiveMasterclass, 1), ...COLLECTIONS.masterclass, ...OLD_ALBUMS.executiveMasterclass.slice(0, 12)],
  },
];

export const albumHref = (a: Album) => `/media/gallery/${a.slug}`;
export const findAlbum = (slug: string) => ALBUMS.find((a) => a.slug === slug);

/** Videos live on LIU's YouTube channel (addendum v5 §6). Individual video links to supply. */
export const VIDEOS: { title: string; duration: string }[] = [
  { title: "Welcome from the President", duration: "3:12" },
  { title: "What is LIU Learn?", duration: "2:05" },
  { title: "WOBICON 2025 highlights", duration: "6:48" },
];
