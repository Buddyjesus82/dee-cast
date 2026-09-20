/** Prefix absolute site paths with Next basePath when deploying to GitHub Pages. */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path || path.startsWith("http") || path.startsWith("data:") || !path.startsWith("/")) {
    return path;
  }
  if (!base) return path;
  if (path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
