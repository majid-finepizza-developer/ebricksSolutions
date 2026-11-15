import React, { useState } from 'react';
import type { ServicesSectionData, ServiceItem, SiteUiLabels } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { DetailDialog } from '../mwg/DetailDialog';
import { openModalFallback } from '../../utils/polyfills';

interface ServicesSectionProps {
  services: ServicesSectionData;
  ui: SiteUiLabels['services'];
  onSelectService?: (serviceTitle: string) => void;
}

const SERVICE_DIALOG_ID = 'service-detail-dialog';

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  ui,
  onSelectService,
}) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const currentService = activeService ?? services.items[0];

  const openServiceModal = (service: ServiceItem) => {
    setActiveService(service);
    openModalFallback(SERVICE_DIALOG_ID);
  };

  return (
    <section id="services" data-defer-paint="" className="section-band">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {services.heading}{' '}
            <span className="section-heading-accent">{services.highlightedWord}</span>
          </h2>

          <p className="section-lead">{services.subheading}</p>
        </div>

        <div className="mwg-card-grid mwg-card-grid--responsive-4 mwg-card-grid--subgrid">
          {services.items.map((service) => {
            const isMarketing = service.categoryId === 'marketing';
            const cardHighlights = service.highlights ?? service.deliverables.slice(0, 3);
            const stackPreview =
              service.techStack && service.techStack.length > 0
                ? `${service.techStack.slice(0, 2).join(' · ')}${
                    service.techStack.length > 2 ? ` +${service.techStack.length - 2}` : ''
                  }`
                : undefined;

            return (
              <article
                key={service.id}
                className={
                  isMarketing
                    ? 'mwg-card highlight-card highlight-card--accent mwg-scroll-reveal'
                    : 'mwg-card highlight-card mwg-scroll-reveal'
                }
              >
                <div className="highlight-card-head">
                  {service.badge ? <span className="meta-chip">{service.badge}</span> : <span />}
                  <span className={isMarketing ? 'icon-tile icon-tile--accent' : 'icon-tile'}>
                    <IconRenderer name={service.icon} size={20} aria-hidden="true" />
                  </span>
                </div>

                <div className="highlight-card-body">
                  <hgroup className="highlight-card-hgroup">
                    <h3 className="highlight-card-title">{service.title}</h3>
                    <p className="highlight-card-tagline">{service.tagline}</p>
                  </hgroup>

                  <ul className="highlight-points" aria-label={ui.highlightsHeading}>
                    {cardHighlights.map((point, idx) => (
                      <li key={idx} className="highlight-point">
                        <IconRenderer
                          name="CheckCircle2"
                          size={15}
                          className="check-icon"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mwg-card-footer highlight-card-footer">
                  {stackPreview ? (
                    <span className="highlight-card-meta">{stackPreview}</span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    command="show-modal"
                    commandfor={SERVICE_DIALOG_ID}
                    onClick={() => openServiceModal(service)}
                    className="highlight-card-trigger"
                  >
                    <span>{ui.viewDetailsLabel}</span>
                    <span className="visually-hidden">: {service.title}</span>
                    <IconRenderer
                      name="ArrowRight"
                      size={15}
                      className="highlight-card-arrow"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {currentService ? (
        <DetailDialog
          dialogId={SERVICE_DIALOG_ID}
          badge={currentService.badge}
          icon={currentService.icon}
          accentIcon={currentService.categoryId === 'marketing'}
          title={currentService.title}
          subtitle={currentService.tagline}
          closeLabel={ui.closeDialogLabel}
          closeButtonLabel={ui.closeButtonLabel}
          primaryAction={{
            label: currentService.cta.label,
            href: currentService.cta.href,
            onClick: () =>
              onSelectService?.(currentService.inquiryOption ?? currentService.title),
          }}
        >
          <p className="mwg-dialog-summary">{currentService.summary}</p>

          <div className="mwg-dialog-detail-section">
            <p className="checklist-title">{ui.deliverablesHeading}</p>
            <ul className="check-list">
              {currentService.deliverables.map((item, idx) => (
                <li key={idx} className="check-list-item">
                  <IconRenderer
                    name="CheckCircle2"
                    size={16}
                    className="check-icon"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentService.techStack && currentService.techStack.length > 0 ? (
            <div className="mwg-dialog-detail-section">
              <p className="checklist-title">{ui.stackHeading}</p>
              <div className="chip-row">
                {currentService.techStack.map((tech, idx) => (
                  <span key={idx} className="meta-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </DetailDialog>
      ) : null}
    </section>
  );
};

export default ServicesSection;
