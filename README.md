# ApexWave Technologies - Modern Enterprise Landing Page

A high-performance, accessible, data-driven enterprise landing page built with React 19, TypeScript (strict mode), Vite, and Tailwind CSS.

---

## Table of Contents
1. [Features & Architecture](#features--architecture)
2. [Prerequisites](#prerequisites)
3. [Install and Run](#install-and-run)
4. [Project Structure](#project-structure)
5. [How to Change the Theme](#how-to-change-the-theme)
6. [How to Change Content](#how-to-change-content)
7. [Responsive & Accessibility Verification](#responsive--accessibility-verification)
8. [Deploy to GitHub Pages](#deploy-to-github-pages)

---

## Features & Architecture

- **Strict Single-Source Theme System**: `src/theme/colors.ts` is the **ONLY** file where raw color values (hex/rgb/hsl) reside. The runtime `ThemeProvider` converts them into CSS variables, which `tailwind.config.ts` consumes with full opacity modifier support (`rgb(var(--color-...) / <alpha-value>)`).
- **Data-Driven Architecture**: 100% of website content (navigation links, hero messaging, metrics, about descriptions, services, client logos, testimonials, contact details, and footer navigation) is sourced from `src/data/site-data.json`.
- **Strictly Typed Data Layer**: Full TypeScript definitions in `src/types/site-data.ts`.
- **Dynamic Icon System**: String-based icon mapping (`src/utils/icons.tsx`) mapped to `lucide-react`.
- **Accessible & Mobile-First**:
  - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Skip to main content link for keyboard and screen reader navigation.
  - Minimum 44px touch targets on all interactive elements.
  - Visible focus rings with high-contrast outlines.
  - Respects `prefers-reduced-motion`.
- **8 Comprehensive Sections**:
  1. **Navbar**: Sticky header with scroll-activated backdrop blur, scroll spy active link highlighting, accessible mobile hamburger drawer, and CTA button.
  2. **Hero**: Headline with primary color highlight, eyebrow badge, dual action CTAs, dashboard interface illustration, metrics counter row, and soft ambient gradient background.
  3. **About Company**: Engineering narrative, 2x2 capability highlights grid, and Mission / Vision / Core Values cards.
  4. **Services**: Responsive 6-card grid with category icons, descriptive copy, and interactive elevation hover effects.
  5. **Clients**: High-contrast logo grid with grayscale-to-color hover transitions.
  6. **Testimonials**: Star ratings, quotes, user avatars, credentials, swipeable carousel on mobile with accessible previous/next and keyboard arrow navigation.
  7. **Contact**: High-impact primary CTA band with email, phone, physical headquarters address, and consultation action.
  8. **Footer**: Brand synopsis, multi-column navigation links, accessible social links, and auto-generated `{year}` copyright token replacement.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Install and Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run Production Build
```bash
npm run build
```
Executes TypeScript compilation check (`tsc -b`) followed by Vite production bundling.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Lint Check
```bash
npm run lint
```

---

## Project Structure

```
├── public/
│   └── images/                     # Semantic SVGs (using currentColor & clean fills)
│       ├── logo.svg
│       ├── hero-illustration.svg
│       ├── about-team.svg
│       ├── client-*.svg            # 8 Client brand SVGs
│       └── avatar-*.svg            # 5 Testimonial avatar SVGs
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx          # Reusable accessible button (44px min touch target)
│   │   │   ├── Section.tsx         # Unified section wrapper with scroll-mt-20
│   │   │   └── SectionHeading.tsx  # Consistent header & eyebrow component
│   │   └── sections/
│   │       ├── Navbar.tsx          # Sticky navbar + scroll spy + mobile drawer
│   │       ├── Hero.tsx            # Hero section with highlighted word & stats
│   │       ├── About.tsx           # Company story, highlights & mission/values
│   │       ├── Services.tsx        # 6-card responsive services grid
│   │       ├── Clients.tsx         # Client brand logo showcase
│   │       ├── Testimonials.tsx    # Carousel / grid with keyboard navigation
│   │       ├── Contact.tsx         # High-contrast primary CTA band & contact info
│   │       └── Footer.tsx          # Multi-column footer & copyright
│   ├── data/
│   │   └── site-data.json          # Single source of truth for site copy & assets
│   ├── theme/
│   │   ├── colors.ts               # SINGLE SOURCE OF TRUTH for color tokens
│   │   ├── theme.ts                # Typography, shadows, border radii & spacing
│   │   ├── theme-utils.ts          # Hex-to-RGB conversion & CSS variable generator
│   │   └── ThemeProvider.tsx       # Runtime CSS variable injection provider
│   ├── types/
│   │   └── site-data.ts            # Strict TypeScript interfaces for site data
│   ├── utils/
│   │   ├── cn.ts                   # Tailwind class merge utility (clsx + twMerge)
│   │   ├── icon-map.ts             # Lucide icon resolver map
│   │   ├── icons.tsx               # DynamicIcon component
│   │   └── social-icons.tsx        # Inline SVG social icon components
│   ├── App.tsx                     # Main layout & JSON data distributor
│   ├── index.css                   # Tailwind directives & base styles
│   └── main.tsx                    # React root entry point wrapped with ThemeProvider
├── index.html                      # HTML root, font imports & metadata
├── package.json                    # Scripts and dependencies
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration mapping to CSS variables
├── tsconfig.app.json               # TypeScript application compiler options
└── tsconfig.json                   # Project TypeScript configuration references
```

---

## How to Change the Theme

> **Rule**: `src/theme/colors.ts` is the **ONLY** file where color values (hex / rgb / hsl) may exist. Components and Tailwind classes consume semantic tokens (e.g., `bg-primary-600`, `text-text-muted`, `bg-surface`, `border-border`).

To re-theme the entire website:

1. Open `src/theme/colors.ts`.
2. Modify the `primary` palette or any semantic token:
   ```ts
   export const colors = {
     primary: {
       50: '#f0fdf4',   // e.g. change to emerald green
       100: '#dcfce7',
       200: '#bbf7d0',
       300: '#86efac',
       400: '#4ade80',
       500: '#22c55e',
       600: '#16a34a',  // Core brand primary shade
       700: '#15803d',
       800: '#166534',
       900: '#14532d',
     },
     // ...
   };
   ```
3. Save the file.
4. **Result**: All buttons, links, active navigation pills, icons, gradient accents, badges, star ratings, and focus rings across the entire application will immediately update.

---

## How to Change Content

> **Rule**: Components do not have hard-coded content. Every headline, description, link, image path, metric, client, service, review, and contact detail is configured in `src/data/site-data.json`.

To modify content:

1. Open `src/data/site-data.json`.
2. Edit or add items:
   - **Company / Brand**: Edit `"brand.name"`, `"brand.tagline"`, or `"brand.logo"`.
   - **Navigation**: Add or edit items in `"navbar.links"`.
   - **Hero**: Edit `"hero.heading"`, `"hero.highlightedWord"`, `"hero.subheading"`, or `"hero.stats"`.
   - **About**: Edit `"about.description"`, `"about.highlights"`, `"about.mission"`, `"about.vision"`, or `"about.values"`.
   - **Services**: Add, edit, or delete items in `"services.items"`. Each item accepts `id`, `icon` (any mapped icon such as `"cloud"`, `"brain"`, `"database"`, `"shield"`, `"lock"`, etc.), `title`, and `description`.
   - **Clients**: Update `"clients.logos"` with brand names and logo paths.
   - **Testimonials**: Update `"testimonials.items"` with names, roles, company names, ratings (1–5), quotes, and avatar paths.
   - **Contact**: Update `"contact.heading"`, `"contact.email"`, `"contact.phone"`, or `"contact.address"`.
   - **Footer**: Update `"footer.description"`, `"footer.columns"`, `"footer.socials"`, or `"footer.copyright"`. The `{year}` token in the copyright is automatically updated to the current year at runtime.
3. Save the file. The UI updates instantly with no code changes needed.

---

## Responsive & Accessibility Verification

- **Responsive breakpoints tested**:
  - `360px` (Compact mobile / Android)
  - `414px` (Modern smartphones / iPhone Plus)
  - `768px` (Tablets / iPad)
  - `1024px` (Laptops)
  - `1440px+` (Desktop & ultrawide displays)
- **Accessibility features**:
  - Color contrast meets or exceeds WCAG AA standards.
  - Skip link enabled at `#main-content`.
  - Accessible names and ARIA attributes on interactive buttons (`aria-label`, `aria-expanded`, `aria-controls`).
  - Carousel supports keyboard arrow navigation (`ArrowLeft` / `ArrowRight`).
  - Strict absence of horizontal layout overflow (`overflow-x: hidden`).

---

## Deploy to GitHub Pages

The site is configured for the repository URL `https://majid-finepizza-developer.github.io/ebricksSolutions/`. A GitHub Actions workflow builds and deploys the site whenever changes are pushed to `main`.

1. Push the workflow and site changes to the `main` branch.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for the **Deploy to GitHub Pages** workflow to complete.
4. Visit `https://majid-finepizza-developer.github.io/ebricksSolutions/`.

To publish from a different branch, update the branch in `.github/workflows/deploy.yml`. If the repository name changes, update the `base` value in `vite.config.ts` and the site URL above.
