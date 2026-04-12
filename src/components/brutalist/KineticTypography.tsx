'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface KineticTypographyProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  revealType?: 'clip' | 'split' | 'fade';
  delay?: number;
}

/**
 * Kinetic typography component with scroll-triggered text animations.
 * Reusable for any headline or text block.
 */
export function KineticTypography({
  text,
  tag: Tag = 'h1',
  className = '',
  revealType = 'clip',
  delay = 0,
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (revealType === 'clip') {
        gsap.from(containerRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.4,
          delay,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      } else if (revealType === 'split') {
        const words = containerRef.current.querySelectorAll('.kt-word');
        gsap.from(words, {
          opacity: 0,
          y: 40,
          rotateX: -40,
          stagger: 0.04,
          duration: 0.6,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      } else {
        gsap.from(containerRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  if (revealType === 'split') {
    const words = text.split(' ');
    return (
      <div ref={containerRef}>
        <Tag className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
          {words.map((word, i) => (
            <span
              key={i}
              className="kt-word inline-block"
              style={{ perspective: '600px' }}
            >
              {word}
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <Tag className={className}>{text}</Tag>
    </div>
  );
}
