import { describe, expect, it } from "vitest";
import { cloudinaryEnabled, cloudinaryUrl } from "./media";
import cloudinaryLoader from "@/lib/cloudinary-loader";

describe("cloudinaryUrl", () => {
  it("builds a resized WebP URL inside the site folder", () => {
    expect(cloudinaryUrl("people/cletus-bassey", { width: 640, cloudName: "liu", folder: "website" })).toBe(
      "https://res.cloudinary.com/liu/image/upload/c_limit,w_640,q_auto,f_webp/website/people/cletus-bassey",
    );
  });

  it("uses an explicit quality when next/image asks for one", () => {
    expect(cloudinaryUrl("home/hero-lead", { width: 960, quality: 60, cloudName: "liu", folder: "website" })).toContain(
      "/c_limit,w_960,q_60,f_webp/",
    );
  });
});

describe("cloudinaryEnabled", () => {
  it("is off without a cloud name", () => {
    expect(cloudinaryEnabled("")).toBe(false);
    expect(cloudinaryEnabled("liu")).toBe(true);
  });
});

describe("cloudinaryLoader", () => {
  it("leaves local and absolute URLs alone", () => {
    expect(cloudinaryLoader({ src: "/forms/logo.svg", width: 100 })).toBe("/forms/logo.svg");
    expect(cloudinaryLoader({ src: "https://example.org/a.jpg", width: 100 })).toBe("https://example.org/a.jpg");
  });

  it("turns a media id into a Cloudinary URL", () => {
    expect(cloudinaryLoader({ src: "brand/crest", width: 128 })).toMatch(/\/c_limit,w_128,q_auto,f_webp\/[^/]+\/brand\/crest$/);
  });
});
