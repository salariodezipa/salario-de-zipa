'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const hideTimer = setTimeout(() => setHidden(true), 2100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="loading-logo-wrap">
        <div className="loading-logo-img">
          <Image
            src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
            alt="Salario de Zipa"
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="200px"
          />
        </div>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
