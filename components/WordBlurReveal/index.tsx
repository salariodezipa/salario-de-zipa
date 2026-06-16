'use client';

import { useEffect, useRef, useState } from 'react';

interface WordBlurRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  goldWords?: string[];
  startDelay?: number;
  stagger?: number;
}

export default function WordBlurReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  goldWords = [],
  startDelay = 400,
  stagger = 50,
}: WordBlurRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>} className={className}>
      {words.map((word, i) => {
        const isGold = goldWords.some((g) =>
          word.toLowerCase().replace(/[,!?.]/g, '').includes(g.toLowerCase())
        );
        return (
          <span
            key={i}
            className={`word-blur-word${isGold ? ' gold' : ''}`}
            style={{
              opacity: revealed ? 1 : 0,
              filter: revealed ? 'blur(0px)' : 'blur(10px)',
              transform: revealed ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.6s var(--ease-elegant) ${startDelay + i * stagger}ms, filter 0.6s var(--ease-elegant) ${startDelay + i * stagger}ms, transform 0.6s var(--ease-elegant) ${startDelay + i * stagger}ms`,
              display: 'inline-block',
              marginRight: '0.28em',
            }}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
}
