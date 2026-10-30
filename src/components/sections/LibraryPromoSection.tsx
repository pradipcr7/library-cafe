import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export default function LibraryPromoSection() {
  return (
    <section className="library-promo-section">
      <div className="container library-promo-layout">
        <div className="library-promo-copy">
          <Image src={asset("/assets/icons/accent-line-60.svg")} alt="" width={60} height={3} />
          <h2 className="heading-lg library-promo-heading">
            Discover What’s Waiting Between the Shelves at The Library.
          </h2>
        </div>
        <div className="library-promo-aside">
          <p className="library-promo-description">
            Explore a thoughtfully curated collection of books spanning art, culture, literature, design,
            business and more.
          </p>
          <div className="library-promo-actions">
            <Link href="/library" className="catalogue-button catalogue-button-primary">
              Explore the collection
            </Link>
            <Link href="/library" className="catalogue-button catalogue-button-outline">
              Visit the library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
