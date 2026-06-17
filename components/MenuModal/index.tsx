'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface MenuItem {
  name: string;
  image: string;
}

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className={`modal-overlay ${item ? 'active' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <Image src={item.image} alt={item.name} width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}