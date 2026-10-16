import { APP_LINKS } from "./site";
import type { CountryCode } from "./countries";
import { COLLEGES, collegeHref, collegePrograms } from "./colleges";
import { MEDIA, type MediaAsset } from "./media";

export interface NavLink {
  label: string;
  href: string;
  /** One-line description shown under the label in dropdowns. */
  description?: string;
  /** Resolve href to the selected country's affiliate page at render time. */
  countryAffiliate?: boolean;
  /** Top bar only: hidden on narrow desktops (1280–1359px) where it does not fit; also in the menus. */
  wideOnly?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
  /** Lay the group's links out in two columns (Programs › By college). */
  twoColumn?: boolean;
}

export interface FeatureCard {
  tone: "dark" | "light";
  chip: string;
  title: string;
  text: string;
  cta: NavLink;
  image?: MediaAsset;
}

interface MenuBase {
  label: string;
  href: string;
  /** Path prefixes that make this item the current section. */
  match: string[];
  feature: FeatureCard;
}

export interface LinksMenu extends MenuBase {
  kind: "links";
  groups: NavGroup[];
}

export interface CountriesMenu extends MenuBase {
  kind: "countries";
  title: string;
}

export type NavMenu = LinksMenu | CountriesMenu;

export type NavItem = { kind: "link"; label: string; href: string; match: string[] } | NavMenu;

export function isCurrentSection(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  return item.match.some((m) => (m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(`${m}/`)));
}

export const COUNTRY_SLUGS: Record<CountryCode, string> = {
  US: "united-states",
  NG: "nigeria",
  UG: "uganda",
  GH: "ghana",
  KE: "kenya",
};

export const affiliateHref = (code: CountryCode) => `/affiliates/${COUNTRY_SLUGS[code]}`;

