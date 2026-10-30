const pages = ["1", "2", "3", "…", "199", "200"];

export default function Pagination() {
  return (
    <nav className="pagination" aria-label="Catalogue pages">
      <button type="button" className="pagination-button pagination-previous" disabled>
        Previous
      </button>
      <ul className="pagination-pages">
        {pages.map((page) => (
          <li key={page} className={page === "…" ? "pagination-ellipsis-item" : "pagination-page-item"}>
            {page === "…" ? (
              <span className="pagination-button pagination-ellipsis">{page}</span>
            ) : (
              <button
                type="button"
                className={page === "1" ? "pagination-button pagination-button-active" : "pagination-button"}
                aria-current={page === "1" ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button type="button" className="pagination-button pagination-next">
        Next
      </button>
    </nav>
  );
}
