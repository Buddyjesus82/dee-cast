"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore, formatCartLine } from "@/lib/cart-store";
import { getShade } from "@/lib/products";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const total = subtotal();

  return (
    <>
      <div
        className={`cart-overlay fixed inset-0 z-[60] bg-black/40 ${isOpen ? "open" : ""}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button
            type="button"
            onClick={closeCart}
            className="font-sans text-sm text-muted hover:text-charcoal"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="font-sans text-sm text-muted py-8">
              Your bag is empty. Configure a Dee Cast Classic to begin.
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const shade = getShade(item.shadeId);
                return (
                  <li key={item.id} className="flex gap-4">
                    <div
                      className="h-20 w-16 shrink-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(145deg, ${shade.color} 0%, #1a1a1a 160%)`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium">
                        {item.productName}
                      </p>
                      <p className="font-sans text-xs text-muted mt-0.5">
                        {formatCartLine(item)}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-pill border border-charcoal/20">
                          <button
                            type="button"
                            className="px-3 py-1 text-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 text-sm font-sans">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-3 py-1 text-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-sans text-sm">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="font-sans text-xs text-muted hover:text-pink mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 px-6 py-5 space-y-4">
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={`block w-full rounded-pill bg-pink py-3.5 text-center font-sans text-sm font-medium text-white shadow-pink transition hover:brightness-110 ${
              items.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Checkout
          </Link>
          <button
            type="button"
            onClick={closeCart}
            className="block w-full font-sans text-xs text-muted hover:text-charcoal"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </>
  );
}
