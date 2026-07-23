'use client';

import Image from 'next/image';

const eventos = [
  {
    title: 'EVENTOS CORPORATIVOS',
    // Usando una de las imágenes reales que generamos, o puedes cambiarla por la tuya
    image: '/evento_corporativo_elegante.png', 
    alt: 'Evento corporativo',
    location: 'CHÍA'
  },
  {
    title: 'CELEBRACIONES FAMILIARES',
    // Espacio para tu imagen real
    image: '/_MG_0506copia.jpg', 
    alt: 'Celebración familiar',
    location: 'CHÍA'
  },
  {
    title: 'GRADUACIONES',
    // Espacio para tu imagen real
    image: '/Momentos/_MG_0980.jpg', 
    alt: 'Graduación',
    location: 'CHÍA'
  },
  {
    title: 'ANIVERSARIOS',
    // Usando otra de las imágenes reales que generamos, o puedes cambiarla
    image: '/evento_matrimonio_elegante.png', 
    alt: 'Aniversario',
    location: 'CHÍA'
  },
];

export default function Eventos() {
  return (
    <section id="eventos" className="eventos-acr">
      <div className="eventos-acr-header">
        <h2 className="eventos-acr-title">
          EVENTOS
        </h2>
      </div>

      <div className="eventos-acr-container">
        <div className="eventos-acr-grid">
          {eventos.map((evento, index) => (
            <div key={index} className="evento-acr-card reveal-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="evento-acr-image-wrapper">
                {/* Aquí van las imágenes reales, sin iconos ni emojis */}
                <Image src={evento.image} alt={evento.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 350px" />
              </div>
              <div className="evento-acr-label">
                {evento.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="eventos-acr-banner reveal-up">
        <div className="banner-content">
          <h3 className="banner-title">
            <span className="banner-small-text">PÁSATE POR EL</span>
            <span className="banner-large-text">ALMACÉN</span>
          </h3>
          <p className="banner-subtitle">COMPRA AQUÍ</p>
        </div>
        <div className="banner-items">
          <button className="btn-acr">VER CATÁLOGO</button>
        </div>
      </div>
    </section>
  );
}