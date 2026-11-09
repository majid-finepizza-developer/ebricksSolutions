import React, { useState, useEffect } from 'react';
import type { BrandData, NavbarData } from '../../types/site-data';
import { Button } from '../common/Button';
import { DynamicIcon } from '../../utils/icons';
import { cn } from '../../utils/cn';

export interface NavbarProps {
  brand: BrandData;
  navbar: NavbarData;
}

export const Navbar: React.FC<NavbarProps> = ({ brand, navbar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle scroll state for navbar backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy to highlight active nav link
  useEffect(() => {
    const sectionIds = navbar.links
      .map((link) => link.href.replace('#', ''))
      .filter(Boolean);

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      let currentSection = '';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = `#${id}`;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [navbar.links]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-surface/75 backdrop-blur-sm border-b border-border/50 py-4',
      )}
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo & Brand Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center p-1.5 transition-colors group-hover:bg-primary-100">
              <img src={brand.logo} alt="" aria-hidden="true" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-text-primary tracking-tight leading-none">
                {brand.name}
              </span>
              <span className="text-xs text-text-muted hidden sm:block mt-0.5">
                {brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navbar.links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 text-sm font-medium rounded-md transition-colors relative min-h-[44px] flex items-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                    isActive
                      ? 'text-primary-600 font-semibold bg-primary-50/70'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surfaceAlt',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Button href={navbar.cta.href} variant="primary" size="md">
              {navbar.cta.label}
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surfaceAlt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <DynamicIcon name="x" className="w-6 h-6" />
            ) : (
              <DynamicIcon name="menu" className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Slide-Down Panel */}
        <div
          id="mobile-navigation-panel"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'max-h-96 opacity-100 pt-4 pb-3 border-t border-border mt-3' : 'max-h-0 opacity-0 pointer-events-none',
          )}
        >
          <div className="flex flex-col gap-1.5">
            {navbar.links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center justify-between',
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surfaceAlt',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && <DynamicIcon name="chevron-right" className="w-4 h-4 text-primary-600" />}
                </a>
              );
            })}
            <div className="pt-2">
              <Button
                href={navbar.cta.href}
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navbar.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
