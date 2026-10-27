import { getImageProps } from "next/image";
import { HERO, HERO_SLIDES, HERO_VARIANT } from "@/content/home";
import { cloudinaryEnabled, cloudinaryVideoUrl } from "@/config/media";
import { HERO_VIDEO } from "@/content/media";
import { LightStripHero } from "./LightStripHero";
import { VideoHero, type VideoSources } from "./VideoHero";
import { WordWindowHero, type HeroSlideView } from "./WordWindowHero";

/** Converts a next/image srcSet ("url 1x, url 2x") into a CSS image-set() for backgrounds. */
function toImageSet(srcSet = "") {
  return `image-set(${srcSet
    .split(", ")
    .map((entry) => {
      const [url, density] = entry.split(" ");
      return `url("${url}") ${density}`;
    })
    .join(", ")})`;
}

/**
 * Phone (9:16 crop at the source's native 608px, so nothing is upscaled) and full-HD renditions of
 * the hero video, with a still poster for each.
 */
function videoSources(): VideoSources | undefined {
  if (!cloudinaryEnabled()) return undefined;
  const rendition = (width: number, aspect?: string) => ({
    webm: cloudinaryVideoUrl(HERO_VIDEO.id, { width, aspect, format: "webm" }),
    mp4: cloudinaryVideoUrl(HERO_VIDEO.id, { width, aspect, format: "mp4" }),
    poster: cloudinaryVideoUrl(HERO_VIDEO.id, { width, aspect, format: "jpg", offset: HERO_VIDEO.posterOffset }),
  });
  return { phone: rendition(608, "9:16"), wide: rendition(1920) };
}

export function Hero() {
  if (HERO_VARIANT === "video") return <VideoHero sources={videoSources()} />;
  if (HERO_VARIANT === "light-strip") return <LightStripHero />;
  const slides: HeroSlideView[] = HERO_SLIDES.map((s) => {
    if (!cloudinaryEnabled()) return { ...s, imageSet: undefined };
    const { props } = getImageProps({ src: s.image.id, alt: "", width: 960, height: 640, quality: 60 });
    return { ...s, imageSet: toImageSet(props.srcSet) };
  });
  return <WordWindowHero slides={slides} hero={HERO} />;
}
