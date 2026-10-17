import { EMAILS, appUrl, siteOrigin } from "@/config/domains";
import { COUNTRY_COUNT_WORD } from "./countries";

export const SITE = {
  name: "LeadImpact University",
  shortName: "LIU",
  tagline:
    `Raising God-fearing leaders who influence their communities — online and across affiliate campuses in ${COUNTRY_COUNT_WORD} countries.`,
  url: siteOrigin,
  email: EMAILS.info,
  phone: "17205989177",
  phoneDisplay: "+1 (720) 598-9177",
  whatsapp: "17205989177",
  address: "7887 E. Belleview Ave, Suite 1100, Denver, CO 80111",
  officeHours: "Mon–Fri · 10:30 AM – 7:30 PM (MT)",
  intake: "January 2027",
  social: {
    facebook: "https://www.facebook.com/leadimpactuniversity",
    youtube: "https://www.youtube.com/@leadimpactuniversity",
    linkedin: "https://www.linkedin.com/school/leadimpact-university",
  },
} as const;

/**
 * The only portal entry points the public website links to. They become the configured app
 * URLs in production (NEXT_PUBLIC_ADMISSIONS_URL, …_PORTAL_URL).
 *
 * Not linked anywhere public (the client's decision): the staff portal, the LIU Learn platform
 * and course registration. Staff get their portal address by email; students get Learn and
 * course registration in their welcome email and on the student dashboard (appUrl/openLearn
 * in src/config/domains.ts build those links).
 */
export const APP_LINKS = {
  apply: appUrl("admissions", "/apply"),
  /** One sign-in for applicants and students (the same account system); it routes by role. */
  signIn: appUrl("portal", "/sign-in"),
  payTuition: appUrl("portal", "/pay"),
  /** The public LIU Learn page — advertising only; its buttons lead to Apply. */
  learnOnline: "/learn-online",
  verifyCertificate: "/verify",
} as const;
