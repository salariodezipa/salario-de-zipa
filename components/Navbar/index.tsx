'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
            <div className="navbar-logo-img-wrap">
              <Image
                src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
                alt="Salario de Zipa"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
                sizes="160px"
              />
            </div>
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

          <Link href="#reserva" className="navbar-cta">NUEVA EXPERIENCIA</Link>

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