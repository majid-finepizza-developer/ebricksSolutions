import React, { useEffect } from 'react';
import type { SiteData } from './types/site-data';
import siteDataRaw from './data/site-data.json';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Clients } from './components/sections/Clients';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const data: SiteData = {
  ...(siteDataRaw as SiteData),
  brand: {
    ...siteDataRaw.brand,
    logo: assetUrl(siteDataRaw.brand.logo),
  },
  hero: {
    ...siteDataRaw.hero,
    image: {
      ...siteDataRaw.hero.image,
      src: assetUrl(siteDataRaw.hero.image.src),
    },
  },
  about: {
    ...siteDataRaw.about,
    image: {
      ...siteDataRaw.about.image,
      src: assetUrl(siteDataRaw.about.image.src),
    },
  },
  clients: {
    ...siteDataRaw.clients,
    logos: siteDataRaw.clients.logos.map((client) => ({
      ...client,
      logo: assetUrl(client.logo),
    })),
  },
  testimonials: {
    ...siteDataRaw.testimonials,
    items: siteDataRaw.testimonials.items.map((testimonial) => ({
      ...testimonial,
      avatar: assetUrl(testimonial.avatar),
    })),
  },
};

export const App: React.FC = () => {
  // Sync document title and meta description dynamically from JSON meta
  useEffect(() => {
    document.title = data.meta.title;
    document.documentElement.lang = data.meta.language;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.meta.description);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-primary-600 focus:text-text-onPrimary focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 font-medium"
      >
        Skip to main content
      </a>

      {/* Header & Sticky Navbar */}
      <Navbar brand={data.brand} navbar={data.navbar} />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 focus:outline-none">
        <Hero hero={data.hero} />
        <About about={data.about} />
        <Services services={data.services} />
        <Clients clients={data.clients} />
        <Testimonials testimonials={data.testimonials} />
        <Contact contact={data.contact} />
      </main>

      {/* Footer */}
      <Footer brand={data.brand} footer={data.footer} />
    </div>
  );
};

export default App;
