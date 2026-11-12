import React from 'react';
import type { TestimonialsSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface TestimonialsSectionProps {
  testimonials: TestimonialsSectionData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide border border-primary-200 shadow-xs">
            <IconRenderer name="MessageSquare" className="w-4 h-4 text-primary-600" />
            <span>{testimonials.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            {testimonials.heading}{' '}
            <span className="text-primary-600">
              {testimonials.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {testimonials.subheading}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between bg-slate-50 rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {[...Array(item.rating)].map((_, rIdx) => (
                    <span key={rIdx} className="text-base">★</span>
                  ))}
                </div>

                {/* Service Tag */}
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-200 px-2.5 py-0.5 rounded-md mb-3">
                  {item.service}
                </span>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Business */}
              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                  <p className="text-xs text-slate-500">{item.role}, {item.company}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
