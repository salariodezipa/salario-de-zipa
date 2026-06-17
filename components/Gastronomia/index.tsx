'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Gastronomia() {
  return (
    <section id="gastronomia" className="gastronomia">
      <div className="gastronomia-image">
        <Image
          src="/Menu/DSC_0823-Mejorado-NR-5-min.jpg"
          alt="Lomo al Trapo - Gastronomía Salario de Zipa"
          fill
          style={{ objectFit: 'cover' }}
          sizes="50vw"
        />
      </div>
      <div className="gastronomia-content">
        <p className="eyebrow reveal-left">GASTRONOMÍA</p>
        <h2 className="gastronomia-title reveal-left">Sabores que cuentan nuestra historia</h2>
        <p className="gastronomia-text reveal-left">
          Una propuesta gastronómica inspirada en ingredientes locales,
          tradición y experiencias para compartir.
        </p>
        <Link href="/menu" className="gastronomia-link reveal-left">
          CONOCER MENÚ
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}