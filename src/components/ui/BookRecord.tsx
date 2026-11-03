import { useState } from "react";
import type { Book } from "@/data/books";

const sentenceCase = (value: string) =>
  value.toLocaleLowerCase().replace(/\p{L}/u, (letter) => letter.toLocaleUpperCase());

export default function BookRecord({ book }: { book: Book }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="book-record">
      {book.image && !imageFailed ? (
        <img
          className="book-record-cover"
          src={book.image}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          width={192}
          style={{ width: "8rem", maxWidth: "8rem", height: "auto" }}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="book-record-cover book-record-cover-empty" aria-hidden="true" />
      )}
      <div className="book-record-content">
        <div className="book-record-heading">
          <div className="book-record-text">
            <h3 className="book-record-title">{sentenceCase(book.title)}</h3>
            <p className="book-record-author">{sentenceCase(book.author)}</p>
          </div>
        </div>
        <div className="book-record-meta">
          <p>{book.genre}</p>
        </div>
        <p className="book-record-price">₹{book.price.toLocaleString("en-IN")}</p>
      </div>
    </article>
  );
}
