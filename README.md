# Dee Cast

Boutique e-commerce storefront for **Dee Cast** — body-safe silicone toys cast from the founder's signature form. Every order gets a newly made mold, so no two pieces are the same. Built as a faithful working recreation of a high-fidelity layout for review and tweaking.

## Live site

GitHub Pages (project site): **https://buddyjesus82.github.io/dee-cast/**

Open that URL after the first push to `main`. CI: `.github/workflows/pages.yml` runs `bun install --frozen-lockfile && bun run build` with `GITHUB_PAGES=true` (Next.js `basePath` / `assetPrefix` are `/dee-cast`) and deploys the static `out/` folder.

**How to update:** push to `main` (or run the workflow via Actions → Deploy GitHub Pages → Run workflow).

Local play stays at the site root (`bun run dev`). For a local Pages-shaped build:

```bash
GITHUB_PAGES=true bun run build
# or: bun run build:pages
npx serve out
```

## Stack

- Next.js 15 (App Router) + TypeScript — static export for GitHub Pages
- Tailwind CSS
- Zustand (persisted client cart)
- Mock checkout (no Stripe / no real payments)

## Product

- **Dee Cast Classic** — founder's signature form, fresh mold each order
- Options: **Classic** ($65), **Glow-in-the-dark** ($75), **Vibrating** ($95)
- From **$65**
- Configurator: option + shade + quantity + add to bag
- Unique mold per order (one-of-one pieces)
- Not customer self-cloning

## Quick start

```bash
cd /workspace/clone-studio
bun install
bun run dev
```

Open http://localhost:3000

Equivalent Node package-manager commands also work (`install`, `run dev`, `run build`, `start` from package.json).

Production (Node server — not used for Pages):

```bash
bun run build && bun run start
```

Static export for Pages:

```bash
bun run build:pages
```

## Routes

- `/` — Home (hero, story, catalogue, FAQ)
- `/product/clone-classic` — Product configurator
- `/checkout` — Mock checkout form
- `/checkout/success` — Order confirmed
- `/checkout/cancel` — Checkout cancelled

## Notes

- Cart state persists in localStorage (`clone-studio-cart-v2`).
- Shop/catalogue and product pages use real studio product photos under `public/products/` (pink, magenta, classic, glow, purple). Story section uses a real cream-studio product photo (same style as hero/shop).
- No third-party builder watermark.
- Contact: hello@getdeecast.com
- Public repo target: `buddyjesus82/dee-cast` (init + push when GitHub auth is ready; do not force-push).
