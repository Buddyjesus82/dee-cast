"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import {
  PRODUCT,
  PRODUCT_EXAMPLES,
  VARIANTS,
  type ShadeId,
  type VariantId,
  calcPrice,
  defaultShadeForVariant,
  getShade,
  getShadesForVariant,
  getVariant,
  mediaForSelection,
} from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import ProductMedia from "./ProductMedia";

export default function ProductConfigurator() {
  const [variantId, setVariantId] = useState<VariantId>("classic");
  const [shadeId, setShadeId] = useState<ShadeId>("hot-pink");
  const [qty, setQty] = useState(1);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const variant = getVariant(variantId);
  const shades = getShadesForVariant(variantId);
  const shade = getShade(shadeId);
  const price = useMemo(
    () => calcPrice(variantId, shadeId, qty),
    [variantId, shadeId, qty]
  );

  const selectionMedia = useMemo(
    () => mediaForSelection(variantId, shadeId),
    [variantId, shadeId]
  );

  const activeSrc = previewSrc ?? selectionMedia.src;
  const activeAlt =
    PRODUCT_EXAMPLES.find((e) => e.src === activeSrc)?.alt ??
    selectionMedia.alt;

  const selectVariant = (id: VariantId) => {
    setVariantId(id);
    setPreviewSrc(null);
    const nextShades = getShadesForVariant(id);
    if (!nextShades.some((s) => s.id === shadeId)) {
      setShadeId(defaultShadeForVariant(id));
    }
  };

  const selectShade = (id: ShadeId) => {
    setShadeId(id);
    setPreviewSrc(null);
  };

  const shadeLabel =
    variant.shadeGroup === "glow" ? "Glow color" : "Shade";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-24">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
        <div className="md:sticky md:top-28">
          <ProductMedia
            variant="product"
            className="aspect-[4/5] w-full"
            label={activeAlt}
            imageSrc={activeSrc}
            imageAlt={activeAlt}
          />

          <p className="mt-4 mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-muted">
            Examples
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {PRODUCT_EXAMPLES.map((example) => {
              const selected = example.src === activeSrc;
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setPreviewSrc(example.src)}
                  className={`group relative aspect-square overflow-hidden rounded-2xl bg-cream transition-all duration-200 ${
                    selected
                      ? "ring-2 ring-pink ring-offset-2 ring-offset-cream"
                      : "ring-1 ring-charcoal/10 hover:ring-charcoal/30"
                  }`}
                  aria-label={`Preview ${example.label}`}
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
        </div>

        <div className="md:pt-2">
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-pink mb-4">
            Body-Safe Silicone · One-of-One · From ${PRODUCT.fromPrice}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] mb-3">
            {PRODUCT.name}
          </h1>
          <p className="font-sans text-sm text-muted mb-2 max-w-lg leading-relaxed">
            {PRODUCT.tagline}
          </p>
          <p className="font-sans text-sm md:text-base text-muted leading-relaxed mb-10 max-w-lg">
            {PRODUCT.description}
          </p>

          <div className="mb-9">
            <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              Option — {variant.label}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {VARIANTS.map((v) => {
                const active = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => selectVariant(v.id)}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                      active
                        ? "border-pink bg-pink/10 shadow-sm ring-1 ring-pink/40"
                        : "border-charcoal/10 bg-white/50 hover:border-charcoal/25"
                    }`}
                    aria-pressed={active}
                  >
                    <p className="font-sans text-sm font-medium">{v.label}</p>
                    <p className="mt-1 font-sans text-base font-semibold tabular-nums">
                      ${v.price}
                    </p>
                    <p className="mt-2 font-sans text-xs text-muted leading-snug">
                      {v.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-9">
            <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              {shadeLabel} — {shade.name}
            </p>
            <div className="flex flex-wrap items-center gap-3.5 mb-2">
              {shades.map((s) => {
                const active = s.id === shadeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectShade(s.id)}
                    className={`h-10 w-10 rounded-full transition-all duration-200 ${
                      active
                        ? "scale-110 ring-2 ring-offset-2 ring-charcoal ring-offset-cream shadow-md"
                        : "ring-1 ring-black/10 hover:scale-105 hover:ring-charcoal/30"
                    }`}
                    style={{ backgroundColor: s.color }}
                    aria-label={s.name}
                    title={s.name}
                  />
                );
              })}
            </div>
            {variant.id === "vibrating" && (
              <p className="font-sans text-xs text-muted mt-2">
                Vibrating is available in all classic solid colors.
              </p>
            )}
            {variant.id === "glow" && (
              <p className="font-sans text-xs text-muted mt-2">
                Glow pigments look soft in daylight and bright after charging.
              </p>
            )}
            {shade.surcharge > 0 && (
              <p className="font-sans text-xs text-muted mt-2">
                +${shade.surcharge.toFixed(2)} for this shade
              </p>
            )}
          </div>

          <div className="mb-9 flex flex-wrap items-end gap-8">
            <div>
              <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center rounded-pill border border-charcoal/20 bg-white/40 transition hover:border-charcoal/40">
                <button
                  type="button"
                  className="px-4 py-2.5 text-base transition hover:text-pink"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center font-sans text-sm tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  className="px-4 py-2.5 text-base transition hover:text-pink"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 text-muted">
                Total
              </p>
              <p className="font-sans text-3xl font-medium tracking-tight tabular-nums">
                ${price.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              addItem({ variantId, shadeId, quantity: qty })
            }
            className="btn-primary w-full sm:w-auto rounded-pill bg-pink px-12 py-4 font-sans text-sm font-medium text-white shadow-pink"
          >
            Add to bag
          </button>
        </div>
      </div>
    </section>
  );
}
