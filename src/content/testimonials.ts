import type { CountryCode } from "./countries";
import { photo, type MediaAsset } from "./media";

export interface Testimonial {
  quote: string;
  name: string;
  program: string;
  country: CountryCode;
  /** Certificate-presentation photos stand in until each graduate's own photo (with consent). */
  photo: MediaAsset;
}

const PLACEHOLDER_QUOTE =
  "[Testimonial from a real LIU graduate — two or three sentences about how their studies changed their ministry or career.]";

/** All six are placeholders until LIU supplies real graduate stories (CHANGES_NEEDED.md). */
export const TESTIMONIALS: Testimonial[] = [
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Diploma, Kampala", country: "UG", photo: photo("masterclassAwards", 1) },
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Bachelor’s, Uyo", country: "NG", photo: photo("masterclassAwards", 2) },
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Master’s, Denver", country: "US", photo: photo("masterclassAwards", 3) },
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Certificate, Accra", country: "GH", photo: photo("masterclassAwards", 4) },
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Diploma, Port Harcourt", country: "NG", photo: photo("masterclassAwards", 5) },
  { quote: PLACEHOLDER_QUOTE, name: "[Alumni name]", program: "Doctorate, Houston", country: "US", photo: photo("masterclassAwards", 6) },
];
