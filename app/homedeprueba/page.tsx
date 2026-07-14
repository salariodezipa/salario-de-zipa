import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Gastronomia from '@/components/Gastronomia';
import HistoriaEspacios from '@/components/HistoriaEspacios';
import Eventos from '@/components/Eventos';
import Platos from '@/components/Platos';
import Testimonios from '@/components/Testimonios';
import Visita from '@/components/Visita';
import Reserva from '@/components/Reserva';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Gastronomia />
        <HistoriaEspacios />
        <Eventos />
        <Platos />
        <Testimonios />
        <Visita />
        <Reserva />
      </main>
      <Footer />
    </>
  );
}