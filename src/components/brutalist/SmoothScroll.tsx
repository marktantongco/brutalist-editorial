'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap-setup';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const element = document.querySelector(id);
      if (!element) return;

      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 0 },
        duration: 1,
        ease: 'power3.inOut',
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <>{children}</>;
}
