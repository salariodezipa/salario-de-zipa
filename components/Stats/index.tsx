'use client';

import { useEffect, useRef, useState } from 'react';

const OvenIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="28" height="22" rx="1"/>
    <path d="M4 10 C4 10 8 4 18 4 C28 4 32 10 32 10"/>
    <rect x="9" y="16" width="18" height="10" rx="0.5"/>
    <circle cx="11" cy="7" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="25" cy="7" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M13 27 L23 27" strokeWidth="1"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="4"/>
    <circle cx="24" cy="10" r="4"/>
    <path d="M2 30c0-5.52 4.48-10 10-10h12c5.52 0 10 4.48 10 10"/>
  </svg>
);

const CarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 16l3-8h14l3 8"/>
    <rect x="4" y="16" width="28" height="12" rx="2"/>
    <circle cx="10" cy="30" r="3"/>
    <circle cx="26" cy="30" r="3"/>
    <path d="M4 22h28"/>
  </svg>
);

const CelebrationIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 28 L18 6 L29 28"/>
    <path d="M7 28 L11 20 M29 28 L25 20"/>
    <path d="M10 22 h16"/>
    <path d="M14 6 Q18 2 22 6"/>
    <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const PinIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4C13.03 4 9 8.03 9 13c0 7 9 19 9 19s9-12 9-19c0-4.97-4.03-9-9-9z"/>
    <circle cx="18" cy="13" r="3.5"/>
  </svg>
);

const stats = [
  { Icon: OvenIcon, number: '1939', label: 'ÚNICO HORNO DE SAL VIGENTE DESDE 1939' },
  { Icon: PeopleIcon, number: '800+', label: 'CAPACIDAD PARA MÁS DE 800 PERSONAS' },
  { Icon: CarIcon, number: '200+', label: 'MÁS DE 200 PARQUEADEROS DISPONIBLES' },
  { Icon: CelebrationIcon, number: '365', label: 'EVENTOS Y CELEBRACIONES TODO EL AÑO' },
  { Icon: PinIcon, number: '#1', label: 'DESTINO TURÍSTICO EN ZIPAQUIRÁ' },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map(({ Icon, number, label }, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s var(--ease-elegant) ${i * 0.1}s, transform 0.6s var(--ease-elegant) ${i * 0.1}s`,
              }}
            >
              <div className="stat-icon">
                <Icon />
              </div>
              <div className="stat-number">{number}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
