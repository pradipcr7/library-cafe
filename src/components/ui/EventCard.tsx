"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { SITE_URL } from "@/data/events";

export type EventItem = {
  title: string;
  description: string;
  date: string;
  venue: string;
  price: string;
  status: string;
  image: string;
  category: "performing-arts" | "visual-arts";
  href: string;
  /** ISO date (YYYY-MM-DD) of the first day. */
  startDate: string;
  /** ISO date of the last day; omitted for single-day or open-ended events. */
  endDate?: string;
  /** True for "onwards" events that have no announced last day. */
  openEnded?: boolean;
  /** Start time in minutes from midnight; omitted when the event has no fixed time. */
  startTime?: number;
};

const HOVER_MEDIA = "(min-width: 62rem) and (hover: hover)";
const PANEL_DURATION = 0.35;
const IMAGE_ZOOM_DURATION = 1.65;
const IMAGE_ZOOM_SCALE = 1.15;

export default function EventCard({ event }: { event: EventItem }) {
  const eventUrl = `${SITE_URL}${event.href}`;
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Desktop hover: the text panel slides up over the image and the buttons open beneath it.
  // The card's own height never changes, so nothing around it shifts.
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const body = bodyRef.current;
    const actions = actionsRef.current;
    if (!card || !image || !body || !actions) return;

    const media = gsap.matchMedia();
    media.add(HOVER_MEDIA, () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lift = getComputedStyle(card).getPropertyValue("--event-card-lift").trim();

      const panel = gsap.timeline({ paused: true, defaults: { duration: reduceMotion ? 0 : PANEL_DURATION, ease: "power1.inOut" } });
      panel.fromTo(body, { y: 0 }, { y: `-${lift}` }, 0);
      panel.fromTo(actions, { height: 0 }, { height: "auto" }, 0);
      const zoom = gsap.to(image, {
        scale: IMAGE_ZOOM_SCALE,
        duration: reduceMotion ? 0 : IMAGE_ZOOM_DURATION,
        ease: "sine.out",
        paused: true,
      });

      const reveal = () => {
        panel.play();
        zoom.play();
      };
      const hide = () => {
        panel.reverse();
        zoom.reverse();
      };
      const onFocusOut = (event: FocusEvent) => {
        if (!card.contains(event.relatedTarget as Node | null)) hide();
      };

      card.addEventListener("mouseenter", reveal);
      card.addEventListener("mouseleave", hide);
      card.addEventListener("focusin", reveal);
      card.addEventListener("focusout", onFocusOut);

      return () => {
        card.removeEventListener("mouseenter", reveal);
        card.removeEventListener("mouseleave", hide);
        card.removeEventListener("focusin", reveal);
        card.removeEventListener("focusout", onFocusOut);
        panel.kill();
        zoom.kill();
        gsap.set([body, actions, image], { clearProps: "all" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <article ref={cardRef} className="event-card">
      <div className="event-card-media">
        <Image
          ref={imageRef}
          src={asset(event.image)}
          alt={event.title}
          width={550}
          height={335}
          className="event-card-image"
        />
      </div>
      <div ref={bodyRef} className="event-card-body">
        <h3 className="heading-sm">{event.title}</h3>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-meta">
          <p className="event-card-date">{event.date}</p>
          {event.venue && <p className="event-card-venue">{event.venue}</p>}
        </div>
        <div className="event-card-footer">
          {event.price && <p className="event-card-price">{event.price}</p>}
          <span className="event-card-status">{event.status}</span>
        </div>
      </div>
      <div ref={actionsRef} className="event-card-actions">
        <div className="event-card-actions-inner">
          <a href={eventUrl} target="_blank" rel="noreferrer" className="button button-primary button-rect">
            Read more
          </a>
          <a href={eventUrl} target="_blank" rel="noreferrer" className="button button-primary button-rect">
            Book now
          </a>
        </div>
      </div>
    </article>
  );
}
