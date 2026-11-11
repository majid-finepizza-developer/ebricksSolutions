import { createContext, useContext } from 'react';
import type { SiteContent } from '../types/content';
import rawContent from '../data/siteContent.json';

const assetUrl = (path: string): string => {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const raw = rawContent as unknown as SiteContent;

export const siteContent: SiteContent = {
  ...raw,
  brand: {
    ...raw.brand,
    logo: assetUrl(raw.brand.logo),
    icon: assetUrl(raw.brand.icon),
  },
  meta: {
    ...raw.meta,
    ogImage: assetUrl(raw.meta.ogImage),
  },
};

export interface ContentContextValue {
  content: SiteContent;
}

export const ContentContext = createContext<ContentContextValue>({
  content: siteContent,
});

export const useSiteContent = (): SiteContent => {
  const context = useContext(ContentContext);
  return context.content;
};
