import React from 'react';
import type { ServicesData } from '../../types/site-data';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/icons';

export interface ServicesProps {
  services: ServicesData;
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <Section id="services">
      <SectionHeading
        subtitle={services.subtitle}
        title={services.title}
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.items.map((service) => (
          <div
            key={service.id}
            className="group relative p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm hover:-translate-y-1.5 hover:shadow-card hover:border-primary-200 transition-all duration-300 flex flex-col justify-between motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-text-onPrimary">
                <DynamicIcon name={service.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary tracking-tight transition-colors duration-200 group-hover:text-primary-600">
                {service.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-end text-primary-600 opacity-60 group-hover:opacity-100 transition-opacity">
              <DynamicIcon
                name="arrow-right"
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
