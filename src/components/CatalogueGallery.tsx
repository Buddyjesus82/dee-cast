"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { PRODUCT_EXAMPLES } from "@/lib/products";

export default function CatalogueGallery() {
  const [activeId, setActiveId] = useState("lime");
  const active =
    PRODUCT_EXAMPLES.find((e) => e.id === activeId) ?? PRODUCT_EXAMPLES[0];

  return (
    <div className="w-full">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-media shadow-media ring-1 ring-white/10 bg-cream"
        role="img"
        aria-label={active.alt}
      >
        <Image
          src={withBasePath(active.src)}
          alt={active.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="rounded-pill bg-charcoal/70 px-3 py-1.5 font-sans text-[11px] tracking-[0.12em] uppercase text-white backdrop-blur-sm">
            {active.label}
          </span>
        </div>
      </div>

      <p className="mt-4 mb-3 font-sans text-[11px] tracking-[0.18em] uppercase text-white/50">
        Product examples
      </p>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
        {PRODUCT_EXAMPLES.map((example) => {
          const selected = example.id === activeId;
          return (
            <button
              key={example.id}
              type="button"
              onClick={() => setActiveId(example.id)}
              className={`group relative aspect-square overflow-hidden rounded-2xl bg-cream transition-all duration-200 ${
                selected
                  ? "ring-2 ring-pink ring-offset-2 ring-offset-charcoal"
                  : "ring-1 ring-white/15 hover:ring-white/40"
              }`}
              aria-label={`Show ${example.label}`}
              aria-pressed={selected}
              title={example.caption}
            >
              <Image
                src={withBasePath(example.src)}
                alt={example.alt}
                fill
                sizes="120px"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>
      <p className="mt-3 font-sans text-xs text-white/55">{active.caption}</p>
    </div>
  );
}
