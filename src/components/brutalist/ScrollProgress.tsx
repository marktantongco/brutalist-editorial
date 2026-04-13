'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!barRef.current) return;

      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Initially hide until scrolled past hero
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top+=100 top',
        toggleClass: { targets: barRef.current, className: 'opacity-100' },
        onEnterBack: () => {
          if (barRef.current) barRef.current.style.opacity = '0';
        },
        onLeave: () => {
          if (barRef.current) barRef.current.style.opacity = '1';
        },
        onLeaveBack: () => {
          if (barRef.current) barRef.current.style.opacity = '0';
        },
        onEnter: () => {
          if (barRef.current) barRef.current.style.opacity = '1';
        },
      });
    },
    { scope: barRef }
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div
        ref={barRef}
        className="h-[3px] origin-left bg-[var(--pu-terracotta)]"
        style={{
          transform: 'scaleX(0)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
