import React from 'react';
import type { ProcessSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface ProcessSectionProps {
  process: ProcessSectionData;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ process }) => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-white text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs sm:text-sm font-semibold tracking-wide">
            <IconRenderer name="Compass" className="w-4 h-4 text-accent-600" />
            <span>{process.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            {process.heading}{' '}
            <span className="text-primary-600">
              {process.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {process.subheading}
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {process.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-3xl font-black text-slate-300 group-hover:text-primary-500 transition-colors">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                  <IconRenderer name={step.icon} className="w-5 h-5" />
                </div>
              </div>

              {/* Timeline Pill */}
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent-600 bg-accent-50 border border-accent-200 px-2.5 py-0.5 rounded-md w-fit mb-3">
                {step.timeline}
              </span>

              {/* Title & Summary */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.summary}
              </p>

              {/* Activities Checklist */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex-1">
                <ul className="space-y-2">
                  {step.activities.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <IconRenderer name="Check" className="w-3.5 h-3.5 text-primary-500 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose EBRICKS Differentiators Sub-Section */}
        <div id="why-us" className="mt-24 pt-16 border-t border-slate-200 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              {process.differentiatorsBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {process.differentiatorsHeading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <IconRenderer name={diff.icon} className="w-6 h-6 text-accent-400" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{diff.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
