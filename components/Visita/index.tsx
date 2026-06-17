'use client';

import Image from 'next/image';

const lugares = [
  { name: 'CATEDRAL DE SAL', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
  { name: 'CENTRO HISTÓRICO', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop' },
  { name: 'EVENERO DE LOS ZIPAS', image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400&h=400&fit=crop' },
  { name: 'ARQUITECTURA COLONIAL', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop' },
];

export default function Visita() {
  return (
    <section id="visita" className="visita">
      <div className="container">
        <div className="visita-grid">
          <div className="visita-content reveal-left">
            <p className="eyebrow">VISITA ZIPAQUIRÁ</p>
            <h2 className="visita-title">Mucho más que un restaurante</h2>
            <p className="visita-text">
              Descubre los principales atractivos culturales, históricos y patrimoniales
              de Zipaquirá y convierte tu visita en una experiencia completa.
            </p>
            <button className="btn-outline-gold">
              CONOCE MÁS →
            </button>
          </div>

          <div className="visita-lugares">
            {lugares.map((lugar, index) => (
              <div key={index} className="lugar-item reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="lugar-image">
                  <Image src={lugar.image} alt={lugar.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 17vw" />
                </div>
                <p className="lugar-name">{lugar.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}