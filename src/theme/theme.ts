/**
 * Centralized design tokens (fonts, border-radius, shadows, spacing, container width).
 * Color tokens are strictly imported from colors.ts.
 */

export const theme = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Poppins, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  borderRadius: {
    none: '0px',
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(var(--color-text-primary) / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(var(--color-text-primary) / 0.1), 0 1px 2px -1px rgb(var(--color-text-primary) / 0.1)',
    md: '0 4px 6px -1px rgb(var(--color-text-primary) / 0.1), 0 2px 4px -2px rgb(var(--color-text-primary) / 0.1)',
    lg: '0 10px 15px -3px rgb(var(--color-text-primary) / 0.1), 0 4px 6px -4px rgb(var(--color-text-primary) / 0.1)',
    xl: '0 20px 25px -5px rgb(var(--color-text-primary) / 0.1), 0 8px 10px -6px rgb(var(--color-text-primary) / 0.1)',
    card: '0 10px 30px -5px rgb(var(--color-text-primary) / 0.08)',
    elevation: '0 20px 35px -10px rgb(var(--color-primary-600) / 0.18)',
  },
  spacing: {
    sectionPadding: 'py-16 sm:py-20 lg:py-28',
    sectionPaddingCompact: 'py-12 sm:py-16 lg:py-20',
  },
  maxWidth: {
    container: '80rem', // 1280px (max-w-7xl)
  },
} as const;

export type ThemeConfig = typeof theme;
