import { getImageProps } from "next/image";
import { HERO, HERO_SLIDES, HERO_VARIANT } from "@/content/home";
import { cloudinaryEnabled } from "@/config/media";
import { LightStripHero } from "./LightStripHero";
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

export function Hero() {
  if (HERO_VARIANT === "light-strip") return <LightStripHero />;
  const slides: HeroSlideView[] = HERO_SLIDES.map((s) => {
    if (!cloudinaryEnabled()) return { ...s, imageSet: undefined };
    const { props } = getImageProps({ src: s.image.id, alt: "", width: 960, height: 640, quality: 60 });
    return { ...s, imageSet: toImageSet(props.srcSet) };
  });
  return <WordWindowHero slides={slides} hero={HERO} />;
}
