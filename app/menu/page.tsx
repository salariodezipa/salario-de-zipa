'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MenuGrid from '@/components/MenuGrid';
import MenuModal from '@/components/MenuModal';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge: string;
}

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem({
      id: item.id,
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      badge: item.badge,
    });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="menu-page">
        <section className="menu-hero">
          <div className="menu-hero-bg"></div>
          <div className="menu-hero-content">
            <h1 className="menu-hero-title">Nuestro Menú</h1>
            <p className="menu-hero-subtitle">Sabores auténticos de Colombia</p>
          </div>
        </section>

        <section id="gastronomia" className="menu-content">
          <MenuGrid onItemClick={handleItemClick} />
        </section>
      </main>

      <MenuModal item={selectedItem} onClose={handleCloseModal} />

      <Footer />
    </>
  );
}