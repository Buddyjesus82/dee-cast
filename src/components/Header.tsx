"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Story", href: "/#story" },
  { label: "Shop", href: "/#shop" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCount(items.reduce((n, i) => n + i.quantity, 0));
  }, [items]);

  const scrollOrNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-black/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <nav className="flex flex-1 items-center gap-6 md:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => scrollOrNavigate(e, item.href)}
              className="font-sans text-xs tracking-wide text-charcoal hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-xl md:text-2xl tracking-tight text-charcoal"
        >
          dee cast
        </Link>

        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={openCart}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-wide text-charcoal hover:opacity-70"
            aria-label="Open cart"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M6 7h12l-1 13H7L6 7z" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" />
            </svg>
            <span>Cart ({mounted ? count : 0})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
