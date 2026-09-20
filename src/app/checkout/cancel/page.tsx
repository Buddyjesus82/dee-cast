import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto max-w-lg px-6 py-28 text-center">
      <h1 className="font-serif text-4xl md:text-5xl mb-5">
        Checkout cancelled.
      </h1>
      <p className="font-sans text-muted leading-relaxed mb-10">
        No charge was made. Your bag is still saved — pick up where you left off
        whenever you&apos;re ready.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/product/clone-classic"
          className="inline-flex rounded-pill bg-pink px-7 py-3.5 font-sans text-sm font-medium text-white shadow-pink hover:brightness-110"
        >
          Back to product
        </Link>
        <Link
          href="/"
          className="inline-flex rounded-pill bg-charcoal px-7 py-3.5 font-sans text-sm font-medium text-white hover:opacity-90"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
