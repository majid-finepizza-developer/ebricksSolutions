import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className,
      )}
    >
      {subtitle && (
        <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
