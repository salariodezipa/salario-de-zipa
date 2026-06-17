'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge: string;
}

const menuItems: MenuItem[] = [
  { id: '1', category: 'entradas', name: 'Cacerola Nativa', description: 'Selección de ingredientes tradicionales served en cazuela de barro.', price: '$17.850', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Cacerola+Nativa', badge: 'Entradas' },
  { id: '2', category: 'entradas', name: 'Arepa de Choclo', description: 'Arepa dulce de choclo tierno con queso y mantequilla.', price: '$23.100', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Arepa+de+Choclo', badge: 'Entradas' },
  { id: '3', category: 'entradas', name: 'Patacones x4', description: 'Plátano verde frito con hogao y ají.', price: '$24.100', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Patacones', badge: 'Entradas' },
  { id: '4', category: 'entradas', name: 'Chicharrones Salario', description: 'Crujientes chicharrones con nuestro toque especial de sal vigua.', price: '$34.500', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Chicharrones', badge: 'Entradas' },
  { id: '5', category: 'entradas', name: 'Plátano Maduro', description: 'Plátano maduro frito con queso y salsa de tomate.', price: '$23.100', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Platano+Maduro', badge: 'Entradas' },
  { id: '6', category: 'principales', name: 'Lomo al Trapo 300g', description: 'Jugoso lomo de res envuelto en tela y cocido a la brasa.', price: '$89.250', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Lomo+al+Trapo', badge: 'Platos Principales' },
  { id: '7', category: 'principales', name: 'Costillitas de Cerdo 500g', description: 'Costillas de cerdo a la BBQ con guarnición.', price: '$59.850', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Costillitas', badge: 'Platos Principales' },
  { id: '8', category: 'principales', name: 'Chicharrón Carnudo 400g', description: 'Chicharrón premium con carne, acompañamientos tradicionales.', price: '$51.450', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Chicharron+Carnudo', badge: 'Platos Principales' },
  { id: '9', category: 'principales', name: 'Estofado de Res', description: 'Tiras de res en salsa de vino tinto con vegetales.', price: '$66.200', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Estofado', badge: 'Platos Principales' },
  { id: '10', category: 'principales', name: 'Bandeja Paisa', description: 'La auténtica bandeja paisa con todos sus acompañamientos.', price: '$57.750', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Bandeja+Paisa', badge: 'Platos Principales' },
  { id: '11', category: 'principales', name: 'Piquete de Pollo', description: 'Pollo a la браса con papa criolla y chicharrón.', price: '$54.600', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Piquete+de+Pollo', badge: 'Platos Principales' },
  { id: '12', category: 'principales', name: 'Mojarra Frita 500g', description: 'Pescado fresco frito con patacones y ensalada.', price: '$55.650', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Mojarra+Frita', badge: 'Platos Principales' },
  { id: '13', category: 'principales', name: 'Guiso de Arveja con Pata de Res', description: 'Arveja verde con trozo de res, plato tradicional.', price: '$54.600', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Guiso+de+Arveja', badge: 'Platos Principales' },
  { id: '14', category: 'principales', name: 'Sartenada', description: 'Mezcla de carnes a la plancha con vegetales.', price: '$33.100', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Sartenada', badge: 'Platos Principales' },
  { id: '15', category: 'sopas', name: 'Ajiaco Típico', description: 'Ajiaco bogotano con tres tipos de papa, pollo y alcaparra.', price: '$43.100', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Ajiaco', badge: 'Sopas' },
  { id: '16', category: 'sopas', name: 'Sancocho Trifásico', description: 'Sancocho con tres carnes, mazorca y plátano.', price: '$55.650', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Sancocho+Trifasico', badge: 'Sopas' },
  { id: '17', category: 'postres', name: 'Torta de Almojábana', description: 'Tradicional torta de queso y maíz.', price: '$22.050', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Torta+de+Almojabana', badge: 'Postres' },
  { id: '18', category: 'postres', name: 'Cuajada con Melao', description: 'Cuajada fresca con melao de panel.', price: '$18.900', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Cuajada+con+Melao', badge: 'Postres' },
  { id: '19', category: 'bebidas', name: 'Soda Frutal Frutos Rojos', description: 'Refrescante soda con frutos del bosque.', price: '$22.000', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Soda+Frutal', badge: 'Bebidas' },
  { id: '20', category: 'bebidas', name: 'Cóctel Sal Vigua', description: 'Tequila, carbón activado, limón, sal vigua y sirope de frutos rojos.', price: '$45.000', image: 'https://placehold.co/600x400/1A1209/C8A96E?text=Coctel+Sal+Vigua', badge: 'Bebidas' },
];

const categories = [
  { key: 'todos', label: 'Todos' },
  { key: 'entradas', label: 'Entradas' },
  { key: 'principales', label: 'Platos Principales' },
  { key: 'sopas', label: 'Sopas' },
  { key: 'postres', label: 'Postres' },
  { key: 'bebidas', label: 'Bebidas' },
];

interface MenuGridProps {
  onItemClick: (item: MenuItem) => void;
}

export default function MenuGrid({ onItemClick }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredItems = activeCategory === 'todos'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="menu-tabs-container">
        <div className="container">
          <div className="menu-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`menu-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-item"
              onClick={() => onItemClick(item)}
            >
              <div className="menu-item-image">
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 300px" />
              </div>
              <div className="menu-item-content">
                <span className="menu-item-badge">{item.badge}</span>
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}