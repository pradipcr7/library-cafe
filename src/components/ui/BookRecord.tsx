import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Book } from "@/data/books";

export default function BookRecord({ book }: { book: Book }) {
  return (
    <article className="book-record">
      <div className="book-record-heading">
        <Image src={asset("/assets/icons/book.svg")} alt="" width={24} height={24} />
        <div className="book-record-text">
          <h3 className="book-record-title">{book.title}</h3>
          <p className="book-record-author">{book.author}</p>
        </div>
      </div>
      <div className="book-record-meta">
        <p>
          {book.genre} · {book.language} · {book.year}
        </p>
        <p>
          {book.publisher} · {book.binding}
        </p>
      </div>
      <p className="book-record-price">Sample ₹{book.price}</p>
    </article>
  );
}
