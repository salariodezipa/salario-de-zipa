'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">ZIPAQUIRÁ · COLOMBIA · DESDE 1939</p>
        <h1 className="hero-title">
          Donde las{' '}
          <span className="gold">celebraciones</span>{' '}
          se convierten en{' '}
          <span className="gold">recuerdos&nbsp;inolvidables</span>
        </h1>
        <p className="hero-subtitle">
          Gastronomía, patrimonio, música y espacios únicos para compartir los momentos
          más importantes de la vida en el corazón de Zipaquirá.
        </p>
        <div className="hero-buttons">
          <Link href="#reserva" className="btn-primary">
            RESERVAR MESA
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </Link>
          <Link href="#eventos" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            PLANEAR UN EVENTO
          </Link>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Descubre más</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}