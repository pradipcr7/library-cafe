"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import BookRecord from "@/components/ui/BookRecord";
import CafeBanner from "@/components/ui/CafeBanner";
import CatalogueFilters, { emptyFilters, type CatalogueFilterState } from "@/components/ui/CatalogueFilters";
import Pagination from "@/components/ui/Pagination";
import SelectMenu from "@/components/ui/SelectMenu";
import { asset } from "@/lib/asset";
import { bindingOptions, books, sortOptions, TOTAL_TITLES } from "@/data/books";

const normalize = (text: string) => text.replace(/[’']/g, "'").toLowerCase();

export default function CatalogueBrowser() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CatalogueFilterState>(emptyFilters);
  const [sort, setSort] = useState("title");
  const [sheetOpen, setSheetOpen] = useState(false);

  const isFiltered =
    query.trim() !== "" ||
    filters.genres.length > 0 ||
    filters.authors.length > 0 ||
    filters.language !== null ||
    filters.bindings.length > 0 ||
    filters.publishers.length > 0;

  const visibleBooks = useMemo(() => {
    const search = query.trim().toLowerCase();
    const allowedBindings = bindingOptions
      .filter((option) => filters.bindings.includes(option.label))
      .flatMap((option) => option.bindings);

    const matches = books.filter((book) => {
      if (search && !`${book.title} ${book.author}`.toLowerCase().includes(search)) return false;
      if (filters.genres.length > 0 && !filters.genres.some((genre) => normalize(genre) === normalize(book.genre))) {
        return false;
      }
      if (filters.authors.length > 0 && !filters.authors.some((author) => book.authors.includes(author))) {
        return false;
      }
      if (filters.language && book.language !== filters.language) return false;
      if (allowedBindings.length > 0 && !allowedBindings.includes(book.binding)) return false;
      if (filters.publishers.length > 0 && !filters.publishers.includes(book.publisher)) return false;
      return true;
    });

    return [...matches].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price || a.title.localeCompare(b.title);
      if (sort === "price-desc") return b.price - a.price || a.title.localeCompare(b.title);
      return a.title.localeCompare(b.title);
    });
  }, [query, filters, sort]);

  const total = isFiltered ? String(visibleBooks.length) : TOTAL_TITLES;
  const shown = isFiltered ? visibleBooks.length : books.length;
  const clearAll = () => {
    setFilters(emptyFilters);
    setQuery("");
  };

  return (
    <>
      <section className="catalogue-intro">
        <div className="container catalogue-intro-layout">
          <h2 className="catalogue-title">Explore the Collection</h2>
          <p className="catalogue-description">
            From timeless classics to contemporary ideas, discover something that speaks to you.
          </p>
          <label className="catalogue-search">
            <span className="catalogue-search-label">Search the collection</span>
            <span className="catalogue-search-field">
              <Image src={asset("/assets/icons/catalogue-search.svg")} alt="" width={20} height={20} />
              <input
                type="search"
                className="catalogue-search-input"
                placeholder="Search by book title, author, keyword…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>
          <a href="#" className="catalogue-download">
            <Image src={asset("/assets/icons/catalogue-download.svg")} alt="" width={18} height={18} />
            Download catalogue
          </a>
        </div>
      </section>

      <section className="catalogue-workspace">
        <div className="container catalogue-workspace-layout">
          <aside className="catalogue-sidebar" aria-label="Filters">
            <CatalogueFilters filters={filters} onChange={setFilters} onClear={clearAll} />
          </aside>

          <div className="catalogue-directory">
            <div className="catalogue-controls">
              <p className="catalogue-count">
                Showing <strong>{shown === 0 ? "0" : `1–${shown}`}</strong> of <strong>{total}</strong>
              </p>
              <button type="button" className="catalogue-filters-button" onClick={() => setSheetOpen(true)}>
                <Image src={asset("/assets/icons/filters-button.svg")} alt="" width={20} height={20} />
                FILTERS
              </button>
              <div className="catalogue-sort">
                <span className="catalogue-sort-label">Sort by</span>
                <SelectMenu variant="sort" label="Sort by" options={sortOptions} value={sort} onChange={setSort} />
              </div>
            </div>

            <div className="catalogue-labels" aria-hidden>
              <span className="catalogue-label-title">TITLE &amp; AUTHOR</span>
              <span className="catalogue-label-genre">GENRE</span>
              <span className="catalogue-label-price">PRICE</span>
            </div>

            {visibleBooks.length > 0 ? (
              <div className="catalogue-records">
                {visibleBooks.map((book) => (
                  <BookRecord key={book.title} book={book} />
                ))}
              </div>
            ) : (
              <p className="catalogue-empty">No titles match your search.</p>
            )}

            <CafeBanner />
            <Pagination />
          </div>
        </div>
      </section>

      {sheetOpen && (
        <div className="filter-sheet-overlay">
          <button
            type="button"
            className="filter-sheet-backdrop"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
          />
          <div className="filter-sheet" role="dialog" aria-label="Filters">
            <div className="filter-sheet-handle" aria-hidden />
            <div className="filter-sheet-heading">
              <p className="filter-sheet-title">FILTERS</p>
              <button type="button" className="filter-sheet-close" aria-label="Close filters" onClick={() => setSheetOpen(false)}>
                <Image src={asset("/assets/icons/close-sheet.svg")} alt="" width={44} height={44} />
              </button>
            </div>
            <div className="filter-sheet-body">
              <CatalogueFilters filters={filters} onChange={setFilters} onClear={clearAll} />
            </div>
            <button
              type="button"
              className="catalogue-button catalogue-button-primary filter-sheet-apply"
              onClick={() => setSheetOpen(false)}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
