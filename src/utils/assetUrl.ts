/** Build a public asset URL that respects Vite's configured deployment base. */
export function assetUrl(path: string): string {
  const safePath = path
    .replace(/^\/+/, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `${import.meta.env.BASE_URL}${safePath}`
}
