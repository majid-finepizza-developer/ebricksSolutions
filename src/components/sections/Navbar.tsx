import React, { useState, useEffect, useRef } from 'react';
import type { BrandData, CompanyContact, NavbarData, TopBarData, NavLink } from '../../types/content';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle scroll detection for sticky navbar style & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
      setOpenDropdown(null);
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      if (onNavigate) onNavigate(href);
    }
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar with Direct Contact Info */}
      {topBar.enabled && (
        <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 transition-colors">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            {/* Announcement / Tagline */}
            {topBar.announcement && (
              <div className="hidden lg:flex items-center gap-2 min-w-0">
                <span className="bg-accent-600/20 text-accent-400 border border-accent-600/30 px-2 py-0.5 rounded-full font-semibold text-[11px] whitespace-nowrap shrink-0">
                  {topBar.announcement.badge}
                </span>
                <span className="text-slate-300 truncate max-w-md xl:max-w-xl text-xs">
                  {topBar.announcement.text}
                </span>
              </div>
            )}

            {/* Quick Contacts - Clean & Non-Wrapping */}
            <div className="flex items-center gap-4 sm:gap-6 ml-auto shrink-0">
              <a
                href={contact.phone.href}
                className="flex items-center gap-1.5 hover:text-white transition-colors group whitespace-nowrap"
                aria-label={contact.phone.label}
              >
                <IconRenderer name={contact.phone.icon} className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                <span className="font-semibold tracking-wide text-xs">{contact.phone.display}</span>
              </a>

              <a
                href={contact.email.href}
                className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors group whitespace-nowrap"
                aria-label={contact.email.label}
              >
                <IconRenderer name={contact.email.icon} className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                <span className="text-xs">{contact.email.display}</span>
              </a>

              <span className="hidden xl:flex items-center gap-1.5 text-slate-400 whitespace-nowrap text-xs">
                <IconRenderer name={contact.address.icon} className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{contact.address.formatted}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={cn(
          'transition-all duration-200 w-full',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/50 py-3 sm:py-3.5',
        )}
        aria-label="Main Corporate Navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Registration Name */}
            <a
              href="#"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-0.5 transition-transform hover:scale-[1.01] shrink-0"
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 sm:h-10 w-auto max-w-[170px] sm:max-w-[210px] object-contain"
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {navbar.links.map((link: NavLink) => {
                const isActive = activeSection === link.href;
                const hasSubLinks = Boolean(link.subLinks && link.subLinks.length > 0);
                const isDropdownOpen = openDropdown === link.label;

                if (hasSubLinks) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(isDropdownOpen ? null : link.label);
                        }}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                          isActive || isDropdownOpen
                            ? 'text-primary-600 bg-primary-50/80'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80',
                        )}
                        aria-expanded={isDropdownOpen}
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                            {link.badge}
                          </span>
                        )}
                        <IconRenderer
                          name="ChevronDown"
                          className={cn(
                            'w-3.5 h-3.5 transition-transform duration-200 text-slate-500',
                            isDropdownOpen && 'rotate-180 text-primary-600',
                          )}
                        />
                      </button>

                      {/* Dropdown Menu Card */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 pt-1.5 w-88 z-50">
                          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                            {link.subLinks?.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                onClick={(e) => handleLinkClick(e, sub.href)}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                              >
                                {sub.icon && (
                                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary-600 group-hover/item:text-white transition-colors">
                                    <IconRenderer name={sub.icon} className="w-4 h-4" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-primary-600 transition-colors whitespace-nowrap">
                                      {sub.label}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.description && (
                                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                              </a>
                            ))}

                            <div className="pt-2 border-t border-slate-100 px-2 pb-1">
                              <a
                                href="#products"
                                onClick={(e) => handleLinkClick(e, '#products')}
                                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center justify-between p-1.5 rounded-lg hover:bg-primary-50/50 transition-colors"
                              >
                                <span>View All Flagship Systems</span>
                                <IconRenderer name="ArrowRight" className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80',
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Right Action CTAs */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* WhatsApp Quick CTA (Tablet & Desktop) */}
              <a
                href={navbar.whatsappButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 xl:gap-2 px-3 py-2 xl:px-3.5 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-xs whitespace-nowrap"
              >
                <IconRenderer name={navbar.whatsappButton.icon} className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{navbar.whatsappButton.label}</span>
              </a>

              {/* Primary Quote CTA Button */}
              <a
                href={navbar.ctaButton.href}
                onClick={(e) => handleLinkClick(e, navbar.ctaButton.href)}
                className="inline-flex items-center gap-1.5 xl:gap-2 px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-lg text-xs xl:text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                <span>{navbar.ctaButton.label}</span>
                {navbar.ctaButton.icon && (
                  <IconRenderer name={navbar.ctaButton.icon} className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
                )}
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                <IconRenderer name={mobileMenuOpen ? 'X' : 'Menu'} className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen/Drawer Navigation Panel */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding Drawer Content */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
              {/* Drawer Top Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-200">
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, '#')}
                  className="flex items-center"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-auto max-w-[170px] object-contain"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <IconRenderer name="X" className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-4 space-y-3 flex-1">
                {/* Hero Products Special Highlight in Mobile Menu */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Flagship Systems</span>
                    <span className="text-[10px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-bold">
                      Lahore Tested
                    </span>
                  </div>
                  <a
                    href="#fast-pos"
                    onClick={(e) => handleLinkClick(e, '#fast-pos')}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-xs"
                  >
                    <IconRenderer name="Monitor" className="w-4 h-4 text-primary-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Fast POS System</div>
                      <div className="text-[10px] text-slate-500">Touch counter register & shift reports</div>
                    </div>
                  </a>
                  <a
                    href="#cloud-franchise"
                    onClick={(e) => handleLinkClick(e, '#cloud-franchise')}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-xs"
                  >
                    <IconRenderer name="Globe" className="w-4 h-4 text-primary-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Cloud Franchise Portal</div>
                      <div className="text-[10px] text-slate-500">Multi-branch SaaS & call center routing</div>
                    </div>
                  </a>
                </div>

                {/* Primary Site Sections */}
                <div className="space-y-1">
                  {navbar.links.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={cn(
                          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-slate-800 hover:bg-slate-100',
                        )}
                      >
                        <span>{link.label}</span>
                        <IconRenderer name="ChevronRight" className="w-4 h-4 text-slate-400" />
                      </a>
                    );
                  })}
                </div>

                {/* CTAs */}
                <div className="pt-2 space-y-2">
                  <a
                    href={navbar.whatsappButton.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300"
                  >
                    <IconRenderer name={navbar.whatsappButton.icon} className="w-4 h-4 text-emerald-600" />
                    <span>{navbar.whatsappButton.label} ({contact.phone.display})</span>
                  </a>

                  <a
                    href={navbar.ctaButton.href}
                    onClick={(e) => handleLinkClick(e, navbar.ctaButton.href)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md"
                  >
                    <span>{navbar.ctaButton.label}</span>
                    <IconRenderer name="ArrowRight" className="w-4 h-4" />
                  </a>
                </div>

                {/* Quick Info */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 mt-3">
                  <div className="font-bold text-slate-900">{brand.legalName}</div>
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
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
