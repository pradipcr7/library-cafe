import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { asset } from "@/lib/asset";
import "@/styles/tokens.css";
import "@/styles/typography.css";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/sections.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE = "Nita Mukesh Ambani Cultural Centre - Mumbai, India";
const SITE_DESCRIPTION =
  "India's first-of-its-kind, modern multi-disciplinary cultural centre in Mumbai. Experience exceptional NMACC shows, art exhibitions, and live performances. Visit today!";

export const metadata: Metadata = {
  metadataBase: new URL("https://pradipcr7.github.io"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "nita mukesh ambani cultural centre",
    "nmacc",
    "nmacc shows",
    "cultural centre",
    "cultural centre in india",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [asset("/assets/images/shared/og-image.svg")],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
