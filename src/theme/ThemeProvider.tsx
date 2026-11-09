import React, { useEffect, useMemo } from 'react';
import { colors } from './colors';
import { ThemeContext, generateCssVariables } from './theme-utils';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const cssVars = useMemo(
    () => generateCssVariables(colors as unknown as Record<string, unknown>),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
  }, [cssVars]);

  // Generate :root CSS rules for instant rendering before hydration
  const cssString = useMemo(() => {
    return Object.entries(cssVars)
      .map(([prop, val]) => `${prop}: ${val};`)
      .join('\n');
  }, [cssVars]);

  return (
    <ThemeContext.Provider value={{ colors }}>
      <style
        id="theme-css-variables"
        dangerouslySetInnerHTML={{ __html: `:root {\n${cssString}\n}` }}
      />
      {children}
    </ThemeContext.Provider>
  );
};
