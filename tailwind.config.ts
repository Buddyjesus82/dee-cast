import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        pink: {
          DEFAULT: "#FF2D8F",
          hot: "#FF1A8C",
          soft: "#FF4DA6",
        },
        charcoal: "#141414",
        tan: "#D4C4A8",
        muted: "#6B6560",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        media: "2rem",
        pill: "9999px",
      },
      boxShadow: {
        pink: "0 8px 24px rgba(255, 45, 143, 0.35)",
        media: "0 24px 60px rgba(20, 20, 20, 0.14), 0 8px 20px rgba(20, 20, 20, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
