export type CollegeSlug =
  | "theology"
  | "counseling"
  | "education"
  | "leadership"
  | "communication"
  | "ministry"
  | "multimedia";

export interface College {
  slug: CollegeSlug;
  name: string;
  /** Short label for filter chips (S12). */
  short: string;
  /** Programs offered, shown as "Theology · Biblical Studies · …". */
  programs: string[];
}

/** The seven colleges, in the order the designs number them (01–07). */
export const COLLEGES: College[] = [
  {
    slug: "theology",
    short: "Theology & Biblical Studies",
    name: "College of Theology & Biblical Studies",
    programs: ["Theology", "Biblical Studies", "Prophetic Ministry"],
  },
  {
    slug: "counseling",
    short: "Christian Counseling",
    name: "College of Christian Counseling",
    programs: ["Christian Counseling", "Chaplaincy"],
  },
  {
    slug: "education",
    short: "Christian Education",
    name: "Joyce Wyrostek College of Christian Education",
    programs: ["Christian Education", "Youth Ministry"],
  },
  {
    slug: "leadership",
    short: "Leadership & Management",
    name: "College of Christian Leadership & Management",
    programs: ["Christian Leadership", "Christian Entrepreneurship"],
  },
  {
    slug: "communication",
    short: "Communication",
    name: "College of Communication",
    programs: ["Communication", "Media Ministry"],
  },
  {
    slug: "ministry",
    short: "Ministry",
    name: "Randolph Gurley College of Ministry",
    programs: ["Ministry", "Missions & Evangelism", "Worship Ministry"],
  },
  {
    slug: "multimedia",
    short: "Multimedia",
    name: "College of Multimedia Technology",
    programs: ["Multimedia", "Digital Ministry"],
  },
];

export const collegeHref = (slug: CollegeSlug) => `/programs?college=${slug}`;

export const collegePrograms = (college: College) => college.programs.join(" · ");

/** Tuition (real figures from the designs). */
export const TUITION = {
  perCourse: 200,
  bundleCourses: 3,
  bundlePrice: 500,
  currency: "USD",
} as const;

export const findCollege = (slug: string) => COLLEGES.find((c) => c.slug === slug);
