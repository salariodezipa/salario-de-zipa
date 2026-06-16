'use client';

import { useEffect, useState } from 'react';

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
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="loading-icon">
          <path d="M20 4C20 4 8 14 8 24a12 12 0 0 0 24 0C32 14 20 4 20 4z" stroke="#C8A97E" strokeWidth="1.5" fill="none"/>
          <path d="M20 14c0 0 -6 6 -6 10a6 6 0 0 0 12 0c0-4-6-10-6-10z" fill="#C8A97E" opacity="0.4"/>
        </svg>
        <div className="loading-logo">SALARIO</div>
        <div className="loading-logo-sub">DE ZIPA</div>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
