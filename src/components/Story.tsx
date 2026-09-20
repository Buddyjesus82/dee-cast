import ProductMedia from "./ProductMedia";

export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 scroll-mt-24">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <ProductMedia
          variant="story"
          className="aspect-[4/5] w-full order-2 md:order-1"
          label="Dee Cast Classic"
        />
        <div className="order-1 md:order-2">
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-pink mb-6">
            A Note from the Studio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] mb-7 text-balance">
            One signature shape,{" "}
            <em className="italic">a new mold every time.</em>
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed mb-5 max-w-md">
            I started Dee Cast to turn my own form into something you can
            actually hold — not a custom mold kit, not a clone-yourself service.
            One signature anatomy, taken from me, then poured by hand into soft
            body-safe silicone.
          </p>
          <p className="font-sans text-base text-charcoal leading-relaxed max-w-md">
            Every purchase is cast from a newly made mold, so no two items are
            the same. Same source. One-of-one finish. A beautiful object
            you&apos;ll want to keep.
          </p>
        </div>
      </div>
    </section>
  );
}
