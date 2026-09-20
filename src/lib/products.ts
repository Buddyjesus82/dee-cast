export type VariantId = "classic" | "glow" | "vibrating";

export type ClassicShadeId =
  | "hot-pink"
  | "lime"
  | "black"
  | "peach"
  | "royal-purple";

export type GlowShadeId =
  | "glow-green"
  | "glow-pink"
  | "glow-blue"
  | "glow-white";

export type ShadeId = ClassicShadeId | GlowShadeId;

export type ShadeGroup = "classic" | "glow";

export interface Variant {
  id: VariantId;
  label: string;
  price: number;
  description: string;
  shadeGroup: ShadeGroup;
}

export interface Shade {
  id: ShadeId;
  name: string;
  color: string;
  surcharge: number;
  group: ShadeGroup;
}

export const VARIANTS: Variant[] = [
  {
    id: "classic",
    label: "Classic",
    price: 65,
    description:
      "Solid-color platinum silicone. Soft, durable, hypoallergenic.",
    shadeGroup: "classic",
  },
  {
    id: "glow",
    label: "Glow-in-the-dark",
    price: 75,
    description:
      "Glow silicone that charges in light and shines in the dark.",
    shadeGroup: "glow",
  },
  {
    id: "vibrating",
    label: "Vibrating",
    price: 95,
    description:
      "Same signature pour with a built-in vibrator. Classic solid colors.",
    shadeGroup: "classic",
  },
];

export const CLASSIC_SHADES: Shade[] = [
  {
    id: "hot-pink",
    name: "Hot Pink",
    color: "#FF2D8F",
    surcharge: 0,
    group: "classic",
  },
  {
    id: "lime",
    name: "Lime",
    color: "#C8F54A",
    surcharge: 0,
    group: "classic",
  },
  {
    id: "black",
    name: "Black",
    color: "#1A1A1A",
    surcharge: 0,
    group: "classic",
  },
  {
    id: "peach",
    name: "Peach",
    color: "#F5C4A8",
    surcharge: 0,
    group: "classic",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    color: "#6B3FA0",
    surcharge: 0,
    group: "classic",
  },
];

export const GLOW_SHADES: Shade[] = [
  {
    id: "glow-blue",
    name: "Glow Cyan",
    color: "#00B4D8",
    surcharge: 0,
    group: "glow",
  },
  {
    id: "glow-green",
    name: "Glow Green",
    color: "#7CFF6B",
    surcharge: 0,
    group: "glow",
  },
  {
    id: "glow-pink",
    name: "Glow Pink",
    color: "#FF7AD9",
    surcharge: 0,
    group: "glow",
  },
  {
    id: "glow-white",
    name: "Glow White",
    color: "#F2FFE8",
    surcharge: 0,
    group: "glow",
  },
];

export const SHADES: Shade[] = [...CLASSIC_SHADES, ...GLOW_SHADES];

export const PRODUCT = {
  slug: "clone-classic",
  name: "Dee Cast Classic",
  tagline:
    "Cast from the studio's signature form. A freshly made mold for every order — no two the same.",
  description:
    "Dee Cast Classic is cast from my signature anatomy — then finished by hand in our Brooklyn studio. Every order gets a newly made mold, so each piece is one-of-one. Choose Classic, Glow-in-the-dark, or Vibrating — all body-safe silicone, poured to order. Ready-made toys, not a send-us-a-mold service.",
  fromPrice: 65,
};

export function getVariant(id: VariantId | string): Variant {
  return VARIANTS.find((v) => v.id === id) ?? VARIANTS[0];
}

export function getShade(id: ShadeId): Shade {
  return SHADES.find((s) => s.id === id) ?? CLASSIC_SHADES[0];
}

export function getShadesForVariant(variantId: VariantId | string): Shade[] {
  const variant = getVariant(variantId);
  return SHADES.filter((s) => s.group === variant.shadeGroup);
}

export function defaultShadeForVariant(variantId: VariantId | string): ShadeId {
  return getShadesForVariant(variantId)[0].id;
}

export function calcPrice(
  variantId: VariantId | string,
  shadeId: ShadeId,
  qty = 1
) {
  const variant = getVariant(variantId);
  const shade = getShade(shadeId);
  return (variant.price + shade.surcharge) * qty;
}

/** Studio product photos used as shop examples (not abstract placeholders). */
export interface ProductExample {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export const PRODUCT_EXAMPLES: ProductExample[] = [
  {
    id: "pink",
    src: "/products/clone-classic-pink.jpg",
    alt: "Dee Cast Classic in hot pink silicone",
    label: "Classic · Pink",
    caption: "Hot pink classic pour",
  },
  {
    id: "lime",
    src: "/products/clone-classic-lime.jpg",
    alt: "Dee Cast Classic in neon lime silicone",
    label: "Classic · Lime",
    caption: "Neon lime classic pour",
  },
  {
    id: "black",
    src: "/products/clone-classic-black.jpg",
    alt: "Dee Cast Classic in charcoal black silicone",
    label: "Classic · Black",
    caption: "Charcoal black classic",
  },
  {
    id: "peach",
    src: "/products/clone-classic-peach.jpg",
    alt: "Dee Cast Classic in peach tan silicone",
    label: "Classic · Peach",
    caption: "Warm peach / skin-tan pour",
  },
  {
    id: "purple",
    src: "/products/clone-classic-purple.jpg",
    alt: "Dee Cast Classic in royal purple silicone",
    label: "Classic · Purple",
    caption: "Royal purple classic",
  },
  {
    id: "glow",
    src: "/products/clone-classic-glow.jpg",
    alt: "Dee Cast Classic in electric cyan glow silicone",
    label: "Glow · Cyan",
    caption: "Glow-in-the-dark cyan",
  },
];

/** Map configurator selection → best matching studio photo. */
export function mediaForSelection(
  variantId: VariantId | string,
  shadeId?: ShadeId | string
): { src: string; alt: string } {
  if (variantId === "glow" || (shadeId && String(shadeId).startsWith("glow-"))) {
    return {
      src: "/products/clone-classic-glow.jpg",
      alt: "Dee Cast Classic in electric cyan glow silicone",
    };
  }
  switch (shadeId) {
    case "lime":
      return {
        src: "/products/clone-classic-lime.jpg",
        alt: "Dee Cast Classic in neon lime silicone",
      };
    case "black":
      return {
        src: "/products/clone-classic-black.jpg",
        alt: "Dee Cast Classic in charcoal black silicone",
      };
    case "peach":
      return {
        src: "/products/clone-classic-peach.jpg",
        alt: "Dee Cast Classic in peach tan silicone",
      };
    case "royal-purple":
      return {
        src: "/products/clone-classic-purple.jpg",
        alt: "Dee Cast Classic in royal purple silicone",
      };
    case "hot-pink":
      return {
        src: "/products/clone-classic-pink.jpg",
        alt: "Dee Cast Classic in hot pink silicone",
      };
    default:
      return {
        src: "/products/clone-classic-pink.jpg",
        alt: "Dee Cast Classic in hot pink silicone",
      };
  }
}
