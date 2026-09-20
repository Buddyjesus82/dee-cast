import Link from "next/link";
import ProductMedia from "./ProductMedia";
import { PRODUCT } from "@/lib/products";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-pink mb-6">
            Small Batch · One-of-One · From ${PRODUCT.fromPrice}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight mb-7">
            <span className="block">one signature</span>
            <span className="block">shape,</span>
            <span className="block text-pink">never the same twice.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-muted max-w-md leading-relaxed mb-10">
            Boutique silicone toys cast from my form. Every order gets a
            freshly made mold — so no two pieces are alike. Classic, glow, or
            vibrating. Hand-poured. Discreetly shipped.
          </p>
          <Link
            href="/product/clone-classic"
            className="btn-primary inline-flex items-center rounded-pill bg-pink px-8 py-3.5 font-sans text-sm font-medium text-white shadow-pink"
          >
            Shop the Classic
          </Link>
        </div>
        <ProductMedia
          variant="hero"
          className="aspect-[4/5] w-full"
          label="Dee Cast Classic"
        />
      </div>
    </section>
  );
}
