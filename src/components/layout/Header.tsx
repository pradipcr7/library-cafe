"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

const navLeft = ["WHAT'S ON", "FOUNDER'S VISION", "PARTNERS"];
const navRight = ["VENUE DETAILS", "HIRE A VENUE", "FRIENDS OF NMACC"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#" className="header-logo" aria-label="Nita Mukesh Ambani Cultural Centre">
          <Image src={asset("/assets/images/shared/logo.svg")} alt="NMACC" width={195} height={53} priority />
        </a>
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
            className="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {[...navLeft, ...navRight].map((label) => (
            <a key={label} href="#" className="header-nav-link">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
