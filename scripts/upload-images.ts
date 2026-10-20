/**
 * Uploads every photo in src/content/media.ts to Cloudinary under CLOUDINARY_FOLDER.
 * Already-uploaded images are skipped, so it is safe to run again after adding photos.
 *
 *   pnpm images:upload             # upload what is missing
 *   pnpm images:upload --dry-run   # list what would be uploaded
 *   pnpm images:upload --force     # re-upload everything (after replacing a source file)
 *   pnpm images:upload --prune     # then delete public/images, once every image is in Cloudinary
 */
import { readFile, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { ALL_MEDIA, type MediaAsset } from "../src/content/media.ts";
import { exists, readCredentials, upload } from "./lib/cloudinary.ts";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");
const prune = args.has("--prune");
const root = resolve(import.meta.dirname, "..");
/** Cloudinary's free-plan limit per image. */
const MAX_BYTES = 10 * 1024 * 1024;
/** The old site rejects requests that do not look like a browser (HTTP 406). */
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36";

const creds = readCredentials(process.env);
const ids = new Set<string>();
for (const asset of ALL_MEDIA) {
  if (ids.has(asset.id)) throw new Error(`Duplicate media id ${asset.id}`);
  ids.add(asset.id);
}

/** An old-site URL is fetched into memory; a local file is read from disk. */
async function load(source: string): Promise<Blob> {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source, { headers: { "User-Agent": BROWSER_UA } });
    if (!res.ok) throw new Error(`Fetching ${source}: HTTP ${res.status}`);
    return res.blob();
  }
  return new Blob([await readFile(resolve(root, source))]);
}

const failures: string[] = [];
let uploaded = 0;
let skipped = 0;

async function handle(asset: MediaAsset) {
  const publicId = `${creds.folder}/${asset.id}`;
  try {
    if (!force && (await exists(creds, publicId))) {
      skipped++;
      return;
    }
    if (dryRun) {
      console.log(`would upload ${asset.source} → ${publicId}`);
      return;
    }
    const file = await load(asset.source);
    if (file.size > MAX_BYTES) throw new Error(`${asset.source} is ${(file.size / 1048576).toFixed(1)} MB (limit 10 MB)`);
    const res = await upload(creds, publicId, file, basename(asset.source));
    uploaded++;
    console.log(`✓ ${publicId} (${Math.round((res.bytes ?? file.size) / 1024)} KB)`);
  } catch (err) {
    failures.push(`${asset.id}: ${(err as Error).message}`);
    console.error(`✗ ${asset.id}: ${(err as Error).message}`);
  }
}

// A few at a time: quick, without tripping Cloudinary's rate limits.
const queue = [...ALL_MEDIA];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    for (let a = queue.shift(); a; a = queue.shift()) await handle(a);
  }),
);

console.log(`\n${uploaded} uploaded, ${skipped} already in Cloudinary, ${failures.length} failed (folder "${creds.folder}").`);
if (failures.length) {
  console.error(failures.map((f) => `  ${f}`).join("\n"));
  process.exit(1);
}

if (prune && !dryRun) {
  await rm(resolve(root, "public/images"), { recursive: true, force: true });
  console.log("Removed public/images — the site now loads every photo from Cloudinary.");
}
