import Image from "next/image";
import EventCard, { type EventItem } from "@/components/ui/EventCard";
import { asset } from "@/lib/asset";

const events: EventItem[] = [
  {
    title: "‘DESI ROCKSTAR – Gippy Grewal Live’",
    description:
      "Punjabi music superstar Gippy Grewal brings his biggest hits, Bhangra energy and an electrifying spirit to a spectacular live concert.",
    date: "October 31, 2026 | 19:30",
    venue: "The Grand Theatre",
    price: "INR 1250 onwards",
    available: false,
  },
  {
    title: "‘Aditya Gadhvi Live — The Sounds of Gujarat’",
    description:
      "One of India's most celebrated folk voices, Aditya Gadhvi brings the sounds, stories and spirit of Gujarat to life on stage.",
    date: "December 26, 2026 | 19:30",
    venue: "The Grand Theatre",
    price: "INR 1500 onwards",
    available: true,
  },
];

const filters = ["DATE & TIME", "ALL", "BROWSE BY"];

export default function EventsSection() {
  return (
    <section className="events-section">
      <div className="container events-layout">
        <div className="events-header">
          <div className="section-header">
            <div className="section-accent" />
            <h2 className="heading-lg">The Library events</h2>
          </div>
          <a href="#" className="events-download-link">
            Download Calendar
            <Image src={asset("/assets/icons/download.svg")} alt="" width={16} height={16} />
          </a>
        </div>

        <div className="filter-bar">
          {filters.map((label) => (
            <button key={label} type="button" className="filter-segment">
              {label}
              <Image src={asset("/assets/icons/chevron-down.svg")} alt="" width={12} height={12} />
            </button>
          ))}
          <label className="filter-search">
            <Image src={asset("/assets/icons/search.svg")} alt="" width={16} height={16} />
            <input
              type="search"
              placeholder="Search by Event, Venue or Artist"
              className="filter-search-input"
            />
          </label>
        </div>

        {[0, 1].map((row) => (
          <div key={row} className="events-grid">
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
