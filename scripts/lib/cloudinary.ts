/** Cloudinary upload helpers for scripts/upload-images.ts (Node only; uses the API secret). */
import { createHash } from "node:crypto";

export interface Credentials {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
}

/** Reads the same variables as the app, or a single CLOUDINARY_URL (cloudinary://key:secret@cloud). */
export function readCredentials(env: Record<string, string | undefined>): Credentials {
  const url = env.CLOUDINARY_URL ? new URL(env.CLOUDINARY_URL) : undefined;
  const creds = {
    cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || url?.hostname || "",
    apiKey: env.CLOUDINARY_API_KEY || decodeURIComponent(url?.username ?? ""),
    apiSecret: env.CLOUDINARY_API_SECRET || decodeURIComponent(url?.password ?? ""),
    folder: env.CLOUDINARY_FOLDER || "website",
  };
  const missing = Object.entries({
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: creds.cloudName,
    CLOUDINARY_API_KEY: creds.apiKey,
    CLOUDINARY_API_SECRET: creds.apiSecret,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) throw new Error(`Missing ${missing.join(", ")} (add them to web/.env)`);
  return creds;
}

/** Signature for a signed upload: sorted "key=value" pairs joined by "&", then the secret, SHA-1. */
export function sign(params: Record<string, string | number>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(payload + apiSecret).digest("hex");
}

const basicAuth = (c: Credentials) => `Basic ${Buffer.from(`${c.apiKey}:${c.apiSecret}`).toString("base64")}`;

/** Whether an image with this full public ID is already in the account (Admin API). */
export async function exists(c: Credentials, publicId: string) {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${c.cloudName}/resources/image/upload/${publicId.split("/").map(encodeURIComponent).join("/")}`,
    { headers: { Authorization: basicAuth(c) } },
  );
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`Checking ${publicId}: HTTP ${res.status} ${await res.text()}`);
  return true;
}

/** Signed upload; replaces any image already stored under the same public ID. */
export async function upload(c: Credentials, publicId: string, file: Blob, filename: string) {
  const slash = publicId.lastIndexOf("/");
  const params = {
    // Dynamic-folder accounts show assets in the Media Library by asset_folder; harmless otherwise.
    asset_folder: publicId.slice(0, slash),
    overwrite: "true",
    public_id: publicId,
    timestamp: Math.floor(Date.now() / 1000),
  };
  const body = new FormData();
  for (const [k, v] of Object.entries(params)) body.set(k, String(v));
  body.set("api_key", c.apiKey);
  body.set("signature", sign(params, c.apiSecret));
  body.set("file", file, filename);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${c.cloudName}/image/upload`, { method: "POST", body });
  const json = (await res.json()) as { secure_url?: string; bytes?: number; error?: { message: string } };
  if (!res.ok) throw new Error(`Uploading ${publicId}: ${json.error?.message ?? `HTTP ${res.status}`}`);
  return json;
}
