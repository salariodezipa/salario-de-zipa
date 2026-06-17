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
   MAIN LANDING PAGE
   ============================================================ */
export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null)
  const historiaImgRef = useRef<HTMLDivElement>(null)

  // Scroll reveal refs
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }, [])

  // Hovered menu item for menu section photo
  const [hoveredMenu, setHoveredMenu] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Navbar glass
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', scrollY > 80)
      }

      // Historia parallax
      if (historiaImgRef.current) {
        const sectionTop = historiaImgRef.current.closest<HTMLElement>('.landing-historia-section')?.offsetTop ?? 0
        const parallax = (scrollY - sectionTop) * 0.15
        const imgEl = historiaImgRef.current.querySelector<HTMLElement>('img')
        if (imgEl) {
          imgEl.style.transform = `translateY(${parallax}px)`
        }
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

  const ambienceImages = [
    { src: '/Instalaciones/DSC_0635-Mejorado-NR-8.jpg', alt: 'Salón Salario de Zipa' },
    { src: '/Instalaciones/_MG_2033.jpg', alt: 'Detalle del espacio' },
    { src: '/Instalaciones/_MG_2036.jpg', alt: 'Interior del restaurante' },
    { src: '/Instalaciones/_MG_2087.jpg', alt: 'Ambiente del restaurante' },
    { src: '/Instalaciones/_MG_2096h.jpg', alt: 'Vista del salón' },
    { src: '/Instalaciones/DSC_0668-Mejorado-NR-21.jpg', alt: 'Instalaciones Salario' },
    { src: '/Instalaciones/SALARIO-134.jpg', alt: 'Espacios Salario' },
    { src: '/Instalaciones/SALARIO-136.jpg', alt: 'Detalles Salario' },
    { src: '/Instalaciones/DSC_0663-Mejorado-NR-20.jpg', alt: 'Exterior Salario de Zipa' },
    { src: '/Instalaciones/_MG_2098.jpg', alt: 'Instalaciones Salario de Zipa' },
    { src: '/Instalaciones/SALARIO-51.jpg', alt: 'Fachada Salario de Zipa' },
    { src: '/Instalaciones/DSC_0700-Mejorado-NR-34.jpg', alt: 'Interior Salario de Zipa' },
  ]

  const staffImages = [
    '/Trabajadores Salario/_MG_0342.jpg',
    '/Trabajadores Salario/_MG_0749.jpg',
    '/Trabajadores Salario/_MG_0761.jpg',
    '/Trabajadores Salario/_MG_0793.jpg',
    '/Trabajadores Salario/_MG_0798.jpg',
    '/Trabajadores Salario/_MG_0941.jpg',
    '/Trabajadores Salario/DSC_0023-Mejorado-NR-17.jpg',
    '/Trabajadores Salario/DSC_0139-Mejorado-NR-3.jpg',
    '/Trabajadores Salario/DSC_0366-Mejorado-NR-9.jpg',
    '/Trabajadores Salario/DSC_0747-Mejorado-NR-4.jpg',
    '/Trabajadores Salario/DSC_0755-Mejorado-NR-5.jpg',
    '/Trabajadores Salario/DSC_0778-Mejorado-NR-7.jpg',
    '/Trabajadores Salario/DSC_0866-Mejorado-NR-10.jpg',
  ]

  const momentos = [
    { src: '/Momentos/DSC_0841-Mejorado-NR-1.jpg', label: 'MATRIMONIOS' },
    { src: '/Momentos/DSC_0872-Mejorado-NR-5.jpg', label: 'EVENTOS CORPORATIVOS' },
    { src: '/Momentos/DSCF4570.jpg', label: 'CELEBRACIONES' },
    { src: '/Momentos/_MG_0860.jpg', label: 'GRADUACIONES' },
    { src: '/Momentos/_MG_0867.jpg', label: 'ANIVERSARIOS' },
    { src: '/Momentos/editar(27).jpg', label: 'BAUTIZOS' },
  ]

  const testimonios = [
    {
      initial: 'M',
      name: 'Mariana G.',
      role: 'Bogotá, Colombia',
      title: 'Una experiencia que despierta los sentidos',
      quote: 'El lugar más mágico para celebrar. La atmósfera es única, la comida increíble y el personal hace que cada detalle sea perfecto.',
      image: '/Menu/DSC_0823-Mejorado-NR-5-min.jpg',
    },
    {
      initial: 'C',
      name: 'Carlos R.',
      role: 'Medellín, Colombia',
      title: 'Gastronomía auténtica y sin igual',
      quote: 'Celebramos nuestro aniversario aquí y fue una experiencia que nunca olvidaremos. El horno de sal es simplemente espectacular.',
      image: '/Menu/DSC_0930-Mejorado-NR-15-min.jpg',
    },
    {
      initial: 'A',
      name: 'Ana María P.',
      role: 'Cali, Colombia',
      title: 'El escenario perfecto para celebrar',
      quote: 'Organizamos la boda de nuestra hija en Salario y todo fue perfecto. Espacios hermosos, gastronomía excepcional y atención impecable.',
      image: '/Menu/_MG_1420.jpg',
    },
  ]

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
            sizes="120px"
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
        {/* Left */}
        <div className="landing-hero-left">
          {/* Circular spinning plates — in left panel */}
          <div className="landing-hero-plates">
            <div className="landing-plate-wrap landing-plate-1">
              <div className="landing-plate-inner">
                <Image src="/Menu/_MG_1355.jpg" alt="Plato Salario" fill sizes="180px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="landing-plate-wrap landing-plate-2">
              <div className="landing-plate-inner">
                <Image src="/Menu/DSC_0786-Mejorado-NR-2-min.jpg" alt="Plato Salario" fill sizes="210px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="landing-plate-wrap landing-plate-3">
              <div className="landing-plate-inner">
                <Image src="/Menu/DSC_0811-Mejorado-NR-4-min.jpg" alt="Plato Salario" fill sizes="170px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

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

        </div>

        {/* Right */}
        <div className="landing-hero-right">
          <div className="landing-hero-main-img">
            <Image
              src="/Instalaciones/DSC_0700-Mejorado-NR-34.jpg"
              alt="Interior Salario de Zipa"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
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
              <a href="/menu" className="landing-btn-glass">VER MENÚ COMPLETO →</a>
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
          AMBIENCE — Auto-scroll image ticker
          ============================================================ */}
      <section className="landing-ambience-section">
        <div className="landing-ambience-header">
          <div>
            <p className="landing-ambience-eyebrow">INSTALACIONES</p>
            <WordBlur
              text="Un espacio diseñado para celebrar"
              tag="h2"
              className="landing-ambience-title"
            />
          </div>
          <p className="landing-ambience-desc">
            Cada rincón de Salario de Zipa fue pensado para crear momentos únicos.
            Salones privados, terrazas y espacios abiertos llenos de historia y luz natural.
          </p>
        </div>

        <div className="landing-ambience-ticker-wrap">
          <div className="landing-ambience-ticker">
            {[...ambienceImages, ...ambienceImages].map((img, i) => (
              <div key={i} className="landing-ambience-ticker-img">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          HISTORIA
          ============================================================ */}
      <section className="landing-historia-section" id="historia">
        <div className="landing-historia-left" ref={historiaImgRef}>
          <div className="landing-historia-img">
            <Image
              src="/Instalaciones/SALARIO-34.jpg"
              alt="Historia Salario de Zipa"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover', transition: 'transform 0.1s linear' }}
            />
          </div>
        </div>

        <div className="landing-historia-right ls-reveal" ref={addRevealRef}>
          <span className="landing-historia-eyebrow">DESDE 1939</span>
          <WordBlur
            text="Tradición viva en cada brasa"
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
          MOMENTOS
          ============================================================ */}
      <section className="landing-momentos-section" id="eventos">
        <div className="landing-momentos-header ls-reveal" ref={addRevealRef}>
          <p className="landing-momentos-eyebrow">CELEBRA CON NOSOTROS</p>
          <WordBlur
            text="Tus momentos más especiales"
            tag="h2"
            className="landing-momentos-title"
          />
        </div>

        <div className="landing-momentos-grid">
          {momentos.map((m, i) => (
            <div key={i} className="landing-momento-card ls-reveal" ref={addRevealRef}>
              <Image
                src={m.src}
                alt={m.label}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="landing-momento-overlay" />
              <span className="landing-momento-label">{m.label}</span>
            </div>
          ))}
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
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
