import React, { useState, useEffect } from 'react';
import type { BrandData, CompanyContact, NavbarData, TopBarData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { cn } from '../../utils/cn';

interface NavbarProps {
  brand: BrandData;
  contact: CompanyContact;
  topBar: TopBarData;
  navbar: NavbarData;
  onNavigate?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  contact,
  topBar,
  navbar,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll detection for sticky navbar style & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sectionIds = navbar.links
        .map((link) => link.href.replace('#', ''))
        .filter(Boolean);

      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionIds[i]}`);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbar.links]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      if (onNavigate) onNavigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar with Direct Contact Info */}
      {topBar.enabled && (
        <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 transition-colors">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
            {/* Announcement / Tagline */}
            {topBar.announcement && (
              <div className="hidden lg:flex items-center gap-2">
                <span className="bg-accent-600/20 text-accent-400 border border-accent-600/30 px-2 py-0.5 rounded-full font-medium text-[11px]">
                  {topBar.announcement.badge}
                </span>
                <span className="text-slate-300">{topBar.announcement.text}</span>
              </div>
            )}

            {/* Quick Contacts */}
            <div className="flex items-center flex-wrap gap-4 sm:gap-6 ml-auto">
              <a
                href={contact.phone.href}
                className="flex items-center gap-1.5 hover:text-white transition-colors group"
                aria-label={contact.phone.label}
              >
                <IconRenderer name={contact.phone.icon} className="w-3.5 h-3.5 text-accent-500" />
                <span className="font-medium tracking-wide">{contact.phone.display}</span>
              </a>

              <a
                href={contact.email.href}
                className="flex items-center gap-1.5 hover:text-white transition-colors group"
                aria-label={contact.email.label}
              >
                <IconRenderer name={contact.email.icon} className="w-3.5 h-3.5 text-primary-400" />
                <span>{contact.email.display}</span>
              </a>

              <span className="hidden md:flex items-center gap-1.5 text-slate-400">
                <IconRenderer name={contact.address.icon} className="w-3.5 h-3.5 text-slate-500" />
                <span>{contact.address.formatted}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={cn(
          'transition-all duration-300 w-full',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/50 py-3.5',
        )}
        aria-label="Main Corporate Navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Registration Name */}
            <a
              href="#"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1 transition-transform hover:scale-[1.02]"
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-9 sm:h-11 w-auto max-w-[190px] sm:max-w-[230px] object-contain"
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navbar.links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                      isActive
                        ? 'text-primary-600 font-semibold bg-primary-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Right Action CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {/* WhatsApp Quick CTA */}
              <a
                href={navbar.whatsappButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-sm hover:shadow"
              >
                <IconRenderer name={navbar.whatsappButton.icon} className="w-4 h-4 text-emerald-600" />
                <span>{navbar.whatsappButton.label}</span>
              </a>

              {/* Primary Quote CTA Button */}
              <a
                href={navbar.ctaButton.href}
                onClick={(e) => handleLinkClick(e, navbar.ctaButton.href)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                <span>{navbar.ctaButton.label}</span>
                {navbar.ctaButton.icon && (
                  <IconRenderer name={navbar.ctaButton.icon} className="w-4 h-4" />
                )}
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <IconRenderer name={mobileMenuOpen ? 'X' : 'Menu'} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen/Drawer Navigation Panel */}
        <div
          className={cn(
            'lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 overflow-y-auto max-h-[85vh]',
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
          )}
        >
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-1">
              {navbar.links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100',
                    )}
                  >
                    <span>{link.label}</span>
                    <IconRenderer name="ChevronRight" className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a
                href={navbar.whatsappButton.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
              >
                <IconRenderer name={navbar.whatsappButton.icon} className="w-5 h-5 text-emerald-600" />
                <span>{navbar.whatsappButton.label} ({contact.phone.display})</span>
              </a>

              <a
                href={navbar.ctaButton.href}
                onClick={(e) => handleLinkClick(e, navbar.ctaButton.href)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-md"
              >
                <span>{navbar.ctaButton.label}</span>
                <IconRenderer name="ArrowRight" className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Contact Quick Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-900">{brand.legalName}</div>
              <div className="flex items-center gap-2">
                <IconRenderer name="PhoneCall" className="w-3.5 h-3.5 text-accent-500" />
                <span>{contact.phone.display}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconRenderer name="Mail" className="w-3.5 h-3.5 text-primary-500" />
                <span>{contact.email.display}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconRenderer name="MapPin" className="w-3.5 h-3.5 text-slate-400" />
                <span>{contact.address.formatted}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
