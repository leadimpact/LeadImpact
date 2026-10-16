/**
 * Every photo the site shows. Images are served from Cloudinary as `<CLOUDINARY_FOLDER>/<id>`
 * (see src/config/media.ts); `source` is the original file that `pnpm images:upload` sends
 * there, relative to web/. Keep this file free of imports: the upload script loads it with Node.
 */
export interface MediaAsset {
  /** Public ID inside the site folder, e.g. "people/cletus-bassey". */
  id: string;
  source: string;
  alt: string;
}

/** Photos LIU supplied for the new site (the folder next to web/). */
const SUPPLIED = "../leadimpact";
/** LIU Learn screen designs, shown in the device mock-ups until the real app exists. */
const DESIGNS = "../design 3/design/png";
/** Photos saved from the current site before it is replaced. */
const LIVE = "public/images";

const a = (id: string, source: string, alt: string): MediaAsset => ({ id, source, alt });

/** Numbered photo set: the n-th file becomes `gallery/<name>/<nn>`. */
function collection(name: string, alt: string, files: string[]): MediaAsset[] {
  return files.map((file, i) => a(`gallery/${name}/${String(i + 1).padStart(2, "0")}`, `${SUPPLIED}/${file}`, alt));
}

export const MEDIA = {
  crest: a("brand/crest", `${SUPPLIED}/leadimpact-icon.png`, "LeadImpact University crest"),
  wordmark: a("brand/wordmark", `${SUPPLIED}/leadimpact-logo.png`, "LeadImpact University"),

  heroLead: a("home/hero-lead", `${LIVE}/2021/01/27/homepic4.jpg`, ""),
  heroTransform: a("home/hero-transform", `${LIVE}/2021/01/27/homepic5.jpg`, ""),
  heroImpact: a("home/hero-impact", `${LIVE}/2021/01/27/homepic6.jpg`, ""),
  programTheology: a("programs/theology", `${LIVE}/thumbs/Theo_350x420.png`, ""),
  programYouthMinistry: a("programs/youth-ministry", `${LIVE}/thumbs/youthm_350x420.png`, ""),
  programCounseling: a("programs/christian-counseling", `${LIVE}/thumbs/cc3_350x420.jpg`, ""),
  programAllCourses: a("programs/all-courses", `${LIVE}/thumbs/Courses3_350x420.jpg`, ""),
  programClass: a("programs/class", `${SUPPLIED}/leadimpact-class.jpg`, ""),
  learnDashboard: a("learn/web-dashboard", `${DESIGNS}/LIU-L02-learn-dashboard.png`, "LIU Learn web dashboard"),
  learnPhone: a("learn/phone-home", `${DESIGNS}/LIU-L03-m-learn-home-offline-state.png`, "LIU Learn phone app, offline"),
  certificate: a("home/certificate", `${LIVE}/2019/03/02/liucert690-608.jpg`, "Sample LeadImpact University diploma certificate"),

  cletusBassey: a("people/cletus-bassey", `${SUPPLIED}/leadimpact-regent-president.jpg`, "Prof. Cletus Bassey"),
  cletusBasseySpeaking: a("people/cletus-bassey-speaking", `${SUPPLIED}/leadimpact-president2.jpg`, "Prof. Cletus Bassey speaking at a leadership masterclass"),
  kathyArchibong: a("people/kathy-archibong", `${SUPPLIED}/leadimpact-regent-member2.jpg`, "Dr. Kathy Archibong"),
  leonWalter: a("people/leon-walter", `${SUPPLIED}/leadimpact-regent-member4.jpeg`, "Apst. Leon Walter"),
  manonGurley: a("people/manon-gurley", `${SUPPLIED}/leadimpact-regent-member6.jpg`, "Dr. Manon Gurley"),
  blessingBassey: a("people/blessing-bassey", `${SUPPLIED}/leadimpact-regent-member1.jpg`, "Dr. Blessing Bassey"),
  ashongAshong: a("people/ashong-ashong", `${SUPPLIED}/leadimpact-regent-member3.jpg`, "Prof. Ashong C. Ashong"),
  coralWilkins: a("people/coral-wilkins", `${SUPPLIED}/leadimpact-regent-member5.jpeg`, "Dr. Coral Wilkins"),
  albertUdoh: a("people/albert-udoh", `${SUPPLIED}/leadimpact-regent-member7.jpg`, "Dr. Albert Udoh"),
} satisfies Record<string, MediaAsset>;

