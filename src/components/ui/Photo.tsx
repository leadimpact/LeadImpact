import Image from "next/image";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import type { MediaAsset } from "@/content/media";
import { cloudinaryEnabled } from "@/config/media";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface PhotoProps {
  asset: MediaAsset;
  /** Defaults to the asset's own alt text; pass "" for decorative use. */
  alt?: string;
  /** Sizes the box; the photo covers it. */
  className?: string;
  /** next/image sizes hint, e.g. "(min-width: 1024px) 400px, 100vw". */
  sizes: string;
  priority?: boolean;
  /** CSS object-position, e.g. "top" for portraits. */
  position?: string;
  /** Icon on the placeholder shown when Cloudinary is not configured. */
  icon?: LucideIcon | null;
}

/** A Cloudinary photo that covers its box, or the labelled placeholder when Cloudinary is off. */
export function Photo({ asset, alt = asset.alt, className, sizes, priority, position, icon }: PhotoProps) {
  if (!cloudinaryEnabled()) return <ImagePlaceholder label={alt || asset.alt} icon={icon} className={className} />;
  return (
    <div className={clsx("relative overflow-hidden bg-charcoal", className)}>
      <Image
        src={asset.id}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
