"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import EventCard from "@/components/ui/EventCard";
import DateTimeFilter, { type DateTimeValue } from "@/components/ui/DateTimeFilter";
import FilterDropdown from "@/components/ui/FilterDropdown";
import { asset } from "@/lib/asset";
import { browseTags, categoryOptions, events, venueOptions } from "@/data/events";

const OPEN_ENDED_DATE = "9999-12-31";

export default function EventsSection() {
  const [dateTime, setDateTime] = useState<DateTimeValue>({ date: null, minutes: 0 });
  const [category, setCategory] = useState("all");
  const [venue, setVenue] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");

  const visibleEvents = useMemo(() => {
    const search = query.trim().toLowerCase();
    return events.filter((event) => {
      const text = `${event.title} ${event.description} ${event.venue}`.toLowerCase();
      if (category !== "all" && event.category !== category) return false;
      if (dateTime.date) {
        const lastDate = event.openEnded ? OPEN_ENDED_DATE : (event.endDate ?? event.startDate);
        if (dateTime.date < event.startDate || dateTime.date > lastDate) return false;
      }
      if (dateTime.minutes > 0 && event.startTime !== undefined && event.startTime < dateTime.minutes) {
        return false;
      }
      if (venue !== "all" && !event.venue.toLowerCase().includes(venue.toLowerCase())) return false;
      if (selectedTags.length > 0 && !selectedTags.some((tag) => text.includes(tag.toLowerCase()))) {
        return false;
      }
      return !search || text.includes(search);
    });
  }, [dateTime, category, venue, selectedTags, query]);

  const toggleTag = (tag: string) =>
    setSelectedTags((tags) => (tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]));

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

        <div className="filter-panel">
          <button
            type="button"
            className="filter-toggle"
            aria-expanded={mobileFiltersOpen}
            aria-controls="event-filters"
            onClick={() => setMobileFiltersOpen((isOpen) => !isOpen)}
          >
            <span className="filter-toggle-label">
              <Image src={asset("/assets/icons/filter.svg")} alt="" width={24} height={24} />
              {mobileFiltersOpen ? "CLOSE" : "FILTERS"}
            </span>
            <Image
              src={asset("/assets/icons/chevron-down.svg")}
              alt=""
              width={12}
              height={12}
              className={mobileFiltersOpen ? "filter-chevron filter-chevron-open" : "filter-chevron"}
            />
          </button>
          <div
            id="event-filters"
            className={[
              "filter-bar",
              browseOpen ? "filter-bar-open" : "",
              mobileFiltersOpen ? "filter-bar-mobile-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <DateTimeFilter value={dateTime} onChange={setDateTime} />
            <FilterDropdown label="Category" options={categoryOptions} value={category} onChange={setCategory} />
            <FilterDropdown label="Venue" options={venueOptions} value={venue} onChange={setVenue} />
            <button
              type="button"
              className={browseOpen ? "filter-segment filter-segment-open" : "filter-segment"}
              aria-expanded={browseOpen}
              onClick={() => setBrowseOpen((isOpen) => !isOpen)}
            >
              BROWSE BY
              <Image
                src={asset("/assets/icons/chevron-down.svg")}
                alt=""
                width={12}
                height={12}
                className={browseOpen ? "filter-chevron filter-chevron-open" : "filter-chevron"}
              />
            </button>
            <label className="filter-search">
              <Image src={asset("/assets/icons/search.svg")} alt="" width={16} height={16} />
              <input
                type="search"
                placeholder="Search by Event, Venue or Artist"
                className="filter-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          {browseOpen && (
            <div className="filter-tags">
              {browseTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={selectedTags.includes(tag)}
                  className={selectedTags.includes(tag) ? "filter-tag filter-tag-selected" : "filter-tag"}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {visibleEvents.length > 0 ? (
          <div className="events-grid">
            {visibleEvents.map((event) => (
              <EventCard key={event.href} event={event} />
            ))}
          </div>
        ) : (
          <p className="events-empty text-body">No events match your filters.</p>
        )}
      </div>
    </section>
  );
}
