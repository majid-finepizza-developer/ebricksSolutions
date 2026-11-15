import React from 'react';
import type { HeroData, SiteUiLabels } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { resolveAssetUrl } from '../../utils/assets';
import { ScreenshotDialog } from '../mwg/ScreenshotDialog';
import { openModalFallback } from '../../utils/polyfills';

interface HeroProps {
  hero: HeroData;
  ui: SiteUiLabels['hero'];
}

export const Hero: React.FC<HeroProps> = ({ hero, ui }) => {
  return (
    <section className="hero-section">
      <div className="mwg-container">
        <div className="hero-main-grid">
          <div className="hero-copy">
            <h1 className="hero-h1">
              {hero.headline.prefix}{' '}
              <span className="section-heading-accent">{hero.headline.highlight}</span>{' '}
              {hero.headline.suffix}
            </h1>

            <p className="hero-subheadline">{hero.subheadline}</p>

            <div className="hero-cta-row">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                <span>{hero.primaryCta.label}</span>
                <IconRenderer
                  name={hero.primaryCta.icon || 'ArrowRight'}
                  size={18}
                  aria-hidden="true"
                />
              </a>

              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <IconRenderer
                  name={hero.secondaryCta.icon || 'MessageCircle'}
                  size={18}
                  aria-hidden="true"
                />
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>

            <ul className="hero-trust-grid">
              {hero.trustBadges.map((badge, idx) => (
                <li key={idx} className="hero-trust-item">
                  <span className="hero-trust-icon">
                    <IconRenderer name={badge.icon} size={16} aria-hidden="true" />
                  </span>
                  <span>{badge.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-stage">
            <div className="stage-chrome-bar">
              <div className="stage-dots" aria-hidden="true">
                <span className="stage-dot stage-dot--red" />
                <span className="stage-dot stage-dot--amber" />
                <span className="stage-dot stage-dot--green" />
              </div>
              <span className="stage-status-label">
                {ui.previewBadge} · {ui.windowStatusLabel}
              </span>
            </div>

            <div className="hero-dual-grid">
              {hero.previewProducts.map((product, index) => {
                const dialogId = `hero-zoom-${product.id}`;
                const isSecondary = index > 0;

                return (
                  <article
                    key={product.id}
                    className={
                      isSecondary
                        ? 'hero-stage-card is-secondary-product'
                        : 'hero-stage-card'
                    }
                  >
                    <div className="hero-stage-card-top">
                      <span
                        className={
                          isSecondary
                            ? 'stage-product-badge stage-product-badge--offline'
                            : 'stage-product-badge'
                        }
                        data-offline-product={isSecondary ? 'true' : undefined}
                      >
                        {product.badge}
                      </span>

                      <button
                        type="button"
                        command="show-modal"
                        commandfor={dialogId}
                        onClick={() => openModalFallback(dialogId)}
                        aria-label={`${ui.inspectButtonLabel}: ${product.name}`}
                        className="btn btn-ghost-dark stage-zoom-btn"
                      >
                        <IconRenderer name="Maximize2" size={14} aria-hidden="true" />
                        <span>{ui.inspectButtonLabel}</span>
                      </button>
                    </div>

                    <a href={product.href} className="hero-stage-thumb-link">
                      <img
                        src={resolveAssetUrl(product.image)}
                        alt={product.name}
                        width={product.width ?? ui.productWidth}
                        height={product.height ?? ui.productHeight}
                        fetchPriority={index === 0 ? 'high' : undefined}
                        loading="eager"
                        decoding={index === 0 ? 'sync' : 'async'}
                        className="hero-stage-thumb"
                      />
                    </a>

                    <div className="hero-stage-meta">
                      <h2 className="preview-title">{product.name}</h2>
                      <p className="preview-tagline">{product.tagline}</p>
                    </div>

                    <ul className="preview-highlights" aria-label={ui.highlightsHeading}>
                      {product.keyPoints.map((point, pointIdx) => (
                        <li key={pointIdx}>
                          <IconRenderer
                            name="CheckCircle2"
                            size={14}
                            className="check-icon"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <a href={product.href} className="hero-stage-jump-link">
                      <span>{product.ctaLabel}</span>
                      <IconRenderer name="ArrowRight" size={14} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hero-stats-grid mwg-card-grid mwg-card-grid--four">
          {hero.stats.map((stat, idx) => (
            <div key={idx} className="stat-card mwg-scroll-reveal">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-desc">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {hero.previewProducts.map((product) => (
        <ScreenshotDialog
          key={product.id}
          dialogId={`hero-zoom-${product.id}`}
          title={`${ui.dialogTitlePrefix}: ${product.name}`}
          imageSrc={resolveAssetUrl(product.image)}
          imageAlt={product.name}
          width={product.width ?? ui.productWidth}
          height={product.height ?? ui.productHeight}
          caption={product.tagline}
          closeLabel={ui.closeDialogLabel}
        />
      ))}
    </section>
  );
};

export default Hero;
