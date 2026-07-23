'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import './landing.css'

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const translations = {
  es: {
    navInicio: 'INICIO',
    navHistoria: 'HISTORIA',
    navGaleria: 'GALERÍA',
    navGastronomia: 'GASTRONOMÍA',
    navEventos: 'EVENTOS',
    navContacto: 'CONTACTO',
    navReservar: 'RESERVAR MESA',
    heroEyebrow: 'ZIPAQUIRÁ · COLOMBIA · DESDE 1930',
    heroH1: 'Donde el fuego y la tradición crean experiencias',
    heroBody: 'Gastronomía de autor, horno de sal vigente desde 1930, y espacios únicos para los momentos que más importan.',
    heroReservar: 'RESERVAR MESA',
    heroMenu: 'CONOCER MENÚ',
    poemEyebrow: 'SALARIO DE ZIPA',
    poemText: 'Desde 1930, nuestra casa ha guardado una parte invaluable de la historia de Zipaquirá. Los antiguos hornos y sus característicos muros de sal permanecen como testigos silenciosos de un legado que aún se respira en cada espacio.\n\nEn Salario, decidimos preservar esa esencia y compartirla alrededor de la mesa, creando una experiencia donde la gastronomía se convierte en una forma de conectar con la memoria y la tradición de la Capital Salinera de Colombia.',
    menuEyebrow: 'GASTRONOMÍA',
    menuTitle: 'Los favoritos de la casa',
    menuVerCompleto: 'VER MENÚ COMPLETO →',
    menuFavoritos: 'LOS FAVORITOS DE LA CASA',
    videoEyebrow: 'NUESTRA HISTORIA',
    videoTitle: 'Donde la historia sigue viva, alrededor de la mesa',
    videoCaption: 'Entre hornos y muros cargados de memoria se grabaron escenas de El Milagro de Sal (1958), considerada una de las obras pioneras del cine colombiano y parte del patrimonio fílmico nacional. Un lugar donde la historia de Zipaquirá no solo se cuenta, sino que aún puede recorrerse.\n\nUna experiencia que conecta sabores, tradición y patrimonio en uno de los escenarios más auténticos de la Capital Salinera de Colombia.',
    historiaEyebrow: 'DESDE 1930',
    historiaTitle: 'Tradición que sigue viva desde 1930',
    historiaBody: 'Salario de Zipa nació alrededor del único horno de sal activo desde 1930 en Zipaquirá. Más de ocho décadas de historia, gastronomía y patrimonio que continúan vivos en cada plato que servimos.',
    historiaAnos: 'AÑOS DE TRADICIÓN',
    historiaPersonas: 'PERSONAS CAPACITY',
    historiaParq: 'PARQUEADEROS',
    historiaBtn: 'CONOCE NUESTRA HISTORIA →',
    galeriaEyebrow: 'GALERÍA',
    galeriaTitle: 'Nuestra galería de momentos',
    eventosEyebrow: 'EVENTOS',
    eventosTitle: 'Celebramos tus mejores momentos',
    eventosBody1: 'Reserva un espacio con amplia capacidad de hasta 800 invitados y 200 parqueaderos, haz de este espacio tu recuerdo memorable.',
    eventosBody2: 'Matrimonios, cumpleaños, aniversarios e integraciones ejecutivas en un solo lugar.',
    eventosHighlight: 'Banda en vivo, luces y gastronomía de autor para despertar tus mejores recuerdos en nuestra casa.',
    eventosFeatures: 'BANDA EN VIVO · LUCES PROFESIONALES · GASTRONOMÍA DE AUTOR',
    eventosCotiza: 'COTIZA TU EVENTO',
    reviewsTitle: 'Lo que dicen nuestros visitantes',
    reviewsBadge: 'Reviews desde Google',
    ctaEyebrow: 'RESERVA TU EXPERIENCIA',
    ctaLine1: 'Una mesa',
    ctaLine2: 'te espera',
    ctaAddress: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca',
    ctaHours: 'Martes a domingo: 12:00 pm – 10:00 pm',
    ctaPhone: '+57 322 604 8752',
    ctaReservar: 'RESERVAR MESA',
    ctaWhatsapp: 'WHATSAPP',
    mapEyebrow: 'CÓMO LLEGARNOS',
    mapTitle: 'Nos encontramos en Zipaquirá',
    mapAddress: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca, Colombia',
    mapWaze: 'OBTENER DIRECCIONES EN WAZE',
    turismoEyebrow: 'ZIPAQUIRÁ DISTRITO TURÍSTICO',
    turismoTitle: 'Descubre la Capital Salinera de Colombia',
    footerSiguenos: 'SÍGUENOS',
    footerContacto: 'CONTÁCTANOS',
    footerHorario: 'Mar – Dom: 12:00 pm – 10:00 pm',
    footerDireccion: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca',
    footerCopy: `© ${new Date().getFullYear()} Salario de Zipa. Todos los derechos reservados.`,
    footerPrivacy: 'Política de Privacidad',
    footerTerms: 'Términos y Condiciones',
    footerReservas: 'Reservas',
  },
  en: {
    navInicio: 'HOME',
    navHistoria: 'HISTORY',
    navGaleria: 'GALLERY',
    navGastronomia: 'GASTRONOMY',
    navEventos: 'EVENTS',
    navContacto: 'CONTACT',
    navReservar: 'RESERVE TABLE',
    heroEyebrow: 'ZIPAQUIRÁ · COLOMBIA · SINCE 1930',
    heroH1: 'Where fire and tradition create experiences',
    heroBody: 'Signature gastronomy, a salt kiln active since 1930, and unique spaces for the moments that matter most.',
    heroReservar: 'RESERVE TABLE',
    heroMenu: 'VIEW MENU',
    poemEyebrow: 'SALARIO DE ZIPA',
    poemText: 'Since 1930, our house has preserved an invaluable piece of Zipaquirá\'s history. The ancient kilns and their distinctive salt-encrusted walls remain as silent witnesses to a legacy still felt in every corner.\n\nAt Salario, we chose to preserve that essence and share it around the table, creating an experience where gastronomy becomes a way to connect with the memory and tradition of Colombia\'s Salt Capital.',
    menuEyebrow: 'GASTRONOMY',
    menuTitle: 'House favorites',
    menuVerCompleto: 'VIEW FULL MENU →',
    menuFavoritos: 'HOUSE FAVORITES',
    videoEyebrow: 'OUR HISTORY',
    videoTitle: 'Where history lives on, around the table',
    videoCaption: 'Among kilns and walls laden with memory, scenes from El Milagro de Sal (1958) were filmed — considered one of the pioneering works of Colombian cinema and part of the national film heritage. A place where the history of Zipaquirá is not just told, but can still be lived.\n\nAn experience that connects flavors, tradition, and heritage in one of the most authentic settings in Colombia\'s Salt Capital.',
    historiaEyebrow: 'SINCE 1930',
    historiaTitle: 'A tradition alive since 1930',
    historiaBody: 'Salario de Zipa was born around the only active salt kiln since 1930 in Zipaquirá. Over eight decades of history, gastronomy and heritage that live on in every dish we serve.',
    historiaAnos: 'YEARS OF TRADITION',
    historiaPersonas: 'PERSON CAPACITY',
    historiaParq: 'PARKING SPACES',
    historiaBtn: 'DISCOVER OUR HISTORY →',
    galeriaEyebrow: 'GALLERY',
    galeriaTitle: 'Our gallery of moments',
    eventosEyebrow: 'EVENTS',
    eventosTitle: 'We celebrate your best moments',
    eventosBody1: 'Reserve a space with capacity for up to 800 guests and 200 parking spaces — make this space your most memorable experience.',
    eventosBody2: 'Weddings, birthdays, anniversaries and corporate gatherings all in one place.',
    eventosHighlight: 'Live band, professional lighting and signature gastronomy to awaken your best memories at our house.',
    eventosFeatures: 'LIVE BAND · PROFESSIONAL LIGHTING · SIGNATURE GASTRONOMY',
    eventosCotiza: 'QUOTE YOUR EVENT',
    reviewsTitle: 'What our visitors say',
    reviewsBadge: 'Reviews from Google',
    ctaEyebrow: 'RESERVE YOUR EXPERIENCE',
    ctaLine1: 'A table',
    ctaLine2: 'awaits you',
    ctaAddress: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca',
    ctaHours: 'Tuesday to Sunday: 12:00 pm – 10:00 pm',
    ctaPhone: '+57 322 604 8752',
    ctaReservar: 'RESERVE TABLE',
    ctaWhatsapp: 'WHATSAPP',
    mapEyebrow: 'HOW TO FIND US',
    mapTitle: 'We are located in Zipaquirá',
    mapAddress: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca, Colombia',
    mapWaze: 'GET DIRECTIONS IN WAZE',
    turismoEyebrow: 'ZIPAQUIRÁ TOURIST DISTRICT',
    turismoTitle: 'Discover the Salt Capital of Colombia',
    footerSiguenos: 'FOLLOW US',
    footerContacto: 'CONTACT US',
    footerHorario: 'Tue – Sun: 12:00 pm – 10:00 pm',
    footerDireccion: 'Cra. 7 #2-83, Zipaquirá, Cundinamarca',
    footerCopy: `© ${new Date().getFullYear()} Salario de Zipa. All rights reserved.`,
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms & Conditions',
    footerReservas: 'Reservations',
  },
}

