import { EMAILS } from "@/config/domains";
import { photo } from "./media";

export const ADMISSIONS = {
  hero: {
    title: "Apply to LeadImpact University",
    subtitle: "Four simple steps. Apply online in about 15 minutes — or download the form and send it by email.",
    mobileSubtitle: "Four steps · about 15 minutes · no fee.",
    bannerLabel: "Apply to LeadImpact University · banner photo",
    banner: photo("executiveMasterclass", 1),
  },
  intakeNotice: { lead: "January 2027 intake:", text: "applications are open. There is no fee to apply." },
  steps: [
    {
      title: "Choose your program",
      text: "Pick a college, program and level — Certificate to Doctorate.",
      mobileText: "A college, program and level",
      icon: "compass",
    },
    {
      title: "Complete the application",
      text: "Online in the Admissions Portal, or download the form and fill it offline.",
      mobileText: "Online, or download the form",
      icon: "pen",
    },
    {
      title: "Attach your documents",
      text: "Certificates, transcripts, personal statement and two recommendation letters.",
      mobileText: "Certificates, transcripts, statement, 2 references",
      icon: "upload",
    },
    {
      title: "Submit & track",
      text: `Send online or to ${EMAILS.admissions}. Some applicants are invited to an interview.`,
      mobileText: "Follow your status in the Admissions Portal",
      icon: "mail",
    },
  ],
  requirements: [
    "High school diploma or equivalent (home-schooled and non-traditional applicants are encouraged to apply)",
    "Official academic transcripts — in English or with an official translation",
    "A completed application form: personal details, education history, activities and work experience",
    "A personal statement about your calling and goals",
    "Two or more letters of recommendation",
    "SAT/ACT or equivalent — only if your program requires it",
    "TOEFL or IELTS — for non-native English speakers",
  ],
  mobileRequirements: [
    "High school diploma or equivalent",
    "Academic transcripts (in English)",
    "Personal statement",
    "Two recommendation letters",
  ],
  requirementsNote: "Requirements may vary by program. Admissions will confirm what applies to you.",
  international: [
    "Secondary education recognised as equivalent to a US high school diploma",
    "Proof of funds — bank statement, scholarship or sponsorship letter",
    "Valid passport, and student visa if studying in the US",
    "International applicant form",
  ],
  internationalNote: "Studying online from your home country? A visa is not required.",
  /** Printable application form for applicants who prefer paper (CHANGES_NEEDED.md). */
  formPdf: "/forms/liu-admission-form.pdf",
};

export const ADMISSIONS_FAQS: { q: string; a: string; tbc?: boolean }[] = [
  {
    q: "Is there an application fee?",
    a: "No fee is charged to apply for the January 2027 intake. International applicants may be asked for a small processing fee — Admissions will tell you before you pay anything.",
  },
  {
    q: "Can I transfer credits from another institution?",
    a: "Yes. Once you are admitted to a degree program, courses passed with a C (2.0) or higher at a regionally accredited (or equivalent) institution can be evaluated by the Registrar’s Office. Transferred grades don’t count towards your LIU GPA, and a minimum number of credits must be taken at LIU.",
  },
  {
    q: "Can I study fully online?",
    a: "Yes. Every program can be studied online through LIU Learn — video, audio, reading notes and live classes, with lessons you can download and study offline. You can also study at an affiliate campus in the US, Nigeria, Uganda, Ghana, Kenya or Tanzania.",
  },
  {
    q: "How long does a decision take?",
    a: "LIU uses rolling admissions: applications are reviewed as they arrive and you are told the outcome as soon as the Admissions Committee decides. [Typical decision time to be confirmed.]",
    tbc: true,
  },
];

