import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  containerClassName?: string;
  hasBackgroundAlt?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  className,
  containerClassName,
  hasBackgroundAlt = false,
  children,
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn(
        'w-full scroll-mt-20 py-16 sm:py-20 lg:py-28 transition-colors duration-200',
        hasBackgroundAlt ? 'bg-surfaceAlt' : 'bg-background',
        className,
      )}
      {...props}
    >
      <div className={cn('mx-auto max-w-container px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
};
