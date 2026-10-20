import { describe, expect, it } from "vitest";
import { ALL_MEDIA, COLLECTIONS, OLD_ALBUMS, oldPhoto, photo } from "./media";

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

  it("fetches the rest of the current site's albums from its gallery", () => {
    expect(OLD_ALBUMS.wobicon[1].id).toBe("gallery/wobicon/old-6");
    expect(OLD_ALBUMS.wobicon[1].source).toBe("https://leadimpactuniversity.com/images/speasyimagegallery/albums/4/images/6.jpg");
    expect(Object.values(OLD_ALBUMS).flat()).toHaveLength(74);
    expect(oldPhoto("wobicon", "16").id).toBe("gallery/wobicon/old-16");
    expect(() => oldPhoto("wobicon", "1")).toThrow();
  });
});
