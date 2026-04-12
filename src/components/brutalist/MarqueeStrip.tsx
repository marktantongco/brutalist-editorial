'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal scrolling ticker/marquee.
 * Reusable for breaking news, taglines, keyword streams.
 */
export function MarqueeStrip({ items, speed = 30, className = '' }: MarqueeStripProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const track = marqueeRef.current.querySelector('.marquee-track') as HTMLElement;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => {
            return parseFloat(String(x)) % totalWidth + 'px';
          }),
        },
      });
    },
    { scope: marqueeRef }
  );

  return (
    <div
      ref={marqueeRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      role="marquee"
      aria-label="Scrolling ticker"
    >
      <div className="marquee-track inline-flex">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-block px-6 md:px-10 font-bold text-sm md:text-base uppercase tracking-widest"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
