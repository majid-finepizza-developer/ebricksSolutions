import React from 'react';
import { ContentContext, siteContent } from './content-context';

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContentContext.Provider value={{ content: siteContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
