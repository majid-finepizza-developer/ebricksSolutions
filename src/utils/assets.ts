/**
 * Resolves static asset URLs from `siteContent.json` against Vite's `BASE_URL`
 * so `<img>` sources and `<link rel="preload">` URLs match in all deployment bases.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:|mailto:|tel:)/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseNoLeadingSlash = normalizedBase.replace(/^\//, '');

  if (baseNoLeadingSlash && cleanPath.startsWith(baseNoLeadingSlash)) {
    return `/${cleanPath}`;
  }

  return `${normalizedBase}${cleanPath}`;
}
