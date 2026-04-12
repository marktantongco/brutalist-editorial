'use client';

import { useRef, useState } from 'react';
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
 * Reusable for any metric/stat display.
 */
export function InfographicCounter({
  target,
  suffix = '',
  prefix = '',
  label,
  className = '',
}: InfographicCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        snap: { val: target % 1 === 0 ? 1 : 0.1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(obj.val);
        },
      });
    },
    { scope: counterRef, dependencies: [target] }
  );

  return (
    <div ref={counterRef} className={`text-center ${className}`}>
      <span className="block font-black tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {prefix}{target % 1 === 0 ? Math.round(displayValue) : displayValue.toFixed(1)}{suffix}
      </span>
      <span className="block text-xs uppercase tracking-[0.3em] mt-1 opacity-70">{label}</span>
    </div>
  );
}
