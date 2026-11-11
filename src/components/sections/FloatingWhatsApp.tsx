import React, { useState } from 'react';
import type { CompanyContact, FloatingWhatsAppConfig } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface FloatingWhatsAppProps {
  contact: CompanyContact;
  config: FloatingWhatsAppConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ contact, config }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!config.enabled) return null;

  return (
    <aside
      className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto"
      aria-label="Direct WhatsApp Contact"
    >
      {/* Tooltip on hover or screen load */}
      <div
        className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-800 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        } group-hover:opacity-100 group-hover:translate-x-0`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>{config.tooltipText}</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={contact.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label={`Chat directly on WhatsApp (${contact.whatsapp.display})`}
      >
        {/* Soft pulse halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-pulse pointer-events-none" />
        <IconRenderer name="MessageSquare" className="w-7 h-7 relative z-10" />
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
