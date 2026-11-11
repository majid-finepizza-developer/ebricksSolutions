import React from 'react';
import type { TechStackData } from '../../types/content';
import { IconRenderer } from '../IconRenderer';

interface TechStackSectionProps {
  techStack: TechStackData;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => {
  return (
    <section id="tech-stack" className="py-16 sm:py-20 bg-white border-y border-slate-200/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <IconRenderer name="Code2" className="w-3.5 h-3.5 text-primary-600" />
            <span>{techStack.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {techStack.heading}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {techStack.subheading}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.technologies.map((tech, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-primary-400 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-primary-50 text-slate-700 group-hover:text-primary-600 border border-slate-200 group-hover:border-primary-200 flex items-center justify-center transition-colors mb-2.5">
                <IconRenderer name={tech.icon} className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {tech.name}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
