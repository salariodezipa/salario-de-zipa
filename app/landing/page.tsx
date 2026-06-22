'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import './landing.css'

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
const tickerText = [
  'Lomo al Trapo',
  '✦',
  'Chicharrón Carnudo',
  '✦',
  'Costillitas de Cerdo',
  '✦',
  'Bandeja Paisa',
  '✦',
  'Ajiaco Bogotano',
  '✦',
  'Sancocho Trifásico',
  '✦',
  'Mojarra Frita',
  '✦',
  'Estofado de Res',
]

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

const staffImages = [
  '/Personal/DSC_0747-Mejorado-NR-4.jpg',
  '/Personal/DSC_0755-Mejorado-NR-5.jpg',
  '/Personal/DSC_0866-Mejorado-NR-10.jpg',
]

const momentos = [
  { src: '/Momentos/DSC_0841-Mejorado-NR-1.jpg', label: 'MATRIMONIOS', desc: 'Celebra el día más especial de tu vida en un entorno histórico único.' },
  { src: '/Momentos/DSC_0872-Mejorado-NR-5.jpg', label: 'EVENTOS CORPORATIVOS', desc: 'Espacios exclusivos para reuniones, lanzamientos y celebraciones empresariales.' },
  { src: '/Momentos/DSCF4570.jpg', label: 'CELEBRACIONES', desc: 'Cualquier ocasión especial merece un escenario excepcional.' },
  { src: '/Momentos/_MG_0860.jpg', label: 'GRADUACIONES', desc: 'Honra el esfuerzo y el logro con una celebración a la altura del momento.' },
  { src: '/Momentos/_MG_0867.jpg', label: 'ANIVERSARIOS', desc: 'Cada año de amor merece ser celebrado con la grandeza que merece.' },
  { src: '/Momentos/editar(27).jpg', label: 'BAUTIZOS', desc: 'Los primeros momentos de vida merecen el ambiente más acogedor.' },
]

const testimonios = [
  {
    initial: 'M',
    name: 'Mariana G.',
    role: 'Bogotá, Colombia',
    title: 'Una experiencia que despierta los sentidos',
    quote: 'El lugar más mágico para celebrar. La atmósfera es única, la comida increíble y el personal hace que cada detalle sea perfecto.',
    image: '/Momentos/_MG_0860.jpg',
  },
  {
    initial: 'C',
    name: 'Carlos R.',
    role: 'Medellín, Colombia',
    title: 'Gastronomía auténtica y sin igual',
    quote: 'Celebramos nuestro aniversario aquí y fue una experiencia que nunca olvidaremos. El horno de sal es simplemente espectacular.',
    image: '/Momentos/_MG_0774.jpg',
  },
  {
    initial: 'A',
    name: 'Ana María P.',
    role: 'Cali, Colombia',
    title: 'El escenario perfecto para celebrar',
    quote: 'Organizamos la boda de nuestra hija en Salario y todo fue perfecto. Espacios hermosos, gastronomía excepcional y atención impecable.',
    image: '/Momentos/_MG_0771.jpg',
  },
]

/* ============================================================
   MAIN LANDING PAGE
   ============================================================ */
