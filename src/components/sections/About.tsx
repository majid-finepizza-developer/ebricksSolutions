import React from 'react';
import type { AboutData } from '../../types/site-data';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/icons';

export interface AboutProps {
  about: AboutData;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <Section id="about" hasBackgroundAlt>
      <SectionHeading
        subtitle={about.subtitle}
        title={about.title}
        align="center"
      />

      {/* Main Story & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Team/Architecture Visual */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative rounded-2xl bg-surface p-3 border border-border shadow-card overflow-hidden">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surfaceAlt text-primary-600 flex items-center justify-center">
              <img
                src={about.image.src}
                alt={about.image.alt}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right: Narrative & Highlights Grid */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
          <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            {about.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Highlights 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {about.highlights.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-surface border border-border shadow-sm flex flex-col gap-2 transition-all hover:border-primary-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-base">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission, Vision, and Values Cards */}
      <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Mission Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
            <DynamicIcon name="zap" className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
            {about.missionTitle || 'Mission'}
          </h3>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {about.mission}
          </p>
        </div>

        {/* Vision Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
            <DynamicIcon name="shield" className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
            {about.visionTitle || 'Vision'}
          </h3>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {about.vision}
          </p>
        </div>

        {/* Core Values Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
            <DynamicIcon name="check-circle" className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
            {about.valuesTitle || 'Core Values'}
          </h3>
          <ul className="space-y-2.5 text-sm sm:text-base text-text-secondary">
            {about.values.map((val) => (
              <li key={val} className="flex items-center gap-2.5">
                <DynamicIcon name="check" className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
