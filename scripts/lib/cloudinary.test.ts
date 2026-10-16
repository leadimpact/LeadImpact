import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { readCredentials, sign } from "./cloudinary";

describe("sign", () => {
  it("signs sorted params followed by the secret (Cloudinary's documented example)", () => {
    const params = { timestamp: 1315060510, public_id: "sample_image", eager: "w_400,h_300,c_pad|w_260,h_200,c_crop" };
    expect(sign(params, "abcd")).toBe(
      createHash("sha1")
        .update("eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=sample_image&timestamp=1315060510abcd")
        .digest("hex"),
    );
  });
});

describe("readCredentials", () => {
  it("reads the app's variables, defaulting the folder", () => {
    expect(
      readCredentials({ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "liu", CLOUDINARY_API_KEY: "k", CLOUDINARY_API_SECRET: "s" }),
    ).toEqual({ cloudName: "liu", apiKey: "k", apiSecret: "s", folder: "website" });
  });

  it("accepts a CLOUDINARY_URL instead", () => {
    expect(readCredentials({ CLOUDINARY_URL: "cloudinary://123:abc@liu", CLOUDINARY_FOLDER: "site" })).toEqual({
      cloudName: "liu",
      apiKey: "123",
      apiSecret: "abc",
      folder: "site",
    });
  });

  it("names every missing variable", () => {
    expect(() => readCredentials({ CLOUDINARY_API_KEY: "k" })).toThrow(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET",
    );
  });
});
