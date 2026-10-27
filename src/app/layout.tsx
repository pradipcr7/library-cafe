import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "The Library | Library Cafe",
  description:
    "Talks, storytelling sessions, book-club style events, and workshops, layered on top of the usual dining experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
