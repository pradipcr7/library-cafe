"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

export default function CafeBanner() {
  const [popupOpen, setPopupOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popupOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPopupOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPopupOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popupOpen]);

  return (
    <aside className="cafe-banner">
      <p className="cafe-banner-text">
        <span className="cafe-banner-text-desktop">
          Settle in with your next read, premium coffee and a selection of artisanal bakes.
        </span>
        <span className="cafe-banner-text-mobile">Enjoy your reading with artisanal coffee and fresh bakes.</span>
      </p>
      <div ref={rootRef} className="cafe-banner-actions">
        <button
          type="button"
          className="catalogue-button catalogue-button-primary"
          aria-expanded={popupOpen}
          onClick={() => setPopupOpen((isOpen) => !isOpen)}
        >
          Reserve your table
        </button>
        <a href="#" className="catalogue-button catalogue-button-outline">
          Get directions
        </a>
        {popupOpen && (
          <div className="reserve-popup" role="dialog" aria-label="Reserve a table">
            <Image src={asset("/assets/icons/popup-phone.svg")} alt="" width={24} height={24} />
            <div>
              <p className="reserve-popup-title">Reserve a table</p>
              <p className="reserve-popup-text">Call: +91 89284 07494 (11am - 11pm)</p>
              <p className="reserve-popup-text">
                Email: <span className="info-text-strong">artscafe@nmacc.com</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
