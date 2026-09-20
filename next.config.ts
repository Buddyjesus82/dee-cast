import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/dee-cast" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGitHubPages
    ? {
        basePath: "/dee-cast",
        assetPrefix: "/dee-cast",
      }
    : {}),
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "bore.pub",
    "*.bore.pub",
  ],
};

export default nextConfig;
