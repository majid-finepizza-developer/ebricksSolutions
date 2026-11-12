import React, { useState } from 'react';
import type { CompanyContact, ContactSectionData, ServiceItem } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface ContactSectionProps {
  contactData: CompanyContact;
  sectionData: ContactSectionData;
  services: ServiceItem[];
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactData,
  sectionData,
  services,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: preselectedService || '',
    budget: '',
    projectDetails: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevPreselected, setPrevPreselected] = useState(preselectedService);

  // Sync preselected service from Service Card click during render
  if (preselectedService !== prevPreselected) {
    setPrevPreselected(preselectedService);
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleSendViaWhatsApp = () => {
    const rawNumber = contactData.whatsapp.value.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('0') ? `92${rawNumber.substring(1)}` : rawNumber;
    const message = encodeURIComponent(
      `Hello EBRICKS SOLUTIONS! Project Inquiry:\n- Name: ${formData.fullName || 'Not specified'}\n- Email: ${formData.email || 'Not specified'}\n- Phone: ${formData.phone || 'Not specified'}\n- Service: ${formData.service || 'General Inquiry'}\n- Budget Range: ${formData.budget || 'To be discussed'}\n- Details: ${formData.projectDetails || 'Interested in consulting'}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-100 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold tracking-wide">
            <IconRenderer name="Mail" className="w-4 h-4 text-primary-600" />
            <span>{sectionData.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {sectionData.heading}{' '}
            <span className="text-primary-600">{sectionData.highlightedWord}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {sectionData.subheading}
          </p>
        </div>

        {/* Content Grid: Form on Left, Direct Contact Cards & Map on Right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Interactive Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-xl relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{sectionData.formTitle}</h3>
              <p className="mt-1 text-sm text-slate-500">{sectionData.formSubtitle}</p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <IconRenderer name="CheckCircle2" className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">
                  {sectionData.successMessage.title}
                </h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  {sectionData.successMessage.message}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow transition-colors"
                  >
                    <IconRenderer name="MessageSquare" className="w-4 h-4" />
                    <span>Send via WhatsApp as well</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        service: '',
                        budget: '',
                        projectDetails: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {sectionData.fields.fullName.label}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required={sectionData.fields.fullName.required}
                      placeholder={sectionData.fields.fullName.placeholder}
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {sectionData.fields.email.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required={sectionData.fields.email.required}
                      placeholder={sectionData.fields.email.placeholder}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {sectionData.fields.phone.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required={sectionData.fields.phone.required}
                      placeholder={sectionData.fields.phone.placeholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>

                  {/* Dynamic Service Dropdown */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {sectionData.fields.serviceSelect.label}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required={sectionData.fields.serviceSelect.required}
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 outline-none transition-all bg-white"
                    >
                      <option value="">{sectionData.fields.serviceSelect.placeholder}</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Multiple Services / Custom Consultation">
                        Multiple Services / Custom Consultation
                      </option>
                    </select>
                  </div>
                </div>

                {/* Budget Range Selector */}
                {sectionData.fields.budgetRange && (
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {sectionData.fields.budgetRange.label}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 outline-none transition-all bg-white"
                    >
                      <option value="">{sectionData.fields.budgetRange.placeholder}</option>
                      {sectionData.fields.budgetRange.options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    {sectionData.fields.projectDetails.label}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={4}
                    required={sectionData.fields.projectDetails.required}
                    placeholder={sectionData.fields.projectDetails.placeholder}
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-y"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 active:scale-[0.99] shadow-lg shadow-primary-600/30 transition-all duration-200 disabled:opacity-70"
                >
                  <IconRenderer name="Send" className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Submitting Details...' : sectionData.submitButtonText}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Cards & Lahore Location */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {sectionData.directContactTitle}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {sectionData.directContactSubtitle}
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={contactData.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconRenderer name={contactData.whatsapp.icon} className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Instant WhatsApp
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {contactData.whatsapp.display}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Chat directly with our Lahore technical directors
                  </div>
                </div>
              </a>

              {/* Phone Call Card */}
              <a
                href={contactData.phone.href}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconRenderer name={contactData.phone.icon} className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    {contactData.phone.label}
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {contactData.phone.display}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Direct phone line for voice consultations
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={contactData.email.href}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconRenderer name={contactData.email.icon} className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent-600">
                    Official Inquiries
                  </div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {contactData.email.display}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Detailed briefs, RFPs & enterprise contracts
                  </div>
                </div>
              </a>

              {/* Address & Office Hours Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <IconRenderer name={contactData.address.icon} className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Lahore Headquarters
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">
                      {contactData.address.formatted}
                    </div>
                    <a
                      href={contactData.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary-600 hover:underline font-medium mt-1"
                    >
                      <span>View on Google Maps</span>
                      <IconRenderer name="ExternalLink" className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-600">
                  <IconRenderer name={contactData.officeHours.icon} className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong>Hours:</strong> {contactData.officeHours.days} ({contactData.officeHours.hours})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
