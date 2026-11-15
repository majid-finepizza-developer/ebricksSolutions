import React, { useState } from 'react';
import type { SiteUiLabels, TestimonialItem, TestimonialsSectionData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { DetailDialog } from '../mwg/DetailDialog';
import { openModalFallback } from '../../utils/polyfills';

interface TestimonialsSectionProps {
  testimonials: TestimonialsSectionData;
  ui: SiteUiLabels['testimonials'];
}

const TESTIMONIAL_DIALOG_ID = 'testimonial-detail-dialog';

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  ui,
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState<TestimonialItem | null>(null);
  const currentTestimonial = activeTestimonial ?? testimonials.items[0];

  const openTestimonialModal = (item: TestimonialItem) => {
    setActiveTestimonial(item);
    openModalFallback(TESTIMONIAL_DIALOG_ID);
  };

  return (
    <section id="testimonials" data-defer-paint="" className="section-band section-band--alt">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {testimonials.heading}{' '}
            <span className="section-heading-accent">{testimonials.highlightedWord}</span>
          </h2>

          <p className="section-lead">{testimonials.subheading}</p>
        </div>

        <div className="mwg-card-grid mwg-card-grid--responsive-4 mwg-card-grid--subgrid">
          {testimonials.items.map((item, idx) => (
            <article
              key={item.id ?? idx}
              className="mwg-card highlight-card mwg-scroll-reveal"
            >
              <div className="highlight-card-head">
                <div
                  className="star-row"
                  role="img"
                  aria-label={ui.ratingLabelTemplate.replace('{rating}', String(item.rating))}
                >
                  {Array.from({ length: item.rating }).map((_, rIdx) => (
                    <span key={rIdx} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <span className="meta-chip highlight-card-chip">
                  {item.badge ?? item.service}
                </span>
              </div>

              <div className="highlight-card-body">
                <hgroup className="highlight-card-hgroup">
                  <h3 className="highlight-card-title">{item.headline ?? item.company}</h3>
                </hgroup>

                <p className="testimonial-excerpt">"{item.quote}"</p>

                <div className="testimonial-card-author">
                  <span className="author-name">{item.author}</span>
                  <span className="author-meta">
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>

              <div className="mwg-card-footer highlight-card-footer">
                <span className="highlight-card-meta">{item.location}</span>

                <button
                  type="button"
                  command="show-modal"
                  commandfor={TESTIMONIAL_DIALOG_ID}
                  onClick={() => openTestimonialModal(item)}
                  className="highlight-card-trigger"
                >
                  <span>{ui.viewDetailsLabel}</span>
                  <span className="visually-hidden">
                    : {item.author}, {item.company}
                  </span>
                  <IconRenderer
                    name="ArrowRight"
                    size={15}
                    className="highlight-card-arrow"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {currentTestimonial ? (
        <DetailDialog
          dialogId={TESTIMONIAL_DIALOG_ID}
          badge={currentTestimonial.service}
          icon="Award"
          title={currentTestimonial.author}
          subtitle={`${currentTestimonial.role}, ${currentTestimonial.company} · ${currentTestimonial.location}`}
          closeLabel={ui.closeDialogLabel}
          closeButtonLabel={ui.closeButtonLabel}
          primaryAction={{
            label: ui.ctaLabel,
            href: ui.ctaHref,
          }}
        >
          <div
            className="star-row"
            role="img"
            aria-label={ui.ratingLabelTemplate.replace(
              '{rating}',
              String(currentTestimonial.rating),
            )}
          >
            {Array.from({ length: currentTestimonial.rating }).map((_, rIdx) => (
              <span key={rIdx} aria-hidden="true">
                ★
              </span>
            ))}
          </div>

          <blockquote className="testimonial-modal-quote">
            <p>"{currentTestimonial.quote}"</p>
          </blockquote>

          {currentTestimonial.highlights && currentTestimonial.highlights.length > 0 ? (
            <div className="mwg-dialog-detail-section">
              <p className="checklist-title">{ui.highlightsHeading}</p>
              <ul className="check-list">
                {currentTestimonial.highlights.map((highlight, idx) => (
                  <li key={idx} className="check-list-item">
                    <IconRenderer
                      name="CheckCircle2"
                      size={16}
                      className="check-icon"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </DetailDialog>
      ) : null}
    </section>
  );
};

export default TestimonialsSection;
