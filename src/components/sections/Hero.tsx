import React from 'react';
import type { HeroData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface HeroProps {
  hero: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
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
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Background Tech Gradients & Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner backdrop-blur-md">
            <IconRenderer name={hero.badge.icon} className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
              {hero.badge.text}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {hero.headline.prefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-amber-300">
              {hero.headline.highlight}
            </span>{' '}
            {hero.headline.suffix}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={hero.primaryCta.href}
              onClick={(e) => handleScrollTo(e, hero.primaryCta.href)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-900/30 hover:shadow-primary-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
          <div className="pt-6 border-t border-slate-800/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {hero.trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800/70 text-slate-300 text-xs sm:text-sm font-medium"
                >
                  <IconRenderer name={badge.icon} className="w-4 h-4 text-primary-400 shrink-0" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Key Performance Stats */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base font-bold text-white">
                {stat.label}
              </div>
              <p className="mt-1 text-xs text-slate-400 leading-normal">
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
