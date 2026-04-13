'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!dotRef.current || typeof window === 'undefined') return;

    // Check for touch device
    if ('ontouchstart' in window) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dotRef.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  });

  return <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />;
}
