import { APP_LINKS } from "./site";
import { COUNTRY_COUNT, COUNTRY_LIST } from "./countries";
import { affiliateHref } from "./navigation";
import { MEDIA, type MediaAsset } from "./media";

export interface HeroSlide {
  word: string;
  caption: string;
  image: MediaAsset;
  /** Measured word width in em (including the full stop), so it always fits on one line. */
  widthEm: number;
  /** Largest font size in px at desktop widths (from the designs). */
  maxSize: number;
}

/** The site's own slider captions and photos (from the live site). */
export const HERO_SLIDES: HeroSlide[] = [
  { word: "Lead", caption: "Delivering impactful content", image: MEDIA.heroLead, widthEm: 2.8, maxSize: 330 },
  { word: "Transform", caption: "Driving holistic learning", image: MEDIA.heroTransform, widthEm: 6.15, maxSize: 210 },
  { word: "Impact", caption: "Creating lasting legacies", image: MEDIA.heroImpact, widthEm: 3.82, maxSize: 280 },
];

export const HERO = {
  intake: "January 2027 intake open · No application fee",
  intakeShort: "January 2027 intake open",
  copy: "Time to take the lead. We don’t just educate minds — we transform lives.",
  /** Desktop line break, as in the design. */
  copyLines: ["Time to take the lead. We don’t just educate minds —", "we transform lives."],
  cta: { label: "Start your application", href: APP_LINKS.apply },
  reassurance: `About 15 minutes · Save and finish later · Online or on campus in ${COUNTRY_COUNT} countries`,
  reassuranceShort: "About 15 minutes · No application fee",
  /** Seconds each slide stays before advancing. */
  slideSeconds: 7,
};

export type QuickActionIcon = "apply" | "pay" | "login" | "learn";

export const QUICK_ACTIONS: { label: string; mobileLabel: string; detail: string; mobileDetail: string; href: string; icon: QuickActionIcon }[] = [
  { label: "Apply now", mobileLabel: "Apply for admission", detail: "Online · about 15 minutes", mobileDetail: "About 15 minutes · no fee", href: APP_LINKS.apply, icon: "apply" },
  { label: "Pay tuition", mobileLabel: "Pay tuition", detail: "Card, bank, mobile money", mobileDetail: "Card, bank, mobile money", href: APP_LINKS.payTuition, icon: "pay" },
  { label: "Student portal", mobileLabel: "Student portal", detail: "Registration, results, fees", mobileDetail: "Registration, results, fees", href: APP_LINKS.studentPortal, icon: "login" },
  { label: "LIU Learn", mobileLabel: "LIU Learn", detail: "Study online — even offline", mobileDetail: "Study online — even offline", href: APP_LINKS.learn, icon: "learn" },
];

export type ExploreIcon = "university" | "admissions" | "academics" | "programs" | "students" | "affiliates" | "media" | "contact";

export interface ExploreSection {
  title: string;
  icon: ExploreIcon;
  /** The section's main page ("See all"). */
  href: string;
  links: { label: string; href: string }[];
}

/**
 * Phones (mobile first): the desktop menu's sections and their key pages, laid out on the home
 * page so nothing depends on finding the menu button.
 */
export const EXPLORE: ExploreSection[] = [
  {
    title: "The University",
    icon: "university",
    href: "/about",
    links: [
      { label: "About LIU", href: "/about" },
      { label: "President’s Desk", href: "/about/president" },
      { label: "Board of Regents", href: "/about/board-of-regents" },
      { label: "Statement of Faith", href: "/about#statement-of-faith" },
    ],
  },
  {
    title: "Admissions",
    icon: "admissions",
    href: "/admissions",
    links: [
      { label: "How to apply", href: "/admissions" },
      { label: "Requirements", href: "/admissions#requirements" },
      { label: "Tuition & fees", href: "/admissions/tuition" },
      { label: "Scholarships", href: "/admissions/scholarships" },
    ],
  },
  {
    title: "Programs",
    icon: "programs",
    href: "/programs",
    links: [
      { label: "All programs", href: "/programs" },
      { label: "Certificate", href: "/programs?level=certificate" },
      { label: "Diploma", href: "/programs?level=diploma" },
      { label: "Bachelor’s", href: "/programs?level=bachelor" },
      { label: "Master’s", href: "/programs?level=master" },
      { label: "Doctorate", href: "/programs?level=doctorate" },
    ],
  },
  {
    title: "Students",
    icon: "students",
    href: APP_LINKS.studentPortal,
    links: [
      { label: "Student portal", href: APP_LINKS.studentPortal },
      { label: "Pay tuition", href: APP_LINKS.payTuition },
      { label: "Course registration", href: APP_LINKS.courseRegistration },
      { label: "Verify a certificate", href: APP_LINKS.verifyCertificate },
    ],
  },
  {
    title: "Academics",
    icon: "academics",
    href: "/academics/academic-affairs",
    links: [
      { label: "Academic Affairs", href: "/academics/academic-affairs" },
      { label: "Faculty & Staff", href: "/academics/faculty" },
      { label: "Credit transfer", href: "/academics/academic-affairs#credit-transfer" },
      { label: "Honorary doctorate", href: "/academics/honorary-doctorate" },
    ],
  },
  {
    title: "Affiliates",
    icon: "affiliates",
    href: "/contact#campuses",
    links: [
      ...COUNTRY_LIST.map((c) => ({ label: c.name, href: affiliateHref(c.code) })),
      { label: "Become an affiliate", href: "/affiliates/become-an-affiliate" },
    ],
  },
  {
    title: "Media",
    icon: "media",
    href: "/media/blog",
    links: [
      { label: "News & stories", href: "/media/blog" },
      { label: "Events & WOBICON", href: "/activities" },
      { label: "Photo gallery", href: "/media/gallery" },
      { label: "Videos", href: "/media/gallery#videos" },
    ],
  },
  {
    title: "Contact",
    icon: "contact",
    href: "/contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Campus contacts", href: "/contact#campuses" },
      { label: "Thinking about LIU?", href: "/prospective-students" },
      { label: "Careers", href: "/contact#careers" },
    ],
  },
];

