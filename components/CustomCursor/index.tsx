'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const animate = () => {
      const lagFactor = 0.12;
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * lagFactor;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * lagFactor;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hidden ? 'hidden' : ''}`}
    />
  );
}