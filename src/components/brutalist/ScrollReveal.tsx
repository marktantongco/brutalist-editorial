'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

/**
 * Reusable scroll-triggered reveal animation wrapper.
 * Includes an already-in-view guard so elements are visible even
 * if they mount after the user has scrolled past them (e.g. lazy-loaded).
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const fromVars: gsap.TweenVars = { opacity: 0, duration, delay, ease: 'power3.out' };

      switch (direction) {
        case 'up': fromVars.y = 60; break;
        case 'down': fromVars.y = -60; break;
        case 'left': fromVars.x = 80; break;
        case 'right': fromVars.x = -80; break;
      }

      const targets = containerRef.current.querySelectorAll('.reveal-child');
      const elements = targets.length > 0 ? targets : [containerRef.current];

      // Check if already scrolled past trigger point (guard for lazy-loaded components)
      const elementTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const alreadyInView = elementTop < windowHeight * 0.85;

      if (alreadyInView) {
        // Element is already in viewport — set directly to final state
        gsap.set(elements, { opacity: 1, x: 0, y: 0, clearProps: 'all' });
      } else {
        // Normal scroll-triggered animation
        if (targets.length > 0) {
          gsap.from(targets, {
            ...fromVars,
            stagger,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          });
        } else {
          gsap.from(containerRef.current, {
            ...fromVars,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          });
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Scroll-linked parallax section.
 * Speed > 0 moves element opposite to scroll (background feel).
 */
export function ParallaxSection({ children, speed = 0.3, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      gsap.to(contentRef.current, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
