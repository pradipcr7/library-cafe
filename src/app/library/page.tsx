import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CatalogueBrowser from "@/components/sections/CatalogueBrowser";
import CatalogueHero from "@/components/sections/CatalogueHero";

export const metadata: Metadata = {
  title: "Library Catalogue - Nita Mukesh Ambani Cultural Centre",
  description:
    "Explore the collection at The Library at NMACC: a thoughtfully curated selection spanning literature, art, culture, design, business, and more.",
};

export default function LibraryPage() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-wrapper">
        <CatalogueHero />
        <CatalogueBrowser />
      </main>
    </div>
  );
}
