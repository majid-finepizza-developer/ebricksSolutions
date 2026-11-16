import React from 'react';
import type { BrandData, CompanyContact, FooterData, SiteUiLabels } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { resolveAssetUrl } from '../../utils/assets';

interface FooterProps {
  brand: BrandData;
  contact: CompanyContact;
  footer: FooterData;
  ui: SiteUiLabels['footer'];
}

export const Footer: React.FC<FooterProps> = ({ brand, contact, footer, ui }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace('{year}', String(currentYear));

  return (
    <footer className="site-footer">
      <div className="mwg-container">
        <div className="footer-grid">
          <div>
            {/* <a href="#" className="brand-link" aria-label={brand.name}>
              <img
                src={resolveAssetUrl(brand.logo)}
                alt={brand.name}
                width={1024}
                height={448}
                loading="lazy"
                decoding="async"
                className="footer-brand-logo"
              />
            </a> */}

            <p className="mwg-card-title">{brand.legalName}</p>
            {/* <p style={{ marginBlockStart: '0.65rem', maxInlineSize: '36ch', fontSize: '0.9rem' }}>
              {footer.description}
            </p> */}

            <h2 className="visually-hidden">{ui.contactHeading}</h2>
            <ul className="footer-link-list">
              <li>
                <a href={contact.phone.href} className="footer-link">
                  <IconRenderer name={contact.phone.icon} size={15} aria-hidden="true" />
                  <span>{contact.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={contact.email.href} className="footer-link">
                  <IconRenderer name={contact.email.icon} size={15} aria-hidden="true" />
                  <span>{contact.email.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <IconRenderer name={contact.address.icon} size={15} aria-hidden="true" />
                  <span>{contact.address.formatted}</span>
                </a>
              </li>
            </ul>

            <ul className="footer-social-list">
              {footer.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="footer-social-link"
                  >
                    <IconRenderer name={social.icon} size={17} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.linkGroups.map((group, gIdx) => (
            <nav key={gIdx} aria-label={`${group.title} — ${ui.legalNavLabel}`}>
              <h2 className="mwg-card-title">{group.title}</h2>
              <ul className="footer-link-list">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>{copyrightText}</p>
          {/* <p>{footer.disclaimer}</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
