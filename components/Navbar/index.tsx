'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            <svg className="navbar-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span className="navbar-logo-text">SALARIO</span>
            <span className="navbar-logo-sub">DE ZIPA</span>
          </Link>

          <ul className="navbar-links">
            <li><Link href="/#inicio">INICIO</Link></li>
            <li><Link href="/#historia">HISTORIA</Link></li>
            <li><Link href="/#espacios">ESPACIOS</Link></li>
            <li><Link href="/#gastronomia">GASTRONOMÍA</Link></li>
            <li><Link href="/#eventos">EVENTOS</Link></li>
            <li><Link href="/#visita">VISITA ZIPAQUIRÁ</Link></li>
            <li><Link href="/#contacto">CONTACTO</Link></li>
          </ul>

          <Link href="#reserva" className="navbar-cta">RESERVAR EXPERIENCIA</Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <button
          className="mobile-drawer-close"
          onClick={() => setMobileOpen(false)}
        >
          ×
        </button>
        <ul className="mobile-drawer-links">
          <li><Link href="/#inicio" onClick={() => setMobileOpen(false)}>INICIO</Link></li>
          <li><Link href="/#historia" onClick={() => setMobileOpen(false)}>HISTORIA</Link></li>
          <li><Link href="/#espacios" onClick={() => setMobileOpen(false)}>ESPACIOS</Link></li>
          <li><Link href="/#gastronomia" onClick={() => setMobileOpen(false)}>GASTRONOMÍA</Link></li>
          <li><Link href="/#eventos" onClick={() => setMobileOpen(false)}>EVENTOS</Link></li>
          <li><Link href="/#visita" onClick={() => setMobileOpen(false)}>VISITA ZIPAQUIRÁ</Link></li>
          <li><Link href="/#contacto" onClick={() => setMobileOpen(false)}>CONTACTO</Link></li>
          <li>
            <Link
              href="#reserva"
              className="btn-primary"
              style={{ display: 'inline-block', marginTop: '16px' }}
              onClick={() => setMobileOpen(false)}
            >
              RESERVAR
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}