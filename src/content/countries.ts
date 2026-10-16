import { FEATURES } from "@/config/domains";

export type CountryCode = "US" | "NG" | "UG" | "GH" | "KE";

export type PaymentMethod =
  | "card"
  | "paypal"
  | "bank-transfer"
  | "ussd"
  | "mtn-momo"
  | "airtel-money"
  | "mpesa"
  | "telecel-cash";

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: "Card",
  paypal: "PayPal",
  "bank-transfer": "Bank transfer",
  ussd: "USSD",
  "mtn-momo": "MTN MoMo",
  "airtel-money": "Airtel Money",
  mpesa: "M-Pesa",
  "telecel-cash": "Telecel Cash",
};

export interface Country {
  code: CountryCode;
  /** Three-letter code (ISO 3166) for tight spaces such as the desktop top bar. */
  code3: string;
  name: string;
  currency: { code: string; symbol: string };
  /** IANA zone used for exam times and office hours. */
  timeZone: string;
  campuses: string[];
  /** Short line used in menus, e.g. "Denver HQ · Houston". */
  campusSummary: string;
  /** Longer line used on campus cards, e.g. "HQ · Denver, CO · Houston, TX". */
  campusDetail: string;
  paymentMethods: PaymentMethod[];
  /** Campus contact phone in E.164 without "+", used for tel: and wa.me links. */
  phone: string;
  phoneDisplay: string;
  /** True while the phone above is the Denver HQ fallback, not a real local number. */
  phoneIsPlaceholder: boolean;
  /** Tailwind classes for the round country badge. */
  badge: string;
  comingSoon?: boolean;
}

const HQ_PHONE = "17205989177";
const HQ_PHONE_DISPLAY = "+1 (720) 598-9177";

export const COUNTRIES: Record<CountryCode, Country> = {
  US: {
    code: "US",
    code3: "USA",
    name: "United States",
    currency: { code: "USD", symbol: "$" },
    timeZone: "America/Denver",
    campuses: ["Denver HQ", "Texas office"],
    campusSummary: "Denver HQ · Texas office",
    campusDetail: "HQ · Denver, CO · Texas office",
    paymentMethods: ["card", "paypal", "bank-transfer"],
    phone: HQ_PHONE,
    phoneDisplay: HQ_PHONE_DISPLAY,
    phoneIsPlaceholder: false,
    badge: "bg-orange-soft text-orange-text",
  },
  NG: {
    code: "NG",
    code3: "NGA",
    name: "Nigeria",
    currency: { code: "NGN", symbol: "₦" },
    timeZone: "Africa/Lagos",
    campuses: ["Uyo", "Port Harcourt", "Makurdi", "Enugu"],
    campusSummary: "Uyo · Port Harcourt · Makurdi · Enugu",
    campusDetail: "Uyo · Port Harcourt · Makurdi · Enugu",
    paymentMethods: ["card", "bank-transfer", "ussd"],
    phone: "2348032507326",
    phoneDisplay: "+234 803 250 7326",
    phoneIsPlaceholder: false,
    badge: "bg-success-soft text-success",
  },
  UG: {
    code: "UG",
    code3: "UGA",
    name: "Uganda",
    currency: { code: "UGX", symbol: "USh" },
    timeZone: "Africa/Kampala",
    campuses: ["Kampala"],
    campusSummary: "Kampala",
    campusDetail: "Kampala",
    paymentMethods: ["mtn-momo", "airtel-money", "card"],
    phone: "256772483248",
    phoneDisplay: "+256 772 483 248",
    phoneIsPlaceholder: false,
    badge: "bg-error-soft text-error",
  },
  GH: {
    code: "GH",
    code3: "GHA",
    name: "Ghana",
    currency: { code: "GHS", symbol: "GH₵" },
    timeZone: "Africa/Accra",
    campuses: ["Accra"],
    campusSummary: "Accra",
    campusDetail: "Accra",
    paymentMethods: ["mtn-momo", "telecel-cash", "card"],
    phone: "233542528830",
    phoneDisplay: "+233 54 252 8830",
    phoneIsPlaceholder: false,
    badge: "bg-orange-tint text-orange-deep",
  },
  KE: {
    code: "KE",
    code3: "KEN",
    name: "Kenya",
    currency: { code: "KES", symbol: "KSh" },
    timeZone: "Africa/Nairobi",
    campuses: ["Nairobi"],
    campusSummary: "Nairobi · coming soon",
    campusDetail: "Nairobi · details to confirm",
    paymentMethods: ["mpesa", "card"],
    phone: HQ_PHONE,
    phoneDisplay: HQ_PHONE_DISPLAY,
    phoneIsPlaceholder: true,
    badge: "bg-[#E9E6E2] text-charcoal",
    comingSoon: true,
  },
};

/** Countries shown on the site. Kenya stays hidden until LIU confirms it (FEATURE_KENYA). */
export const COUNTRY_LIST: Country[] = [
  COUNTRIES.US,
  COUNTRIES.NG,
  COUNTRIES.UG,
  COUNTRIES.GH,
  ...(FEATURES.kenya ? [COUNTRIES.KE] : []),
];

export const DEFAULT_COUNTRY: CountryCode = "NG";

export function isCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" && COUNTRY_LIST.some((c) => c.code === value);
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven"];

/** Number of countries shown, as a digit and a word ("4" / "four"). */
export const COUNTRY_COUNT = COUNTRY_LIST.length;
export const COUNTRY_COUNT_WORD = WORDS[COUNTRY_COUNT] ?? String(COUNTRY_COUNT);

/** "the United States, Nigeria, Uganda and Ghana" */
export function countryNames(list: Country[] = COUNTRY_LIST): string {
  const names = list.map((c) => (c.code === "US" ? "the United States" : c.name));
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names.join("");
}
