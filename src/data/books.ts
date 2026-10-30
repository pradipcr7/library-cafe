export type Binding = "Hardcover" | "Paperback" | "Trade Paperback";

export type Book = {
  title: string;
  /** Display string, e.g. "Mira Sen · with Dev Mehta". */
  author: string;
  authors: string[];
  genre: string;
  language: string;
  year: number;
  publisher: string;
  binding: Binding;
  price: number;
};

export const TOTAL_TITLES = "3,000";

export const genreOptions = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Architecture",
  "Young adult",
  "Literature",
  "History",
  "Philosophy",
  "Biography",
  "Business & Management",
  "Children’s Books",
];

export const authorOptions = [
  "Mira Sen",
  "Dev Mehta",
  "Leela Nair",
  "Anaya Desai",
  "Rohan Shah",
  "Tara Rao",
  "Kabir Sethi",
  "Isha Kapoor",
  "Neil Dutta",
  "Arjun Kale",
];

export const languageOptions = ["English", "Hindi", "Marathi"];

export const bindingOptions = [
  { label: "Hardcover / Hardback", bindings: ["Hardcover"] as Binding[] },
  { label: "Paperback / Trade Paperback", bindings: ["Paperback", "Trade Paperback"] as Binding[] },
];

export const publisherOptions = ["Example Press", "Sample House"];

export const sortOptions = [
  { value: "title", label: "Title A–Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const history = { genre: "History", language: "Hindi", year: 2018, publisher: "Sample House", binding: "Paperback" as Binding };

export const books: Book[] = [
  { title: "A City in Layers", author: "Dev Mehta", authors: ["Dev Mehta"], ...history, price: 950 },
  { title: "A Garden of Questions", author: "Tara Rao", authors: ["Tara Rao"], ...history, price: 350 },
  { title: "A Measure of Time", author: "Rohan Shah", authors: ["Rohan Shah"], ...history, price: 350 },
  { title: "After the Monsoon", author: "Anaya Desai", authors: ["Anaya Desai"], ...history, price: 350 },
  { title: "Art of the Everyday", author: "Mira Sen", authors: ["Mira Sen"], ...history, price: 350 },
  { title: "Between Two Rivers", author: "Kabir Sethi", authors: ["Kabir Sethi"], ...history, price: 350 },
  { title: "Building with Light", author: "Dev Mehta", authors: ["Dev Mehta"], ...history, price: 350 },
  { title: "Colour and Form", author: "Leela Nair", authors: ["Leela Nair"], ...history, price: 350 },
  { title: "Conversations with Tomorrow", author: "Rohan Shah", authors: ["Rohan Shah"], ...history, price: 350 },
  { title: "Crafting New Ideas", author: "Isha Kapoor", authors: ["Isha Kapoor"], ...history, price: 350 },
  {
    title: "Days of Small Wonders",
    author: "Tara Rao",
    authors: ["Tara Rao"],
    genre: "Children's Books",
    language: "Marathi",
    year: 2020,
    publisher: "Example Press",
    binding: "Paperback",
    price: 350,
  },
  {
    title: "Designing for People",
    author: "Leela Nair",
    authors: ["Leela Nair"],
    genre: "Design",
    language: "English",
    year: 2024,
    publisher: "Sample House",
    binding: "Trade Paperback",
    price: 350,
  },
  { title: "Frames of Memory", author: "Neil Dutta", authors: ["Neil Dutta"], ...history, price: 350 },
  { title: "Histories in Conversation", author: "Rohan Shah", authors: ["Rohan Shah"], ...history, price: 350 },
  {
    title: "Indian Forms, New Voices",
    author: "Mira Sen · with Dev Mehta",
    authors: ["Mira Sen", "Dev Mehta"],
    genre: "Art & Culture",
    language: "English",
    year: 2022,
    publisher: "Example Press",
    binding: "Paperback",
    price: 350,
  },
];
