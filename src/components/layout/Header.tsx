"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const navLeft = ["WHAT'S ON", "FOUNDER'S VISION", "PARTNERS"];
const navRight = ["VENUE DETAILS", "HIRE A VENUE", "FRIENDS OF NMACC"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-container">
        <nav className="header-nav" aria-label="Primary">
          {navLeft.map((label) => (
            <a key={label} href="#" className="header-nav-link">
              {label}
            </a>
          ))}
        </nav>
        <Link href="/" className="header-logo" aria-label="Nita Mukesh Ambani Cultural Centre - Home" onClick={() => setMenuOpen(false)}>
          <Image src={asset("/assets/images/shared/logo.svg")} alt="NMACC" width={195} height={53} priority />
        </Link>
        <div className="header-actions">
          <nav className="header-nav" aria-label="Secondary">
            {navRight.map((label) => (
              <a key={label} href="#" className="header-nav-link">
                {label}
              </a>
            ))}
          </nav>
          <button type="button" className="header-search-button" aria-label="Search">
            <Image src={asset("/assets/icons/search-nav.svg")} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={menuOpen ? "mobile-menu-button mobile-menu-button-open" : "mobile-menu-button"}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {[...navLeft, ...navRight].map((label) => (
            <a key={label} href="#" className="header-nav-link" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
