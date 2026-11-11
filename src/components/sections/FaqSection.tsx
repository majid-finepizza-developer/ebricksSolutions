import React, { useState } from 'react';
import type { FaqSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { cn } from '../../utils/cn';

interface FaqSectionProps {
  faqs: FaqSectionData;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold tracking-wide">
            <IconRenderer name="HelpCircle" className="w-4 h-4 text-primary-600" />
            <span>{faqs.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {faqs.heading}{' '}
            <span className="text-primary-600">{faqs.highlightedWord}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {faqs.subheading}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  'rounded-2xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'bg-white border-primary-300 shadow-md ring-1 ring-primary-100'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    {faq.category && (
                      <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                    )}
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200',
                      isOpen
                        ? 'bg-primary-50 text-primary-600 rotate-180'
                        : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    <IconRenderer name="ChevronDown" className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Prompt Below FAQs */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Have a question not listed here?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Talk directly with our technical lead at Model Town Link Road, Lahore.
            </p>
          </div>
          <a
            href="https://wa.me/923154112925?text=Hello%20EBRICKS%20SOLUTIONS%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <IconRenderer name="MessageSquare" className="w-4 h-4 text-emerald-600" />
            <span>Ask on WhatsApp (0315-4112925)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
