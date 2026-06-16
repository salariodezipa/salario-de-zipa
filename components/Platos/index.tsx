'use client';

const platos = [
  'Lomo al Trapo',
  'Chicharrón Carnudo',
  'Costillitas de Cerdo',
  'Bandeja Paisa',
  'Ajiaco Bogotano',
  'Sancocho Trifásico',
  'Mojarra Frita',
  'Estofado de Res',
  'Piquete de Pollo',
  'Sartenada Salario',
  'Torta de Almojábana',
  'Cuajada con Melao',
];

const Dot = () => (
  <span style={{ color: 'rgba(200,169,110,0.4)', margin: '0 4px', flexShrink: 0 }}>✦</span>
);

export default function Platos() {
  const repeatedPlatos = [...platos, ...platos];

  return (
    <section className="platos">
      <div className="marquee-container">
        <div className="marquee">
          {repeatedPlatos.map((plato, index) => (
            <div key={index} className="marquee-item">
              <Dot /> {plato}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}