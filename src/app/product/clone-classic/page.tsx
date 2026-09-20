import type { Metadata } from "next";
import ProductConfigurator from "@/components/ProductConfigurator";

export const metadata: Metadata = {
  title: "Dee Cast Classic — Dee Cast",
  description:
    "Dee Cast Classic — body-safe silicone cast from the studio's signature form. Classic, Glow, or Vibrating from $65. Fresh mold every order.",
};

export default function ProductPage() {
  return <ProductConfigurator />;
}
