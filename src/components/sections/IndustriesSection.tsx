import React from 'react';
import type { IndustriesSectionData, SiteUiLabels } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface IndustriesSectionProps {
  industries: IndustriesSectionData;
  ui: SiteUiLabels['industries'];
  onConsultIndustry?: (industryTitle: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industries,
  ui,
  onConsultIndustry,
}) => {
  return (
    <section id="industries" data-defer-paint="" className="section-band section-band--alt">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {industries.heading}{' '}
            <span className="section-heading-accent">{industries.highlightedWord}</span>
          </h2>

          <p className="section-lead">{industries.subheading}</p>
        </div>

        <div className="mwg-card-grid mwg-card-grid--subgrid">
          {industries.items.map((ind) => (
            <article key={ind.id} className="mwg-card mwg-scroll-reveal">
              <div className="mwg-card-header">
                <div className="industry-card-heading">
                  {ind.productTag ? (
                    <span className="mwg-chip industry-product-chip">{ind.productTag}</span>
                  ) : null}
                  <h3 className="mwg-card-title">{ind.title}</h3>
                </div>
                <span className="icon-tile icon-tile--accent">
                  <IconRenderer name={ind.icon} size={20} aria-hidden="true" />
                </span>
              </div>

              <div className="mwg-card-body">
                <p>{ind.summary}</p>
                <ul className="check-list">
                  {ind.solutions.map((sol, sIdx) => (
                    <li key={sIdx} className="check-list-item">
                      <IconRenderer
                        name="Check"
                        size={16}
                        className="check-icon"
                        aria-hidden="true"
                      />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mwg-card-footer">
                <a
                  href="#contact"
                  onClick={() =>
                    onConsultIndustry?.(ind.inquiryOption ?? `${ui.ctaPrefix} ${ind.title}`)
                  }
                  className="btn btn-secondary"
                >
                  <span>
                    {ui.ctaPrefix} {ind.title}
                  </span>
                  <IconRenderer name="ArrowRight" size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
