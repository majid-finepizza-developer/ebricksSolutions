import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type {
  BrandData,
  CompanyContact,
  NavbarData,
  NavLink,
  SiteUiLabels,
  TopBarData,
} from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { resolveAssetUrl } from '../../utils/assets';

interface NavbarProps {
  brand: BrandData;
  contact: CompanyContact;
  topBar: TopBarData;
  navbar: NavbarData;
  ui: SiteUiLabels['navbar'];
}

const MENU_ID = 'site-menu';
const SUBMENU_ID = 'products-submenu';

type PopoverEl = HTMLElement & {
  showPopover?: (options?: { source?: HTMLElement }) => void;
  hidePopover?: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ brand, contact, topBar, navbar, ui }) => {
  const headerRef = useRef<HTMLElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimer = useRef<number | undefined>(undefined);

  const [navLayout, setNavLayout] = useState<'measuring' | 'wide' | 'compact'>('measuring');
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('');

  const isWide = navLayout === 'wide';

  // Container-fit navigation measurement via ResizeObserver (synchronous class toggling prevents FOUC).
  useLayoutEffect(() => {
    const nav = navRef.current;
    const menu = menuRef.current;
    if (!nav || !menu) return;

    let rafId = 0;
    let lastMeasuredNavWidth = -1;

    const measureFit = (force = false) => {
      const currentNavWidth = Math.round(nav.clientWidth);
      if (!force && Math.abs(currentNavWidth - lastMeasuredNavWidth) < 2) {
        return;
      }
      lastMeasuredNavWidth = currentNavWidth;

      // Close drawer cleanly before measuring across viewport changes.
      const popMenu = menu as PopoverEl;
      try {
        if (menu.matches(':popover-open')) {
          popMenu.hidePopover?.();
        }
      } catch {
        // Ignore when browser lacks native :popover-open prior to polyfill init
      }

      // Toggle measuring classes synchronously on DOM so React delay never exposes vertical list.
      nav.classList.add('is-measuring');
      nav.classList.remove('is-wide');
      menu.removeAttribute('popover');

      void menu.offsetWidth;

      const brandEl = nav.querySelector('.brand-link') as HTMLElement | null;
      const brandWidth = brandEl ? brandEl.getBoundingClientRect().width : 0;
      const navStyle = getComputedStyle(nav);
      const gap = parseFloat(navStyle.columnGap || navStyle.gap || '16') || 16;
      const availableForMenu = nav.clientWidth - brandWidth - gap - 8;
      const neededWidth = menu.getBoundingClientRect().width;
      const fits = neededWidth <= Math.max(0, availableForMenu);

      nav.classList.remove('is-measuring');
      if (fits) {
        menu.removeAttribute('popover');
        nav.classList.add('is-wide');
        setNavLayout('wide');
      } else {
        menu.setAttribute('popover', 'auto');
        setNavLayout('compact');
      }
    };

    const scheduleMeasure = (force = false) => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => measureFit(force));
    };

    measureFit(true);

    const ro = new ResizeObserver(() => scheduleMeasure(false));
    ro.observe(nav);
    document.fonts?.ready.then(() => measureFit(true));

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [navbar.links]);

  // Sticky header height variable, IntersectionObserver stuck-state fallback, and reading progress fallback.
  useEffect(() => {
    const header = headerRef.current;
    const sentinel = stickySentinelRef.current;
    const progressEl = progressRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--sticky-header-height',
        `${header.getBoundingClientRect().height}px`,
      );
    };
    updateHeaderHeight();

    const headerRo = new ResizeObserver(updateHeaderHeight);
    headerRo.observe(header);

    const supportsScrollState =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('container-type', 'scroll-state');

    let stuckObserver: IntersectionObserver | null = null;
    if (!supportsScrollState && sentinel && typeof IntersectionObserver !== 'undefined') {
      stuckObserver = new IntersectionObserver(
        ([entry]) => {
          header.classList.toggle('is-stuck', !entry.isIntersecting);
        },
        { threshold: 0 },
      );
      stuckObserver.observe(sentinel);
    }

    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

    let ticking = false;
    const onScroll = () => {
      if (ticking || !progressEl) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const doc = document.documentElement;
        const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, y / scrollable));
        progressEl.style.transform = `scaleX(${ratio})`;
        ticking = false;
      });
    };

    if (!supportsScrollTimeline) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      headerRo.disconnect();
      stuckObserver?.disconnect();
      if (!supportsScrollTimeline) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  // Scrollspy active section highlight (fallback when CSS scroll-target-group is unavailable).
  useEffect(() => {
    const supportsScrollTargetGroup =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('scroll-target-group', 'auto');

    if (supportsScrollTargetGroup || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const targets = navbar.links
      .filter((l) => l.href.startsWith('#'))
      .map((l) => ({
        href: l.href,
        el: document.getElementById(l.href.slice(1)),
      }))
      .filter((entry): entry is { href: string; el: HTMLElement } => Boolean(entry.el));

    if (targets.length === 0) return;

    const visibleMap = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleMap.set(`#${entry.target.id}`, entry.isIntersecting);
        }
        const firstVisible = targets.find((t) => visibleMap.get(t.href));
        if (firstVisible) {
          setActiveHref(firstVisible.href);
        } else if (window.scrollY < 160) {
          setActiveHref('');
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.01 },
    );

    for (const target of targets) observer.observe(target.el);
    return () => observer.disconnect();
  }, [navbar.links]);

  // Anchor-positioned dropdown submenu state + synchronous safety fallback if anchor fails or flips upward.
  useEffect(() => {
    const submenu = submenuRef.current;
    const trigger = triggerRef.current;
    if (!submenu || !trigger) return;

    const syncFallbackPosition = () => {
      if (!submenu.matches(':popover-open')) return;

      const supportsExplicitAnchor =
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('position-anchor', 'auto') &&
        CSS.supports('top', 'anchor(bottom)');

      const triggerRect = trigger.getBoundingClientRect();
      const rect = submenu.getBoundingClientRect();

      // Enforce safe coordinates cleanly below the trigger when native CSS anchor positioning isn't active or sits above trigger bottom
      if (!supportsExplicitAnchor || rect.top < triggerRect.bottom + 2) {
        const maxLeft = Math.max(8, window.innerWidth - submenu.offsetWidth - 16);
        submenu.style.top = `${Math.round(triggerRect.bottom + 8)}px`;
        submenu.style.left = `${Math.max(8, Math.min(Math.round(triggerRect.left), maxLeft))}px`;
      } else {
        submenu.style.removeProperty('top');
        submenu.style.removeProperty('left');
      }
    };

    const handleToggle = (event: Event) => {
      const toggleEv = event as ToggleEvent;
      const openNow = toggleEv.newState === 'open';
      setSubmenuOpen(openNow);
      if (openNow) {
        syncFallbackPosition();
        window.requestAnimationFrame(syncFallbackPosition);
      }
    };

    submenu.addEventListener('toggle', handleToggle);
    window.addEventListener('resize', syncFallbackPosition);
    window.addEventListener('scroll', syncFallbackPosition, { passive: true });

    return () => {
      submenu.removeEventListener('toggle', handleToggle);
      window.removeEventListener('resize', syncFallbackPosition);
      window.removeEventListener('scroll', syncFallbackPosition);
    };
  }, [isWide]);

  // Mobile popover drawer horizontal swipe-right-to-dismiss gesture.
  useEffect(() => {
    const menu = menuRef.current as PopoverEl | null;
    if (!menu || isWide) return;

    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      deltaX = 0;
      dragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      if (dx > 0) {
        deltaX = dx;
        menu.style.translate = `${Math.min(dx, 240)}px 0`;
      }
    };

    const onTouchEnd = () => {
      if (!dragging) return;
      dragging = false;
      menu.style.removeProperty('translate');
      if (deltaX > 72) {
        try {
          menu.hidePopover?.();
        } catch {
          // Safe noop
        }
      }
    };

    menu.addEventListener('touchstart', onTouchStart, { passive: true });
    menu.addEventListener('touchmove', onTouchMove, { passive: true });
    menu.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      menu.removeEventListener('touchstart', onTouchStart);
      menu.removeEventListener('touchmove', onTouchMove);
      menu.removeEventListener('touchend', onTouchEnd);
    };
  }, [isWide]);

  const closeMenus = () => {
    const menu = menuRef.current as PopoverEl | null;
    const submenu = submenuRef.current as PopoverEl | null;
    try {
      submenu?.hidePopover?.();
    } catch {
      // Ignore if already closed
    }
    if (!isWide) {
      try {
        menu?.hidePopover?.();
      } catch {
        // Ignore if already closed
      }
    }
  };

  const openSubmenuOnHover = () => {
    if (!window.matchMedia?.('(hover: hover)').matches) return;
    window.clearTimeout(hoverCloseTimer.current);
    const submenu = submenuRef.current as PopoverEl | null;
    const trigger = triggerRef.current;
    if (!submenu || !trigger) return;
    try {
      if (!submenu.matches(':popover-open')) {
        submenu.showPopover?.({ source: trigger });
      }
    } catch {
      try {
        submenu.showPopover?.();
      } catch {
        // Safe noop
      }
    }
  };

  const scheduleCloseSubmenu = () => {
    if (!window.matchMedia?.('(hover: hover)').matches) return;
    window.clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = window.setTimeout(() => {
      const submenu = submenuRef.current as PopoverEl | null;
      if (!submenu) return;
      if (submenu.contains(document.activeElement)) return;
      try {
        submenu.hidePopover?.();
      } catch {
        // Safe noop
      }
    }, 160);
  };

  const navClassName = [
    'site-nav',
    navLayout === 'measuring' ? 'is-measuring' : '',
    navLayout === 'wide' ? 'is-wide' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {topBar.enabled && (
        <div className="site-utility-bar">
          <div className="mwg-container site-utility-inner">
            {topBar.announcement ? (
              <div className="site-utility-promo">
                <span className="site-utility-pill">{topBar.announcement.badge}</span>
                {topBar.announcement.text ? <span>{topBar.announcement.text}</span> : null}
              </div>
            ) : null}

            <div className="site-utility-contacts">
              <a
                href={contact.phone.href}
                className="site-utility-link"
                aria-label={contact.phone.label}
              >
                <IconRenderer name={contact.phone.icon} size={14} aria-hidden="true" />
                <span>{contact.phone.display}</span>
              </a>

              <a
                href={contact.email.href}
                className="site-utility-link"
                aria-label={contact.email.label}
              >
                <IconRenderer name={contact.email.icon} size={14} aria-hidden="true" />
                <span>{contact.email.display}</span>
              </a>

              <a
                href={contact.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-utility-link"
              >
                <IconRenderer name={contact.address.icon} size={14} aria-hidden="true" />
                <span>{contact.address.formatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <div ref={stickySentinelRef} className="sticky-header-sentinel" aria-hidden="true" />
      <header ref={headerRef} className="site-sticky-header">
        <div className="site-header-surface" aria-hidden="true" />
        <div className="site-header-inner">
          <div className="mwg-container">
            <nav ref={navRef} className={navClassName} aria-label={ui.primaryLabel}>
              <a href="#" className="brand-link" aria-label={ui.homeLabel}>
                <img
                  src={resolveAssetUrl(brand.logo)}
                  alt={brand.name}
                  width={1024}
                  height={448}
                  className="brand-logo"
                />
              </a>

              <button
                type="button"
                className="nav-trigger-btn"
                popovertarget={MENU_ID}
                popovertargetaction="show"
                aria-label={ui.menuButtonLabel}
              >
                <IconRenderer name="Menu" size={18} aria-hidden="true" />
                <span>{ui.menuButtonLabel}</span>
              </button>

              <ul ref={menuRef} id={MENU_ID} className="site-menu">
                <li className="drawer-header-item">
                  <div className="drawer-header-row">
                    <strong>{brand.name}</strong>
                    <button
                      type="button"
                      className="drawer-close-btn"
                      popovertarget={MENU_ID}
                      popovertargetaction="hide"
                      aria-label={ui.closeMenuLabel}
                    >
                      <IconRenderer name="X" size={18} aria-hidden="true" />
                    </button>
                  </div>
                </li>

                {navbar.links.map((link: NavLink) => {
                  const hasSubLinks = Boolean(link.subLinks && link.subLinks.length > 0);
                  const isCurrent = activeHref === link.href;

                  if (hasSubLinks && (navLayout === 'wide' || navLayout === 'measuring')) {
                    return (
                      <li
                        key={link.href}
                        onMouseEnter={openSubmenuOnHover}
                        onMouseLeave={scheduleCloseSubmenu}
                      >
                        <button
                          ref={triggerRef}
                          type="button"
                          popovertarget={SUBMENU_ID}
                          className="site-nav-dropdown-trigger"
                          aria-expanded={submenuOpen}
                          aria-haspopup="true"
                        >
                          <span>{link.label}</span>
                          <IconRenderer name="ChevronDown" size={15} aria-hidden="true" />
                        </button>

                        <div
                          ref={submenuRef}
                          id={SUBMENU_ID}
                          popover="auto"
                          className="products-submenu-popover"
                          onMouseEnter={openSubmenuOnHover}
                          onMouseLeave={scheduleCloseSubmenu}
                        >
                          {link.subLinks!.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              onClick={closeMenus}
                              className="submenu-item-link"
                            >
                              <span className="icon-tile">
                                <IconRenderer
                                  name={sub.icon || 'Layers'}
                                  size={18}
                                  aria-hidden="true"
                                />
                              </span>
                              <span>
                                <span className="submenu-item-title-row">
                                  <span>{sub.label}</span>
                                  {sub.badge ? (
                                    <span className="submenu-item-badge">{sub.badge}</span>
                                  ) : null}
                                </span>
                                {sub.description ? (
                                  <span className="submenu-item-desc">{sub.description}</span>
                                ) : null}
                              </span>
                            </a>
                          ))}
                        </div>
                      </li>
                    );
                  }

                  if (hasSubLinks) {
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={closeMenus}
                          className={`site-nav-link ${isCurrent ? 'target-current' : ''}`.trim()}
                          aria-current={isCurrent ? 'location' : undefined}
                        >
                          <span>{link.label}</span>
                        </a>
                        <ul className="mobile-submenu-list">
                          {link.subLinks!.map((sub) => (
                            <li key={sub.href}>
                              <a href={sub.href} onClick={closeMenus} className="site-nav-link">
                                <span>{sub.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={closeMenus}
                        className={`site-nav-link ${isCurrent ? 'target-current' : ''}`.trim()}
                        aria-current={isCurrent ? 'location' : undefined}
                      >
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}

                <li>
                  <div className="nav-cta-group">
                    <a
                      href={navbar.whatsappButton.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenus}
                      className="btn btn-whatsapp nav-cta-btn"
                    >
                      <IconRenderer
                        name={navbar.whatsappButton.icon}
                        size={16}
                        aria-hidden="true"
                      />
                      <span>{navbar.whatsappButton.label}</span>
                    </a>

                    <a
                      href={navbar.ctaButton.href}
                      onClick={closeMenus}
                      className="btn btn-primary nav-cta-btn"
                    >
                      <span>{navbar.ctaButton.label}</span>
                      <IconRenderer
                        name={navbar.ctaButton.icon || 'ArrowRight'}
                        size={16}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div ref={progressRef} className="scroll-progress-bar" aria-hidden="true" />
        </div>
      </header>
    </>
  );
};

export default Navbar;
