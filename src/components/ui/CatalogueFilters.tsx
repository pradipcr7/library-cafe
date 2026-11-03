"use client";

import { useState } from "react";

import {
  authorOptions,
  genreOptions,
  languageOptions,
  publisherOptions,
} from "@/data/books";
import SelectMenu from "@/components/ui/SelectMenu";

export type CatalogueFilterState = {
  genres: string[];
  allGenres: boolean;
  authors: string[];
  authorQuery: string;
  language: string | null;
  bindings: string[];
  publishers: string[];
};

export const emptyFilters: CatalogueFilterState = {
  genres: [],
  allGenres: false,
  authors: [],
  authorQuery: "",
  language: null,
  bindings: [],
  publishers: [],
};

const toggle = (list: string[], item: string) =>
  list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="filter-option">
      <input type="checkbox" className="filter-checkbox" checked={checked} onChange={onChange} />
      <span className="filter-option-label">{label}</span>
    </label>
  );
}

export default function CatalogueFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: CatalogueFilterState;
  onChange: (next: CatalogueFilterState) => void;
  onClear: () => void;
}) {
  const [genresExpanded, setGenresExpanded] = useState(false);
  const [authorsExpanded, setAuthorsExpanded] = useState(false);
  const authorQuery = filters.authorQuery.trim().toLowerCase();
  const matchingAuthors = authorOptions.filter((author) => author.toLowerCase().includes(authorQuery));
  const visibleAuthors = authorsExpanded ? matchingAuthors : matchingAuthors.slice(0, 10);
  const visibleGenres = genresExpanded ? genreOptions.slice(1) : genreOptions.slice(1, 11);
  const languageValue = filters.language ?? "all";

  return (
    <div className="catalogue-filters">
      <div className="filter-heading">
        <p className="filter-heading-title">Refine your search</p>
        <button type="button" className="filter-clear" onClick={onClear}>
          Clear all
        </button>
      </div>

      <div className="filter-genres" style={{ minHeight: 0, height: "auto" }}>
        <CheckboxOption
          label="All"
          checked={filters.allGenres}
          onChange={() => {
            const selectAll = !filters.allGenres;
            onChange({
              ...filters,
              genres: selectAll ? genreOptions.slice(1) : [],
              allGenres: selectAll,
            });
          }}
        />
        {visibleGenres.map((genre) => (
          <CheckboxOption
            key={genre}
            label={genre}
            checked={filters.genres.includes(genre)}
            onChange={() => {
              const genres = toggle(filters.genres, genre);
              onChange({
                ...filters,
                genres,
                allGenres: genres.length === genreOptions.length - 1,
              });
            }}
          />
        ))}
        {genreOptions.length > 11 && (
          <button
            type="button"
            className="filter-chip"
            onClick={() => setGenresExpanded((expanded) => !expanded)}
          >
            {genresExpanded ? "View less" : "View more"}
          </button>
        )}
      </div>

      <section className="filter-group">
        <h4 className="filter-group-title">Author</h4>
        <input
          type="search"
          className="filter-text-input"
          placeholder="Search authors"
          aria-label="Search authors"
          value={filters.authorQuery}
          onChange={(event) => onChange({ ...filters, authorQuery: event.target.value })}
        />
        <div className="filter-checkbox-options">
          {visibleAuthors.map((author) => (
            <CheckboxOption
              key={author}
              label={author}
              checked={filters.authors.includes(author)}
              onChange={() => onChange({ ...filters, authors: toggle(filters.authors, author) })}
            />
          ))}
          {matchingAuthors.length > 10 && (
            <button
              type="button"
              className="filter-chip"
              onClick={() => setAuthorsExpanded((expanded) => !expanded)}
            >
              {authorsExpanded ? "View less" : "View more"}
            </button>
          )}
        </div>
      </section>

      <section className="filter-group">
        <h4 className="filter-group-title">Language</h4>
        <SelectMenu
          variant="field"
          label="Language"
          options={[
            { value: "all", label: "All languages" },
            ...languageOptions.map((language) => ({ value: language, label: language })),
          ]}
          value={languageValue}
          onChange={(language) => onChange({ ...filters, language: language === "all" ? null : language })}
        />
      </section>

      <section className="filter-group">
        <h4 className="filter-group-title">Publisher</h4>
        <div className="filter-checkbox-options">
          {publisherOptions.map((publisher) => (
            <CheckboxOption
              key={publisher}
              label={publisher}
              checked={filters.publishers.includes(publisher)}
              onChange={() => onChange({ ...filters, publishers: toggle(filters.publishers, publisher) })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
