import React from 'react';
import type { IndustriesSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface IndustriesSectionProps {
  industries: IndustriesSectionData;
  onConsultIndustry?: (industryTitle: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industries,
  onConsultIndustry,
}) => {
  const handleIndustryClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    e.preventDefault();
    if (onConsultIndustry) {
      onConsultIndustry(`Industry Solution: ${title}`);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="industries" className="py-20 lg:py-28 bg-white text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs sm:text-sm font-semibold tracking-wide">
            <IconRenderer name="Award" className="w-4 h-4 text-accent-600" />
            <span>{industries.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            {industries.heading}{' '}
            <span className="text-primary-600">
              {industries.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {industries.subheading}
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.items.map((ind) => (
            <div
              key={ind.id}
              className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200/90 p-7 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <IconRenderer name={ind.icon} className="w-6 h-6 text-accent-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {ind.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {ind.summary}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200/80 flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tailored Capabilities
                </h4>
                <ul className="space-y-2">
                  {ind.solutions.map((sol, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <IconRenderer name="Check" className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => handleIndustryClick(e, ind.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-600 group-hover:text-accent-600 transition-colors"
                >
                  <span>Consult for {ind.title}</span>
                  <IconRenderer name="ArrowRight" className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
