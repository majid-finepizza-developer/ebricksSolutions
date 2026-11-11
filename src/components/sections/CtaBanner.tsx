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
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent-600/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl backdrop-blur-md">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <IconRenderer name="Sparkles" className="w-3.5 h-3.5" />
            <span>{ctaBanner.badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            {ctaBanner.heading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-amber-300">
              {ctaBanner.highlightedWord}
            </span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {ctaBanner.subheading}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={ctaBanner.primaryCta.href}
              onClick={(e) => handleScrollTo(e, ctaBanner.primaryCta.href)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-900/40 hover:shadow-primary-600/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{ctaBanner.primaryCta.label}</span>
              <IconRenderer name={ctaBanner.primaryCta.icon} className="w-5 h-5" />
            </a>

            <a
              href={ctaBanner.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-800/80 transition-all duration-200 hover:-translate-y-0.5"
            >
              <IconRenderer name={ctaBanner.secondaryCta.icon} className="w-5 h-5 text-emerald-400" />
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
