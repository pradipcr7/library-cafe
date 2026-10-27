import Image from "next/image";
import { asset } from "@/lib/asset";

const socials = [
  { name: "Instagram", src: asset("/assets/icons/instagram.svg"), size: 20 },
  { name: "Twitter", src: asset("/assets/icons/twitter.svg"), size: 18 },
  { name: "Facebook", src: asset("/assets/icons/facebook.svg"), size: 20 },
  { name: "YouTube", src: asset("/assets/icons/youtube.svg"), size: 20 },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-main-row">
          <p>© Copyright Nita Mukesh Ambani Cultural Centre 2026</p>
          <div className="footer-links">
            <a href="#">Terms &amp; Conditions</a>
            <span className="footer-divider">|</span>
            <a href="#">Privacy Policy</a>
            <span className="footer-divider">|</span>
            <a href="#">Reliance Foundation</a>
          </div>
          <div className="footer-social">
            {socials.map((s) => (
              <a key={s.name} href="#" aria-label={s.name}>
                <Image src={s.src} alt="" width={s.size} height={s.size} />
              </a>
            ))}
          </div>
        </div>
        <p className="footer-disclaimer">
          This site is protected by reCAPTCHA and the{" "}
          <a className="footer-disclaimer-link" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="footer-disclaimer-link" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>{" "}
          of Google apply.
        </p>
      </div>
    </footer>
  );
}
