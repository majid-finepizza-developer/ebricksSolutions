import React, { useState } from 'react';
import type { FlagshipProductsData, FlagshipProduct } from '../../types/content';
import { IconRenderer } from '../IconRenderer';
import { cn } from '../../utils/cn';

interface FlagshipProductsSectionProps {
  data: FlagshipProductsData;
  onSelectProduct?: (productName: string) => void;
}

export const FlagshipProductsSection: React.FC<FlagshipProductsSectionProps> = ({
  data,
  onSelectProduct,
}) => {
  const [activeFastPosTab, setActiveFastPosTab] = useState(0);

  const fastPosProduct = data.products.find((p) => p.id === 'fast-pos') || data.products[0];
  const cloudProduct = data.products.find((p) => p.id === 'cloud-franchise') || data.products[1];

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>, product: FlagshipProduct) => {
    e.preventDefault();
    if (onSelectProduct) {
      onSelectProduct(product.name);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-50/70 text-slate-900 scroll-mt-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean Swiss Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
            <IconRenderer name="Award" className="w-4 h-4 text-primary-600" />
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            {data.heading}{' '}
            <span className="text-primary-600">
              {data.highlightedWord}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {data.subheading}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* HERO PRODUCT 1: FAST POS SYSTEM */}
        {/* ========================================================================= */}
        {fastPosProduct && (
          <div id="fast-pos" className="scroll-mt-24 space-y-10 pb-20 border-b border-slate-200">
            {/* Header / Intro */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                  {fastPosProduct.badge} • Counter & Restaurant Operations
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-heading">
                  {fastPosProduct.name}
                </h3>
                <p className="text-sm sm:text-base text-accent-600 font-semibold tracking-wide">
                  {fastPosProduct.tagline}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {fastPosProduct.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="#contact"
                  onClick={(e) => handleDemoClick(e, fastPosProduct)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                >
                  <span>{fastPosProduct.cta.label}</span>
                  <IconRenderer name="ArrowRight" className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/923154112925?text=Hello%20EBRICKS%20SOLUTIONS%2C%20I%20would%20like%20to%20see%20a%20Fast%20POS%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-xs transition-all"
                >
                  <IconRenderer name="MessageSquare" className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp POS Demo</span>
                </a>
              </div>
            </div>

            {/* Interactive Screenshot Showcase with Tabs */}
            <div className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                  System Screens:
                </span>
                <div className="flex flex-wrap gap-2">
                  {fastPosProduct.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveFastPosTab(idx)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all',
                        activeFastPosTab === idx
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200',
                      )}
                    >
                      <span>{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Screen View */}
              {fastPosProduct.screenshots[activeFastPosTab] && (
                <div className="mt-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                    <img
                      src={fastPosProduct.screenshots[activeFastPosTab].image}
                      alt={fastPosProduct.screenshots[activeFastPosTab].title}
                      className="w-full h-auto object-cover max-h-[650px]"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-slate-900 border border-slate-200 shadow-sm">
                      {fastPosProduct.screenshots[activeFastPosTab].badge}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 font-semibold">Screen Overview:</strong>{' '}
                    {fastPosProduct.screenshots[activeFastPosTab].caption}
                  </p>
                </div>
              )}
            </div>

            {/* 7-Question Financial Intelligence Section */}
            {fastPosProduct.reportQuestions && (
              <div className="space-y-6 pt-4">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                    Comprehensive Financial Suite
                  </span>
                  <h4 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    The 7 Core Business Questions Fast POS Answers in Seconds
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Built directly from our Financial & Inventory Report Center (shown in screenshot 2 above).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {fastPosProduct.reportQuestions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-primary-300 hover:shadow-md transition-all space-y-2.5 shadow-xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <IconRenderer name={q.icon} className="w-5 h-5" />
                      </div>
                      <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {q.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fast POS Core Highlights & Hardware Support */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
              <div className="lg:col-span-7 space-y-3.5">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                  Front-Counter Operational Advantages:
                </h4>
                <div className="space-y-2.5">
                  {fastPosProduct.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-xs"
                    >
                      <IconRenderer
                        name="CheckCircle2"
                        className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Compatibility */}
              {fastPosProduct.hardwareSupport && (
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <IconRenderer name="Cpu" className="w-5 h-5 text-accent-600" />
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      Tested Hardware Compatibility:
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    Fast POS works seamlessly with standard retail hardware packages:
                  </p>
                  <ul className="space-y-2">
                    {fastPosProduct.hardwareSupport.map((hw, hwIdx) => (
                      <li key={hwIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <IconRenderer name="Check" className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{hw}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 text-[11px] text-slate-500 italic border-t border-slate-100">
                    Need full counter hardware in Lahore? We provide complete bundles with on-site installation.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* HERO PRODUCT 2: CLOUD MULTI-BRANCH & FRANCHISE PORTAL */}
        {/* ========================================================================= */}
        {cloudProduct && (
          <div id="cloud-franchise" className="scroll-mt-24 pt-16 space-y-10">
            {/* Header / Intro */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1 rounded-md">
                  {cloudProduct.badge} • Head Office & Centralized Chain Governance
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-heading">
                  {cloudProduct.name}
                </h3>
                <p className="text-sm sm:text-base text-primary-600 font-semibold tracking-wide">
                  {cloudProduct.tagline}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {cloudProduct.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="#contact"
                  onClick={(e) => handleDemoClick(e, cloudProduct)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                >
                  <span>{cloudProduct.cta.label}</span>
                  <IconRenderer name="ArrowRight" className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/923154112925?text=Hello%20EBRICKS%20SOLUTIONS%2C%20I%20am%20interested%20in%20the%20Cloud%20Multi-Branch%20Portal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-xs transition-all"
                >
                  <IconRenderer name="MessageSquare" className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Portal Demo</span>
                </a>
              </div>
            </div>

            {/* Screenshot Display Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src={cloudProduct.primaryImage}
                  alt={cloudProduct.name}
                  className="w-full h-auto object-cover max-h-[600px]"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-slate-900 border border-slate-200 shadow-sm">
                  Live System Screenshot: User Types & Franchise Branch Permissions
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Administrative Architecture:</strong> As seen in the management screen above, the Cloud Portal provides full granular control over <strong>System Administrators</strong>, <strong>Branch Heads</strong>, <strong>Restaurant Managers</strong>, <strong>Call Center Agents</strong>, <strong>Delivery Riders</strong>, and <strong>Customers</strong>.
              </div>
            </div>

            {/* 4 Multi-Branch Core Capability Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {cloudProduct.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-primary-300 hover:shadow-md transition-all space-y-3 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center">
                    <IconRenderer name={feat.icon} className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Cloud Highlights Checklist */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Enterprise Multi-Branch Highlights:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cloudProduct.highlights.map((hl, hlIdx) => (
                  <div
                    key={hlIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <IconRenderer
                      name="CheckCircle2"
                      className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                    />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMBINED POS + CLOUD SYNERGY BANNER (Deliberate High-Contrast Anchor) */}
        {/* ========================================================================= */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/80 px-3 py-1 rounded-md">
              Complete Ecosystem
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Fast POS on Counters + Cloud Portal at Head Office = Zero Operational Blindspots
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Your counters ring sales at high speed offline, kitchen printers fire without delay, and your central call center distributes delivery orders while you monitor live branch profits from anywhere on your phone.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
              >
                <span>Request Combined Package Demo</span>
                <IconRenderer name="ArrowRight" className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923154112925?text=Hello%20EBRICKS%20SOLUTIONS%2C%20I%20want%20to%20know%20pricing%20for%20Fast%20POS%20and%20the%20Cloud%20Multi-Branch%20Portal."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <IconRenderer name="MessageSquare" className="w-4 h-4 text-emerald-400" />
                <span>Ask Pricing on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipProductsSection;
