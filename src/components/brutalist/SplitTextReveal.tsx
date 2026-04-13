'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  stagger?: number;
}

export function SplitTextReveal({
  text,
  className = '',
  tag = 'p',
  stagger = 0.03,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const chars = containerRef.current.querySelectorAll('.split-char');

      // Check if already in viewport (guard for lazy-loaded components)
      const elementTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const alreadyInView = elementTop < windowHeight * 0.85;

      if (alreadyInView) {
        // Set directly to final state
        gsap.set(chars, { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      gsap.from(chars, {
        opacity: 0,
        y: 30,
        stagger,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  const Tag = tag as string;

  return (
    <div ref={containerRef} className={className} role="text" aria-label={text}>
      <Tag className="flex flex-wrap" style={{ margin: 0 }}>
        {text.split('').map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="split-char inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Tag>
    </div>
  );
}
