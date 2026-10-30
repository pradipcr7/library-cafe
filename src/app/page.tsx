import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import LibraryPromoSection from "@/components/sections/LibraryPromoSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-wrapper">
        <HeroSection />
        <AboutSection />
        <LibraryPromoSection />
        <EventsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
