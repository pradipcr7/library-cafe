import Image from "next/image";
import { asset } from "@/lib/asset";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="container newsletter-layout">
        <div className="newsletter-row">
          <div className="newsletter-heading-block">
            <div className="section-accent section-accent-sm" />
            <p className="heading-md">The Best Of Our World, Right In Your Inbox</p>
          </div>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter Your Email address"
              aria-label="Email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-submit">
              Sign Up
              <Image src={asset("/assets/icons/signup-line.svg")} alt="" width={32} height={3} />
            </button>
          </form>
        </div>
        <label className="newsletter-consent">
          <input type="checkbox" className="newsletter-checkbox" />
          <span className="newsletter-consent-text">
            * I have read, understood, and accept the Nita Mukesh Ambani Cultural Centre{" "}
            <a
              className="newsletter-consent-link"
              href="https://www.nmacc.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and consent to the sharing of my personal data with Nita Mukesh Ambani Cultural Centre
            for the purpose of receiving promotions, other relevant information and personalized
            services.
          </span>
        </label>
      </div>
    </section>
  );
}
