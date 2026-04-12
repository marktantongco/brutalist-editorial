'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
  className?: string;
}

/**
 * Vertical scroll-driven narrative timeline with parallax.
 * Reusable for any chronological/sequential content.
 */
export function TimelineSection({ items, className = '' }: TimelineSectionProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!timelineRef.current) return;

      const line = timelineRef.current.querySelector('.timeline-line') as HTMLElement;
      const dots = timelineRef.current.querySelectorAll('.timeline-dot');
      const contents = timelineRef.current.querySelectorAll('.timeline-content');

      // Animate the line height as user scrolls
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }

      // Stagger in dots and content
      dots.forEach((dot, i) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
            once: true,
          },
          delay: i * 0.1,
        });
      });

      contents.forEach((content) => {
        gsap.from(content, {
          opacity: 0,
          x: 40,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: timelineRef }
  );

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Vertical line */}
      <div
        className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-black dark:bg-white md:-translate-x-[1.5px]"
        aria-hidden="true"
      />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`relative flex items-start ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div
                className="timeline-dot absolute left-4 md:left-1/2 w-4 h-4 bg-red-600 border-2 border-black dark:border-white -translate-x-[7px] md:-translate-x-2 z-10"
                aria-hidden="true"
              />

              {/* Content card */}
              <div
                className={`timeline-content ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isEven ? 'md:pr-4' : 'md:pl-4 md:ml-auto'
                }`}
              >
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-4 md:p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
                    {item.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mt-1">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
