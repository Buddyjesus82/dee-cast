import Image from "next/image";
import { withBasePath } from "@/lib/base-path";

type Variant = "hero" | "story" | "catalogue" | "product";

/** Color-shifted studio shots of the same prototype photo */
const productImages: Record<Variant, { src: string; alt: string }> = {
  hero: {
    src: "/products/clone-classic-pink.jpg",
    alt: "Dee Cast Classic in hot pink silicone",
  },
  story: {
    src: "/products/clone-classic-black.jpg",
    alt: "Dee Cast Classic in charcoal black silicone",
  },
  catalogue: {
    src: "/products/clone-classic-lime.jpg",
    alt: "Dee Cast Classic in neon lime silicone",
  },
  product: {
    src: "/products/clone-classic-pink.jpg",
    alt: "Dee Cast Classic in hot pink silicone",
  },
};

export default function ProductMedia({
  variant = "hero",
  className = "",
  label,
  imageSrc,
  imageAlt,
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  /** Optional override — e.g. cyan glow photo when Glow is selected */
  imageSrc?: string;
  imageAlt?: string;
}) {
  const image = productImages[variant];
  const src = imageSrc ?? image.src;
  const aria = label ?? imageAlt ?? image.alt;

  return (
    <div
      className={`relative overflow-hidden rounded-media shadow-media bg-cream ${className}`}
      role="img"
      aria-label={aria}
    >
      <Image
        src={withBasePath(src)}
        alt={aria}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
        priority={variant === "hero"}
      />
    </div>
  );
}
