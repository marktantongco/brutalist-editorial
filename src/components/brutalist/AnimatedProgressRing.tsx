'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface AnimatedProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function AnimatedProgressRing({
  value,
  size = 120,
  strokeWidth = 6,
  color = 'var(--pu-red)',
  label,
}: AnimatedProgressRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useGSAP(
    () => {
      if (!circleRef.current || !textRef.current || !containerRef.current) return;

      const circle = circleRef.current;
      const text = textRef.current;

      // Set initial state
      gsap.set(circle, {
        strokeDashoffset: circumference,
      });
      gsap.set(text, { innerText: '0%' });

      // Animate on scroll
      gsap.to(circle, {
        strokeDashoffset: circumference - (value / 100) * circumference,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Animate percentage text counting up
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          text.textContent = `${Math.round(counter.val)}%`;
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-10"
        />
        {/* Animated progress */}
        <circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={textRef}
          className="font-black text-2xl"
          style={{ color }}
        >
          0%
        </span>
        {label && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
