'use client';

import Image from 'next/image';

const lugares = [
  { name: 'NUESTROS SALONES', image: '/Instalaciones/DSC_0635-Mejorado-NR-8.jpg' },
  { name: 'ZONAS EXTERIORES', image: '/Instalaciones/SALARIO-63.jpg' },
  { name: 'ESPACIOS PRIVADOS', image: '/Instalaciones/_MG_2104.jpg' },
  { name: 'DETALLES ÚNICOS', image: '/Instalaciones/_MG_2139.jpg' },
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