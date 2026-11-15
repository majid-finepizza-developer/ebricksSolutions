import React, { useEffect, useState } from 'react';
import type {
  CompanyContact,
  FloatingWhatsAppConfig,
  SiteUiLabels,
} from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface FloatingActionsProps {
  contact: CompanyContact;
  whatsAppConfig: FloatingWhatsAppConfig;
  ui: SiteUiLabels['floatingActions'];
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Floating bottom-end corner dock holding Back-to-Top and optional WhatsApp CTA.
 * Visibility uses CSS `scroll-state(scrollable: top)` in supporting browsers and
 * an IntersectionObserver watching a top-of-document sentinel everywhere else.
 */
export const FloatingActions: React.FC<FloatingActionsProps> = ({
  contact,
  whatsAppConfig,
  ui,
  sentinelRef,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsScrolled(!entry.isIntersecting);
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef]);

  const handleBackToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    if (event.detail === 0) {
      // Return keyboard focus to the top header link so it is not stranded when hidden.
      const topTarget =
        document.querySelector<HTMLElement>('.site-sticky-header .brand-link') ??
        document.querySelector<HTMLElement>('.skip-link');
      topTarget?.focus({ preventScroll: true });
    } else {
      event.currentTarget.blur();
    }
  };

  return (
    <aside
      className={`floating-actions-dock ${isScrolled ? 'is-scrolled' : ''}`.trim()}
      aria-label={ui.dockLabel}
    >
      <button
        type="button"
        className="floating-back-to-top-btn"
        onClick={handleBackToTop}
      >
        <IconRenderer name="ArrowUp" size={17} aria-hidden="true" />
        <span>{ui.backToTopLabel}</span>
      </button>

      {whatsAppConfig.enabled && (
        <a
          href={contact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          aria-label={`${contact.whatsapp.label} (${contact.whatsapp.display})`}
          title={whatsAppConfig.tooltipText}
        >
          <IconRenderer name={contact.whatsapp.icon} size={18} aria-hidden="true" />
          <span>{contact.whatsapp.label}</span>
        </a>
      )}
    </aside>
  );
};

export default FloatingActions;
