import { EMAILS } from "@/config/domains";
import { photo } from "./media";

export const ACADEMIC_AFFAIRS = {
  hero: {
    title: "Academic Affairs",
    subtitle: "Upholding high standards of teaching, learning and research across all seven colleges and every affiliate campus.",
    bannerLabel: "Academic Affairs · banner photo",
    banner: photo("executiveMasterclass", 2),
  },
  office: {
    eyebrow: "The office",
    title: "Quality you can rely on, wherever you study",
    text: "The Office of Academic Affairs works with faculty and colleges to keep programs current, improve the curriculum and encourage interdisciplinary learning. Behind the scenes, our team supports students with assessment, academic advice and wellbeing.",
  },
  pillars: [
    { title: "Curriculum", text: "Same materials and credit hours at every campus", icon: "book" },
    { title: "Assessment", text: "Quizzes, assignments and timed exams", icon: "check" },
    { title: "Academic advising", text: "Help choosing courses and planning your degree", icon: "users" },
    { title: "Student support", text: "Study skills and stress management", icon: "heart" },
  ],
  creditTransferGlance: [
    "Courses with grade C (2.0) or higher may transfer",
    "Must come from a regionally accredited (or equivalent) institution",
    "You must be admitted to an LIU degree program",
    "Transferred grades don’t affect your LIU GPA",
    "Residency rule: a minimum number of credits must be taken at LIU",
  ],
  whatToSubmit:
    "Transfer Credit Evaluation Request form, official transcripts, and course syllabi — to the Registrar’s Office.",
  /** Sample dates from the design — replace with the approved calendar. */
  calendar: {
    title: "2026 – 2027 at a glance",
    terms: [
      { name: "January term", dates: "Jan 12 – Apr 24", registration: "Registration closes Jan 9", exams: "Exams Apr 18–24" },
      { name: "May term", dates: "May 11 – Aug 21", registration: "Registration closes May 8", exams: "Exams Aug 15–21" },
      { name: "September term", dates: "Sep 14 – Dec 18", registration: "Registration closes Sep 11", exams: "Exams Dec 12–18" },
    ],
    note: "Sample dates — replace with the approved academic calendar.",
  },
  /** Standard 4.0 scale — to be confirmed by the Registrar (CHANGES_NEEDED.md). */
  grading: [
    { grade: "A", range: "90–100", points: "4.0", meaning: "Excellent" },
    { grade: "B", range: "80–89", points: "3.0", meaning: "Good" },
    { grade: "C", range: "70–79", points: "2.0", meaning: "Satisfactory — lowest grade that transfers" },
    { grade: "D", range: "60–69", points: "1.0", meaning: "Pass" },
    { grade: "F", range: "Below 60", points: "0.0", meaning: "Fail" },
  ],
};

/** Credit Transfer Policy — from the current LIU website (academics/credit-transfer-policy). */
export const CREDIT_TRANSFER_POLICY = [
  {
    title: "Eligibility",
    points: [
      "Students seeking credit transfer must have been admitted to LeadImpact University and be enrolled in a degree program.",
      "Eligibility is determined by evaluating previously completed coursework for comparability, content and quality.",
    ],
  },
  {
    title: "General guidelines",
    points: [
      "LIU accepts transfer credits from regionally accredited institutions or those recognised by an equivalent accrediting body.",
      "Courses with a grade of C (2.0) or higher may be considered. Credit hours and grades earned elsewhere do not count towards your LIU GPA.",
      "Courses that are not directly equivalent to LIU courses may be reviewed by the admissions department.",
    ],
  },
  {
    title: "Transfer process",
    points: [
      "Submit the official Transfer Credit Evaluation Request Form to the Registrar’s Office.",
      "The Registrar reviews official transcripts, syllabi and course descriptions to decide which credits transfer.",
      "Approved credits are communicated to you and added to your academic record. You’ll be told of any denied credits and how to appeal.",
    ],
  },
  {
    title: "Limitations",
    points: [
      "Transferable credits are limited by LIU’s residency requirement: a minimum number of credits must be completed at LIU to earn a degree.",
      "LIU may refuse credits that don’t align with its curriculum or academic standards. Technical, vocational or remedial courses may not be eligible.",
      "Courses taken many years before enrolment may need further evaluation.",
    ],
  },
  {
    title: "Appeals and fees",
    points: [
      "You may appeal a decision in writing to the Registrar’s Office, with syllabi, assignments or other evidence of equivalence.",
      "A non-refundable evaluation fee may apply; details are given when you request an evaluation.",
    ],
  },
];

export const ACADEMIC_POLICIES = [
  { title: "Admissions policy", href: "/admissions#policy", text: "Equal opportunity, selective and rolling admissions." },
  { title: "Credit transfer policy", href: "/academics/academic-affairs#credit-transfer", text: "What transfers and how to apply." },
  { title: "Honorary doctorate procedures", href: "/academics/honorary-doctorate", text: "Eligibility, nomination and conferral." },
  { title: "Statement of faith", href: "/about#statement-of-faith", text: "The foundation of everything we teach." },
];

export const HONORARY_DOCTORATE = {
  hero: {
    title: "Honorary Doctorate",
    subtitle: "Recognising outstanding lifetime achievement and lasting impact in ministry, public service and scholarship.",
    bannerLabel: "Honorary Doctorate · banner photo",
    banner: photo("wobicon", 6),
  },
  eligibility: [
    "Individuals of outstanding eminence in cultural affairs, public service, or a field of knowledge or scholarship",
    "Sustained lifetime achievement with lasting impact — not simply a prominent position",
    "No prior education at, or affiliation with, LIU is required",
    "Recipients normally attend the conferral in person",
  ],
  steps: [
    { title: "Submit a nomination", text: `Nomination form and biography to ${EMAILS.info}` },
    {
      title: "Supporting documents",
      text: "CV, recommendation letters and the President’s approval — at least two months before commencement",
    },
    { title: "Review", text: "The Honorary Award Committee reviews and recommends to the Board of Regents" },
    { title: "Conferral", text: "If approved, the degree is conferred at a commencement ceremony" },
  ],
  degrees: [
    "Doctor of Missions",
    "Doctor of Ministry",
    "Doctor of Divinity",
    "Doctor of Humanity",
    "Doctor of Humane Letters",
    "Doctor of Fine Arts",
    "Doctor of Leadership",
  ],
  integrity:
    "Honorary degrees are never awarded in exchange for payment or property, and recipients receive no honorarium.",
};

export const FACULTY_PAGE = {
  hero: {
    title: "Faculty & Staff",
    subtitle: "Committed Christians and experienced practitioners who walk with you through your studies.",
    bannerLabel: "Faculty & Staff · banner photo",
    banner: photo("masterclass", 20),
  },
  teach: {
    title: "Teach with LIU",
    text: "We welcome experienced ministers and scholars as adjunct faculty — online or at an affiliate campus.",
  },
};
