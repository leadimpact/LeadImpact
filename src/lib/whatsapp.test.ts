import { describe, expect, it } from "vitest";
import { pageNameFromPath, whatsappHref } from "./whatsapp";

describe("whatsappHref", () => {
  it("prefills a message naming the page", () => {
    const href = whatsappHref("Admissions › Tuition");
    expect(href.startsWith("https://wa.me/17205989177?text=")).toBe(true);
    const text = decodeURIComponent(href.split("text=")[1]);
    expect(text).toContain('"Admissions › Tuition" page');
  });

  it("omits the page sentence when no page is given", () => {
    const text = decodeURIComponent(whatsappHref().split("text=")[1]);
    expect(text).not.toContain("page");
  });
});

describe("pageNameFromPath", () => {
  it.each([
    ["/", "Home"],
    ["/admissions/tuition", "Admissions › Tuition"],
    ["/about/board-of-regents?x=1#top", "About › Board of regents"],
  ])("%s → %s", (path, name) => {
    expect(pageNameFromPath(path)).toBe(name);
  });
});
