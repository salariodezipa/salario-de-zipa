'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const elements = document.querySelectorAll<HTMLElement>(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
