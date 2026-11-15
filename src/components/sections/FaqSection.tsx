import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FaqSectionData, SiteUiLabels } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface FaqSectionProps {
  faqs: FaqSectionData;
  ui: SiteUiLabels['faqs'];
}

const FAQ_LIST_ID = 'faq-accordion-list';

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, ui }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const handledByCommandRef = useRef(false);

  const [openStates, setOpenStates] = useState<boolean[]>(() =>
    faqs.items.map((_, idx) => idx === 0),
  );

  const allExpanded = openStates.length > 0 && openStates.every(Boolean);

  const toggleAllDetails = useCallback(() => {
    setOpenStates((prev) => {
      const nextOpen = !prev.every(Boolean);
      return prev.map(() => nextOpen);
    });
  }, []);

  // Custom Invoker Command (`--toggle-all`) listener on accordion container.
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const handleCommand = (event: Event) => {
      const cmd = (event as Event & { command?: string }).command;
      if (cmd !== '--toggle-all') return;
      handledByCommandRef.current = true;
      toggleAllDetails();
    };

    listEl.addEventListener('command', handleCommand);
    return () => listEl.removeEventListener('command', handleCommand);
  }, [toggleAllDetails]);

  const handleToggleAllClick = () => {
    // Fallback strictly when native `commandfor` / async invokers-polyfill didn't handle the command.
    queueMicrotask(() => {
      if (!handledByCommandRef.current) {
        toggleAllDetails();
      }
      handledByCommandRef.current = false;
    });
  };

  return (
    <section id="faqs" data-defer-paint="" className="section-band">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {faqs.heading}{' '}
            <span className="section-heading-accent">{faqs.highlightedWord}</span>
          </h2>

          <p className="section-lead">{faqs.subheading}</p>
        </div>

        <div className="faq-toolbar">
          <button
            type="button"
            command="--toggle-all"
            commandfor={FAQ_LIST_ID}
            aria-expanded={allExpanded}
            onClick={handleToggleAllClick}
            className="btn btn-secondary"
          >
            <IconRenderer
              name={allExpanded ? 'ChevronUp' : 'ChevronDown'}
              size={16}
              aria-hidden="true"
            />
            <span>{allExpanded ? ui.collapseAllLabel : ui.expandAllLabel}</span>
          </button>
        </div>

        <div ref={listRef} id={FAQ_LIST_ID} className="mwg-accordion">
          {faqs.items.map((faq, idx) => (
            <details
              key={idx}
              open={openStates[idx] ?? false}
              onToggle={(e) => {
                const isOpenNow = e.currentTarget.open;
                setOpenStates((prev) =>
                  prev.map((val, itemIdx) => (itemIdx === idx ? isOpenNow : val)),
                );
              }}
              className="mwg-details"
            >
              {/* No <h*> inside <summary>: preserves native button semantics cleanly */}
              <summary className="mwg-summary">
                <span>{faq.question}</span>
                {faq.category ? (
                  <span className="mwg-summary-cat">{faq.category}</span>
                ) : null}
              </summary>

              <div className="mwg-details-panel">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="faq-support-banner">
          <p className="section-lead">{ui.supportPrompt}</p>
          <a
            href={ui.supportWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <IconRenderer name="MessageSquare" size={17} aria-hidden="true" />
            <span>{ui.supportCtaLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
