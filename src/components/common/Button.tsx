import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] select-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 motion-reduce:transition-none';

  const variants = {
    primary:
      'bg-primary-600 text-text-onPrimary hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow',
    secondary:
      'bg-surface border border-border text-text-primary hover:bg-surfaceAlt hover:border-primary-300 shadow-sm',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-surfaceAlt active:bg-border',
  };

  const sizes = {
    sm: 'text-xs sm:text-sm px-3.5 py-2 gap-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5 gap-2',
    lg: 'text-base sm:text-lg px-6 py-3.5 gap-2.5 font-semibold',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
