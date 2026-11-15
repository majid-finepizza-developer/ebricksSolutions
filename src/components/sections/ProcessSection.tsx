import React, { useState } from 'react';
import type {
  Differentiator,
  ProcessSectionData,
  ProcessStep,
  SiteUiLabels,
} from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { DetailDialog } from '../mwg/DetailDialog';
import { openModalFallback } from '../../utils/polyfills';

interface ProcessSectionProps {
  process: ProcessSectionData;
  ui: SiteUiLabels['process'];
}

const PROCESS_DIALOG_ID = 'process-step-detail-dialog';
const WHY_US_DIALOG_ID = 'why-us-detail-dialog';

export const ProcessSection: React.FC<ProcessSectionProps> = ({ process, ui }) => {
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null);
  const [activeDiff, setActiveDiff] = useState<Differentiator | null>(null);
  const currentStep = activeStep ?? process.steps[0];
  const currentDiff = activeDiff ?? process.differentiators[0];

  const openStepModal = (step: ProcessStep) => {
    setActiveStep(step);
    openModalFallback(PROCESS_DIALOG_ID);
  };

  const openDiffModal = (diff: Differentiator) => {
    setActiveDiff(diff);
    openModalFallback(WHY_US_DIALOG_ID);
  };

  return (
    <section id="process" data-defer-paint="" className="section-band section-band--surface">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {process.heading}{' '}
            <span className="section-heading-accent">{process.highlightedWord}</span>
          </h2>

          <p className="section-lead">{process.subheading}</p>
        </div>

        <ol className="mwg-card-grid mwg-card-grid--responsive-4 mwg-card-grid--subgrid">
          {process.steps.map((step) => {
            const stepHighlights = step.highlights ?? step.activities.slice(0, 3);

            return (
              <li key={step.number} className="mwg-card highlight-card mwg-scroll-reveal">
                <div className="highlight-card-head">
                  <span className="step-number-pill">{step.number}</span>
                  <span className="icon-tile">
                    <IconRenderer name={step.icon} size={20} aria-hidden="true" />
                  </span>
                </div>

                <div className="highlight-card-body">
                  <hgroup className="highlight-card-hgroup">
                    <h3 className="highlight-card-title">{step.title}</h3>
                  </hgroup>

                  <ul className="highlight-points" aria-label={ui.activitiesHeading}>
                    {stepHighlights.map((point, idx) => (
                      <li key={idx} className="highlight-point">
                        <IconRenderer
                          name="Check"
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
                  <span className="meta-chip">{step.timeline}</span>

                  <button
                    type="button"
                    command="show-modal"
                    commandfor={PROCESS_DIALOG_ID}
                    onClick={() => openStepModal(step)}
                    className="highlight-card-trigger"
                  >
                    <span>{ui.viewDetailsLabel}</span>
                    <span className="visually-hidden">
                      : {ui.stepPrefix} {step.number} - {step.title}
                    </span>
                    <IconRenderer
                      name="ArrowRight"
                      size={15}
                      className="highlight-card-arrow"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        <div id="why-us" tabIndex={-1} className="why-panel">
          <div className="section-header">
            <h3 className="section-heading">{process.differentiatorsHeading}</h3>
          </div>

          <div className="mwg-card-grid mwg-card-grid--responsive-4 mwg-card-grid--subgrid">
            {process.differentiators.map((diff, idx) => {
              const diffHighlights = diff.highlights ?? [];

              return (
                <article
                  key={diff.id ?? idx}
                  className="mwg-card highlight-card highlight-card--accent mwg-scroll-reveal"
                >
                  <div className="highlight-card-head">
                    {diff.badge ? (
                      <span className="meta-chip highlight-card-chip">{diff.badge}</span>
                    ) : (
                      <span />
                    )}
                    <span className="icon-tile icon-tile--accent">
                      <IconRenderer name={diff.icon} size={20} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="highlight-card-body">
                    <hgroup className="highlight-card-hgroup">
                      <h4 className="highlight-card-title">{diff.title}</h4>
                      {diff.tagline ? (
                        <p className="highlight-card-tagline">{diff.tagline}</p>
                      ) : null}
                    </hgroup>

                    {diffHighlights.length > 0 ? (
                      <ul className="highlight-points">
                        {diffHighlights.map((point, pIdx) => (
                          <li key={pIdx} className="highlight-point">
                            <IconRenderer
                              name="Check"
                              size={15}
                              className="check-icon"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{diff.description}</p>
                    )}
                  </div>

                  <div className="mwg-card-footer highlight-card-footer">
                    <button
                      type="button"
                      command="show-modal"
                      commandfor={WHY_US_DIALOG_ID}
                      onClick={() => openDiffModal(diff)}
                      className="highlight-card-trigger"
                    >
                      <span>{ui.whyViewDetailsLabel}</span>
                      <span className="visually-hidden">: {diff.title}</span>
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
      </div>

      {currentStep ? (
        <DetailDialog
          dialogId={PROCESS_DIALOG_ID}
          badge={`${ui.stepPrefix} ${currentStep.number} · ${currentStep.timeline}`}
          icon={currentStep.icon}
          title={currentStep.title}
          closeLabel={ui.closeDialogLabel}
          closeButtonLabel={ui.closeButtonLabel}
          primaryAction={{
            label: ui.ctaLabel,
            href: ui.ctaHref,
          }}
        >
          <p className="mwg-dialog-summary">{currentStep.summary}</p>

          <div className="mwg-dialog-detail-section">
            <p className="checklist-title">{ui.activitiesHeading}</p>
            <ul className="check-list">
              {currentStep.activities.map((activity, idx) => (
                <li key={idx} className="check-list-item">
                  <IconRenderer
                    name="CheckCircle2"
                    size={16}
                    className="check-icon"
                    aria-hidden="true"
                  />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </DetailDialog>
      ) : null}

      {currentDiff ? (
        <DetailDialog
          dialogId={WHY_US_DIALOG_ID}
          badge={currentDiff.badge}
          icon={currentDiff.icon}
          accentIcon
          title={currentDiff.title}
          subtitle={currentDiff.tagline}
          closeLabel={ui.closeWhyDialogLabel}
          closeButtonLabel={ui.closeButtonLabel}
          primaryAction={{
            label: ui.ctaLabel,
            href: ui.ctaHref,
          }}
        >
          <p className="mwg-dialog-summary">{currentDiff.description}</p>

          {currentDiff.details && currentDiff.details.length > 0 ? (
            <div className="mwg-dialog-detail-section">
              <p className="checklist-title">{ui.whyDetailsHeading}</p>
              <ul className="check-list">
                {currentDiff.details.map((detail, idx) => (
                  <li key={idx} className="check-list-item">
                    <IconRenderer
                      name="CheckCircle2"
                      size={16}
                      className="check-icon"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
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

export default ProcessSection;
