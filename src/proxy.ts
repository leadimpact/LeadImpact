import { NextResponse, type NextRequest } from "next/server";
import { routeRequest } from "@/config/routing";

/**
 * Serves the admissions., portal., staff. and learn. subdomains from this one app, and
 * redirects main-domain app URLs to their configured app URL (see src/config/domains.ts).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const decision = routeRequest(request.headers.get("host"), pathname, search);

  if (decision.type === "redirect") return NextResponse.redirect(decision.url, 308);

  let response: NextResponse;
  if (decision.type === "rewrite") {
    const url = request.nextUrl.clone();
    url.pathname = decision.pathname;
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }
  // Staff portal and LIU Learn are shared by email only; keep them out of search results.
  if (decision.noindex) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Skip Next internals and static files (anything with a file extension).
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
