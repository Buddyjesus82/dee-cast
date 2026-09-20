import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="mx-auto max-w-lg px-6 py-28 text-center">
      <h1 className="font-serif text-4xl md:text-5xl mb-5">Order confirmed.</h1>
      <p className="font-sans text-muted leading-relaxed mb-10">
        Thank you — your Dee Cast Classic is in the queue. We&apos;ll make a fresh
        mold for your order, pour it by hand in body-safe silicone (Classic,
        Glow, or Vibrating as you chose), and ship discreetly from Brooklyn. No
        two pieces are the same. (This was a mock checkout; no charge was made.)
      </p>
      <Link
        href="/"
        className="btn-primary inline-flex rounded-pill bg-pink px-8 py-3.5 font-sans text-sm font-medium text-white shadow-pink"
      >
        Return home
      </Link>
    </section>
  );
}
