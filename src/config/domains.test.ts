import { describe, expect, it } from "vitest";
import { EMAILS, appForHost, appUrl } from "./domains";
import { routeRequest } from "./routing";

const PROD = {
  site: "https://leadimpactuniversity.education",
  admissions: "https://admissions.leadimpactuniversity.education",
  portal: "https://portal.leadimpactuniversity.education/",
  staff: "https://staff.leadimpactuniversity.education",
  learn: "https://learn.leadimpactuniversity.education",
};

describe("appUrl", () => {
  it("uses internal paths when no app URL is configured", () => {
    const none = { site: undefined, admissions: undefined, portal: undefined, staff: undefined, learn: undefined };
    expect(appUrl("admissions", "/apply", none)).toBe("/portal/apply");
    expect(appUrl("portal", "/sign-in", none)).toBe("/portal/sign-in");
    expect(appUrl("staff", "/", none)).toBe("/staff");
    expect(appUrl("learn", "/", none)).toBe("/learn");
    expect(appUrl("site", "/", none)).toBe("/");
  });

  it("uses the configured app URLs in production", () => {
    expect(appUrl("admissions", "/apply", PROD)).toBe("https://admissions.leadimpactuniversity.education/apply");
    expect(appUrl("portal", "/pay", PROD)).toBe("https://portal.leadimpactuniversity.education/pay");
    expect(appUrl("learn", "/", PROD)).toBe("https://learn.leadimpactuniversity.education");
    // The main website keeps relative links.
    expect(appUrl("site", "/about", PROD)).toBe("/about");
  });
});

describe("appForHost", () => {
  it.each([
    ["learn.leadimpactuniversity.education", "learn"],
    ["admissions.leadimpactuniversity.education", "admissions"],
    ["portal.leadimpactuniversity.education:443", "portal"],
    ["staff.leadimpactuniversity.education", "staff"],
    ["staff.localhost:3000", "staff"],
    ["leadimpactuniversity.education", "site"],
    ["www.leadimpactuniversity.education", "site"],
    ["localhost:3000", "site"],
    [null, "site"],
  ])("%s → %s", (host, app) => {
    expect(appForHost(host)).toBe(app);
  });
});

describe("routeRequest", () => {
  it("rewrites subdomain requests to the app's internal path", () => {
    expect(routeRequest("staff.leadimpactuniversity.education", "/sign-in", "", PROD)).toEqual({
      type: "rewrite",
      pathname: "/staff/sign-in",
      noindex: true,
    });
    expect(routeRequest("portal.leadimpactuniversity.education", "/", "", PROD)).toEqual({ type: "rewrite", pathname: "/portal" });
  });

  it("opens the admissions subdomain on the application", () => {
    expect(routeRequest("admissions.leadimpactuniversity.education", "/", "", PROD)).toEqual({
      type: "rewrite",
      pathname: "/portal/apply",
    });
  });

  it("leaves already-prefixed subdomain paths alone", () => {
    expect(routeRequest("learn.localhost:3000", "/learn/courses", "", {})).toEqual({ type: "next", noindex: true });
  });

  it("redirects main-domain app paths to the configured app URL", () => {
    expect(routeRequest("leadimpactuniversity.education", "/portal/apply", "?step=2", PROD)).toEqual({
      type: "redirect",
      url: "https://admissions.leadimpactuniversity.education/apply?step=2",
    });
    expect(routeRequest("leadimpactuniversity.education", "/portal/pay", "", PROD)).toEqual({
      type: "redirect",
      url: "https://portal.leadimpactuniversity.education/pay",
    });
    expect(routeRequest("leadimpactuniversity.education", "/staff/sign-in", "", PROD)).toEqual({
      type: "redirect",
      url: "https://staff.leadimpactuniversity.education/sign-in",
    });
  });

  it("serves app paths locally when no app URL is configured", () => {
    expect(routeRequest("localhost:3000", "/portal/pay", "", {})).toEqual({ type: "next" });
  });

  it("marks only the private apps (staff, LIU Learn) noindex; public portals stay indexable", () => {
    expect(routeRequest("localhost:3000", "/staff/sign-in", "", {})).toEqual({ type: "next", noindex: true });
    expect(routeRequest("portal.leadimpactuniversity.education", "/sign-in", "", PROD)).toEqual({
      type: "rewrite",
      pathname: "/portal/sign-in",
    });
  });

  it("never touches website pages", () => {
    expect(routeRequest("leadimpactuniversity.education", "/admissions", "", PROD)).toEqual({ type: "next" });
  });
});

it("emails use the new domain", () => {
  expect(Object.values(EMAILS).every((e) => e.endsWith("@leadimpactuniversity.education"))).toBe(true);
});
