"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

const faqs = [
  {
    question: "What can I experience at Library Cafe?",
    answer:
      "Talks, storytelling sessions, book-club style events, and workshops, layered on top of the usual dining experience.",
  },
  {
    question: "How can I book a Library Cafe event?",
    answer: "Browse The Library events on this page and pick the event you would like to attend.",
  },
  {
    question: "How can I reserve a table at Library Cafe?",
    answer: "Call +91 89284 07494 (11am - 11pm) or email artscafe@nmacc.com.",
  },
  {
    question: "What events and activities are coming up?",
    answer: "See The Library events above, or download the calendar for the full schedule.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="heading-xl faq-title">FAQs</h2>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon-wrapper">
                    <span className={isOpen ? "faq-icon faq-icon-open" : "faq-icon"}>
                      <Image src={asset("/assets/icons/faq-chevron.svg")} alt="" width={24} height={24} />
                    </span>
                  </span>
                </button>
                {isOpen && <p className="text-body faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
