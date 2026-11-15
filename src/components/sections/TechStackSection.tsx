import React from 'react';
import type { TechStackData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface TechStackSectionProps {
  techStack: TechStackData;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => {
  return (
    <section id="tech-stack" data-defer-paint="" className="section-band section-band--surface">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">{techStack.heading}</h2>

          <p className="section-lead">{techStack.subheading}</p>
        </div>

        <div className="tech-grid">
          {techStack.technologies.map((tech, idx) => (
            <div key={idx} className="tech-card mwg-scroll-reveal">
              <span className="icon-tile">
                <IconRenderer name={tech.icon} size={20} aria-hidden="true" />
              </span>
              <div>
                <div className="tech-name">{tech.name}</div>
                <div className="tech-category">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
