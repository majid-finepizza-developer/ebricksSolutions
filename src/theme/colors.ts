/**
 * ============================================================================
 * THEME COLORS - SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Acceptance test: Changing `primary` in this file recolors buttons, links,
 * icons, gradients, badges, and focus rings across the entire site.
 *
 * CRITICAL RULE: This file is the ONLY place in the codebase where raw color
 * values (hex / rgb / hsl) may exist. Components and styles consume these tokens
 * through semantic CSS variables and mapped Tailwind classes.
 * ============================================================================
 */

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // Core brand primary shade
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ff5a1f', // Vibrant Brand Accent matching eBricks logo
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  text: {
    primary: '#0f172a',
    secondary: '#334155',
    muted: '#64748b',
    onPrimary: '#ffffff',
  },
  border: '#e2e8f0',
  success: '#16a34a',
  warning: '#f59e0b',
  danger: '#dc2626',
  star: '#f59e0b',
} as const;

export type ThemeColors = typeof colors;
