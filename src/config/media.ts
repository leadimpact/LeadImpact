/**
 * Cloudinary delivery. Only the cloud name is public; the API key and secret are used by
 * `pnpm images:upload` alone and never reach the browser.
 */
export const CLOUDINARY = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
  /** Folder that holds every site asset. next.config.ts exposes it to the browser. */
  folder: process.env.CLOUDINARY_FOLDER || "website",
};

/** Without a cloud name (local work before credentials, CI) photos show as labelled placeholders. */
export const cloudinaryEnabled = (cloudName = CLOUDINARY.cloudName) => cloudName !== "";

interface DeliveryOptions {
  width: number;
  quality?: number;
  cloudName?: string;
  folder?: string;
}

/**
 * Resized delivery URL: never upscaled (c_limit), auto quality, WebP. Not f_auto: that serves JPEG XL
 * to Safari, which rendered slowly or not at all on iPhones; WebP works in every current browser.
 */
export function cloudinaryUrl(
  id: string,
  { width, quality, cloudName = CLOUDINARY.cloudName, folder = CLOUDINARY.folder }: DeliveryOptions,
) {
  const transform = ["c_limit", `w_${width}`, quality ? `q_${quality}` : "q_auto", "f_webp"].join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${folder}/${id}`;
}
