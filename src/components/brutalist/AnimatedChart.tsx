'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

interface AnimatedBarChartProps {
  data: { label: string; value: number; color: string }[];
  className?: string;
}

/**
 * Animated bar chart for infographic sections.
 * Bars animate in height when scrolled into view.
 */
export function AnimatedBarChart({ data = [], className = '' }: AnimatedBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chartRef.current) return;

      const bars = chartRef.current.querySelectorAll('.bar-fill');
      const labels = chartRef.current.querySelectorAll('.bar-label');

      gsap.from(bars, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(labels, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: chartRef }
  );

  // Guard: prevent division by zero when all values are 0
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value), 1) : 1;

  return (
    <div ref={chartRef} className={`flex items-end justify-center gap-3 md:gap-6 ${className}`}>
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-8 md:w-12 lg:w-16 h-40 md:h-56 lg:h-64 border-2 border-pu-charcoal dark:border-pu-warm-white relative bg-pu-cream dark:bg-pu-charcoal">
            <div
              className="bar-fill absolute bottom-0 left-0 right-0"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <span className="bar-label text-[10px] md:text-xs font-bold uppercase tracking-wider text-center max-w-[4rem] md:max-w-[5rem]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

interface AnimatedDonutProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  className?: string;
}

/**
 * Animated donut/pie chart.
 * Segments draw in on scroll.
 */
export function AnimatedDonut({ segments = [], size = 200, className = '' }: AnimatedDonutProps) {
  const donutRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!donutRef.current) return;

      const circles = donutRef.current.querySelectorAll('.donut-segment');
      gsap.from(circles, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: 'center center',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: donutRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: donutRef }
  );

  // Guard: prevent division by zero when all segment values are 0
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;

  // Pre-compute offsets immutably to satisfy react-hooks/immutability
  const segmentData = segments.map((seg) => {
    const dash = (seg.value / total) * circumference;
    const gap = circumference - dash;
    return { ...seg, dash, gap };
  });

  // Compute cumulative offsets
  const offsets = segmentData.reduce<number[]>((acc, seg) => {
    const prev = acc.length > 0 ? acc[acc.length - 1] + segmentData[acc.length - 1].dash : 0;
    acc.push(prev);
    return acc;
  }, []);

  return (
    <div ref={donutRef} className={`flex flex-col items-center gap-4 ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segmentData.map((seg, i) => (
          <circle
            key={i}
            className="donut-segment"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={-offsets[i]}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-bold">
            <span
              className="inline-block w-3 h-3 border border-pu-charcoal dark:border-pu-warm-white"
              style={{ backgroundColor: seg.color }}
            />
            <span>{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
