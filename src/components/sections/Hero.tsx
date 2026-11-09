import React from 'react';
import type { HeroData } from '../../types/site-data';
import { Button } from '../common/Button';
import { DynamicIcon } from '../../utils/icons';

export interface HeroProps {
  hero: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-gradient-to-b from-primary-50/70 via-background to-background">
      {/* Decorative gradient blur background elements */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[25rem] bg-primary-200/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/70 text-primary-700 text-xs sm:text-sm font-semibold tracking-wide mb-6 border border-primary-200">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
              <span>{hero.eyebrow}</span>
            </div>

            {/* Heading with highlighted word */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.15] sm:leading-[1.12]">
              {hero.heading}{' '}
              <span className="text-primary-600 block sm:inline mt-1 sm:mt-0 underline decoration-primary-200 underline-offset-8">
                {hero.highlightedWord}
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
              {hero.subheading}
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button href={hero.primaryCta.href} variant="primary" size="lg" className="group">
                <span>{hero.primaryCta.label}</span>
                <DynamicIcon
                  name="arrow-right"
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                <span>{hero.secondaryCta.label}</span>
              </Button>
            </div>
          </div>

          {/* Hero Illustration / Dashboard Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl bg-surface p-2 sm:p-3 border border-border shadow-card transition-all hover:shadow-elevation">
              <div className="w-full h-auto aspect-[4/3] rounded-xl overflow-hidden bg-surfaceAlt flex items-center justify-center text-primary-600">
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  className="w-full h-full object-contain p-2"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-border/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 rounded-xl bg-surface/60 border border-border/60 shadow-sm"
              >
                <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-600 tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
