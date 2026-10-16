import { COUNTRY_COUNT, countryNames } from "./countries";
import { photo } from "./media";

export const ABOUT = {
  hero: {
    title: "About LeadImpact University",
    subtitle: "At the forefront of shaping the leaders of this generation — and the next.",
    bannerLabel: "About LeadImpact University · banner photo",
    banner: photo("masterclass", 2),
  },
  whoWeAre: {
    eyebrow: "Who we are",
    title: "True leadership transforms lives, communities and the world.",
    paragraphs: [
      `LeadImpact University develops leaders who make a positive, lasting impact. We combine sound biblical teaching with practical leadership training, mentorship and on-the-job experience — delivered online and through affiliate campuses in ${countryNames()}.`,
      "Our faculty are committed Christians who walk alongside every student to help them discover God’s plan for their lives.",
    ],
  },
  atAGlance: [
    { label: "Headquarters", value: "Denver, Colorado" },
    { label: "Colleges", value: "7" },
    { label: "Programs", value: "12" },
    { label: "Levels", value: "Certificate → Doctorate" },
    { label: "Countries", value: String(COUNTRY_COUNT) },
    { label: "Study modes", value: "Online · campus · offline" },
  ],
  mission: {
    eyebrow: "Our mission",
    statement: "To raise God-fearing leaders who will influence their communities through the Holy Spirit.",
    text: "We build a love for Scripture in every student through teaching, on-the-job training, mentorship and personal growth.",
  },
  vision: {
    eyebrow: "Our vision",
    statement: "To train leaders who will influence the present and upcoming generation with quality and excellence.",
    text: "Leadership is a mindset and a set of skills that can be developed — grounded in integrity, compassion and social responsibility.",
  },
};

/** Statement of Faith (real content from the designs). */
export const STATEMENT_OF_FAITH = [
  { title: "One God in three persons", text: "One eternal God, existing as Father, Son and Holy Spirit." },
  { title: "Jesus Christ", text: "Fully God, born of a virgin, sinless; He died for our sins, rose bodily and will return in glory." },
  { title: "The authority of Scripture", text: "The Bible is inspired by God, without error, and our final authority." },
  { title: "Salvation by faith", text: "Repentant sinners are justified by faith alone, not by works." },
  { title: "Transformation", text: "The Holy Spirit progressively transforms the lives of believers." },
  { title: "Resurrection", text: "All will be raised — the saved to eternal life, the lost to judgement." },
];
