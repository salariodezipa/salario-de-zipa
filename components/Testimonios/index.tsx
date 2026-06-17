'use client';

const testimonios = [
  {
    nombre: 'Mariana G.',
    origen: 'Bogotá, Colombia',
    texto: 'El lugar más mágico para celebrar momentos especiales. La atmósfera es única y la comida espectacular.',
    calificacion: 5,
  },
  {
    nombre: 'Carlos R.',
    origen: 'Medellín, Colombia',
    texto: 'Un destino imperdible en Zipaquirá. La arquitectura en sal y la calidad de la comida hacen que valga la pena el viaje.',
    calificacion: 5,
  },
  {
    nombre: 'Ana María P.',
    origen: 'Cali, Colombia',
    texto: 'Celebramos nuestra boda aquí y fue perfecto. El equipo hizo que todo fuera mágico e inolvidable.',
    calificacion: 5,
  },
];

export default function Testimonios() {
  return (
    <section className="testimonios">
      <div className="container">
        <div className="testimonios-header">
          <p className="eyebrow">TESTIMONIOS</p>
          <h2 className="testimonios-title">Lo que dicen nuestros guests</h2>
        </div>

        <div className="testimonios-grid">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="testimonio-card reveal" style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="testimonio-stars">
                {Array.from({ length: testimonio.calificacion }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testimonio-texto">&ldquo;{testimonio.texto}&rdquo;</p>
              <div className="testimonio-autor">
                <div className="testimonio-avatar">
                  {testimonio.nombre.charAt(0)}
                </div>
                <div>
                  <p className="testimonio-nombre">{testimonio.nombre}</p>
                  <p className="testimonio-origen">{testimonio.origen}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}