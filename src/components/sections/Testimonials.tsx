import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TestimonialsData } from '../../types/site-data';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { DynamicIcon } from '../../utils/icons';
import { cn } from '../../utils/cn';

export interface TestimonialsProps {
  testimonials: TestimonialsData;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = testimonials.items.length;

  const scrollToItem = useCallback((index: number) => {
    const targetIndex = (index + totalItems) % totalItems;
    setActiveIndex(targetIndex);

    if (containerRef.current) {
      const cards = containerRef.current.children;
      if (cards[targetIndex]) {
        (cards[targetIndex] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [totalItems]);

  const handlePrev = () => scrollToItem(activeIndex - 1);
  const handleNext = () => scrollToItem(activeIndex + 1);

  // Keyboard navigation when carousel is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Keep active index in sync with touch/swipe scroll on mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: number;
    const handleScroll = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.clientWidth * 0.85;
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex >= 0 && newIndex < totalItems && newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, totalItems]);

  return (
    <Section id="testimonials">
      <SectionHeading
        subtitle={testimonials.subtitle}
        title={testimonials.title}
        align="center"
      />

      {/* Carousel Container */}
      <div
        className="relative"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Customer Testimonials Carousel"
        aria-roledescription="carousel"
      >
        {/* Navigation Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 mb-6">
          <span className="text-xs sm:text-sm font-medium text-text-muted">
            {activeIndex + 1} of {totalItems}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-surface border border-border text-text-primary hover:bg-surfaceAlt hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors shadow-sm flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <DynamicIcon name="chevron-left" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-surface border border-border text-text-primary hover:bg-surfaceAlt hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors shadow-sm flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <DynamicIcon name="chevron-right" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Carousel / Grid */}
        <div
          ref={containerRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {testimonials.items.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={item.name}
                className={cn(
                  'flex-shrink-0 w-[85%] sm:w-[65%] lg:w-auto snap-center flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface border transition-all duration-300 shadow-sm',
                  isSelected
                    ? 'border-primary-400 shadow-md ring-1 ring-primary-100'
                    : 'border-border hover:border-primary-200',
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${totalItems}`}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <DynamicIcon
                        key={starIdx}
                        name="star"
                        className={cn(
                          'w-4 h-4',
                          starIdx < item.rating
                            ? 'text-star fill-star'
                            : 'text-border fill-border',
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-primary-50 text-primary-600 flex-shrink-0 flex items-center justify-center border border-border">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading font-semibold text-sm sm:text-base text-text-primary truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-text-muted truncate">
                      {item.role}, {item.company}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 lg:hidden">
          {testimonials.items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToItem(dotIdx)}
              className={cn(
                'min-h-[44px] min-w-[24px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-full',
              )}
              aria-label={`Go to slide ${dotIdx + 1}`}
            >
              <span
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  dotIdx === activeIndex ? 'w-8 bg-primary-600' : 'w-2.5 bg-border hover:bg-text-muted',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};
