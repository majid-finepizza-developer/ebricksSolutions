import React, { useState } from 'react';
import type { HeroData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { cn } from '../../utils/cn';

interface HeroProps {
  hero: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const activeProduct = hero.previewProducts[activePreviewIndex] || hero.previewProducts[0];

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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80 text-slate-900 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Subtle Architectural Grid Pattern (Human Craft / Swiss Style) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft Ambient Radial Accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-primary-100/50 blur-[120px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-48 right-10 w-[450px] h-[260px] bg-accent-100/40 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Text Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 shadow-xs hover:border-slate-300 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
            <IconRenderer name={hero.badge.icon} className="w-4 h-4 text-primary-600" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              {hero.badge.text}
            </span>
          </div>

          {/* Main Headline - Solid High-Craft Typography (No AI Rainbow Gradients) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.14] font-heading">
            {hero.headline.prefix}{' '}
            <span className="text-primary-600 underline decoration-primary-300 decoration-wavy decoration-2 underline-offset-4">
              {hero.headline.highlight}
            </span>{' '}
            {hero.headline.suffix}
          </h1>

          {/* Subheadline - Clear, Readable, Authentic */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            {hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={hero.primaryCta.href}
              onClick={(e) => handleScrollTo(e, hero.primaryCta.href)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.primaryCta.label}</span>
              <IconRenderer name={hero.primaryCta.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              <IconRenderer name="MessageSquare" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <span>{hero.secondaryCta.label}</span>
            </a>
          </div>

          {/* Trust Metrics / Real Operational Capabilities */}
          <div className="pt-4 border-t border-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 max-w-4xl mx-auto">
              {hero.trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-lg bg-white/90 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium shadow-xs"
                >
                  <IconRenderer name={badge.icon} className="w-4 h-4 text-primary-600 shrink-0" />
                  <span className="leading-snug">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO PRODUCT SHOWCASE IN HERO SECTION */}
        <div className="mt-10 sm:mt-12 max-w-6xl mx-auto">
          {/* Segmented Control / Interactive Product Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex flex-col sm:flex-row p-1 sm:p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-xs w-full sm:w-auto gap-1">
              {hero.previewProducts.map((p, idx) => {
                const isSelected = activePreviewIndex === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePreviewIndex(idx)}
                    className={cn(
                      'flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer',
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50',
                    )}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        isSelected ? 'bg-primary-600' : 'bg-slate-400',
                      )}
                    />
                    <span className="text-center sm:text-left">{p.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Visual Display Card: Realistic OS Desktop Software Window */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 p-4 sm:p-6 lg:p-7">
            {/* Desktop Window Title Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20" />
                <span className="ml-2 text-xs font-mono text-slate-500 font-medium hidden sm:inline">
                  {activeProduct.id === 'fast-pos' ? 'Fast Point Of Sale — Counter Register BD-202611' : 'eBricks Cloud Management Portal — Admin Dashboard'}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-200 px-2.5 py-0.5 rounded-md">
                {activeProduct.badge}
              </span>
            </div>

            {/* Product Body: Screenshot on Left, High-Craft Detail on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Product Screenshot */}
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-white border border-slate-700 shadow-xs hidden sm:block">
                  Live Software Interface • {activeProduct.name}
                </div>
              </div>

              {/* Product Feature Highlights Sidebar */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug font-heading">
                    {activeProduct.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeProduct.tagline}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Live Operational Features:
                  </h4>
                  {activeProduct.keyPoints.map((pt, ptIdx) => (
                    <div
                      key={ptIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80"
                    >
                      <IconRenderer
                        name="CheckCircle2"
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={`#${activeProduct.id}`}
                    onClick={(e) => handleScrollTo(e, `#${activeProduct.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <span>Explore Full Specs & Screens</span>
                    <IconRenderer name="ArrowRight" className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards - Clean Swiss / SaaS Style */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-primary-200 hover:shadow-md transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading group-hover:text-primary-600 transition-colors">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold text-slate-800">
                {stat.label}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 leading-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