export const PILLARS = [
  { title: "Lead", text: "Delivering impactful content" },
  { title: "Transform", text: "Driving holistic learning" },
  { title: "Impact", text: "Creating lasting legacies" },
];

export const WELCOME = {
  eyebrow: "Welcome to LeadImpact University",
  mobileEyebrow: "Welcome",
  title: "There’s a place for you at LIU.",
  text: "LeadImpact University exists to raise God-fearing leaders who will influence their communities and spheres of calling by the power of the Holy Spirit. Through teaching, mentorship and on-the-job training, we help every student discover God’s plan for their life.",
  mobileText: "We raise God-fearing leaders who influence their communities — through teaching, mentorship and on-the-job training.",
};

/** `tbc` marks figures LIU still has to confirm (shown with the dotted placeholder marking). */
export const STATS: { value: string; label: string; tbc?: boolean }[] = [
  // Figures from the current leadimpactuniversity.com site, until the FastAPI back end supplies live counts.
  { value: "459+", label: "Students" },
  { value: "35+", label: "Instructors" },
  { value: "60+", label: "Programs" },
  { value: "7", label: "Colleges" },
];

/** Same source as STATS (current site), until the back end supplies them. */
export const MOBILE_STATS = [
  { value: "459+", label: "Students" },
  { value: "35+", label: "Instructors" },
  { value: "60+", label: "Programs" },
  { value: String(COUNTRY_COUNT), label: "Countries" },
];

export const FEATURED_PROGRAMS = [
  { college: "College of Theology & Biblical Studies", title: "Theology", image: MEDIA.programTheology, href: "/programs/theology" },
  { college: "Joyce Wyrostek College of Christian Education", title: "Youth Ministry", image: MEDIA.programYouthMinistry, href: "/programs/youth-ministry" },
  { college: "College of Christian Counseling", title: "Christian Counseling", image: MEDIA.programCounseling, href: "/programs/christian-counseling" },
  { college: "Certificate to Doctorate", title: "All courses", image: MEDIA.programAllCourses, href: "/programs" },
];

export type LearnFeatureIcon = "video" | "offline" | "live" | "exam" | "audio" | "reading";

export const LEARN = {
  eyebrow: "New · LIU Learn",
  title: "Learn anywhere — even with weak internet.",
  mobileTitle: "Learn from anywhere — even offline.",
  text: "Every lesson on your phone or computer as video, audio, reading notes or live classes. Download when you have data, study offline, and sit scheduled, timed exams on any phone.",
  features: [
    { title: "Video & audio", text: "Low-data versions", icon: "video" },
    { title: "Study offline", text: "Download once", icon: "offline" },
    { title: "Live classes", text: "Join by video or phone", icon: "live" },
    { title: "Timed exams", text: "Scheduled and fair", icon: "exam" },
  ] satisfies { title: string; text: string; icon: LearnFeatureIcon }[],
  mobileFeatures: [
    { title: "Video", icon: "video" },
    { title: "Audio", icon: "audio" },
    { title: "Reading", icon: "reading" },
    { title: "Live", icon: "live" },
  ] satisfies { title: string; icon: LearnFeatureIcon }[],
};

export type WhyIcon = "cost" | "faculty" | "schedule" | "anywhere" | "scholarship";

export const WHY_CHOOSE: { title: string; text: string; icon: WhyIcon }[] = [
  { title: "Affordable cost", text: "$200 per course, or $500 for three, in your currency.", icon: "cost" },
  { title: "Experienced faculty", text: "Ministers, scholars and leaders who practise what they teach.", icon: "faculty" },
  { title: "Convenient schedules", text: "Evenings and weekends, around work and ministry.", icon: "schedule" },
  { title: "Study anywhere", text: "Fully online, with offline lessons for low-connectivity areas.", icon: "anywhere" },
  { title: "Scholarships", text: "Full-tuition scholarships for outstanding students.", icon: "scholarship" },
];

export const CERTIFIED = {
  eyebrow: "Certified programs",
  title: "Accredited learning you can build on",
  text: "Earn a recognised LIU certificate, diploma or degree. Course materials and credit hours are the same at every affiliate campus, and credits can transfer.",
  image: MEDIA.certificate,
};
