import { describe, expect, it } from "vitest";
import { ALL_MEDIA, COLLECTIONS, photo } from "./media";

describe("media registry", () => {
  it("gives every asset a unique, URL-safe id", () => {
    const ids = ALL_MEDIA.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+(\/[a-z0-9-]+)+$/);
  });

  it("numbers collection photos as in the original file names", () => {
    expect(photo("wobicon", 11).id).toBe("gallery/wobicon/11");
    expect(photo("wobicon", 11).source).toMatch(/leadimpact-wobicon11\.jpg$/);
    expect(COLLECTIONS.masterclass).toHaveLength(20);
    expect(() => photo("wobicon", 12)).toThrow();
  });
});
