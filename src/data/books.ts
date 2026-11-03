import catalogue from "@/data/books.json";

export type Book = {
  id: string;
  title: string;
  author: string;
  authors: string[];
  genre: string;
  language: string;
  year: number;
  publisher: string;
  binding: string;
  price: number;
  image: string;
};

export const books = catalogue as Book[];
export const TOTAL_TITLES = books.length.toLocaleString("en-IN");
export const genreOptions = ["All", ...Array.from(new Set(books.map((book) => book.genre))).sort()];
export const authorOptions = Array.from(new Set(books.flatMap((book) => book.authors))).sort();
export const languageOptions = ["English", "Hindi", "Marathi"];
export const bindingOptions: { label: string; bindings: string[] }[] = [];
export const publisherOptions = Array.from(new Set(books.map((book) => book.publisher).filter(Boolean))).sort();
export const sortOptions = [
  { value: "title", label: "Title A–Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];
