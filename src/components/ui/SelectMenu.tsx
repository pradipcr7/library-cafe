"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Option = { value: string; label: string };

export default function SelectMenu({
  label,
  options,
  value,
  onChange,
  variant,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant: "sort" | "field";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === value) ?? options[0];

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

  const chevron = variant === "sort" ? "/assets/icons/sort-chevron.svg" : "/assets/icons/select-chevron.svg";

  return (
    <div ref={rootRef} className={`select-menu select-menu-${variant}`}>
      <button
        type="button"
        className="select-menu-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {current.label}
        <Image src={asset(chevron)} alt="" width={16} height={16} />
      </button>
      {open && (
        <ul className="select-menu-list" role="listbox" aria-label={label}>
          {options.map((option) => (
            <li key={option.value} role="presentation" className="select-menu-item">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className="select-menu-option"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