export const MAIN_NAV: NavItem[] = [
  { kind: "link", label: "Home", href: "/", match: ["/"] },
  {
    kind: "links",
    label: "The University",
    href: "/about",
    match: ["/about"],
    groups: [
      {
        title: "Who we are",
        links: [
          { label: "About LeadImpact", href: "/about", description: "Our story and what we stand for" },
          { label: "Mission & Vision", href: "/about#mission" },
          { label: "Statement of Faith", href: "/about#statement-of-faith" },
          { label: "Our values & community", href: "/about#values" },
        ],
      },
      {
        title: "Leadership",
        links: [
          { label: "President’s Desk", href: "/about/president", description: "A message from Prof. Cletus Bassey" },
          { label: "Board of Regents", href: "/about/board-of-regents", description: "8 members" },
          { label: "Faculty & Staff", href: "/academics/faculty", description: "By college" },
        ],
      },
      {
        title: "Get involved",
        links: [
          { label: "Become an Affiliate", href: "/affiliates/become-an-affiliate", description: "Churches & Bible colleges" },
          { label: "Partner with us", href: "/affiliates/become-an-affiliate#partner" },
          { label: "Careers", href: "/contact#careers" },
        ],
      },
    ],
    feature: {
      tone: "dark",
      chip: "From the President",
      title: "“Time to take the lead.”",
      text: "A message from Prof. Cletus Bassey to every new student.",
      cta: { label: "Read message", href: "/about/president" },
      image: MEDIA.cletusBasseySpeaking,
    },
  },
  {
    kind: "links",
    label: "Admissions",
    href: "/admissions",
    match: ["/admissions", "/prospective-students"],
    groups: [
      {
        title: "Apply",
        links: [
          { label: "How to apply", href: "/admissions#how-to-apply", description: "4 simple steps" },
          { label: "Apply online", href: APP_LINKS.apply, description: "Start or continue your application" },
          { label: "Admission requirements", href: "/admissions#requirements" },
          { label: "International students", href: "/admissions#international" },
        ],
      },
      {
        title: "Costs & support",
        links: [
          { label: "Tuition & fees", href: "/admissions/tuition", description: "$200 per course" },
          { label: "Pay tuition", href: APP_LINKS.payTuition, description: "Card, bank, mobile money" },
          { label: "Scholarships", href: "/admissions/scholarships", description: "Full tuition for 3 years" },
          { label: "Credit transfer", href: "/academics/academic-affairs#credit-transfer" },
        ],
      },
      {
        title: "Policies",
        links: [
          { label: "Admissions policy", href: "/admissions#policy" },
          { label: "Prospective students", href: "/prospective-students" },
          { label: "FAQs", href: "/admissions#faqs" },
        ],
      },
    ],
    feature: {
      tone: "dark",
      chip: "January 2027 intake",
      title: "Apply in about 15 minutes",
      text: "Save your application and finish later. No fee to apply.",
      cta: { label: "Apply now", href: APP_LINKS.apply },
    },
  },
  {
    kind: "links",
    label: "Academics",
    href: "/academics/academic-affairs",
    match: ["/academics"],
    groups: [
      {
        title: "Academic life",
        links: [
          { label: "Academic Affairs", href: "/academics/academic-affairs", description: "Standards, credit hours and policies" },
          { label: "Academic calendar", href: "/academics/academic-affairs#calendar", description: "2026–2027 at a glance" },
          { label: "Credit transfer", href: "/academics/academic-affairs#credit-transfer" },
        ],
      },
      {
        title: "People & honours",
        links: [
          { label: "Faculty & Staff", href: "/academics/faculty", description: "Grouped by our 7 colleges" },
          { label: "Honorary doctorate", href: "/academics/honorary-doctorate", description: "Types and nomination process" },
        ],
      },
    ],
    feature: {
      tone: "dark",
      chip: "7 colleges",
      title: "Find your program",
      text: "Certificates to doctorates in theology, leadership, counseling and ministry.",
      cta: { label: "Browse programs", href: "/programs" },
    },
  },
  {
    kind: "links",
    label: "Programs",
    href: "/programs",
    match: ["/programs", "/learn-online"],
    groups: [
      {
        title: "By college",
        twoColumn: true,
        links: COLLEGES.map((c) => ({
          label: c.name,
          href: collegeHref(c.slug),
          description: collegePrograms(c),
        })),
      },
      {
        title: "By level",
        links: [
          { label: "Certificate", href: "/programs?level=certificate" },
          { label: "Diploma", href: "/programs?level=diploma" },
          { label: "Associate degree", href: "/programs?level=associate" },
          { label: "Bachelor’s degree", href: "/programs?level=bachelor" },
          { label: "Master’s degree", href: "/programs?level=master" },
          { label: "Doctorate", href: "/programs?level=doctorate" },
        ],
      },
    ],
    feature: {
      tone: "light",
      chip: "Study online",
      title: "LIU Learn",
      text: "Video, audio, reading and live classes — with offline downloads.",
      cta: { label: "Discover LIU Learn", href: "/learn-online" },
    },
  },
  {
    kind: "countries",
    label: "Affiliates",
    href: "/affiliates/become-an-affiliate",
    match: ["/affiliates"],
    title: "Our campuses",
    feature: {
      tone: "dark",
      chip: "Partner with LIU",
      title: "Become an affiliate campus",
      text: "Bring accredited LIU programs to your church or Bible college.",
      cta: { label: "Apply to partner", href: "/affiliates/become-an-affiliate" },
    },
  },
  {
    kind: "links",
    label: "Media",
    href: "/media/blog",
    match: ["/media", "/activities"],
    groups: [
      {
        title: "News & stories",
        links: [
          { label: "News, stories & newsletter", href: "/media/blog", description: "Updates from every campus" },
          { label: "Photo & video gallery", href: "/media/gallery", description: "Graduations, conferences, campus life" },
        ],
      },
      {
        title: "Events",
        links: [
          { label: "Activities & conferences", href: "/activities", description: "WOBICON and campus events" },
        ],
      },
    ],
    feature: {
      tone: "dark",
      chip: "Conference",
      title: "WOBICON",
      text: "Our flagship gathering for leaders, pastors and students.",
      cta: { label: "See activities", href: "/activities" },
    },
  },
  { kind: "link", label: "Contact", href: "/contact", match: ["/contact"] },
];

