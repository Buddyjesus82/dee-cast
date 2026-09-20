"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShadeId, VariantId } from "./products";
import { calcPrice, getShade, getVariant } from "./products";

export interface CartItem {
  id: string;
  productSlug: string;
  productName: string;
  variantId: VariantId;
  shadeId: ShadeId;
  quantity: number;
  unitPrice: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (input: {
    variantId: VariantId;
    shadeId: ShadeId;
    quantity: number;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function makeId(variantId: VariantId, shadeId: ShadeId) {
  return `clone-classic-${variantId}-${shadeId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: ({ variantId, shadeId, quantity }) => {
        const id = makeId(variantId, shadeId);
        const unitPrice = calcPrice(variantId, shadeId, 1);
        const existing = get().items.find((i) => i.id === id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    unitPrice,
                    variantId,
                    shadeId,
                  }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                id,
                productSlug: "clone-classic",
                productName: "Dee Cast Classic",
                variantId,
                shadeId,
                quantity,
                unitPrice,
              },
            ],
            isOpen: true,
          });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    { name: "clone-studio-cart-v2" }
  )
);

export function formatCartLine(item: CartItem) {
  const variant = getVariant(item.variantId);
  const shade = getShade(item.shadeId);
  return `${variant.label} · ${shade.name}`;
}
