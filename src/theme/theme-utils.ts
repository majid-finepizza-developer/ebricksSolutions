import { createContext, useContext } from 'react';
import { colors, type ThemeColors } from './colors';

export interface ThemeContextType {
  colors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextType>({
  colors,
});

export const useTheme = () => useContext(ThemeContext);

/**
 * Converts a hex color (#RRGGBB or #RGB) into space-separated RGB channel values ("R G B")
 * so that Tailwind's `rgb(var(--color-...) / <alpha-value>)` syntax functions correctly.
 */
export function hexToRgb(hex: string): string {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const intVal = parseInt(clean, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `${r} ${g} ${b}`;
}

/**
 * Traverses a nested object of color tokens and generates CSS variable mappings.
 * e.g., colors.primary['600'] => --color-primary-600: "37 99 235"
 */
export function generateCssVariables(
  themeColors: Record<string, unknown>,
  prefix = '',
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(themeColors)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'string') {
      result[`--color-${varName}`] = hexToRgb(value);
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(
        result,
        generateCssVariables(value as Record<string, unknown>, varName),
      );
    }
  }

  return result;
}
