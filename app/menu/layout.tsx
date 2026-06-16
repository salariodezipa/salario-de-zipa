import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menú | Salario de Zipa',
  description: 'Menú - Salario de Zipa | Gastronomía colombiana de autor en Zipaquirá',
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}