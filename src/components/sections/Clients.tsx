import React from 'react';
import type { ClientsData } from '../../types/site-data';
import { Section } from '../common/Section';

export interface ClientsProps {
  clients: ClientsData;
}

export const Clients: React.FC<ClientsProps> = ({ clients }) => {
  return (
    <Section id="clients" hasBackgroundAlt className="py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-text-muted">
          {clients.title}
        </h2>
      </div>

      {/* Responsive Grid for all devices */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
        {clients.logos.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-surface border border-border/80 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-md text-text-muted hover:text-primary-600 group"
          >
            <img
              src={client.logo}
              alt={client.name}
              title={client.name}
              className="h-7 sm:h-8 w-auto max-w-full object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};
