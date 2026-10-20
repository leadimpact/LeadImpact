/**
 * Domains, apps and email addresses — the one place to change them. No domain is hard-coded
 * anywhere else (addendum v5 §1).
 *
 * Each app's public URL comes from an environment variable. When it is set (production), links
 * point there — e.g. NEXT_PUBLIC_PORTAL_URL=https://portal.leadimpactuniversity.education.
 * When it is not set (local dev, tests), links use the app's internal path on the same host,
 * e.g. /portal/sign-in, so everything runs on localhost:3000.
 *
 * One Next.js deployment serves every subdomain: `src/proxy.ts` maps each subdomain host onto
 * the app's internal path prefix.
 */

export const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "leadimpactuniversity.education";

export type AppName = "site" | "admissions" | "portal" | "staff" | "learn";

interface AppConfig {
  /** Subdomain of BASE_DOMAIN this app answers on; null for the main website. */
  subdomain: string | null;
  /** Internal route prefix the app is served from. */
  basePath: string;
  /** Public URL from the environment (inlined at build time). */
  envUrl: string | undefined;
}

// process.env.NEXT_PUBLIC_* must be read literally so Next can inline them in client bundles.
export const APPS: Record<AppName, AppConfig> = {
  site: { subdomain: null, basePath: "", envUrl: process.env.NEXT_PUBLIC_SITE_URL },
  /** Applicants: apply and track (P02–P03). Same app and account system as the student portal. */
  admissions: { subdomain: "admissions", basePath: "/portal", envUrl: process.env.NEXT_PUBLIC_ADMISSIONS_URL },
  /** Students: sign-in, registration, payments, statements (P01, P05–P10). */
  portal: { subdomain: "portal", basePath: "/portal", envUrl: process.env.NEXT_PUBLIC_PORTAL_URL },
  /** Staff: role-based home, admissions review, bursary, registrar, executive (P01b, P04, P11–P15). */
  staff: { subdomain: "staff", basePath: "/staff", envUrl: process.env.NEXT_PUBLIC_STAFF_URL },
  /** LIU Learn — on hold (custom build vs Moodle). Links go through openLearn(). */
  learn: { subdomain: "learn", basePath: "/learn", envUrl: process.env.NEXT_PUBLIC_LEARN_URL },
};

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/** Canonical origin of the main website (metadata, QR codes, sitemaps). */
export const siteOrigin = trimSlash(APPS.site.envUrl || `https://${BASE_DOMAIN}`);

/**
 * Link to a page in one of the apps. `path` is relative to the app ("/apply", "/").
 * With NEXT_PUBLIC_ADMISSIONS_URL set → "https://admissions.leadimpactuniversity.education/apply";
 * without → "/portal/apply".
 */
export function appUrl(app: AppName, path = "/", env: Partial<Record<AppName, string | undefined>> = {}): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const rest = clean === "/" ? "" : clean;
  const configured = app in env ? env[app] : APPS[app].envUrl;
  if (configured && app !== "site") return `${trimSlash(configured)}${rest}` || "/";
  return `${APPS[app].basePath}${rest}` || "/";
}

/** Which app a request host belongs to, e.g. "staff.leadimpactuniversity.education" → "staff". */
export function appForHost(host: string | null): AppName {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  for (const [name, cfg] of Object.entries(APPS) as [AppName, AppConfig][]) {
    if (!cfg.subdomain) continue;
    const configuredHost = cfg.envUrl ? safeHostname(cfg.envUrl) : null;
    if (
      hostname === configuredHost ||
      hostname === `${cfg.subdomain}.${BASE_DOMAIN}` ||
      // "<sub>.localhost" lets the subdomains be tried locally without DNS.
      hostname === `${cfg.subdomain}.localhost`
    ) {
      return name;
    }
  }
  return "site";
}

function safeHostname(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Open LIU Learn. For now a plain link to LEARN_URL; it will perform single sign-on once the
 * platform decision (custom vs Moodle) is made (addendum v5 §2).
 */
export const openLearn = (path = "/") => appUrl("learn", path);

/**
 * Email addresses on the new domain. Every mailbox here must exist before launch
 * (CHANGES_NEEDED.md). Messages for the President or the Board go to info@ with a subject line.
 */
export const EMAILS = {
  /** General enquiries — shown in the header, footer and contact page. */
  info: `info@${BASE_DOMAIN}`,
  /** Technical help with the portals and LIU Learn. */
  support: `support@${BASE_DOMAIN}`,
  admissions: `admissions@${BASE_DOMAIN}`,
  /** Tuition and payments. */
  bursary: `bursary@${BASE_DOMAIN}`,
  /** Registration, transcripts, credit transfer, certificates. */
  registrar: `registrar@${BASE_DOMAIN}`,
} as const;

export const mailto = (address: string, subject?: string) =>
  `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
