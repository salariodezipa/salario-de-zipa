'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const eventos = [
  {
    title: 'MATRIMONIOS',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop',
    alt: 'Pareja de novios',
  },
  {
    title: 'EVENTOS CORPORATIVOS',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=500&fit=crop',
    alt: 'Evento corporativo',
  },
  {
    title: 'CELEBRACIONES FAMILIARES',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=500&fit=crop',
    alt: 'Celebración familiar',
  },
];

export default function Eventos() {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = 300;
    const newActiveDot = Math.round(scrollLeft / cardWidth);
    setActiveDot(newActiveDot);
  };

  return (
    <section id="eventos" className="eventos">
      <div className="container">
        <div className="eventos-grid">
          <div className="eventos-content">
            <p className="eyebrow reveal-left">CELEBRA CON NOSOTROS</p>
            <h2 className="eventos-title reveal-left">Tus momentos más especiales</h2>
            <p className="eventos-text reveal-left">
              Matrimonios, graduaciones, bautizos, aniversarios y eventos corporativos
              en un escenario lleno de historia.
            </p>
            <button className="btn-dark reveal-left">
              PLANEAR UN EVENTO →
            </button>
          </div>

          <div className="eventos-carousel" ref={carouselRef} onScroll={handleScroll}>
            {eventos.map((evento, index) => (
              <div key={index} className="evento-card">
                <div className="evento-card-image">
                  <Image src={evento.image} alt={evento.alt} fill style={{ objectFit: 'cover' }} sizes="280px" />
                  <div className="evento-card-overlay">
                    <span className="evento-card-title">{evento.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {eventos.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeDot ? 'active' : ''}`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}