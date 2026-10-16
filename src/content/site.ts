import { EMAILS, appUrl, openLearn, siteOrigin } from "@/config/domains";
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
 * Entry points into the portals and LIU Learn. They become the configured app URLs in
 * production (NEXT_PUBLIC_ADMISSIONS_URL, …_PORTAL_URL, …_STAFF_URL, …_LEARN_URL).
 */
export const APP_LINKS = {
  apply: appUrl("admissions", "/apply"),
  studentPortal: appUrl("portal", "/sign-in"),
  staffPortal: appUrl("staff", "/sign-in"),
  payTuition: appUrl("portal", "/pay"),
  courseRegistration: appUrl("portal", "/register"),
  learn: openLearn(),
  verifyCertificate: "/verify",
} as const;
