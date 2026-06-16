'use client';

import Link from 'next/link';

export default function HistoriaEspacios() {
  return (
    <section id="historia" className="historia-espacios">
      <div id="espacios" className="historia-card">
        <div className="card-overlay"></div>
        <div className="card-content reveal">
          <p className="eyebrow">NUESTRA HISTORIA</p>
          <h3 className="card-title">Tradición que sigue viva desde 1939</h3>
          <p className="card-text">
            Salario nació alrededor del horno de sal que durante generaciones fue parte del alma
            de Zipaquirá. Hoy ese legado continúa vivo en cada rincón de nuestro restaurante.
          </p>
          <Link href="#" className="card-link">
            CONOCE NUESTRA HISTORIA →
          </Link>
        </div>
      </div>
      <div className="espacios-card">
        <div className="card-overlay"></div>
        <div className="card-content reveal">
          <p className="eyebrow">ESPACIOS CON HISTORIA</p>
          <h3 className="card-title">Un lugar diseñado para compartir</h3>
          <p className="card-text">
            Arquitectura original, ambientes amplios y detalles que cuentan historias.
            Espacios versátiles para cualquier ocasión.
          </p>
          <Link href="#" className="card-link">
            DESCUBRE NUESTROS ESPACIOS →
          </Link>
        </div>
      </div>
    </section>
  );
}