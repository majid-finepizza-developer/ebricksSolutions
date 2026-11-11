import React, { useState, useEffect } from 'react';
import type { ServicesSectionData, ServiceItem } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { cn } from '../../utils/cn';

interface ServicesSectionProps {
  services: ServicesSectionData;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Synchronize active category with navigation hash (#services-engineering, #services-marketing)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#services-engineering') {
        setActiveCategory('engineering');
      } else if (hash === '#services-marketing') {
        setActiveCategory('marketing');
      } else if (hash === '#services') {
        setActiveCategory('all');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredServices = services.items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.categoryId === activeCategory;
  });

  const handleDiscussClick = (e: React.MouseEvent<HTMLAnchorElement>, service: ServiceItem) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(service.title);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 text-slate-900 scroll-mt-20 relative">
      <div id="services-engineering" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="services-marketing" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold tracking-wide">
            <IconRenderer name="Layers" className="w-4 h-4 text-primary-600" />
            <span>{services.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {services.heading}{' '}
            <span className="text-primary-600 underline decoration-accent-500 decoration-wavy decoration-2">
              {services.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {services.subheading}
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {services.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm',
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200',
                )}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Description */}
        <div className="text-center mt-3 text-xs sm:text-sm text-slate-500 italic">
          {services.categories.find((c) => c.id === activeCategory)?.description}
        </div>

        {/* Services Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div
                className={cn(
                  'absolute top-0 left-0 right-0 h-1.5 transition-all duration-300',
                  service.categoryId === 'marketing'
                    ? 'bg-gradient-to-r from-accent-500 to-amber-500 group-hover:h-2'
                    : 'bg-gradient-to-r from-primary-600 to-primary-400 group-hover:h-2',
                )}
              />

              {/* Icon & Category Badge */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    service.categoryId === 'marketing'
                      ? 'bg-accent-50 text-accent-600 group-hover:bg-accent-100'
                      : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100',
                  )}
                >
                  <IconRenderer name={service.icon} className="w-6 h-6" />
                </div>

                {service.badge && (
                  <span
                    className={cn(
                      'text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md',
                      service.categoryId === 'marketing'
                        ? 'bg-accent-50 text-accent-700 border border-accent-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200',
                    )}
                  >
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs font-semibold text-accent-600 tracking-wide mt-1 uppercase">
                {service.tagline}
              </p>

              {/* Summary */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {service.summary}
              </p>

              {/* Tech Stack Chips */}
              {service.techStack && service.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Deliverables Checklist */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Key Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <IconRenderer
                        name="CheckCircle2"
                        className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discuss Project CTA Link */}
              <div className="mt-8 pt-4">
                <a
                  href={service.cta.href}
                  onClick={(e) => handleDiscussClick(e, service)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-primary-600 hover:text-white transition-all duration-200 group-hover:shadow"
                >
                  <span>{service.cta.label}</span>
                  <IconRenderer name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
