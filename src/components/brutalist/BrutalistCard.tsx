'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface BrutalistCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  hoverShadow?: string;
}

/**
 * Hard-edged brutalist card with bold hover animations.
 * 0px radius, thick borders, dramatic shadow on hover.
 */
export function BrutalistCard({
  children,
  className = '',
  borderColor = 'var(--brutal-border, #000)',
  hoverShadow = 'var(--brutal-shadow, 6px 6px 0px #FF0000)',
}: BrutalistCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          y: -4,
          boxShadow: hoverShadow,
          duration: 0.2,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseDown = () => {
        gsap.to(card, {
          scale: 0.98,
          y: 2,
          boxShadow: `0px 0px 0px ${borderColor}`,
          duration: 0.1,
          ease: 'power2.out',
        });
      };

      const handleMouseUp = () => {
        gsap.to(card, {
          scale: 1.02,
          y: -4,
          boxShadow: hoverShadow,
          duration: 0.15,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mousedown', handleMouseDown);
      card.addEventListener('mouseup', handleMouseUp);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousedown', handleMouseDown);
        card.removeEventListener('mouseup', handleMouseUp);
      };
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`border-2 bg-white dark:bg-black cursor-default transition-colors ${className}`}
      style={{ borderColor, borderRadius: 0 }}
    >
      {children}
    </div>
  );
}
