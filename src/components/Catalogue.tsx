import Link from "next/link";
import CatalogueGallery from "./CatalogueGallery";
import { PRODUCT, VARIANTS } from "@/lib/products";

export default function Catalogue() {
  return (
    <section id="shop" className="bg-charcoal text-white scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-pink mb-6">
              The Catalogue · 01
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.08] mb-5">
              Dee Cast Classic.
            </h2>
            <p className="font-sans text-[15px] text-white/70 leading-relaxed mb-6 max-w-sm">
              Body-safe silicone cast from the studio&apos;s signature form.
              Fresh mold for every order — each piece one-of-one. Classic,
              Glow-in-the-dark, or Vibrating — choose your option and shade; we
              pour to order.
            </p>

            <ul className="mb-8 space-y-1.5 font-sans text-sm text-white/65">
              {VARIANTS.map((v) => (
                <li key={v.id}>
                  <span className="text-white/90">{v.label}</span>
                  {" — $"}
                  {v.price}
                </li>
              ))}
            </ul>

            <p className="mb-4 font-sans text-[11px] tracking-[0.18em] uppercase text-white/45">
              Example pours
            </p>
            <div className="mb-9 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 max-w-lg">
              {[
                { name: "Pink", color: "#FF2D8F" },
                { name: "Lime", color: "#C8F54A" },
                { name: "Black", color: "#1A1A1A" },
                { name: "Peach", color: "#F5C4A8" },
                { name: "Purple", color: "#6B3FA0" },
                { name: "Glow Cyan", color: "#00B4D8" },
              ].map((swatch) => (
                <div
                  key={swatch.name}
                  className="flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-2.5 py-1.5"
                >
                  <span
                    className="h-5 w-5 shrink-0 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: swatch.color }}
                    aria-hidden
                  />
                  <span className="font-sans text-[11px] text-white/75 truncate">
                    {swatch.name}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/product/clone-classic"
              className="inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/5 px-6 py-3 font-sans text-sm text-white transition-all duration-200 hover:border-pink hover:bg-pink hover:shadow-pink"
            >
              Configure yours <span aria-hidden>↗</span>
            </Link>
            <p className="mt-5 font-sans text-sm text-white/55 tracking-wide">
              From ${PRODUCT.fromPrice}
            </p>
          </div>

          <CatalogueGallery />
        </div>
      </div>
    </section>
  );
}
