import { getImageProps } from "next/image";
import { HERO, HERO_SLIDES } from "@/content/home";
import { cloudinaryEnabled } from "@/config/media";
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
  const slides: HeroSlideView[] = HERO_SLIDES.map((s) => {
    if (!cloudinaryEnabled()) return { ...s, imageSet: undefined };
    const { props } = getImageProps({ src: s.image.id, alt: "", width: 960, height: 640, quality: 60 });
    return { ...s, imageSet: toImageSet(props.srcSet) };
  });
  return <WordWindowHero slides={slides} hero={HERO} />;
}
