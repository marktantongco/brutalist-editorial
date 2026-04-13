'use client';

import { useRef, useCallback, useEffect } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  scrambleChars?: string;
}

export function TextScramble({
  text,
  className = '',
  tag: Tag = 'span',
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%',
}: TextScrambleProps) {
  const elRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (!elRef.current) return;

    const length = text.length;
    let iteration = 0;

    // Clear any previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // Direct DOM manipulation instead of setState — eliminates ~200 renders/sec
      if (!elRef.current) return;
      elRef.current.textContent = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      iteration += 1 / 2;

      if (iteration >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (elRef.current) elRef.current.textContent = text;
      }
    }, 30);
  }, [text, scrambleChars]);

  useEffect(() => {
    if (!elRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble]);

  return (
    <Tag ref={elRef as React.RefObject<never>} className={className}>
      {text}
    </Tag>
  );
}
