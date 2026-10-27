import Image from "next/image";
import InfoRow from "@/components/ui/InfoRow";
import TextLink from "@/components/ui/TextLink";
import { asset } from "@/lib/asset";

const about = [
  "Embark on a culinary tour around the world at the award-winning NMACC Arts Cafe — a celebrated dining destination in the heart of Mumbai’s cultural hub, where timeless food traditions meet contemporary flair. Recognized as the Casual Dining Restaurant of the Year - West at the 4th edition of Economic Times Restaurant & Nightlife Awards 2025, the cafe has quickly become one of Mumbai’s most sought-after experiences.",
  "Designed by Gauri Khan, the venue invites you to an expansive space characterised by Art Deco elements, unfolding the elegance through brass-and-gold patterns and textures, ornate light fixtures, arched windows, decorative panels, and plush upholstery. The interiors are infused with striking earthy tones that create a chic and sophisticated charm. The skylight at its heart bathes the cafe in a soft, sunlit glow, making every seat the best in the house.",
  "The ambience comes to life through a thoughtful selection of familiar flavours, popular global cuisines, and signature creations, with a menu that bridges the gap between nostalgia and modern sophistication. Treat yourself to a diverse culinary spread while taking in the mesmerizing visual arts.",
];

function Icon({ src }: { src: string }) {
  return <Image src={src} alt="" width={24} height={24} />;
}

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="container about-layout">
        <div className="about-copy">
          <Image src={asset("/assets/icons/accent-line-60.svg")} alt="" width={60} height={3} />
          {about.map((paragraph) => (
            <p key={paragraph} className="text-body">
              {paragraph}
            </p>
          ))}
        </div>
        <aside className="about-sidebar">
          <InfoRow icon={<Icon src={asset("/assets/icons/book-open.svg")} />} title="The Library">
            <TextLink>View Events</TextLink>
          </InfoRow>
          <InfoRow icon={<Icon src={asset("/assets/icons/clock.svg")} />} title="Opening Hours">
            <p className="info-text">Mon - Thurs, 11am - Midnight</p>
            <p className="info-text">Fri - Sun, 11am - 01:30am</p>
          </InfoRow>
          <InfoRow icon={<Icon src={asset("/assets/icons/map-pin.svg")} />} title="Location">
            <p className="info-text">Level 3, NMACC</p>
            <TextLink>Get Direction</TextLink>
          </InfoRow>
          <InfoRow
            icon={
              <div className="docs-icon" aria-hidden>
                <div className="docs-icon-page docs-icon-page-back" />
                <div className="docs-icon-page docs-icon-page-front" />
                <div className="docs-icon-line docs-icon-line-1" />
                <div className="docs-icon-line docs-icon-line-2" />
                <div className="docs-icon-line docs-icon-line-3" />
              </div>
            }
            title="Menu"
          >
            <TextLink>View The Menu Here</TextLink>
          </InfoRow>
          <InfoRow icon={<Icon src={asset("/assets/icons/phone.svg")} />} title="For Reservations">
            <div className="info-text">
              <p>Call: +91 89284 07494 (11am - 11pm)</p>
              <p>
                Email: <span className="info-text-strong">artscafe@nmacc.com</span>
              </p>
            </div>
            <TextLink>Book a Table</TextLink>
          </InfoRow>
        </aside>
      </div>
    </section>
  );
}
