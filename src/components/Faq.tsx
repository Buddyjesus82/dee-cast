"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28 scroll-mt-24">
      <h2 className="font-serif text-3xl md:text-4xl mb-10 text-center">
        FAQ
      </h2>
      <div className="divide-y divide-black/10 border-y border-black/10">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <span className="font-serif text-xl md:text-2xl pr-4">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M5 7.5L10 12.5L15 7.5" />
                </svg>
              </button>
              <div className={`faq-answer ${open ? "open" : ""}`}>
                <div>
                  <p className="pb-6 font-sans text-sm md:text-base text-muted leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
