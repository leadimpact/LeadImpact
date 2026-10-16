import type { CollegeSlug } from "./colleges";
import { MEDIA, type MediaAsset } from "./media";

export interface FacultyMember {
  slug: string;
  name: string;
  /** Short form used on program pages, e.g. "Pastor Adejumoke A. Elisha". */
  shortName?: string;
  role: string;
  colleges: CollegeSlug[];
  /** Portrait, where LIU has supplied one. */
  photo?: MediaAsset;
}

/**
 * Faculty by college, from S15. "Kathy Archibong" appears in two colleges in the design
 * (once as "Dr.") — treated as one person teaching in both (to confirm, CHANGES_NEEDED.md).
 */
export const FACULTY: FacultyMember[] = [
  { slug: "edem-ndem", name: "Dr. Edem Ndem", role: "Faculty", colleges: ["theology"] },
  {
    slug: "adejumoke-elisha",
    name: "Pastor Adejumoke Adetunji Elisha",
    shortName: "Pastor Adejumoke A. Elisha",
    role: "Faculty",
    colleges: ["theology"],
  },
  { slug: "paul-manner", name: "Dr. Paul Manner", role: "Faculty", colleges: ["counseling"] },
  { slug: "sylvanus-jackson", name: "Sylvanus Essiet Jackson", role: "Faculty", colleges: ["counseling"] },
  { slug: "blessing-bassey", name: "Dr. Blessing Bassey", role: "Faculty", colleges: ["education"], photo: MEDIA.blessingBassey },
  { slug: "kathy-archibong", name: "Dr. Kathy Archibong", role: "Faculty", colleges: ["education", "leadership"], photo: MEDIA.kathyArchibong },
  { slug: "cletus-bassey", name: "Prof. Cletus Bassey", role: "Faculty · President", colleges: ["leadership"], photo: MEDIA.cletusBassey },
  { slug: "ashong-ashong", name: "Prof. Ashong Ashong", role: "Faculty", colleges: ["communication"], photo: MEDIA.ashongAshong },
  { slug: "paul-ojo", name: "Dr. Paul Ojo", role: "Faculty", colleges: ["ministry"] },
  { slug: "xavier-john", name: "Dr. Xavier John", role: "Faculty", colleges: ["ministry"] },
  { slug: "uduak-archibong", name: "Mr. Uduak Archibong", role: "Faculty", colleges: ["multimedia"] },
];

export const facultyHref = (m: FacultyMember) => `/academics/faculty/${m.slug}`;

export const findFaculty = (slug: string) => FACULTY.find((m) => m.slug === slug);

export const facultyForCollege = (college: CollegeSlug) => FACULTY.filter((m) => m.colleges.includes(college));
