"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

export type DateTimeValue = {
  /** ISO date (YYYY-MM-DD) or null when no date is chosen. */
  date: string | null;
  /** Minutes from midnight; 0 means no time restriction. */
  minutes: number;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => i * 30);

const toIso = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export function formatTime(minutes: number) {
  const hours24 = Math.floor(minutes / 60);
  const mins = String(minutes % 60).padStart(2, "0");
  const suffix = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${mins} ${suffix}`;
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1].slice(0, 3)} ${day}, ${year}`;
}

export default function DateTimeFilter({
  value,
  onChange,
}: {
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"date" | "time">("date");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const now = new Date();
  const todayIso = toIso(now.getFullYear(), now.getMonth(), now.getDate());
  const firstWeekday = new Date(month.year, month.month, 1).getDay();
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const daysInPrevMonth = new Date(month.year, month.month, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstWeekday + 1;
    if (day < 1) return { day: daysInPrevMonth + day, iso: null };
    if (day > daysInMonth) return { day: day - daysInMonth, iso: null };
    return { day, iso: toIso(month.year, month.month, day) };
  });

  const shiftMonth = (delta: number) =>
    setMonth(({ year, month: m }) => {
      const next = new Date(year, m + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const hasValue = value.date !== null || value.minutes !== 0;
  const label = hasValue
    ? `${value.date ? formatDate(value.date) : "ANY DATE"} · ${formatTime(value.minutes)}`
    : "DATE & TIME";

  return (
    <div ref={rootRef} className="filter-dropdown">
      <button
        type="button"
        className={open ? "filter-segment filter-segment-open" : "filter-segment"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {label}
        <Image
          src={asset("/assets/icons/chevron-down.svg")}
          alt=""
          width={12}
          height={12}
          className={open ? "filter-chevron filter-chevron-open" : "filter-chevron"}
        />
      </button>

      {open && (
        <div className="datetime-panel" role="dialog" aria-label="Choose date and time">
          <div className="datetime-tabs">
            <button
              type="button"
              className={view === "date" ? "datetime-tab datetime-tab-active" : "datetime-tab"}
              onClick={() => setView("date")}
            >
              <Image src={asset("/assets/icons/calendar-check.svg")} alt="" width={24} height={24} />
              {value.date ? formatDate(value.date) : "DATE"}
            </button>
            <button
              type="button"
              className={view === "time" ? "datetime-tab datetime-tab-active" : "datetime-tab"}
              onClick={() => setView("time")}
            >
              <Image src={asset("/assets/icons/clock-dark.svg")} alt="" width={24} height={24} />
              {formatTime(value.minutes)}
            </button>
          </div>

          {view === "date" ? (
            <div className="calendar">
              <div className="calendar-header">
                <button type="button" className="calendar-nav" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
                  ‹
                </button>
                <p className="calendar-title">
                  {MONTHS[month.month]} {month.year}
                </p>
                <button type="button" className="calendar-nav" aria-label="Next month" onClick={() => shiftMonth(1)}>
                  ›
                </button>
              </div>
              <div className="calendar-grid">
                {WEEKDAYS.map((weekday) => (
                  <span key={weekday} className="calendar-weekday">
                    {weekday}
                  </span>
                ))}
                {cells.map((cell, index) => {
                  const disabled = cell.iso === null || cell.iso < todayIso;
                  const selected = cell.iso !== null && cell.iso === value.date;
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={disabled}
                      aria-pressed={selected}
                      className={selected ? "calendar-day calendar-day-selected" : "calendar-day"}
                      onClick={() => {
                        onChange({ ...value, date: selected ? null : cell.iso });
                        setView("time");
                      }}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <ul className="time-list" role="listbox" aria-label="Time">
              {TIME_OPTIONS.map((minutes) => (
                <li key={minutes} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={minutes === value.minutes}
                    className={
                      minutes === value.minutes
                        ? "filter-dropdown-option filter-dropdown-option-selected"
                        : "filter-dropdown-option"
                    }
                    onClick={() => {
                      onChange({ ...value, minutes });
                      setOpen(false);
                    }}
                  >
                    {formatTime(minutes)}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {hasValue && (
            <button
              type="button"
              className="datetime-clear"
              onClick={() => onChange({ date: null, minutes: 0 })}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
