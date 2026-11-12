import React, { useState, useEffect } from 'react';
import { useSiteContent } from './context/content-context';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { FlagshipProductsSection } from './components/sections/FlagshipProductsSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { IndustriesSection } from './components/sections/IndustriesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { CtaBanner } from './components/sections/CtaBanner';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { FloatingWhatsApp } from './components/sections/FloatingWhatsApp';

export const App: React.FC = () => {
  const content = useSiteContent();
  const [selectedService, setSelectedService] = useState<string>('');

  // Dynamically synchronize document title, language, and meta tags from siteContent.json
  useEffect(() => {
    document.title = content.meta.title;
    document.documentElement.lang = content.meta.language;

    // Sync Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content.meta.description);

    // Sync Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', content.meta.keywords.join(', '));
  }, [content.meta]);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-primary-500 selection:text-white antialiased">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium text-sm"
      >
        Skip to main content
      </a>

      {/* Top Bar & Sticky Glassmorphism Navbar */}
      <Navbar
        brand={content.brand}
        contact={content.contact}
        topBar={content.topBar}
        navbar={content.navbar}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero Section with Live Product Switcher */}
        <Hero hero={content.hero} />

        {/* 2. Dedicated Flagship Products Deep-Dive (Fast POS & Cloud Multi-Branch Portal) */}
        <FlagshipProductsSection
          data={content.flagshipProducts}
          onSelectProduct={handleSelectService}
        />

        {/* 3. Modern Tech Stack Grid */}
        <TechStackSection techStack={content.techStack} />

        {/* 4. Industries Powered by Our POS & Cloud Systems */}
        <IndustriesSection
          industries={content.industries}
          onConsultIndustry={handleSelectService}
        />

        {/* 5. Custom Software & Growth Services */}
        <ServicesSection
          services={content.services}
          onSelectService={handleSelectService}
        />

        {/* 6. Onboarding & Deployment Process */}
        <ProcessSection process={content.process} />

        {/* 7. Client Reviews & Case Studies */}
        <TestimonialsSection testimonials={content.testimonials} />

        {/* 8. FAQs on POS & Cloud Systems */}
        <FaqSection faqs={content.faqs} />

        {/* 9. High-Contrast CTA Banner */}
        <CtaBanner ctaBanner={content.ctaBanner} />

        {/* 10. Contact & Demo Scheduling Section */}
        <ContactSection
          contactData={content.contact}
          sectionData={content.contactSection}
          services={content.services.items}
          preselectedService={selectedService}
        />
      </main>

      {/* Footer */}
      <Footer brand={content.brand} contact={content.contact} footer={content.footer} />

      {/* Floating Instant WhatsApp Action */}
      <FloatingWhatsApp contact={content.contact} config={content.floatingWhatsApp} />
    </div>
  );
};

export default App;
