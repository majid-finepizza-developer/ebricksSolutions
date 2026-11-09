import React from 'react';
import type { ContactData } from '../../types/site-data';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { DynamicIcon } from '../../utils/icons';

export interface ContactProps {
  contact: ContactData;
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <Section id="contact" className="py-12 sm:py-16 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary-900 text-text-onPrimary p-8 sm:p-12 lg:p-16 shadow-2xl border border-primary-800">
        {/* Soft radial background glow using primary tokens */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-600/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main CTA copy & Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {contact.heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-100 leading-relaxed max-w-xl">
              {contact.text}
            </p>

            <div className="mt-8">
              <Button
                href={contact.button.href}
                variant="primary"
                size="lg"
                className="bg-surface text-primary-700 hover:bg-primary-50 hover:text-primary-800 shadow-md font-bold"
              >
                <span>{contact.button.label}</span>
                <DynamicIcon name="arrow-right" className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary-800/60 border border-primary-700/60 hover:bg-primary-800 hover:border-primary-500 transition-colors group min-h-[44px]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-700/80 text-primary-200 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-text-onPrimary transition-colors">
                <DynamicIcon name="mail" className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-text-onPrimary truncate">
                {contact.email}
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary-800/60 border border-primary-700/60 hover:bg-primary-800 hover:border-primary-500 transition-colors group min-h-[44px]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-700/80 text-primary-200 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-text-onPrimary transition-colors">
                <DynamicIcon name="phone" className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-text-onPrimary truncate">
                {contact.phone}
              </span>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-800/60 border border-primary-700/60">
              <div className="w-12 h-12 rounded-lg bg-primary-700/80 text-primary-200 flex items-center justify-center flex-shrink-0">
                <DynamicIcon name="map-pin" className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-medium text-text-onPrimary leading-snug">
                {contact.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
