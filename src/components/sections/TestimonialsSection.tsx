import React from 'react';
import type { TestimonialsSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface TestimonialsSectionProps {
  testimonials: TestimonialsSectionData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-accent-400 text-xs sm:text-sm font-semibold tracking-wide border border-slate-700">
            <IconRenderer name="MessageSquare" className="w-4 h-4 text-accent-400" />
            <span>{testimonials.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {testimonials.heading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              {testimonials.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {testimonials.subheading}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between bg-slate-950/80 rounded-2xl border border-slate-800 p-8 shadow-xl backdrop-blur-sm hover:border-slate-700 transition-colors"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, rIdx) => (
                    <span key={rIdx} className="text-base">★</span>
                  ))}
                </div>

                {/* Service Tag */}
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary-400 bg-primary-950/80 border border-primary-900/60 px-2.5 py-0.5 rounded-md mb-3">
                  {item.service}
                </span>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Business */}
              <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.author}</h4>
                  <p className="text-xs text-slate-400">{item.role}, {item.company}</p>
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
