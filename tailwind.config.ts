import type { Config } from 'tailwindcss';
import { theme as appTheme } from './src/theme/theme';

function withOpacity(variableName: string): string {
  return `rgb(var(${variableName}) / <alpha-value>)`;
}

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: withOpacity('--color-primary-50'),
          100: withOpacity('--color-primary-100'),
          200: withOpacity('--color-primary-200'),
          300: withOpacity('--color-primary-300'),
          400: withOpacity('--color-primary-400'),
          500: withOpacity('--color-primary-500'),
          600: withOpacity('--color-primary-600'),
          700: withOpacity('--color-primary-700'),
          800: withOpacity('--color-primary-800'),
          900: withOpacity('--color-primary-900'),
        },
        secondary: {
          50: withOpacity('--color-secondary-50'),
          100: withOpacity('--color-secondary-100'),
          200: withOpacity('--color-secondary-200'),
          300: withOpacity('--color-secondary-300'),
          400: withOpacity('--color-secondary-400'),
          500: withOpacity('--color-secondary-500'),
          600: withOpacity('--color-secondary-600'),
          700: withOpacity('--color-secondary-700'),
          800: withOpacity('--color-secondary-800'),
          900: withOpacity('--color-secondary-900'),
        },
        accent: {
          50: withOpacity('--color-accent-50'),
          100: withOpacity('--color-accent-100'),
          200: withOpacity('--color-accent-200'),
          300: withOpacity('--color-accent-300'),
          400: withOpacity('--color-accent-400'),
          500: withOpacity('--color-accent-500'),
          600: withOpacity('--color-accent-600'),
          700: withOpacity('--color-accent-700'),
          800: withOpacity('--color-accent-800'),
          900: withOpacity('--color-accent-900'),
        },
        background: withOpacity('--color-background'),
        surface: withOpacity('--color-surface'),
        surfaceAlt: withOpacity('--color-surfaceAlt'),
        text: {
          primary: withOpacity('--color-text-primary'),
          secondary: withOpacity('--color-text-secondary'),
          muted: withOpacity('--color-text-muted'),
          onPrimary: withOpacity('--color-text-onPrimary'),
        },
        border: withOpacity('--color-border'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        danger: withOpacity('--color-danger'),
        star: withOpacity('--color-star'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: appTheme.borderRadius,
      boxShadow: appTheme.boxShadow,
      maxWidth: {
        container: appTheme.maxWidth.container,
      },
    },
  },
  plugins: [],
};

export default config;