/* ============================================================
   WORD BLUR COMPONENT
   ============================================================ */
interface WordBlurProps {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  goldWords?: string[]
  startDelay?: number
}

function WordBlur({ text, tag: Tag = 'h2', className, goldWords = [], startDelay = 0.4 }: WordBlurProps) {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {words.map((word, i) => {
        const isGold = goldWords.includes(word)
        return (
          <span
            key={i}
            className={`landing-word${isGold ? ' landing-word-gold' : ''}${revealed ? ' revealed' : ''}`}
            style={{
              transitionDelay: revealed ? `${startDelay + i * 0.05}s` : '0s',
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00a0' : ''}
          </span>
        )
      })}
    </Tag>
  )
}

/* ============================================================
   STAT COUNTER COMPONENT
   ============================================================ */
interface StatCounterProps {
  target: number
  suffix?: string
  label: string
}

function StatCounter({ target, suffix = '', label }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1200
          const steps = 60
          const increment = target / steps
          let current = 0
          let step = 0
          const timer = setInterval(() => {
            step++
            current = Math.min(Math.round(increment * step), target)
            setCount(current)
            if (step >= steps) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="landing-stat" ref={ref}>
      <span className="landing-stat-num">
        {count}{suffix}
      </span>
      <span className="landing-stat-label">{label}</span>
    </div>
  )
}

/* ============================================================
   DATA — defined outside component to avoid re-creation
   ============================================================ */

const menuItems = [
  { num: '01', category: 'ENTRADAS', name: 'Cacerola Nativa', desc: 'Selección de ingredientes tradicionales servida en cazuela de barro.', price: '$17.850', image: '/Menu/DSC_0095-Mejorado-NR-4-min.jpg' },
  { num: '02', category: 'ENTRADAS', name: 'Arepa de Choclo', desc: 'Arepa dulce de choclo tierno con queso y mantequilla.', price: '$23.100', image: '/Menu/_MG_1355.jpg' },
  { num: '03', category: 'ENTRADAS', name: 'Patacones x4', desc: 'Plátano verde frito con hogao y ají.', price: '$24.100', image: '/Menu/DSC_0065-Mejorado-NR-2-min.jpg' },
  { num: '04', category: 'ENTRADAS', name: 'Chicharrones Salario', desc: 'Crujientes chicharrones con nuestro toque especial de sal vigua.', price: '$34.500', image: '/Menu/DSC_0786-Mejorado-NR-2-min.jpg' },
  { num: '05', category: 'ENTRADAS', name: 'Plátano Maduro', desc: 'Plátano maduro frito con queso y salsa de tomate.', price: '$23.100', image: '/Menu/DSC_0015-Mejorado-NR-23-min.jpg' },
  { num: '06', category: 'PLATOS PRINCIPALES', name: 'Lomo al Trapo 300g', desc: 'Jugoso lomo de res envuelto en tela y cocido a la brasa.', price: '$89.250', image: '/Menu/DSC_0823-Mejorado-NR-5-min.jpg' },
  { num: '07', category: 'PLATOS PRINCIPALES', name: 'Costillitas de Cerdo 500g', desc: 'Costillas de cerdo a la BBQ con guarnición.', price: '$59.850', image: '/Menu/_MG_1420.jpg' },
  { num: '08', category: 'PLATOS PRINCIPALES', name: 'Chicharrón Carnudo 400g', desc: 'Chicharrón premium con carne, acompañamientos tradicionales.', price: '$51.450', image: '/Menu/_MG_1421.jpg' },
  { num: '09', category: 'PLATOS PRINCIPALES', name: 'Estofado de Res', desc: 'Tiras de res en salsa de vino tinto con vegetales.', price: '$66.200', image: '/Menu/DSC_0936-Mejorado-NR-16-min.jpg' },
  { num: '10', category: 'PLATOS PRINCIPALES', name: 'Bandeja Paisa', desc: 'La auténtica bandeja paisa con todos sus acompañamientos.', price: '$57.750', image: '/Menu/DSC_0930-Mejorado-NR-15-min.jpg' },
  { num: '11', category: 'PLATOS PRINCIPALES', name: 'Piquete de Pollo', desc: 'Pollo a la brasa con papa criolla y chicharrón.', price: '$54.600', image: '/Menu/SALARIO-16.jpg' },
  { num: '12', category: 'PLATOS PRINCIPALES', name: 'Mojarra Frita 500g', desc: 'Pescado fresco frito con patacones y ensalada.', price: '$55.650', image: '/Menu/_MG_5192.jpg' },
  { num: '13', category: 'PLATOS PRINCIPALES', name: 'Guiso de Arveja con Pata de Res', desc: 'Arveja verde con trozo de res, plato tradicional.', price: '$54.600', image: '/Menu/DSC_0155-Mejorado-NR-10-min.jpg' },
  { num: '14', category: 'PLATOS PRINCIPALES', name: 'Sartenada', desc: 'Mezcla de carnes a la plancha con vegetales.', price: '$33.100', image: '/Menu/_MG_1458.jpg' },
  { num: '15', category: 'SOPAS', name: 'Ajiaco Típico', desc: 'Ajiaco bogotano con tres tipos de papa, pollo y alcaparra.', price: '$43.100', image: '/Menu/_MG_5110.jpg' },
  { num: '16', category: 'SOPAS', name: 'Sancocho Trifásico', desc: 'Sancocho con tres carnes, mazorca y plátano.', price: '$55.650', image: '/Menu/DSC_0811-Mejorado-NR-4-min.jpg' },
  { num: '17', category: 'POSTRES', name: 'Torta de Almojábana', desc: 'Tradicional torta de queso y maíz.', price: '$22.050', image: '/Menu/SALARIO-68.jpg' },
  { num: '18', category: 'POSTRES', name: 'Cuajada con Melao', desc: 'Cuajada fresca con melao de panela.', price: '$18.900', image: '/Menu/SALARIO-83.jpg' },
  { num: '19', category: 'BEBIDAS', name: 'Soda Frutal Frutos Rojos', desc: 'Refrescante soda con frutos del bosque.', price: '$22.000', image: '/Menu/_MG_5254.jpg' },
  { num: '20', category: 'BEBIDAS', name: 'Cóctel Sal Vigua', desc: 'Tequila, carbón activado, limón, sal vigua y sirope de frutos rojos.', price: '$45.000', image: '/Menu/SALARIO-38.jpg' },
]

const eventosImages = [
  { src: '/Eventos/DSC_0841-Mejorado-NR-1.jpg', label: 'MATRIMONIOS', desc: 'Celebra el día más especial de tu vida en un entorno histórico único.' },
  { src: '/Eventos/_MG_0867.jpg', label: 'ANIVERSARIOS', desc: 'Cada año de amor merece ser celebrado con la grandeza que merece.' },
  { src: '/Eventos/DSCF4585.jpg', label: 'CELEBRACIONES', desc: 'Cualquier ocasión especial merece un escenario excepcional.' },
  { src: '/Eventos/DSC_0700-Mejorado-NR-34.jpg', label: 'EVENTOS CORPORATIVOS', desc: 'Espacios exclusivos para reuniones, lanzamientos y celebraciones empresariales.' },
  { src: '/Eventos/_MG_0827.jpg', label: 'INTEGRACIONES', desc: 'Honra el esfuerzo y el logro con una celebración a la altura del momento.' },
]

const galeriaImages = [
  { src: '/Galeria/_MG_0573copia.jpg', label: 'SALARIO' },
  { src: '/Galeria/_MG_0828.jpg', label: 'EXPERIENCIA' },
  { src: '/Galeria/_MG_2033 (1).jpg', label: 'TRADICIÓN' },
  { src: '/Galeria/DSC_0841-Mejorado-NR-1.jpg', label: 'CELEBRACIÓN' },
  { src: '/Galeria/SALARIO-83.jpg', label: 'PATRIMONIO' },
  { src: '/Galeria/WhatsApp Image 2026-06-25 at 11.58.35 (1).jpeg', label: 'MOMENTOS' },
  { src: '/Galeria/WhatsApp Image 2026-06-25 at 11.58.35.jpeg', label: 'RECUERDOS' },
  { src: '/Galeria/WhatsApp Image 2026-06-25 at 11.58.36.jpeg', label: 'HISTORIA' },
]

const turismoImages = [
  '/Turismo/_MG_2036.jpg',
  '/Turismo/_MG_2037.jpg',
  '/Turismo/_MG_2087.jpg',
  '/Turismo/_MG_2107d.jpg',
  '/Turismo/_MG_2124.jpg',
  '/Turismo/_MG_2136.jpg',
]

const googleReviews = [
  {
    name: 'Laura Martínez',
    rating: 5,
    text: 'Un lugar increíble, la comida es espectacular y el ambiente es único. El horno de sal le da un toque especial a todo. Definitivamente volveremos.',
    timeAgo: 'Hace 2 semanas',
    avatar: 'L',
  },
  {
    name: 'Andrés Rodríguez',
    rating: 5,
    text: 'Celebramos nuestro matrimonio aquí y fue perfecto. Capacidad para todos nuestros invitados, parqueadero amplio y la atención fue de primera.',
    timeAgo: 'Hace 1 mes',
    avatar: 'A',
  },
  {
    name: 'Patricia Gómez',
    rating: 5,
    text: 'La bandeja paisa y el lomo al trapo son de otro nivel. El restaurante tiene una historia fascinante con los hornos de sal desde 1930.',
    timeAgo: 'Hace 3 semanas',
    avatar: 'P',
  },
  {
    name: 'Juan Carlos Díaz',
    rating: 5,
    text: 'Excelente lugar para eventos corporativos. Organizamos nuestra integración empresarial con 300 personas y todo salió perfecto.',
    timeAgo: 'Hace 2 meses',
    avatar: 'J',
  },
  {
    name: 'María Fernanda López',
    rating: 5,
    text: 'Zipaquirá tiene una joya escondida. La gastronomía, el patrimonio y la atención hacen de este lugar algo incomparable. 100% recomendado.',
    timeAgo: 'Hace 1 semana',
    avatar: 'M',
  },
]

const eventoTipos = [
  { icon: '💍', name: 'MATRIMONIOS' },
  { icon: '🎂', name: 'CUMPLEAÑOS' },
  { icon: '💑', name: 'ANIVERSARIOS' },
  { icon: '🤝', name: 'INTEGRACIONES' },
  { icon: '🎓', name: 'GRADUACIONES' },
  { icon: '🎉', name: 'FIESTAS TEMÁTICAS' },
]

/* ============================================================
   WHATSAPP SVG PATH (reusable)
   ============================================================ */
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

/* ============================================================
   MAIN LANDING PAGE
   ============================================================ */
export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  const t = translations[lang]

  // Scroll reveal refs
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }, [])

  // Hovered menu item for menu section photo
  const [hoveredMenu, setHoveredMenu] = useState(0)

  // Hero images
  const heroImages = [
    { src: '/Instalaciones/DSC_0635-Mejorado-NR-8.jpg', alt: 'Interior Salario de Zipa', position: '30% center' },
    { src: '/Menu/SALARIO-68.jpg', alt: 'Salón Salario de Zipa', position: 'center center' },
    { src: '/Menu/DSC_0155-Mejorado-NR-10-min.jpg', alt: 'Ambiente del restaurante', position: 'center center' },
  ]
  const historiaImages = [
    { src: '/Instalaciones/SALARIO-51.jpg', alt: 'Historia Salario de Zipa' },
    { src: '/Instalaciones/_MG_0733.jpg', alt: 'Fachada Salario de Zipa' },
    { src: '/Menu/_MG_1421.jpg', alt: 'Comida Salario de Zipa' },
  ]

  // State
  const [heroSlide, setHeroSlide] = useState(0)
  const [historiaSlide, setHistoriaSlide] = useState(0)
  const [eventosSlide, setEventosSlide] = useState(0)
  const [galeriaSlide, setGaleriaSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', scrollY > 80)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Intersection observer for .ls-reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.ls-reveal')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-advance effects
  useEffect(() => {
    const t = setInterval(() => setHeroSlide(p => (p + 1) % heroImages.length), 5000)
    return () => clearInterval(t)
  }, [heroImages.length])

  useEffect(() => {
    const t = setInterval(() => setHistoriaSlide(p => (p + 1) % historiaImages.length), 4000)
    return () => clearInterval(t)
  }, [historiaImages.length])

  useEffect(() => {
    const t = setInterval(() => setEventosSlide(p => (p + 1) % eventosImages.length), 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setGaleriaSlide(p => (p + 1) % galeriaImages.length), 3500)
    return () => clearInterval(t)
  }, [])

  // 3D carousel helper for galeria
  const getGaleriaClass = (i: number): string => {
    const total = galeriaImages.length
    let diff = i - galeriaSlide
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    if (diff === 0) return 'is-active'
    if (diff === 1) return 'is-next'
    if (diff === -1) return 'is-prev'
    return 'is-hidden'
  }

  return (
    <div className="landing-root">

      {/* ============================================================
          NAVBAR
          ============================================================ */}
      <nav className="landing-nav" ref={navRef}>
        <div className="landing-nav-logo">
          <Image
            src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
            alt="Salario de Zipa"
            fill
            sizes="200px"
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </div>

        <ul className="landing-nav-links">
          <li><a href="#inicio">{t.navInicio}</a></li>
          <li><a href="#historia">{t.navHistoria}</a></li>
          <li><a href="#galeria">{t.navGaleria}</a></li>
          <li><a href="#gastronomia">{t.navGastronomia}</a></li>
          <li><a href="#eventos">{t.navEventos}</a></li>
          <li><a href="#contacto">{t.navContacto}</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="landing-btn-lang"
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#reservar" className="landing-btn-nav-cta">{t.navReservar}</a>
        </div>
      </nav>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="landing-hero" id="inicio">
        {/* Background carousel */}
        <div className="landing-hero-slides">
          {heroImages.map((img, i) => (
            <div key={i} className={`landing-hero-slide${heroSlide === i ? ' active' : ''}`}>
              <Image src={img.src} alt={img.alt} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: img.position }} priority={i === 0} />
            </div>
          ))}
        </div>
        {/* Gradient: dark left → transparent right */}
        <div className="landing-hero-gradient" />
        {/* Static text on left */}
        <div className="landing-hero-content">
          <span className="landing-hero-eyebrow">{t.heroEyebrow}</span>
          <WordBlur
            text={t.heroH1}
            tag="h1"
            className="landing-hero-h1"
            goldWords={['fuego', 'tradición', 'fire', 'tradition']}
            startDelay={0.4}
          />
          <p className="landing-hero-body">
            {t.heroBody}
          </p>
          <div className="landing-hero-actions">
            <a href="#reservar" className="landing-btn-glass">{t.heroReservar}</a>
            <a href="#gastronomia" className="landing-btn-outline">{t.heroMenu}</a>
          </div>
          {/* Slide dots */}
          <div className="landing-hero-dots">
            {heroImages.map((_, i) => (
              <button key={i} className={`landing-hero-dot${heroSlide === i ? ' active' : ''}`} onClick={() => setHeroSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>


      {/* ============================================================
          POEMA — Salario de Zipa
          ============================================================ */}
      <section className="landing-poem-section">
        {/* Left ornament */}
        <div className="landing-poem-ornament-side" aria-hidden="true">
          <div className="landing-poem-vline" />
          <span className="landing-poem-diamond">✦</span>
          <div className="landing-poem-vline" />
        </div>

        <div className="landing-poem-container ls-reveal" ref={addRevealRef}>
          <span className="landing-poem-eyebrow">{t.poemEyebrow}</span>
          {/* Top divider */}
          <div className="landing-poem-ornament-top" aria-hidden="true">
            <div className="landing-poem-hline" />
            <span className="landing-poem-star">✦</span>
            <div className="landing-poem-hline" />
          </div>
          <div className="landing-poem-text">
            {t.poemText.split('\n\n').map((para, i) => (
              <p key={i} style={i > 0 ? { marginTop: '1.5em' } : {}}>{para}</p>
            ))}
          </div>
          {/* Bottom divider */}
          <div className="landing-poem-ornament-top" aria-hidden="true">
            <div className="landing-poem-hline" />
            <span className="landing-poem-star">✦</span>
            <div className="landing-poem-hline" />
          </div>
        </div>

        {/* Right ornament */}
        <div className="landing-poem-ornament-side" aria-hidden="true">
          <div className="landing-poem-vline" />
          <span className="landing-poem-diamond">✦</span>
          <div className="landing-poem-vline" />
        </div>
      </section>

      {/* ============================================================
          GASTRONOMÍA / MENU — Savoria-style list with hover photo
          ============================================================ */}
      <section className="landing-menu-section" id="gastronomia">
        {/* Full-width header */}
        <div className="landing-menu-header ls-reveal" ref={addRevealRef}>
          <p className="landing-menu-eyebrow">{t.menuEyebrow}</p>
          <WordBlur
            text={t.menuTitle}
            tag="h2"
            className="landing-menu-title"
          />
        </div>

        {/* Mobile photo panel */}
        <div className="landing-menu-mobile-photo-wrap">
          {[0, 3, 5, 6, 14, 19].map((idx, listPos) => (
            <div key={idx} className={`landing-menu-photo${hoveredMenu === listPos ? ' visible' : ''}`}>
              <Image src={menuItems[idx].image} alt={menuItems[idx].name} fill sizes="100vw" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* Two-column layout — featured items only */}
        <div className="landing-menu-body-layout">
          {/* Left: item list */}
          <div className="landing-menu-list">
            <div className="landing-menu-cta-wrap landing-menu-cta-top">
              <a href="/2025%20-%202026%20CARTA%20SALARIO.pdf.pdf" target="_blank" rel="noopener noreferrer" className="landing-btn-glass">{t.menuVerCompleto}</a>
            </div>
            <div className="landing-menu-category-label">{t.menuFavoritos}</div>
            {[0, 3, 5, 6, 14, 19].map((idx, listPos) => {
              const item = menuItems[idx]
              return (
                <div key={idx}>
                  <div
                    className={`landing-menu-row${hoveredMenu === listPos ? ' active' : ''}`}
                    onMouseEnter={() => setHoveredMenu(listPos)}
                  >
                    <span className="landing-menu-row-num">{item.num}</span>
                    <div className="landing-menu-row-info">
                      <span className="landing-menu-row-name">{item.name}</span>
                      <span className="landing-menu-row-desc">{item.desc}</span>
                    </div>
                    <span className="landing-menu-row-price">{item.price}</span>
                    <span className="landing-menu-row-arrow">→</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: sticky photo panel */}
          <div className="landing-menu-photo-panel">
            {[0, 3, 5, 6, 14, 19].map((idx, listPos) => (
              <div
                key={idx}
                className={`landing-menu-photo${hoveredMenu === listPos ? ' visible' : ''}`}
              >
                <Image
                  src={menuItems[idx].image}
                  alt={menuItems[idx].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          VIDEO SECTION
          ============================================================ */}
      <section className="landing-video-section">
        <div className="landing-video-header ls-reveal" ref={addRevealRef}>
          <p className="landing-video-eyebrow">{t.videoEyebrow}</p>
          <WordBlur
            text={t.videoTitle}
            tag="h2"
            className="landing-video-title"
          />
        </div>
        <div className="landing-video-wrap">
          <div className="landing-video-shadow-left" />
          <div className="landing-video-shadow-right" />
          <video
            className="landing-video-iframe"
            src="/Instalaciones/Video Landing Salario.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <p className="landing-video-caption">
          {t.videoCaption.split('\n\n').map((para, i) => (
            <span key={i}>
              {i > 0 && <><br /><br /></>}
              {para}
            </span>
          ))}
        </p>
      </section>

      {/* ============================================================
          HISTORIA
          ============================================================ */}
      <section className="landing-historia-section" id="historia">
        <div className="landing-historia-left">
          <div className="landing-historia-slideshow">
            {historiaImages.map((img, i) => (
              <div key={i} className={`landing-historia-slide${historiaSlide === i ? ' active' : ''}`}>
                <Image src={img.src} alt={img.alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
            <div className="landing-historia-slide-dots">
              {historiaImages.map((_, i) => (
                <button key={i} className={`landing-historia-dot${historiaSlide === i ? ' active' : ''}`} onClick={() => setHistoriaSlide(i)} aria-label={`Foto ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="landing-historia-right ls-reveal" ref={addRevealRef}>
          <span className="landing-historia-eyebrow">{t.historiaEyebrow}</span>
          <WordBlur
            text={t.historiaTitle}
            tag="h2"
            className="landing-historia-title"
          />
          <p className="landing-historia-body">
            {t.historiaBody}
          </p>
          <div className="landing-stats">
            <StatCounter target={85} suffix="+" label={t.historiaAnos} />
            <StatCounter target={800} suffix="+" label={t.historiaPersonas} />
            <StatCounter target={200} suffix="+" label={t.historiaParq} />
          </div>
          <a href="#historia" className="landing-btn-glass">{t.historiaBtn}</a>
        </div>
      </section>

      {/* ============================================================
          GALERÍA — 3D carousel
          ============================================================ */}
      <section className="landing-eventos-section" id="galeria">
        <div className="landing-eventos-header ls-reveal" ref={addRevealRef}>
          <p className="landing-eventos-eyebrow">{t.galeriaEyebrow}</p>
          <WordBlur
            text={t.galeriaTitle}
            tag="h2"
            className="landing-eventos-title"
          />
        </div>

        <div className="landing-eventos-3d-stage">
          {galeriaImages.map((m, i) => (
            <div
              key={i}
              className={`landing-evento-card-3d ${getGaleriaClass(i)}`}
              onClick={() => setGaleriaSlide(i)}
            >
              <Image src={m.src} alt={m.label} fill sizes="460px" style={{ objectFit: 'cover' }} />
              <div className="landing-evento-overlay" />
              <div className="landing-evento-info">
                <span className="landing-evento-label">{m.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="landing-eventos-footer">
          <div className="landing-eventos-arrows">
            <button
              className="landing-evento-arrow"
              onClick={() => setGaleriaSlide(p => (p - 1 + galeriaImages.length) % galeriaImages.length)}
              aria-label="Anterior"
            >←</button>
            <div className="landing-eventos-dots">
              {galeriaImages.map((m, i) => (
                <button
                  key={i}
                  className={`landing-evento-dot${galeriaSlide === i ? ' active' : ''}`}
                  onClick={() => setGaleriaSlide(i)}
                  aria-label={m.label}
                />
              ))}
            </div>
            <button
              className="landing-evento-arrow"
              onClick={() => setGaleriaSlide(p => (p + 1) % galeriaImages.length)}
              aria-label="Siguiente"
            >→</button>
          </div>
        </div>
      </section>

      {/* ============================================================
          EVENTOS — Andres Carne de Res inspired
          Text/cards left + photo carousel right + WhatsApp CTA
          ============================================================ */}
      <section className="landing-new-eventos-section" id="eventos">
        <div className="landing-new-eventos-content ls-reveal" ref={addRevealRef}>
          <span className="landing-new-eventos-eyebrow">{t.eventosEyebrow}</span>
          <h2 className="landing-new-eventos-title">{t.eventosTitle}</h2>

          {/* Event type cards */}
          <div className="landing-eventos-cards-grid">
            {eventoTipos.map((tipo, i) => (
              <div key={i} className="landing-evento-tipo-card">
                <span className="landing-evento-tipo-icon">{tipo.icon}</span>
                <span className="landing-evento-tipo-name">{tipo.name}</span>
              </div>
            ))}
          </div>

          <p className="landing-new-eventos-body">
            {t.eventosBody1.replace('800', '<strong>800</strong>').replace('200', '<strong>200</strong>')}
          </p>
          <p className="landing-new-eventos-body">
            {t.eventosBody2}
          </p>
          <p className="landing-new-eventos-body landing-new-eventos-highlight">
            {t.eventosHighlight}
          </p>
          <p className="landing-new-eventos-features">
            {t.eventosFeatures}
          </p>
          <p className="landing-new-eventos-body" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(240,230,216,0.75)', marginTop: '-8px' }}>
            HASTA 800 INVITADOS · 200 PARQUEADEROS
          </p>
          <a
            href="https://wa.me/573226048752?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento%20en%20Salario%20de%20Zipa"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-btn-whatsapp landing-btn-whatsapp-evento"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d={WA_PATH} />
            </svg>
            {t.eventosCotiza}
          </a>
        </div>

        <div className="landing-new-eventos-carousel">
          {eventosImages.map((m, i) => (
            <div
              key={i}
              className={`landing-new-eventos-slide${eventosSlide === i ? ' active' : ''}`}
            >
              <Image src={m.src} alt={m.label} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <div className="landing-evento-overlay" />
              <div className="landing-evento-info">
                <span className="landing-evento-label">{m.label}</span>
                <p className="landing-evento-desc">{m.desc}</p>
              </div>
            </div>
          ))}
          <div className="landing-new-eventos-nav">
            <button
              className="landing-evento-arrow"
              onClick={() => setEventosSlide(p => (p - 1 + eventosImages.length) % eventosImages.length)}
              aria-label="Anterior"
            >←</button>
            <button
              className="landing-evento-arrow"
              onClick={() => setEventosSlide(p => (p + 1) % eventosImages.length)}
              aria-label="Siguiente"
            >→</button>
          </div>
        </div>
      </section>

      {/* ============================================================
          GOOGLE REVIEWS
          ============================================================ */}
      <section className="landing-reviews-section">
        <div className="landing-reviews-header ls-reveal" ref={addRevealRef}>
          <div className="landing-reviews-google-badge">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="landing-reviews-google-text">{t.reviewsBadge}</span>
          </div>
          <WordBlur
            text={t.reviewsTitle}
            tag="h2"
            className="landing-reviews-title"
          />
        </div>

        <div className="landing-reviews-grid">
          {googleReviews.map((r, i) => (
            <div key={i} className="landing-review-card ls-reveal" ref={addRevealRef}>
              <div className="landing-review-top">
                <div className="landing-review-avatar">{r.avatar}</div>
                <div className="landing-review-author">
                  <span className="landing-review-name">{r.name}</span>
                  <span className="landing-review-time">{r.timeAgo}</span>
                </div>
                <svg className="landing-review-google-icon" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="landing-review-stars">
                {[...Array(r.rating)].map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="landing-review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA RESERVA
          ============================================================ */}
      <section className="landing-cta-section" id="reservar">
        <div className="landing-cta-bg">
          <Image
            src="/Instalaciones/_MG_2087.jpg"
            alt="Reserva en Salario de Zipa"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="landing-cta-overlay" />
        {/* Decorative border frame */}
        <div className="landing-cta-frame" />
        <div className="landing-cta-content ls-reveal" ref={addRevealRef}>
          <span className="landing-cta-eyebrow">
            <span className="cta-line" />
            {t.ctaEyebrow}
            <span className="cta-line" />
          </span>
          <h2 className="landing-cta-title">
            <span className="cta-title-line1">{t.ctaLine1}</span>
            <span className="cta-title-line2">{t.ctaLine2}</span>
          </h2>
          <p className="landing-cta-body">
            {t.ctaAddress}<br />
            {t.ctaHours}<br />
            {t.ctaPhone}
          </p>
          <div className="landing-cta-divider" />
          <div className="landing-cta-actions">
            <a href="tel:+573226048752" className="landing-btn-glass landing-btn-glass-cta">{t.ctaReservar}</a>
            <a
              href="https://wa.me/573226048752?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20Salario%20de%20Zipa"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn-whatsapp landing-btn-whatsapp-cta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={WA_PATH} />
              </svg>
              {t.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAPA — Google Maps + Waze
          ============================================================ */}
      <section className="landing-map-section">
        <div className="landing-map-header ls-reveal" ref={addRevealRef}>
          <span className="landing-map-eyebrow">{t.mapEyebrow}</span>
          <h2 className="landing-map-title">{t.mapTitle}</h2>
          <p className="landing-map-address">{t.mapAddress}</p>
        </div>
        <div className="landing-map-wrap">
          <iframe
            src="https://maps.google.com/maps?q=Cra+7+%232-83+Zipaquirá+Cundinamarca+Colombia&output=embed&hl=es&z=16"
            title="Ubicación Salario de Zipa"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="landing-map-cta">
          <a
            href="https://waze.com/ul?q=Cra+7+%232-83+Zipaquirá+Cundinamarca+Colombia&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-btn-waze"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.54 6.63C19.38 4.46 17.39 2.86 15 2.25 12.56 1.63 10 2.03 7.92 3.37 5.84 4.71 4.38 6.82 3.92 9.26c-.46 2.44.1 4.97 1.54 7.02L3 22l5.87-1.42c1.37.72 2.91 1.1 4.47 1.1h.01c2.29 0 4.52-.78 6.31-2.21 1.79-1.43 3-3.45 3.41-5.67.41-2.22-.05-4.52-1.53-6.17zm-8.2 12.24h-.01c-1.37 0-2.72-.38-3.9-1.1l-.28-.17-2.89.7.74-2.81-.18-.29c-.81-1.28-1.24-2.76-1.24-4.28 0-4.37 3.57-7.93 7.94-7.93 2.12 0 4.11.82 5.61 2.32 1.5 1.49 2.33 3.48 2.33 5.6-.01 4.37-3.57 7.96-8.12 7.96zm4.35-5.95c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.09.16 1.5.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
            </svg>
            {t.mapWaze}
          </a>
        </div>
      </section>

      {/* ============================================================
          TURISMO ZIPAQUIRÁ — Carousel
          ============================================================ */}
      <section className="landing-turismo-section">
        <div className="landing-turismo-header ls-reveal" ref={addRevealRef}>
          <span className="landing-turismo-eyebrow">{t.turismoEyebrow}</span>
          <WordBlur
            text={t.turismoTitle}
            tag="h2"
            className="landing-turismo-title"
          />
        </div>

        <div className="landing-staff-carousel-wrap">
          <div className="landing-staff-carousel">
            {[...turismoImages, ...turismoImages].map((src, i) => (
              <div key={i} className="landing-turismo-card">
                <Image
                  src={src}
                  alt={`Zipaquirá turismo ${(i % turismoImages.length) + 1}`}
                  fill
                  sizes="340px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="landing-staff-card-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER — Dark brick background with prominent socials
          ============================================================ */}
      <footer className="landing-footer" id="contacto">
        <div className="landing-footer-top">
          {/* Logo */}
          <div className="landing-footer-logo">
            <Image
              src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
              alt="Salario de Zipa"
              fill
              sizes="140px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>

          {/* CONTÁCTANOS */}
          <div className="landing-footer-contact">
            <span className="landing-footer-contact-title">{t.footerContacto}</span>
            <a href="tel:+573226048752" className="landing-footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="landing-footer-contact-phone">+57 322 604 8752</span>
            </a>
            <span className="landing-footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t.footerDireccion}
            </span>
            <span className="landing-footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
              </svg>
              {t.footerHorario}
            </span>
          </div>

          {/* SÍGUENOS — Large social buttons */}
          <div>
            <p className="landing-footer-socials-heading">{t.footerSiguenos}</p>
            <div className="landing-footer-socials-large">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-footer-social-large"
                aria-label="Instagram"
              >
                <div className="landing-footer-social-icon ig">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <span className="landing-footer-social-label">INSTAGRAM</span>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-footer-social-large"
                aria-label="Facebook"
              >
                <div className="landing-footer-social-icon fb">
                  <svg viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="landing-footer-social-label">FACEBOOK</span>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/573226048752"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-footer-social-large"
                aria-label="WhatsApp"
              >
                <div className="landing-footer-social-icon wa">
                  <svg viewBox="0 0 24 24">
                    <path d={WA_PATH} />
                  </svg>
                </div>
                <span className="landing-footer-social-label">WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span className="landing-footer-copy">
            {t.footerCopy}
          </span>
          <ul className="landing-footer-links">
            <li><a href="#">{t.footerPrivacy}</a></li>
            <li><a href="#">{t.footerTerms}</a></li>
            <li><a href="#">{t.footerReservas}</a></li>
          </ul>
        </div>
      </footer>

      {/* ============================================================
          FLOATING WHATSAPP FAB — bigger
          ============================================================ */}
      <a
        href="https://wa.me/573226048752?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20Salario%20de%20Zipa"
        target="_blank"
        rel="noopener noreferrer"
        className="landing-whatsapp-fab"
        aria-label="Chatea con nosotros en WhatsApp"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d={WA_PATH} />
        </svg>
      </a>

    </div>
  )
}