export const UTILITY_LINKS: NavLink[] = [
  { label: "Student Portal", href: APP_LINKS.studentPortal },
  { label: "Pay Tuition", href: APP_LINKS.payTuition },
  { label: "LIU Learn", href: APP_LINKS.learn },
  { label: "Become an Affiliate", href: "/affiliates/become-an-affiliate", wideOnly: true },
];

/**
 * Mobile menu (SM2): every section's links shown openly under headings — no accordions.
 * The first four groups match the design; the rest keep every desktop section reachable.
 */
export const MOBILE_MENU_GROUPS: NavGroup[] = [
  {
    title: "The University",
    links: [
      { label: "About LeadImpact", href: "/about" },
      { label: "President’s Desk", href: "/about/president" },
      { label: "Board of Regents", href: "/about/board-of-regents" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "How to apply", href: "/admissions" },
      { label: "Tuition & fees", href: "/admissions/tuition" },
      { label: "Scholarships", href: "/admissions/scholarships" },
    ],
  },
  {
    title: "Study",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "LIU Learn (e-learning)", href: "/learn-online" },
      { label: "Affiliate campuses", href: "/affiliates/nigeria", countryAffiliate: true },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Pay tuition", href: APP_LINKS.payTuition },
      { label: "Course registration", href: APP_LINKS.courseRegistration },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Academic Affairs", href: "/academics/academic-affairs" },
      { label: "Faculty & Staff", href: "/academics/faculty" },
      { label: "Honorary doctorate", href: "/academics/honorary-doctorate" },
    ],
  },
  {
    title: "Media & events",
    links: [
      { label: "News & newsletter", href: "/media/blog" },
      { label: "Activities & conferences", href: "/activities" },
      { label: "Photo & video gallery", href: "/media/gallery" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Prospective students", href: "/prospective-students" },
      { label: "Become an affiliate", href: "/affiliates/become-an-affiliate" },
    ],
  },
];

export const FOOTER_COLUMNS: NavGroup[] = [
  {
    title: "University",
    links: [
      { label: "About LeadImpact", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Statement of Faith", href: "/about#statement-of-faith" },
      { label: "President’s Desk", href: "/about/president" },
      { label: "Board of Regents", href: "/about/board-of-regents" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "How to apply", href: "/admissions#how-to-apply" },
      { label: "Requirements", href: "/admissions#requirements" },
      { label: "Admissions policy", href: "/admissions#policy" },
      { label: "Scholarships", href: "/admissions/scholarships" },
      { label: "Tuition & fees", href: "/admissions/tuition" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Academic Affairs", href: "/academics/academic-affairs" },
      { label: "Faculty & Staff", href: "/academics/faculty" },
      { label: "Credit transfer", href: "/academics/academic-affairs#credit-transfer" },
      { label: "Honorary doctorate", href: "/academics/honorary-doctorate" },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Student Portal", href: APP_LINKS.studentPortal },
      { label: "Staff Portal", href: APP_LINKS.staffPortal },
      { label: "Pay Tuition", href: APP_LINKS.payTuition },
      { label: "LIU Learn", href: APP_LINKS.learn },
      { label: "Course registration", href: APP_LINKS.courseRegistration },
      { label: "Verify a certificate", href: APP_LINKS.verifyCertificate },
    ],
  },
];

/** Mobile footer (SM1): one row per section, each linking to the section's main page. */
export const MOBILE_FOOTER_LINKS: NavLink[] = [
  { label: "University", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics/academic-affairs" },
  { label: "Students", href: APP_LINKS.studentPortal },
  { label: "Contact", href: "/contact" },
];
