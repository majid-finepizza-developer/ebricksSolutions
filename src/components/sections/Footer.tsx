import React from 'react';
import type { BrandData, FooterData } from '../../types/site-data';
import { DynamicIcon } from '../../utils/icons';

export interface FooterProps {
  brand: BrandData;
  footer: FooterData;
}

export const Footer: React.FC<FooterProps> = ({ brand, footer }) => {
  const currentYear = new Date().getFullYear().toString();
  const renderedCopyright = footer.copyright.replace('{year}', currentYear);

  return (
    <footer className="w-full bg-surface border-t border-border pt-16 pb-12 transition-colors">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border">
          {/* Brand Info & Blurb */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <a
              href="#"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center p-1 transition-colors group-hover:bg-primary-100">
                <img src={brand.logo} alt="" aria-hidden="true" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary tracking-tight">
                {brand.name}
              </span>
            </a>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              {footer.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg bg-surfaceAlt text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                  aria-label={social.platform}
                >
                  <DynamicIcon name={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h3 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded py-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-muted">
          <p>{renderedCopyright}</p>
        </div>
      </div>
    </footer>
  );
};
