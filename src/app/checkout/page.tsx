"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, formatCartLine } from "@/lib/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  const total = mounted ? subtotal() : 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 600);
  };

  if (mounted && items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
        <p className="font-sans text-muted mb-8">
          Add a Dee Cast Classic before checking out.
        </p>
        <Link
          href="/product/clone-classic"
          className="inline-flex rounded-pill bg-pink px-7 py-3 font-sans text-sm text-white shadow-pink"
        >
          Shop the Classic
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <div className="mb-8">
        <Link
          href="/checkout/cancel"
          className="font-sans text-sm text-muted hover:text-charcoal"
        >
          ← Cancel checkout
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-3xl bg-white/60 border border-black/5 p-6 md:p-8">
          <p className="font-sans text-sm text-muted mb-2">Payment</p>
          <p className="font-sans text-4xl font-semibold mb-8">
            ${total.toFixed(2)}
          </p>
          <ul className="space-y-4">
            {mounted &&
              items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between gap-4 font-sans text-sm border-b border-black/5 pb-3"
                >
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-muted text-xs mt-0.5">
                      {formatCartLine(item)} × {item.quantity}
                    </p>
                  </div>
                  <p>${(item.unitPrice * item.quantity).toFixed(2)}</p>
                </li>
              ))}
          </ul>
          <p className="mt-6 font-sans text-xs text-muted">
            Mock checkout — no real charge will be made.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white border border-black/5 p-6 md:p-8 space-y-6"
        >
          <div>
            <label className="block font-sans text-sm font-medium mb-2">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 font-sans text-sm outline-none focus:border-pink focus:ring-1 focus:ring-pink"
            />
          </div>

          <div>
            <p className="font-sans text-sm font-medium mb-2">Payment method</p>
            <div className="rounded-xl border border-black/15 overflow-hidden bg-cream">
              <div className="px-4 py-3 border-b border-black/10 font-sans text-sm">
                Card
              </div>
              <input
                required
                name="card"
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-3 font-sans text-sm bg-transparent outline-none border-b border-black/10"
              />
              <div className="grid grid-cols-2">
                <input
                  required
                  name="expiry"
                  placeholder="MM / YY"
                  className="px-4 py-3 font-sans text-sm bg-transparent outline-none border-r border-black/10"
                />
                <input
                  required
                  name="cvc"
                  placeholder="CVC"
                  className="px-4 py-3 font-sans text-sm bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-sans text-sm font-medium mb-2">
              Cardholder name
            </label>
            <input
              required
              name="name"
              placeholder="Full name on card"
              className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 font-sans text-sm outline-none focus:border-pink focus:ring-1 focus:ring-pink"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-sm font-medium mb-2">
                Country
              </label>
              <select className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 font-sans text-sm outline-none focus:border-pink">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-sm font-medium mb-2">
                ZIP
              </label>
              <input
                required
                name="zip"
                placeholder="10001"
                className="w-full rounded-xl border border-black/15 bg-cream px-4 py-3 font-sans text-sm outline-none focus:border-pink focus:ring-1 focus:ring-pink"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-pink py-3.5 font-sans text-sm font-medium text-white shadow-pink transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </section>
  );
}
