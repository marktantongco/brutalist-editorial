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
  color = 'var(--pu-terracotta)',
  label,
}: AnimatedProgressRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  // Guard: ensure radius is always positive
  const radius = Math.max(1, (size - strokeWidth) / 2);
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  // Clamp value to [0, 100]
  const clampedValue = Math.min(100, Math.max(0, value));

  useGSAP(
    () => {
      if (!circleRef.current || !textRef.current || !containerRef.current) return;

      const circle = circleRef.current;
      const text = textRef.current;

      // Check if already in viewport (guard for lazy-loaded components)
      const elementTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const alreadyInView = elementTop < windowHeight * 0.85;

      if (alreadyInView) {
        // Set directly to final state
        gsap.set(circle, { strokeDashoffset: circumference - (clampedValue / 100) * circumference });
        text.textContent = `${clampedValue}%`;
        return;
      }

      // Set initial state
      gsap.set(circle, {
        strokeDashoffset: circumference,
      });
      gsap.set(text, { innerText: '0%' });

      // Animate on scroll — use direct DOM for counter text (no setState per frame)
      gsap.to(circle, {
        strokeDashoffset: circumference - (clampedValue / 100) * circumference,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Animate percentage text counting up via direct DOM
      const counter = { val: 0 };
      gsap.to(counter, {
        val: clampedValue,
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
    <div ref={containerRef} className="relative flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={Math.max(1, strokeWidth)}
          className="opacity-15"
        />
        {/* Animated progress */}
        <circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={Math.max(1, strokeWidth)}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      {/* Center text — now correctly positioned inside relative container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={textRef}
          className="font-black text-2xl"
          style={{ color }}
        >
          0%
        </span>
        {label && (
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-90 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
