import { describe, expect, it } from "vitest";
import { cloudinaryEnabled, cloudinaryUrl, cloudinaryVideoUrl } from "./media";
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

describe("cloudinaryVideoUrl", () => {
  const where = { cloudName: "liu", folder: "website" };

  it("builds a silent H.264 MP4 or VP9 WebM, cropped for phones when asked", () => {
    expect(cloudinaryVideoUrl("home/hero-video", { width: 720, aspect: "9:16", format: "mp4", ...where })).toBe(
      "https://res.cloudinary.com/liu/video/upload/c_fill,ar_9:16,g_center,w_720,q_auto:good,vc_h264,ac_none/website/home/hero-video.mp4",
    );
    expect(cloudinaryVideoUrl("home/hero-video", { width: 1280, format: "webm", ...where })).toBe(
      "https://res.cloudinary.com/liu/video/upload/c_limit,w_1280,q_auto:good,vc_vp9,ac_none/website/home/hero-video.webm",
    );
  });

  it("takes the poster as a still frame", () => {
    expect(cloudinaryVideoUrl("home/hero-video", { width: 720, format: "jpg", offset: 1, ...where })).toBe(
      "https://res.cloudinary.com/liu/video/upload/c_limit,w_720,q_auto:good,so_1/website/home/hero-video.jpg",
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
