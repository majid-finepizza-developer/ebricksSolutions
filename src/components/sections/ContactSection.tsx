import React, { useEffect, useId, useRef, useState } from 'react';
import type {
  CompanyContact,
  ContactSectionData,
  ServiceItem,
  SiteUiLabels,
} from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { attachAccessibleFormValidation } from '../../utils/formAccessibility';

interface ContactSectionProps {
  contact: CompanyContact;
  formConfig: ContactSectionData;
  services: ServiceItem[];
  ui: SiteUiLabels['contact'];
  preselectedService?: { name: string; nonce: number };
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  formConfig,
  services,
  ui,
  preselectedService,
}) => {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [prevPreselection, setPrevPreselection] = useState(preselectedService);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(preselectedService?.name || '');
  const [budgetRange, setBudgetRange] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync externally triggered service/product selection into the inquiry form during render.
  if (preselectedService && preselectedService !== prevPreselection) {
    setPrevPreselection(preselectedService);
    setSelectedService(preselectedService.name);
    setSubmitted(false);
  }

  // Attach MWG :user-invalid ARIA synchronization & WeakMap legacy fallbacks.
  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl || submitted) return;
    return attachAccessibleFormValidation(formEl);
  }, [submitted]);

  // Move focus to the live confirmation region when submission completes.
  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSelectedService(preselectedService?.name || '');
    setBudgetRange('');
    setProjectDetails('');
    setSubmitted(false);
  };

  const buildWhatsAppInquiryHref = () => {
    const summaryParts = [
      ui.whatsAppMessageTitle,
      fullName ? `${formConfig.fields.fullName.label}: ${fullName}` : '',
      phone ? `${formConfig.fields.phone.label}: ${phone}` : '',
      email ? `${formConfig.fields.email.label}: ${email}` : '',
      selectedService ? `${formConfig.fields.serviceSelect.label}: ${selectedService}` : '',
      budgetRange && formConfig.fields.budgetRange
        ? `${formConfig.fields.budgetRange.label}: ${budgetRange}`
        : '',
      projectDetails ? `${formConfig.fields.projectDetails.label}: ${projectDetails}` : '',
    ].filter(Boolean);

    try {
      const url = new URL(contact.whatsapp.href);
      url.searchParams.set('text', summaryParts.join('\n'));
      return url.toString();
    } catch {
      return contact.whatsapp.href;
    }
  };

  const idName = `${uid}-name`;
  const idEmail = `${uid}-email`;
  const idPhone = `${uid}-phone`;
  const idService = `${uid}-service`;
  const idBudget = `${uid}-budget`;
  const idDetails = `${uid}-details`;

  const errName = `${uid}-err-name`;
  const errEmail = `${uid}-err-email`;
  const errPhone = `${uid}-err-phone`;
  const errService = `${uid}-err-service`;
  const errDetails = `${uid}-err-details`;

  const configuredOptions = formConfig.fields.serviceSelect.options;
  const baseOptions =
    configuredOptions && configuredOptions.length > 0
      ? configuredOptions
      : [...services.map((s) => s.title), ui.multiServiceOption];

  const serviceOptions = Array.from(
    new Set([
      ...baseOptions,
      ...(preselectedService?.name ? [preselectedService.name] : []),
    ]),
  );

  return (
    <section id="contact" data-defer-paint="" className="section-band section-band--surface">
      <div className="mwg-container">
        <div className="section-header">
          <h2 className="section-heading">
            {formConfig.heading}{' '}
            <span className="section-heading-accent">{formConfig.highlightedWord}</span>
          </h2>

          <p className="section-lead">{formConfig.subheading}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-card">
            <div>
              <h3 className="product-heading">{formConfig.formTitle}</h3>
              <p className="product-summary">{formConfig.formSubtitle}</p>
            </div>

            {submitted ? (
              <div ref={successRef} tabIndex={-1} role="status" className="contact-success-card">
                <span className="icon-tile">
                  <IconRenderer name="CheckCircle2" size={24} aria-hidden="true" />
                </span>
                <h4 className="mwg-card-title">{formConfig.successMessage.title}</h4>
                <p className="product-summary">{formConfig.successMessage.message}</p>

                <div className="hero-cta-row" style={{ justifyContent: 'center' }}>
                  <a
                    href={buildWhatsAppInquiryHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <IconRenderer name={contact.whatsapp.icon} size={17} aria-hidden="true" />
                    <span>{ui.whatsAppFollowupLabel}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary"
                  >
                    {ui.resetFormLabel}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mwg-required-note">{ui.requiredLegend}</p>

                <form ref={formRef} onSubmit={handleSubmit} className="mwg-form">
                  <div className="mwg-field">
                    <label htmlFor={idName} className="mwg-label">
                      <span>{formConfig.fields.fullName.label}</span>
                      {formConfig.fields.fullName.required ? (
                        <span className="mwg-req-star" aria-hidden="true">
                          *
                        </span>
                      ) : null}
                    </label>
                    <input
                      id={idName}
                      name={formConfig.fields.fullName.name}
                      type="text"
                      autoComplete="name"
                      required={formConfig.fields.fullName.required}
                      minLength={2}
                      placeholder={formConfig.fields.fullName.placeholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      data-error={errName}
                      className="mwg-control"
                    />
                    <div id={errName} className="mwg-error-msg">
                      <IconRenderer name="AlertCircle" size={15} aria-hidden="true" />
                      <span>{ui.errors.fullName}</span>
                    </div>
                  </div>

                  <div className="mwg-field">
                    <label htmlFor={idEmail} className="mwg-label">
                      <span>{formConfig.fields.email.label}</span>
                      {formConfig.fields.email.required ? (
                        <span className="mwg-req-star" aria-hidden="true">
                          *
                        </span>
                      ) : null}
                    </label>
                    <input
                      id={idEmail}
                      name={formConfig.fields.email.name}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required={formConfig.fields.email.required}
                      placeholder={formConfig.fields.email.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-error={errEmail}
                      className="mwg-control"
                    />
                    <div id={errEmail} className="mwg-error-msg">
                      <IconRenderer name="AlertCircle" size={15} aria-hidden="true" />
                      <span>{ui.errors.email}</span>
                    </div>
                  </div>

                  <div className="mwg-field">
                    <label htmlFor={idPhone} className="mwg-label">
                      <span>{formConfig.fields.phone.label}</span>
                      {formConfig.fields.phone.required ? (
                        <span className="mwg-req-star" aria-hidden="true">
                          *
                        </span>
                      ) : null}
                    </label>
                    <input
                      id={idPhone}
                      name={formConfig.fields.phone.name}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required={formConfig.fields.phone.required}
                      pattern="(?:\D*\d){7,}.*"
                      placeholder={formConfig.fields.phone.placeholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      data-error={errPhone}
                      className="mwg-control"
                    />
                    <div id={errPhone} className="mwg-error-msg">
                      <IconRenderer name="AlertCircle" size={15} aria-hidden="true" />
                      <span>{ui.errors.phone}</span>
                    </div>
                  </div>

                  <div className="mwg-field">
                    <label htmlFor={idService} className="mwg-label">
                      <span>{formConfig.fields.serviceSelect.label}</span>
                      {formConfig.fields.serviceSelect.required ? (
                        <span className="mwg-req-star" aria-hidden="true">
                          *
                        </span>
                      ) : null}
                    </label>
                    <select
                      id={idService}
                      name="service"
                      required={formConfig.fields.serviceSelect.required}
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      data-error={errService}
                      className="mwg-control"
                    >
                      <option value="">{formConfig.fields.serviceSelect.placeholder}</option>
                      {serviceOptions.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                    <div id={errService} className="mwg-error-msg">
                      <IconRenderer name="AlertCircle" size={15} aria-hidden="true" />
                      <span>{ui.errors.serviceSelect}</span>
                    </div>
                  </div>

                  {formConfig.fields.budgetRange ? (
                    <div className="mwg-field">
                      <label htmlFor={idBudget} className="mwg-label">
                        <span>{formConfig.fields.budgetRange.label}</span>
                      </label>
                      <select
                        id={idBudget}
                        name="budgetRange"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="mwg-control"
                      >
                        <option value="">{formConfig.fields.budgetRange.placeholder}</option>
                        {formConfig.fields.budgetRange.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  <div className="mwg-field">
                    <label htmlFor={idDetails} className="mwg-label">
                      <span>{formConfig.fields.projectDetails.label}</span>
                      {formConfig.fields.projectDetails.required ? (
                        <span className="mwg-req-star" aria-hidden="true">
                          *
                        </span>
                      ) : null}
                    </label>
                    <textarea
                      id={idDetails}
                      name={formConfig.fields.projectDetails.name}
                      required={formConfig.fields.projectDetails.required}
                      minLength={10}
                      placeholder={formConfig.fields.projectDetails.placeholder}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      data-error={errDetails}
                      className="mwg-control"
                    />
                    <div id={errDetails} className="mwg-error-msg">
                      <IconRenderer name="AlertCircle" size={15} aria-hidden="true" />
                      <span>{ui.errors.projectDetails}</span>
                    </div>
                  </div>

                  <div className="hero-cta-row">
                    <button type="submit" className="btn btn-primary">
                      <IconRenderer name="Send" size={17} aria-hidden="true" />
                      <span>{formConfig.submitButtonText}</span>
                    </button>

                    <a
                      href={buildWhatsAppInquiryHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <IconRenderer name={contact.whatsapp.icon} size={17} aria-hidden="true" />
                      <span>{ui.whatsAppFollowupLabel}</span>
                    </a>
                  </div>
                </form>
              </>
            )}
          </div>

          <aside aria-label={formConfig.directContactTitle}>
            <div style={{ marginBlockEnd: '1.25rem' }}>
              <h3 className="product-heading">{formConfig.directContactTitle}</h3>
              <p className="product-summary">{formConfig.directContactSubtitle}</p>
            </div>

            <div className="channel-stack">
              <a
                href={contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
              >
                <span className="icon-tile">
                  <IconRenderer name={contact.whatsapp.icon} size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="channel-kicker">{ui.channels.whatsappTitle}</div>
                  <div className="channel-value">{contact.whatsapp.display}</div>
                  <p className="channel-sub">{ui.channels.whatsappSubtitle}</p>
                </div>
              </a>

              <a href={contact.phone.href} className="channel-card">
                <span className="icon-tile icon-tile--accent">
                  <IconRenderer name={contact.phone.icon} size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="channel-kicker">{contact.phone.label}</div>
                  <div className="channel-value">{contact.phone.display}</div>
                  <p className="channel-sub">{ui.channels.phoneSubtitle}</p>
                </div>
              </a>

              <a href={contact.email.href} className="channel-card">
                <span className="icon-tile">
                  <IconRenderer name={contact.email.icon} size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="channel-kicker">{ui.channels.emailTitle}</div>
                  <div className="channel-value">{contact.email.display}</div>
                  <p className="channel-sub">{ui.channels.emailSubtitle}</p>
                </div>
              </a>

              <a
                href={contact.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
              >
                <span className="icon-tile icon-tile--accent">
                  <IconRenderer name={contact.address.icon} size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="channel-kicker">{ui.channels.addressTitle}</div>
                  <div className="channel-value">{contact.address.formatted}</div>
                  <p className="channel-sub">
                    {ui.channels.hoursLabel}: {contact.officeHours.days}, {contact.officeHours.hours} ·{' '}
                    {ui.channels.mapsLinkLabel}
                  </p>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
