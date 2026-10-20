import type { CountryCode } from "./countries";
import { oldPhoto, photo, type MediaAsset } from "./media";

/**
 * Home "Our affiliate campuses" cards. Event photos stand in until LIU supplies a photo of each
 * country's campus (CHANGES_NEEDED.md), so they are shown as decoration, without a caption.
 */
export const COUNTRY_PHOTOS: Record<CountryCode, MediaAsset> = {
  US: photo("wobicon", 9),
  NG: photo("masterclass", 2),
  UG: photo("masterclass", 4),
  GH: photo("masterclassAwards", 6),
  KE: photo("executiveMasterclass", 7),
  TZ: photo("tanzania", 8),
};

export interface Campus {
  name: string;
  address: string;
  /** Display numbers; the first is used for tel: and WhatsApp links. */
  phones: string[];
  /** Short line under the name, e.g. the campus's focus. */
  note?: string;
  /** Free-text query for the map link. */
  mapQuery: string;
  /** Event photo standing in until LIU supplies one of the campus (as COUNTRY_PHOTOS); decorative. */
  photo: MediaAsset;
}

/**
 * Affiliate campuses, from the current LIU website (affiliates/*-campus pages) and S17.
 * Kenya and Tanzania show their capital until LIU supplies campus details.
 */
export const CAMPUSES: Record<CountryCode, Campus[]> = {
  US: [
    {
      name: "LeadImpact University — Headquarters",
      photo: oldPhoto("wobicon", "16"),
      address: "7887 E. Belleview Ave, Suite 1100, Denver, CO 80111",
      phones: ["+1 (720) 598-9177"],
      mapQuery: "7887 E Belleview Ave Suite 1100 Denver CO 80111",
    },
    {
      name: "Texas office",
      photo: oldPhoto("wobicon", "15"),
      address: "906 Avenue A, Houston, TX",
      phones: ["+1 (720) 598-9177"],
      note: "[Address to confirm — the old site gives Katy, TX 77943]",
      mapQuery: "906 Avenue A Katy TX",
    },
  ],
  NG: [
    {
      name: "Vision Christian College & Seminary",
      photo: photo("masterclass", 3),
      address: "96 B Line Ewet Housing Estate, Uyo, Akwa Ibom State",
      phones: ["+234 803 250 7326"],
      mapQuery: "Ewet Housing Estate Uyo Akwa Ibom",
    },
    {
      name: "Power Bible College",
      photo: photo("masterclass", 2),
      address: "43 Uyo St, Rumuomasi, Port Harcourt, Rivers State",
      phones: ["+234 803 250 7326"],
      mapQuery: "43 Uyo Street Rumuomasi Port Harcourt",
    },
    {
      name: "Petros Christian College & Seminary",
      photo: photo("masterclass", 6),
      address: "P.O. Box 5055, Makurdi, Benue State",
      phones: ["+234 805 455 1888", "+234 803 593 7032"],
      mapQuery: "Makurdi Benue State",
    },
    {
      name: "Orwell School of Communications & Media Studies",
      photo: photo("masterclass", 11),
      address: "1 Chime Avenue, New Haven, Enugu",
      phones: ["+234 808 857 8951", "0703 238 4317", "0905 711 8578"],
      note: "Strategic communications and media leadership",
      mapQuery: "1 Chime Avenue New Haven Enugu",
    },
  ],
  UG: [
    {
      name: "Glorious School of Ministry",
      photo: photo("masterclass", 4),
      address: "Bunamwaya-Ngobe Road, Bunamwaya Trading Center, Kampala",
      phones: ["+256 772 483 248", "+256 703 212 699"],
      mapQuery: "Bunamwaya Trading Center Kampala",
    },
  ],
  GH: [
    {
      name: "LeadImpact Christian Leadership Fellowship",
      photo: photo("masterclassAwards", 6),
      address: "Onua Link, Accra",
      phones: ["+233 54 252 8830"],
      mapQuery: "Onua Link Accra Ghana",
    },
  ],
  // Capital only until LIU supplies the campus details; calls go to the Denver office meanwhile.
  KE: [
    {
      name: "LeadImpact University — Kenya",
      photo: photo("executiveMasterclass", 7),
      address: "Nairobi, Kenya",
      phones: ["+1 (720) 598-9177"],
      mapQuery: "Nairobi Kenya",
    },
  ],
  TZ: [
    {
      name: "LeadImpact University — Tanzania",
      photo: photo("tanzania", 8),
      address: "Dodoma, Tanzania",
      phones: ["+1 (720) 598-9177"],
      mapQuery: "Dodoma Tanzania",
    },
  ],
};

/** E.164 digits for tel:/wa.me from a display number ("0703 …" numbers are Nigerian). */
export function phoneDigits(display: string, country: CountryCode): string {
  const digits = display.replace(/\D/g, "");
  if (display.trim().startsWith("+")) return digits;
  const prefix: Record<CountryCode, string> = { US: "1", NG: "234", UG: "256", GH: "233", KE: "254", TZ: "255" };
  return prefix[country] + digits.replace(/^0/, "");
}

export const mapHref = (c: Campus) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`;

export const BECOME_AFFILIATE = {
  hero: {
    title: "Become an LIU affiliate campus",
    subtitle: "Bring LeadImpact University programs to your church, ministry or Bible college — and help raise leaders in your nation.",
    bannerLabel: "Become an LIU affiliate campus · banner photo",
    banner: photo("tanzania", 7),
  },
  benefits: [
    { title: "Accredited curriculum", text: "Teach LIU courses with full materials and credit hours", icon: "book" },
    { title: "LIU Learn platform", text: "Your students get the e-learning portal and offline lessons", icon: "play" },
    { title: "LIU certificates & degrees", text: "Graduates receive LeadImpact University awards", icon: "award" },
    { title: "Training & support", text: "Faculty orientation and an affiliate coordinator", icon: "users" },
  ],
  steps: [
    { title: "Submit this form", text: "About 5 minutes" },
    { title: "Discovery call", text: "With our affiliates team" },
    { title: "Agreement & onboarding", text: "Training and platform access" },
  ],
  orgTypes: ["Bible college", "Church", "Ministry", "Seminary", "School", "Other"],
} as const;
