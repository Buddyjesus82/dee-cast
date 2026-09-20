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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 px-3 sm:h-[4.75rem] sm:gap-x-6 sm:px-6 md:h-20 md:px-10">
        <nav
          className="flex min-w-0 items-center gap-2.5 sm:gap-6 md:gap-8"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => scrollOrNavigate(e, item.href)}
              className="whitespace-nowrap font-sans text-[11px] tracking-wide text-muted transition-colors hover:text-charcoal hover:underline underline-offset-4 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="justify-self-center whitespace-nowrap px-0.5 font-serif text-[1.7rem] font-medium italic leading-none tracking-tight text-charcoal sm:px-2 sm:text-4xl md:text-5xl"
        >
          dee <span className="text-pink">cast</span>
        </Link>

        <div className="flex min-w-0 items-center justify-end">
          <button
            type="button"
            onClick={openCart}
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[11px] tracking-wide text-muted transition-colors hover:text-charcoal sm:gap-2 sm:text-xs"
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
              className="shrink-0"
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
