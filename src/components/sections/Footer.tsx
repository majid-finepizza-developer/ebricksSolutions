import React from 'react';
import type { BrandData, CompanyContact, FooterData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface FooterProps {
  brand: BrandData;
  contact: CompanyContact;
  footer: FooterData;
}

export const Footer: React.FC<FooterProps> = ({ brand, contact, footer }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace('{year}', currentYear.toString());

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info & Legal Name */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <a
              href="#"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1 transition-opacity hover:opacity-90"
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 sm:h-12 w-auto max-w-[220px] object-contain brightness-105"
              />
            </a>

            <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent-400">
              {brand.legalName}
            </div>

            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Direct Contact Snapshot */}
            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <IconRenderer name="PhoneCall" className="w-3.5 h-3.5 text-accent-400" />
                <a href={contact.phone.href} className="hover:text-white transition-colors">
                  {contact.phone.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <IconRenderer name="Mail" className="w-3.5 h-3.5 text-primary-400" />
                <a href={contact.email.href} className="hover:text-white transition-colors">
                  {contact.email.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <IconRenderer name="MapPin" className="w-3.5 h-3.5 text-slate-500" />
                <span>{contact.address.formatted}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2.5">
              {footer.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                  aria-label={social.platform}
                >
                  <IconRenderer name={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {footer.linkGroups.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col">
              <h4 className="font-heading font-bold text-sm text-white tracking-wide uppercase">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyrightText}</p>
          <p className="text-center sm:text-right">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
