import { MEDIA, photo, type MediaAsset } from "./media";

export interface Person {
  name: string;
  role: string;
  /** Labelled placeholder until an official photo is supplied (CHANGES_NEEDED.md). */
  photoLabel: string;
  photo?: MediaAsset;
}

export const PRESIDENT = {
  name: "Prof. Cletus Bassey",
  role: "President & Chairman, Board of Regents",
  shortRole: "President",
  photoLabel: "Prof. Cletus Bassey — official portrait",
  photo: MEDIA.cletusBassey,
  quote: {
    before: "We are shaping leaders who will make an ",
    highlight: "everlasting impact",
    after: " on the world.",
  },
  shortQuote: "Shaping leaders who will make an everlasting impact.",
  summary:
    "Quality higher education prepares the leaders our communities need. We protect the value of every student’s investment and support you to reach your academic, ministry and career goals.",
} as const;

/** S07 — the published parts of the President's message; the full text is still to come. */
export const PRESIDENT_MESSAGE = {
  hero: {
    title: "From the President’s desk",
    subtitle: "A message from Prof. Cletus Bassey to students, partners and friends of LeadImpact University.",
    bannerLabel: "From the President’s desk · banner photo",
    banner: MEDIA.cletusBasseySpeaking,
  },
  pullQuote:
    "We are at the forefront of shaping the leaders of this generation — leaders who will make an everlasting impact on the world and for God’s kingdom.",
  paragraphs: [
    "Welcome to LeadImpact University. I am passionate about quality higher education, because it prepares the leaders our churches, communities and nations urgently need.",
    "Our programs combine sound biblical teaching with practical leadership training. Whether you study online from a village in Uganda or on campus in Houston, you receive the same course materials, the same credit hours and the same commitment to excellence.",
    "We take seriously the investment you make in your education. We will keep innovating — including our new e-learning portal, LIU Learn — so that you have the support you need to reach your academic, ministry and career goals.",
  ],
  /** Shown with the placeholder marking until the approved message arrives. */
  pendingNote: "[Replace with the President’s full approved message.]",
  signature: "Cletus Bassey",
  alsoFaculty: "Also faculty, College of Christian Leadership & Management",
};

export interface BoardMember {
  slug: string;
  name: string;
  role: "Board Chairman" | "Board Member";
  photoLabel: string;
  photo: MediaAsset;
}

/** The 8 members of the Board of Regents (names and photos as on the live site; bios still to come). */
export const BOARD_OF_REGENTS: BoardMember[] = [
  { slug: "cletus-bassey", name: "Prof. Cletus Bassey", role: "Board Chairman", photoLabel: "Bassey · portrait", photo: MEDIA.cletusBassey },
  { slug: "blessing-bassey", name: "Dr. Blessing Bassey", role: "Board Member", photoLabel: "Bassey · portrait", photo: MEDIA.blessingBassey },
  { slug: "kathy-archibong", name: "Dr. Kathy Archibong", role: "Board Member", photoLabel: "Archibong · portrait", photo: MEDIA.kathyArchibong },
  { slug: "leon-walter", name: "Apst. Leon Walter", role: "Board Member", photoLabel: "Walter · portrait", photo: MEDIA.leonWalter },
  { slug: "manon-gurley", name: "Dr. Manon Gurley", role: "Board Member", photoLabel: "Gurley · portrait", photo: MEDIA.manonGurley },
  { slug: "ashong-c-ashong", name: "Prof. Ashong C. Ashong", role: "Board Member", photoLabel: "Ashong · portrait", photo: MEDIA.ashongAshong },
  { slug: "coral-wilkins", name: "Dr. Coral Wilkins", role: "Board Member", photoLabel: "Wilkins · portrait", photo: MEDIA.coralWilkins },
  { slug: "albert-udoh", name: "Dr. Albert Udoh", role: "Board Member", photoLabel: "Udoh · portrait", photo: MEDIA.albertUdoh },
];

export const BOARD_PAGE = {
  hero: {
    title: "Board of Regents",
    subtitle:
      "The Board of Regents sets the university’s direction, safeguards its mission and holds it to the highest academic and spiritual standards.",
    bannerLabel: "Board of Regents · banner photo",
    banner: photo("wobicon", 9),
  },
  duties: [
    "Approves academic programs, policies and new affiliate campuses",
    "Confers degrees, including honorary doctorates",
    "Appoints the President and oversees university leadership",
    "Protects the university’s statement of faith and mission",
  ],
  contact: "Correspondence for the Board of Regents should be sent through the Secretary to the Board.",
};

export const boardMemberHref = (m: BoardMember) => `/about/board-of-regents/${m.slug}`;
