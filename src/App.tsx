import { useEffect, useRef, useState } from 'react';
import { useSiteContent } from './context/content-context';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { FlagshipProductsSection } from './components/sections/FlagshipProductsSection';
import { TechStackSection } from './components/sections/TechStackSection';
// import { IndustriesSection } from './components/sections/IndustriesSection';
import { ServicesSection } from './components/sections/ServicesSection';
// import { ProcessSection } from './components/sections/ProcessSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { FloatingActions } from './components/sections/FloatingActions';

export function App() {
  const content = useSiteContent();
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const [preselectedService, setPreselectedService] = useState<
    { name: string; nonce: number } | undefined
  >(undefined);

  useEffect(() => {
    document.title = content.meta.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', content.meta.description);
    }
  }, [content.meta.title, content.meta.description]);

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService((prev) => ({
      name: serviceTitle,
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  };

  return (
    <>
      <div ref={topSentinelRef} className="scroll-sentinel" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        {content.ui.skipToContent}
      </a>

      <Navbar
        brand={content.brand}
        contact={content.contact}
        topBar={content.topBar}
        navbar={content.navbar}
        ui={content.ui.navbar}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero hero={content.hero} ui={content.ui.hero} />

        <FlagshipProductsSection
          data={content.flagshipProducts}
          contact={content.contact}
          ui={content.ui.flagship}
          onSelectProduct={handleSelectService}
        />

        {/* <IndustriesSection
          industries={content.industries}
          ui={content.ui.industries}
          onConsultIndustry={handleSelectService}
        /> */}

        <ServicesSection
          services={content.services}
          ui={content.ui.services}
          onSelectService={handleSelectService}
        />

        <TechStackSection techStack={content.techStack} />

        {/* <ProcessSection
          process={content.process}
          ui={content.ui.process}
        /> */}

        <TestimonialsSection testimonials={content.testimonials} ui={content.ui.testimonials} />

        <FaqSection faqs={content.faqs} ui={content.ui.faqs} />

        <ContactSection
          contact={content.contact}
          formConfig={content.contactSection}
          services={content.services.items}
          ui={content.ui.contact}
          preselectedService={preselectedService}
        />
      </main>

      <Footer
        brand={content.brand}
        contact={content.contact}
        footer={content.footer}
        ui={content.ui.footer}
      />

      <FloatingActions
        contact={content.contact}
        whatsAppConfig={content.floatingWhatsApp}
        ui={content.ui.floatingActions}
        sentinelRef={topSentinelRef}
      />
    </>
  );
}

export default App;
