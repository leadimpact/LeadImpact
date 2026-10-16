import type { ImageLoaderProps } from "next/image";
import { cloudinaryUrl } from "@/config/media";

/** next/image loader (next.config.ts): `src` is a Cloudinary public ID from src/content/media.ts. */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  // Absolute and root-relative URLs (e.g. an SVG in public/) pass through untouched.
  if (src.startsWith("/") || /^https?:/.test(src)) return src;
  return cloudinaryUrl(src, { width, quality });
}
