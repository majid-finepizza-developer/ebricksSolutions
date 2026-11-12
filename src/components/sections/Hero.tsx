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
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Tech Gradients & Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-accent-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Text Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner backdrop-blur-md">
            <IconRenderer name={hero.badge.icon} className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide">
              {hero.badge.text}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {hero.headline.prefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-amber-300">
              {hero.headline.highlight}
            </span>{' '}
            {hero.headline.suffix}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={hero.primaryCta.href}
              onClick={(e) => handleScrollTo(e, hero.primaryCta.href)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-xl shadow-primary-900/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{hero.primaryCta.label}</span>
              <IconRenderer name={hero.primaryCta.icon} className="w-5 h-5" />
            </a>

            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              <IconRenderer name={hero.secondaryCta.icon} className="w-5 h-5 text-emerald-400" />
              <span>{hero.secondaryCta.label}</span>
            </a>
          </div>

          {/* Trust Metrics / Pillar Badges */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {hero.trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium"
                >
                  <IconRenderer name={badge.icon} className="w-4 h-4 text-primary-400 shrink-0" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO PRODUCT SHOWCASE IN HERO SECTION */}
        <div className="mt-14 max-w-6xl mx-auto">
          {/* Interactive Product Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            {hero.previewProducts.map((p, idx) => {
              const isSelected = activePreviewIndex === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePreviewIndex(idx)}
                  className={cn(
                    'w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border',
                    isSelected
                      ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-900/50 scale-[1.02]'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 hover:bg-slate-850',
                  )}
                  aria-pressed={isSelected}
                >
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      isSelected ? 'bg-amber-300 animate-pulse' : 'bg-slate-500',
                    )}
                  />
                  <span>{p.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Main Visual Display Card */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-700 shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
            {/* Window Top Bar (Mac/Windows Desktop Mockup Style) */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  {activeProduct.name}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-400 bg-accent-950/80 border border-accent-800/80 px-2.5 py-0.5 rounded-md">
                {activeProduct.badge}
              </span>
            </div>

            {/* Product Grid / Preview Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Product Screenshot with Zoom & Floating Annotations */}
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-slate-800 shadow-inner group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-slate-200 font-semibold bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                    Live UI Preview: {activeProduct.name}
                  </span>
                </div>
              </div>

              {/* Product Feature Highlights Sidebar */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    {activeProduct.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeProduct.tagline}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Live Capabilities:
                  </h4>
                  {activeProduct.keyPoints.map((pt, ptIdx) => (
                    <div
                      key={ptIdx}
                      className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80"
                    >
                      <IconRenderer
                        name="CheckCircle2"
                        className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <a
                    href={`#${activeProduct.id}`}
                    onClick={(e) => handleScrollTo(e, `#${activeProduct.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow"
                  >
                    <span>Deep-Dive & Explore {activeProduct.id === 'fast-pos' ? 'Fast POS' : 'Cloud Portal'}</span>
                    <IconRenderer name="ArrowRight" className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="mt-14 lg:mt-18 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm font-bold text-white">
                {stat.label}
              </div>
              <p className="mt-1 text-[11px] text-slate-400 leading-normal">
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
