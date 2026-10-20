import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Not secret; image URLs need it in the browser (the key and secret stay server-only).
  env: { CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || "website" },
  partialPrefetching: true,
  images: {
    // Photos come from Cloudinary as WebP (src/config/media.ts); see src/content/media.ts.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
    qualities: [60, 75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