export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null)

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
    { src: '/Instalaciones/DSC_0663-Mejorado-NR-20.jpg', alt: 'Interior Salario de Zipa' },
    { src: '/Instalaciones/DSC_0635-Mejorado-NR-8.jpg', alt: 'Salón Salario de Zipa' },
    { src: '/Menu/DSC_0155-Mejorado-NR-10-min.jpg', alt: 'Ambiente del restaurante' },
  ]
  const historiaImages = [
    { src: '/_MG_0793.jpg', alt: 'Historia Salario de Zipa' },
    { src: '/Instalaciones/_MG_0733.jpg', alt: 'Fachada Salario de Zipa' },
  ]

  // State
  const [heroSlide, setHeroSlide] = useState(0)
  const [historiaSlide, setHistoriaSlide] = useState(0)
  const [eventosSlide, setEventosSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Navbar glass
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
    const t = setInterval(() => setEventosSlide(p => (p + 1) % momentos.length), 3500)
    return () => clearInterval(t)
  }, [])

  // 3D carousel helper
  const getEventoClass = (i: number): string => {
    const total = momentos.length
    let diff = i - eventosSlide
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    if (diff === 0) return 'is-active'
    if (diff === 1) return 'is-next'
    if (diff === -1) return 'is-prev'
    return 'is-hidden'
  }

  // Track which categories have already been rendered as labels
  const renderedCategories = new Set<string>()

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
          <li><a href="#inicio">INICIO</a></li>
          <li><a href="#historia">HISTORIA</a></li>
          <li><a href="#gastronomia">GASTRONOMÍA</a></li>
          <li><a href="#eventos">EVENTOS</a></li>
          <li><a href="#contacto">CONTACTO</a></li>
        </ul>

        <a href="#reservar" className="landing-btn-nav-cta">RESERVAR MESA</a>
      </nav>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="landing-hero" id="inicio">
        {/* Background carousel */}
        <div className="landing-hero-slides">
          {heroImages.map((img, i) => (
            <div key={i} className={`landing-hero-slide${heroSlide === i ? ' active' : ''}`}>
              <Image src={img.src} alt={img.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} priority={i === 0} />
            </div>
          ))}
        </div>
        {/* Gradient: dark left → transparent right */}
        <div className="landing-hero-gradient" />
        {/* Static text on left */}
        <div className="landing-hero-content">
          <span className="landing-hero-eyebrow">ZIPAQUIRÁ · COLOMBIA · DESDE 1939</span>
          <WordBlur
            text="Donde el fuego y la tradición crean experiencias"
            tag="h1"
            className="landing-hero-h1"
            goldWords={['fuego', 'tradición']}
            startDelay={0.4}
          />
          <p className="landing-hero-body">
            Gastronomía de autor, horno de sal vigente desde 1939, y espacios únicos para los momentos que más importan.
          </p>
          <div className="landing-hero-actions">
            <a href="#reservar" className="landing-btn-glass">RESERVAR MESA</a>
            <a href="#gastronomia" className="landing-btn-outline">CONOCER MENÚ</a>
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
          MARQUEE TICKER
          ============================================================ */}
      <section className="landing-ticker-section">
        <div className="landing-ticker-track">
          {[...tickerText, ...tickerText].map((item, i) => (
            <span key={i} className="landing-ticker-item">{item}</span>
          ))}
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
          <span className="landing-poem-eyebrow">SALARIO DE ZIPA</span>
          {/* Top divider */}
          <div className="landing-poem-ornament-top" aria-hidden="true">
            <div className="landing-poem-hline" />
            <span className="landing-poem-star">✦</span>
            <div className="landing-poem-hline" />
          </div>
          <div className="landing-poem-text">
            <p>Desde 1939, este lugar ha guardado una parte invaluable de la historia de Zipaquirá. Los antiguos hornos y sus característicos muros de sal permanecen como testigos silenciosos de un legado que aún se respira en cada espacio.

              En Salario, decidimos preservar esa esencia y compartirla alrededor de la mesa, creando una experiencia donde la gastronomía se convierte en una forma de conectar con la memoria y la tradición de la Capital Salinera de Colombia.
            </p>
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
          <p className="landing-menu-eyebrow">GASTRONOMÍA</p>
          <WordBlur
            text="Sabores que cuentan nuestra historia"
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
            {[0, 3, 5, 6, 14, 19].map((idx, listPos) => {
              const item = menuItems[idx]
              const showCategory = !renderedCategories.has(item.category)
              if (showCategory) renderedCategories.add(item.category)
              return (
                <div key={idx}>
                  {showCategory && (
                    <div className="landing-menu-category-label">{item.category}</div>
                  )}
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
            <div className="landing-menu-cta-wrap">
              <a href="/2025%20-%202026%20CARTA%20SALARIO.pdf.pdf" target="_blank" rel="noopener noreferrer" className="landing-btn-glass">VER MENÚ COMPLETO →</a>
            </div>
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
          <p className="landing-video-eyebrow">NUESTRA HISTORIA</p>
          <WordBlur
            text="Conócenos en video"
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
          <span className="landing-historia-eyebrow">DESDE 1939</span>
          <WordBlur
            text="Tradición que sigue viva desde 1939"
            tag="h2"
            className="landing-historia-title"
          />
          <p className="landing-historia-body">
            Salario de Zipa nació alrededor del único horno de sal activo desde 1939 en Zipaquirá. Más de ocho décadas de historia, gastronomía y patrimonio que continúan vivos en cada plato que servimos.
          </p>
          <div className="landing-stats">
            <StatCounter target={85} suffix="+" label="AÑOS DE TRADICIÓN" />
            <StatCounter target={800} suffix="+" label="PERSONAS CAPACITY" />
            <StatCounter target={200} suffix="+" label="PARQUEADEROS" />
          </div>
          <a href="#historia" className="landing-btn-glass">CONOCE NUESTRA HISTORIA →</a>
        </div>
      </section>

      {/* ============================================================
          EVENTOS / MOMENTOS — 3D carousel
          ============================================================ */}
      <section className="landing-eventos-section" id="eventos">
        {/* Centered header */}
        <div className="landing-eventos-header ls-reveal" ref={addRevealRef}>
          <p className="landing-eventos-eyebrow">CELEBRA CON NOSOTROS</p>
          <WordBlur
            text="Tus momentos más especiales"
            tag="h2"
            className="landing-eventos-title"
          />
          <p className="landing-eventos-body">
            Salario de Zipa es el escenario perfecto para cada celebración. Nuestros espacios únicos, gastronomía excepcional y atención dedicada hacen de cada evento una experiencia memorable.
          </p>
        </div>

        {/* 3D stage */}
        <div className="landing-eventos-3d-stage">
          {momentos.map((m, i) => (
            <div
              key={i}
              className={`landing-evento-card-3d ${getEventoClass(i)}`}
              onClick={() => setEventosSlide(i)}
            >
              <Image src={m.src} alt={m.label} fill sizes="460px" style={{ objectFit: 'cover' }} />
              <div className="landing-evento-overlay" />
              <div className="landing-evento-info">
                <span className="landing-evento-label">{m.label}</span>
                <p className="landing-evento-desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: dots + arrows + CTA */}
        <div className="landing-eventos-footer">
          <div className="landing-eventos-arrows">
            <button
              className="landing-evento-arrow"
              onClick={() => setEventosSlide(p => (p - 1 + momentos.length) % momentos.length)}
              aria-label="Anterior"
            >←</button>
            <div className="landing-eventos-dots">
              {momentos.map((m, i) => (
                <button
                  key={i}
                  className={`landing-evento-dot${eventosSlide === i ? ' active' : ''}`}
                  onClick={() => setEventosSlide(i)}
                  aria-label={m.label}
                />
              ))}
            </div>
            <button
              className="landing-evento-arrow"
              onClick={() => setEventosSlide(p => (p + 1) % momentos.length)}
              aria-label="Siguiente"
            >→</button>
          </div>
          <a href="#reservar" className="landing-btn-glass">PLANEAR UN EVENTO →</a>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIOS
          ============================================================ */}
      <section className="landing-testimonios-section">
        <div className="landing-testimonios-header ls-reveal" ref={addRevealRef}>
          <div className="landing-testimonios-header-left">
            <span className="landing-testimonios-line" />
            <h2 className="landing-testimonios-heading">Lo que dicen nuestros invitados</h2>
          </div>
          <p className="landing-testimonios-subtitle">
            Cada visita a Salario de Zipa se convierte en un recuerdo imborrable.
            Experiencias que hablan por sí solas.
          </p>
        </div>

        <div className="landing-testimonios-grid">
          {testimonios.map((t, i) => (
            <div key={i} className="landing-testimonio-card ls-reveal" ref={addRevealRef}>
              {/* Author top */}
              <div className="landing-testimonio-author-top">
                <div className="landing-testimonio-avatar">{t.initial}</div>
                <div className="landing-testimonio-info">
                  <span className="landing-testimonio-name">{t.name}</span>
                  <span className="landing-testimonio-role">{t.role}</span>
                </div>
              </div>
              {/* Food photo */}
              <div className="landing-testimonio-img">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* Stars */}
              <div className="landing-testimonio-stars">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              {/* Bold title */}
              <h3 className="landing-testimonio-title">{t.title}</h3>
              {/* Quote */}
              <p className="landing-testimonio-quote">{t.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          STAFF GALLERY
          ============================================================ */}
      <section className="landing-staff-section">
        <div className="landing-staff-header ls-reveal" ref={addRevealRef}>
          <p className="landing-staff-eyebrow">NUESTRO EQUIPO</p>
          <WordBlur
            text="Las personas detrás de cada experiencia"
            tag="h2"
            className="landing-staff-title"
          />
        </div>

        <div className="landing-staff-carousel-wrap">
          <div className="landing-staff-carousel">
            {[...staffImages, ...staffImages].map((src, i) => (
              <div key={i} className="landing-staff-carousel-card">
                <Image
                  src={src}
                  alt={`Miembro del equipo Salario ${(i % staffImages.length) + 1}`}
                  fill
                  sizes="240px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="landing-staff-card-overlay" />
              </div>
            ))}
          </div>
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
        {/* Decorative gold border frame */}
        <div className="landing-cta-frame" />
        <div className="landing-cta-content ls-reveal" ref={addRevealRef}>
          <span className="landing-cta-eyebrow">
            <span className="cta-line" />
            RESERVA TU EXPERIENCIA
            <span className="cta-line" />
          </span>
          <h2 className="landing-cta-title">
            <span className="cta-title-line1">Una mesa</span>
            <span className="cta-title-line2">te espera</span>
          </h2>
          <p className="landing-cta-body">
            Cra. 7 #2-83, Zipaquirá, Cundinamarca<br />
            Martes a domingo: 12:00 pm – 10:00 pm<br />
            +57 315 892 7463
          </p>
          <div className="landing-cta-divider" />
          <div className="landing-cta-actions">
            <a href="tel:+573158927463" className="landing-btn-glass landing-btn-glass-cta">RESERVAR MESA</a>
            <a
              href="https://wa.me/573158927463?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20Salario%20de%20Zipa"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn-whatsapp landing-btn-whatsapp-cta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAPA — Google Maps + Waze
          ============================================================ */}
      <section className="landing-map-section">
        <div className="landing-map-header ls-reveal" ref={addRevealRef}>
          <span className="landing-map-eyebrow">CÓMO LLEGARNOS</span>
          <h2 className="landing-map-title">Nos encontramos en Zipaquirá</h2>
          <p className="landing-map-address">Cra. 7 #2-83, Zipaquirá, Cundinamarca, Colombia</p>
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
            OBTENER DIRECCIONES EN WAZE
          </a>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="landing-footer" id="contacto">
        <div className="landing-footer-top">
          <div className="landing-footer-logo">
            <Image
              src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
              alt="Salario de Zipa"
              fill
              sizes="100px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>

          <div className="landing-footer-socials">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-social-link"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-social-link"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/573158927463"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-footer-social-link"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span className="landing-footer-copy">
            © {new Date().getFullYear()} Salario de Zipa. Todos los derechos reservados.
          </span>
          <ul className="landing-footer-links">
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Reservas</a></li>
          </ul>
        </div>
      </footer>

      {/* ============================================================
          FLOATING WHATSAPP FAB
          ============================================================ */}
      <a
        href="https://wa.me/573158927463?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20Salario%20de%20Zipa"
        target="_blank"
        rel="noopener noreferrer"
        className="landing-whatsapp-fab"
        aria-label="Chatea con nosotros en WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  )
}
