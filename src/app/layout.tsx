import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Outfit } from "next/font/google";
import { CountryProvider } from "@/lib/country";
import { LITE_MODE_SCRIPT } from "@/lib/lite-mode-script";
import { siteOrigin } from "@/config/domains";
import { COUNTRY_LIST, countryNames } from "@/content/countries";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "LeadImpact University — Time to take the lead",
    template: "%s · LeadImpact University",
  },
  description:
    `Christian leadership and theology university headquartered in Denver, with affiliate campuses in ${countryNames(
      COUNTRY_LIST.filter((c) => c.code !== "US"),
    )}. Study online or on campus.`,
};

export const viewport: Viewport = {
  themeColor: "#0E0F12",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the Lite-mode script may add data-lite before hydration.
    <html lang="en" className={`${outfit.variable} ${atkinson.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LITE_MODE_SCRIPT }} />
      </head>
      <body>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  );
}
