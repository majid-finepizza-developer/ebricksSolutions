import React from 'react';
import type {
  CompanyContact,
  FlagshipProduct,
  FlagshipProductsData,
  SiteUiLabels,
} from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { resolveAssetUrl } from '../../utils/assets';
import { ScreenshotDialog } from '../mwg/ScreenshotDialog';
import { openModalFallback } from '../../utils/polyfills';

interface FlagshipProductsSectionProps {
  data: FlagshipProductsData;
  contact: CompanyContact;
  ui: SiteUiLabels['flagship'];
  onSelectProduct?: (productName: string) => void;
}

export const FlagshipProductsSection: React.FC<FlagshipProductsSectionProps> = ({
  data,
  contact,
  ui,
  onSelectProduct,
}) => {
  const handleProductDemo = (product: FlagshipProduct) => {
    onSelectProduct?.(product.inquiryOption ?? product.name);
  };

  return (
    <section id="products" className="section-band section-band--alt">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {data.heading} <span className="section-heading-accent">{data.highlightedWord}</span>
          </h2>

          <p className="section-lead">{data.subheading}</p>
        </div>

        <div className="flagship-stack">
          {data.products.map((product) => {
            const isEcosystemProduct = Boolean(
              product.ecosystemFlow && product.ecosystemFlow.length > 0,
            );
            const fallbackCardClass = product.idealForBar
              ? 'product-showcase-card product-showcase-card--offline'
              : 'product-showcase-card product-showcase-card--restaurant';

            return (
              <article key={product.id} id={product.id} className={fallbackCardClass}>
                <div className="product-kicker-row">
                  {product.productNumber ? (
                    <span
                      className={
                        product.idealForBar
                          ? 'product-number-badge product-number-badge--accent'
                          : 'product-number-badge'
                      }
                    >
                      {product.productNumber}
                    </span>
                  ) : null}
                  <span className="product-category-badge">{product.category}</span>
                </div>

                <div className="product-overview-grid">
                  <div>
                    <h3 className="product-heading">{product.name}</h3>
                    <p className="product-tagline">{product.tagline}</p>
                    <p className="product-summary">{product.summary}</p>

                    <div className="hero-cta-row">
                      <a
                        href={product.cta.href}
                        onClick={() => handleProductDemo(product)}
                        className="btn btn-primary"
                      >
                        <span>{product.cta.label}</span>
                        <IconRenderer name="ArrowRight" size={17} aria-hidden="true" />
                      </a>

                      {product.secondaryCta ? (
                        <a href={product.secondaryCta.href} className="btn btn-secondary">
                          <span>{product.secondaryCta.label}</span>
                        </a>
                      ) : null}

                      <a
                        href={contact.whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        <IconRenderer name={contact.whatsapp.icon} size={17} aria-hidden="true" />
                        <span>{contact.whatsapp.label}</span>
                      </a>
                    </div>
                  </div>

                  <div className="checklist-panel">
                    <h4 className="checklist-title">{ui.highlightsHeading}</h4>
                    <ul className="check-list">
                      {product.highlights.map((item, idx) => (
                        <li key={idx} className="check-list-item">
                          <IconRenderer
                            name="CheckCircle2"
                            size={17}
                            className="check-icon"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {isEcosystemProduct && product.ecosystemFlow ? (
                  <div className="ecosystem-flow-panel">
                    <h4 className="sub-block-heading">{ui.ecosystemHeading}</h4>
                    <div className="ecosystem-flow">
                      {product.ecosystemFlow.map((stage, stageIdx) => (
                        <React.Fragment key={stageIdx}>
                          <div className={`ecosystem-stage ecosystem-stage--${stage.role}`}>
                            <span className="ecosystem-stage-label">{stage.label}</span>
                            <ul className="ecosystem-stage-list">
                              {stage.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="ecosystem-stage-item">
                                  <IconRenderer
                                    name={
                                      stage.role === 'hub' ? 'Layers' : 'CheckCircle2'
                                    }
                                    size={14}
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {stageIdx < product.ecosystemFlow!.length - 1 ? (
                            <span className="ecosystem-arrow" aria-hidden="true">
                              <IconRenderer name="ArrowRight" size={18} />
                            </span>
                          ) : null}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : null}

                {product.screenshots.length > 0 ? (
                  <div className="product-gallery-grid">
                    {product.screenshots.map((screen, screenIdx) => {
                      const dialogId = `screen-${product.id}-${screenIdx}`;

                      return (
                        <React.Fragment key={dialogId}>
                          <figure className="screenshot-card">
                            <img
                              src={resolveAssetUrl(screen.image)}
                              alt={screen.title}
                              width={screen.width ?? 1024}
                              height={screen.height ?? 614}
                              loading="lazy"
                              decoding="async"
                            />
                            <figcaption className="screenshot-caption-bar">
                              <div>
                                <p className="screenshot-caption-title">{screen.title}</p>
                                <p className="product-summary">{screen.caption}</p>
                              </div>
                              <button
                                type="button"
                                command="show-modal"
                                commandfor={dialogId}
                                onClick={() => openModalFallback(dialogId)}
                                aria-label={`${ui.inspectButtonLabel}: ${screen.title}`}
                                className="btn btn-secondary"
                              >
                                <IconRenderer name="Maximize2" size={16} aria-hidden="true" />
                                <span>{ui.inspectButtonLabel}</span>
                              </button>
                            </figcaption>
                          </figure>

                          <ScreenshotDialog
                            dialogId={dialogId}
                            title={`${ui.dialogTitlePrefix}: ${screen.title}`}
                            imageSrc={resolveAssetUrl(screen.image)}
                            imageAlt={screen.title}
                            width={screen.width ?? 1024}
                            height={screen.height ?? 614}
                            caption={screen.caption}
                            closeLabel={ui.closeDialogLabel}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : null}

                {product.features.length > 0 ? (
                  <div id={isEcosystemProduct ? 'restaurant-modules' : undefined}>
                    <h4 className="sub-block-heading">
                      {isEcosystemProduct ? ui.modulesHeading : ui.standalonePillarsHeading}
                    </h4>

                    <div className={isEcosystemProduct ? 'module-grid-5' : 'feature-grid-3'}>
                      {product.features.map((feat, fIdx) => (
                        <article key={fIdx} className="mwg-card module-card mwg-scroll-reveal">
                          <div className="mwg-card-header">
                            <div className="module-card-meta">
                              {feat.number ? (
                                <span className="module-number-pill">{feat.number}</span>
                              ) : null}
                              {feat.badge ? (
                                <span className="mwg-chip">{feat.badge}</span>
                              ) : null}
                            </div>
                            <span
                              className={
                                product.idealForBar ? 'icon-tile icon-tile--accent' : 'icon-tile'
                              }
                            >
                              <IconRenderer name={feat.icon} size={20} aria-hidden="true" />
                            </span>
                          </div>

                          <div className="mwg-card-body">
                            <h5 className="mwg-card-title">{feat.title}</h5>
                            <p>{feat.description}</p>

                            {feat.highlights && feat.highlights.length > 0 ? (
                              <ul className="module-highlights">
                                {feat.highlights.map((hl, hlIdx) => (
                                  <li key={hlIdx}>
                                    <IconRenderer
                                      name="Check"
                                      size={14}
                                      className="check-icon"
                                      aria-hidden="true"
                                    />
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}

                {product.idealForBar ? (
                  <aside id="fast-pos-ideal" className="ideal-for-banner">
                    <div className="ideal-for-head">
                      <h4 className="checklist-title">{product.idealForBar.label}</h4>
                      <p className="ideal-for-note">{product.idealForBar.note}</p>
                    </div>
                    <ul className="ideal-for-chips">
                      {product.idealForBar.items.map((biz, bizIdx) => (
                        <li key={bizIdx} className="ideal-for-chip">
                          <IconRenderer name="Store" size={14} aria-hidden="true" />
                          <span>{biz}</span>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : null}

                {product.hardwareSupport && product.hardwareSupport.length > 0 ? (
                  <div className="checklist-panel">
                    <h4 className="checklist-title">{ui.hardwareHeading}</h4>
                    <ul className="check-list check-list--columns">
                      {product.hardwareSupport.map((hw, hwIdx) => (
                        <li key={hwIdx} className="check-list-item">
                          <IconRenderer
                            name="Check"
                            size={16}
                            className="check-icon"
                            aria-hidden="true"
                          />
                          <span>{hw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlagshipProductsSection;
