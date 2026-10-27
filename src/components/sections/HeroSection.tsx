import Image from "next/image";
import { asset } from "@/lib/asset";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <Image
        src={asset("/assets/images/home/hero-image.png")}
        alt="The Library at Library Cafe"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-overlay" aria-hidden />
      <div className="hero-content">
        <nav className="hero-breadcrumb" aria-label="Breadcrumb">
          <a href="#" className="hero-breadcrumb-link">Home</a>
          <Image src={asset("/assets/icons/breadcrumb-icon.svg")} alt="" width={16} height={16} />
          <span>The Library</span>
        </nav>
        <h1 className="heading-hero hero-heading">The Library</h1>
        <p className="hero-description">
          Talks, storytelling sessions, book-club style events, and workshops, layered on top of the
          usual dining experience
        </p>
      </div>
    </section>
  );
}