/** Admissions policy — from the current LIU website (leadimpactuniversity.com/en/admissions/admissions-policy). */
export const ADMISSIONS_POLICY = [
  {
    title: "Equal opportunity",
    text: "LeadImpact University is committed to providing equal educational opportunities and does not discriminate against any individual based on race, color, national origin, sex, religion, disability, or any other protected status. The university welcomes applications from students of diverse backgrounds and strives to create an inclusive and supportive learning environment.",
  },
  {
    title: "Selective admissions",
    text: "LeadImpact University employs a selective admissions process to ensure that admitted students have the academic preparation and potential to succeed in their chosen program of study. The university carefully reviews each application and considers various factors, including academic performance, standardized test scores (if applicable), personal statements, letters of recommendation, and other relevant qualifications.",
  },
  {
    title: "Program-specific requirements",
    text: "Some programs may have specific requirements beyond the general admissions criteria, such as prerequisite coursework, portfolio submissions, auditions, interviews, or other specialized criteria. Prospective students should consult the program-specific guidelines or contact the admissions office for details.",
  },
  {
    title: "Rolling admissions",
    text: "LeadImpact University operates on a rolling admissions basis: applications are reviewed as they are received, and decisions are made on an ongoing basis. Some programs, and international students, may have specific deadlines, so apply well in advance to ensure full consideration.",
  },
  {
    title: "Admission decisions",
    text: "Admission decisions are made by the Admissions Committee, which evaluates each application and considers the overall academic potential and personal qualities of the applicant. Applicants are notified of their admission status in a timely manner, and admitted students receive instructions on the next steps to confirm their enrollment.",
  },
  {
    title: "Deferral and transfer",
    text: "Admitted students who wish to postpone their enrollment may request a deferral. Students who have completed coursework at other accredited institutions may apply for transfer credit under the Credit Transfer Policy.",
  },
  {
    title: "Application integrity",
    text: "Applicants must provide accurate and truthful information throughout the application process. Any falsification, misrepresentation, or omission of information may result in the rejection of an application or, if discovered later, the revocation of an offer of admission.",
  },
  {
    title: "Confidentiality and privacy",
    text: "All application materials and personal data are treated with the utmost confidentiality and used solely for admission purposes.",
  },
];

export const SCHOLARSHIPS = {
  hero: {
    title: "Full-tuition scholarships",
    subtitle: "For outstanding Bachelor’s, Master’s and Doctorate students — on campus or studying online.",
    bannerLabel: "Full-tuition scholarships · banner photo",
    banner: photo("masterclassAwards", 1),
  },
  eligibility: [
    "You have been offered a place at LIU and accepted it",
    "You are enrolling in a Bachelor’s, Master’s or Doctorate program (online or distance learners included)",
    "You show strong leadership, commitment to learning and a desire to impact your community",
  ],
  criteria: [
    { title: "Academic achievement", icon: "award" },
    { title: "Leadership & service", icon: "users" },
    { title: "Personal achievements", icon: "star" },
    { title: "Potential for impact", icon: "target" },
  ],
  steps: [
    { title: "Apply for admission", text: "Through the Admissions Portal" },
    { title: "Accept your offer", text: "From your applicant dashboard" },
    { title: "Request a scholarship review", text: "One click — no extra form" },
    { title: "Hear back within 2 weeks", text: "By email, SMS and in the portal" },
  ],
} as const;

export const TUITION_PAGE = {
  hero: {
    title: "Simple, affordable tuition",
    subtitle: "One price for every program. Pay per course, or save with a three-course bundle.",
    bannerLabel: "Simple, affordable tuition · banner photo",
    banner: photo("masterclass", 12),
  },
  perCourse: ["All course materials included", "Video, audio, reading notes and live classes", "Quizzes and exam"],
  bundle: ["Everything in “per course”", "Register three courses at once", "Split into monthly payments"],
  extras: [
    { label: "Application", value: "Free" },
    { label: "Credit transfer evaluation", value: "[Fee TBC]", tbc: true },
    { label: "Graduation & certificate", value: "[Fee TBC]", tbc: true },
    { label: "Scholarships", value: "Up to 100%" },
  ],
};
