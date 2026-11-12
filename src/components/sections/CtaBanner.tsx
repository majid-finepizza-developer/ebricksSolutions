import React from 'react';
import type { CtaBannerData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface CtaBannerProps {
  ctaBanner: CtaBannerData;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ ctaBanner }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <IconRenderer name="Sparkles" className="w-3.5 h-3.5" />
            <span>{ctaBanner.badge}</span>
          </div>

          {/* Heading - Solid High-Contrast Typography */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight font-heading">
            {ctaBanner.heading}{' '}
            <span className="text-amber-400">
              {ctaBanner.highlightedWord}
            </span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {ctaBanner.subheading}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaBanner.primaryCta.href}
              onClick={(e) => handleScrollTo(e, ctaBanner.primaryCta.href)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{ctaBanner.primaryCta.label}</span>
              <IconRenderer name={ctaBanner.primaryCta.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <a
              href={ctaBanner.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              <IconRenderer name="MessageSquare" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span>{ctaBanner.secondaryCta.label}</span>
            </a>
          </div>

          {/* Guarantees List */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
            {ctaBanner.guarantees.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <IconRenderer name="ShieldCheck" className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
