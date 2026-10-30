import Image from "next/image";
import { asset } from "@/lib/asset";

export default function CatalogueHero() {
  return (
    <section className="catalogue-hero">
      <Image
        src={asset("/assets/images/library/hero-desktop.png")}
        alt="Readers browsing the shelves of The Library at NMACC"
        fill
        priority
        sizes="100vw"
        className="catalogue-hero-image"
      />
      <div className="catalogue-hero-overlay" aria-hidden />
      <div className="catalogue-hero-copy">
        <p className="catalogue-hero-eyebrow">THE LIBRARY AT NMACC</p>
        <h1 className="catalogue-hero-heading">
          A World of Stories,
          <br />
          <span className="catalogue-hero-heading-light">Waiting to Be Discovered.</span>
        </h1>
        <p className="catalogue-hero-description">
          Explore a thoughtfully curated collection spanning literature, art, culture, design, business, and
          more. Find your next read and experience The Library at NMACC in person.
        </p>
      </div>
    </section>
  );
}
