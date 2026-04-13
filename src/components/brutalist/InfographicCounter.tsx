'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface InfographicCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

/**
 * Animated number counter triggered on scroll.
 * Uses direct DOM manipulation — zero React re-renders during animation.
 */
export function InfographicCounter({
  target,
  suffix = '',
  prefix = '',
  label,
  className = '',
}: InfographicCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!counterRef.current || !valueRef.current) return;

      const displayEl = valueRef.current;
      const isInteger = target % 1 === 0;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        snap: { val: isInteger ? 1 : 0.1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          // Direct DOM — no setState, no re-renders
          displayEl.textContent = `${prefix}${isInteger ? Math.round(obj.val) : obj.val.toFixed(1)}${suffix}`;
        },
      });
    },
    { scope: counterRef, dependencies: [target] }
  );

  return (
    <div ref={counterRef} className={`text-center ${className}`}>
      <span ref={valueRef} className="block font-black tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {prefix}0{suffix}
      </span>
      <span className="block text-xs uppercase tracking-[0.3em] mt-1 opacity-70">{label}</span>
    </div>
  );
}
