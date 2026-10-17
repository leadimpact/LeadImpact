import { APPS, appForHost, type AppName } from "./domains";

export type RouteDecision =
  /** noindex: a private app (see PRIVATE_APPS) — the proxy sends X-Robots-Tag so search engines skip it. */
  | { type: "next"; noindex?: true }
  /** Serve a subdomain request from its internal path, e.g. staff.…/sign-in → /staff/sign-in. */
  | { type: "rewrite"; pathname: string; noindex?: true }
  /** Send main-domain requests for an app path to its configured URL (canonical). */
  | { type: "redirect"; url: string };

const hasPrefix = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);

/** Shared with staff and enrolled students by email, never linked from the public site, and kept out of search. */
const PRIVATE_APPS: AppName[] = ["staff", "learn"];
const privacy = (app: AppName | null) => (app && PRIVATE_APPS.includes(app) ? { noindex: true as const } : {});

/** Applicant paths live in the portal app but are canonical on the admissions subdomain. */
const ADMISSIONS_PATHS = ["/portal/apply", "/portal/applicant"];

/** Which app owns an internal path, for redirecting main-domain URLs. */
function ownerOf(pathname: string): AppName | null {
  if (ADMISSIONS_PATHS.some((p) => hasPrefix(pathname, p))) return "admissions";
  if (hasPrefix(pathname, APPS.portal.basePath)) return "portal";
  if (hasPrefix(pathname, APPS.staff.basePath)) return "staff";
  if (hasPrefix(pathname, APPS.learn.basePath)) return "learn";
  return null;
}

export function routeRequest(
  host: string | null,
  pathname: string,
  search: string,
  urls: Partial<Record<AppName, string | undefined>> = Object.fromEntries(
    Object.entries(APPS).map(([k, v]) => [k, v.envUrl]),
  ),
): RouteDecision {
  const app = appForHost(host);

  if (app !== "site") {
    const { basePath } = APPS[app];
    if (hasPrefix(pathname, basePath)) return { type: "next", ...privacy(app) };
    // admissions.… opens straight onto the application.
    if (app === "admissions" && pathname === "/") return { type: "rewrite", pathname: "/portal/apply" };
    return { type: "rewrite", pathname: pathname === "/" ? basePath : `${basePath}${pathname}`, ...privacy(app) };
  }

  const owner = ownerOf(pathname);
  const target = owner ? urls[owner] : undefined;
  if (owner && target) {
    const rest = pathname.slice(APPS[owner].basePath.length) || "/";
    return { type: "redirect", url: `${target.replace(/\/+$/, "")}${rest}${search}` };
  }
  return { type: "next", ...privacy(owner) };
}