/** Event photo sets; the gallery albums and page banners pick from these. */
export const COLLECTIONS = {
  masterclass: collection("masterclass", "Leadership masterclass", [
    "leadimpact-MC-masterclass1.jpg",
    "leadimpact-MC-masterclass2.jpg",
    "leadimpact-MC-masterclass3.jpg",
    "leadimpact-MC-masterclass4.jpg",
    "leadimpact-MC-masterclass5.jpg",
    "leadimpact-MC-masterclass6.jpg",
    "leadimapact-MC-masterclass6.jpg",
    "leadimpact-MC-masterclass8.jpg",
    "leadimapct-MC-masterclass9.jpg",
    "leadimapct-MC-masterclass10.jpg",
    "leadimpact-MC-masterclass11.jpg",
    "leadimpact-MC-masterclass12.jpg",
    "leadimpact-MC-masterclass13.jpg",
    "leadimapct-MC-masterclass14.jpg",
    "leadimpact-MC-measterclass15.jpg",
    "leadimpact-MC-masterclass16.jpg",
    "leadimapct-MC-masterclass17.jpg",
    "leadimpact-MC-masterclass18.jpg",
    "leadimpact-MC-masterclass19.jpg",
    "leadimpact-MC-masterclass20-staff.jpg",
  ]),
  masterclassAwards: collection("masterclass-awards", "Leadership masterclass certificate presentation", [
    "leadimpact-MC-masterclass-award1.jpg",
    "leadimpact-MC-masterclass-award2.jpg",
    "leadimpact-MC-masterclass-award3.jpg",
    "leadimpact-MC-masterclass-award4.jpg",
    "leadimapct-MC-masterclass-award5.jpg",
    "leadimpact-MC-masterclass-award6.jpg",
  ]),
  executiveMasterclass: collection("executive-masterclass", "Exclusive Leadership Masterclass", [
    "leadimpact-EL-masterclass1.jpg",
    "leadimpact-EL-masterclass2.jpg",
    "leadimpact-EL-masterclass3.jpg",
    "leadimpact-EL-masterclass4.jpg",
    "leadimpact-EL-masterclass-award1.jpg",
    "leadimpact-EL-masterclass-award2.jpg",
    "leadimpact-EL-masterclass-award3.jpg",
  ]),
  wobicon: collection(
    "wobicon",
    "WOBICON conference",
    Array.from({ length: 11 }, (_, i) => `leadimpact-wobicon${i + 1}.jpg`),
  ),
  tanzania: collection(
    "tanzania",
    "LIU in Tanzania",
    Array.from({ length: 19 }, (_, i) => `leadimpact-tanzania${i + 1}.${i < 4 ? "png" : "jpg"}`),
  ),
} satisfies Record<string, MediaAsset[]>;

export type CollectionName = keyof typeof COLLECTIONS;

/** The n-th photo (1-based, as in the original file names) of a collection. */
export function photo(name: CollectionName, n: number): MediaAsset {
  const asset = COLLECTIONS[name][n - 1];
  if (!asset) throw new Error(`No photo ${n} in collection "${name}"`);
  return asset;
}

/** Everything the upload script sends to Cloudinary. */
export const ALL_MEDIA: MediaAsset[] = [...Object.values(MEDIA), ...Object.values(COLLECTIONS).flat()];
