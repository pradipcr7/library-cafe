type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages: (number | "…")[] = [];
  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const end = Math.min(pageCount, start + 4);

  if (start > 1) pages.push(1, "…");
  for (let current = start; current <= end; current += 1) pages.push(current);
  if (end < pageCount) pages.push("…", pageCount);

  return (
    <nav className="pagination" aria-label="Catalogue pages">
      <button
        type="button"
        className="pagination-button pagination-previous"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <ul className="pagination-pages">
        {pages.map((number, index) => (
          <li key={`${number}-${index}`} className={number === "…" ? "pagination-ellipsis-item" : "pagination-page-item"}>
            {number === "…" ? (
              <span className="pagination-button pagination-ellipsis">{number}</span>
            ) : (
              <button
                type="button"
                className={number === page ? "pagination-button pagination-button-active" : "pagination-button"}
                aria-current={number === page ? "page" : undefined}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pagination-button pagination-next"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
