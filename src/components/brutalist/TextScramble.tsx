'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

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
  const [displayText, setDisplayText] = useState(text);

  const scramble = useCallback(() => {
    if (!elRef.current) return;

    const length = text.length;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= length) {
        clearInterval(interval);
        setDisplayText(text);
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
    return () => observer.disconnect();
  }, [scramble]);

  return (
    <Tag ref={elRef as React.RefObject<never>} className={className}>
      {displayText}
    </Tag>
  );
}
