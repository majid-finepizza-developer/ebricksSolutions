import { createContext, useContext } from 'react';
import type { SiteContent } from '../types/content';
import rawContent from '../data/siteContent.json';

export const siteContent = rawContent as unknown as SiteContent;

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
