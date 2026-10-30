"use client";

import {
  authorOptions,
  bindingOptions,
  genreOptions,
  languageOptions,
  publisherOptions,
} from "@/data/books";
import SelectMenu from "@/components/ui/SelectMenu";

export type CatalogueFilterState = {
  genres: string[];
  /** True once the user ticks "All"; it shows unchecked until then, as designed. */
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
  const authorQuery = filters.authorQuery.trim().toLowerCase();
  const visibleAuthors = authorOptions.filter((author) => author.toLowerCase().includes(authorQuery));
  const languageValue = filters.language ?? languageOptions[0];

  return (
    <div className="catalogue-filters">
      <div className="filter-heading">
        <p className="filter-heading-title">Refine your search</p>
        <button type="button" className="filter-clear" onClick={onClear}>
          Clear all
        </button>
      </div>

      <div className="filter-genres">
        {genreOptions.map((genre) => (
          <CheckboxOption
            key={genre}
            label={genre}
            checked={genre === "All" ? filters.allGenres : filters.genres.includes(genre)}
            onChange={() =>
              onChange(
                genre === "All"
                  ? { ...filters, genres: [], allGenres: !filters.allGenres }
                  : { ...filters, genres: toggle(filters.genres, genre), allGenres: false },
              )
            }
          />
        ))}
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
        {visibleAuthors.map((author) => (
          <CheckboxOption
            key={author}
            label={author}
            checked={filters.authors.includes(author)}
            onChange={() => onChange({ ...filters, authors: toggle(filters.authors, author) })}
          />
        ))}
        <button type="button" className="filter-chip">
          View more
        </button>
      </section>

      <section className="filter-group">
        <h4 className="filter-group-title">Language</h4>
        <SelectMenu
          variant="field"
          label="Language"
          options={languageOptions.map((language) => ({ value: language, label: language }))}
          value={languageValue}
          onChange={(language) => onChange({ ...filters, language })}
        />
      </section>

      <section className="filter-group">
        <h4 className="filter-group-title">Binding / edition</h4>
        {bindingOptions.map((binding) => (
          <CheckboxOption
            key={binding.label}
            label={binding.label}
            checked={filters.bindings.includes(binding.label)}
            onChange={() => onChange({ ...filters, bindings: toggle(filters.bindings, binding.label) })}
          />
        ))}
      </section>

      <section className="filter-group">
        <h4 className="filter-group-title">Publisher</h4>
        {publisherOptions.map((publisher) => (
          <CheckboxOption
            key={publisher}
            label={publisher}
            checked={filters.publishers.includes(publisher)}
            onChange={() => onChange({ ...filters, publishers: toggle(filters.publishers, publisher) })}
          />
        ))}
      </section>
    </div>
  );
}
