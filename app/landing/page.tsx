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
  const heroRightRef = useRef<HTMLDivElement>(null)
  const menuSectionRef = useRef<HTMLElement>(null)
  const cardsStripRef = useRef<HTMLDivElement>(null)
  const historiaImgRef = useRef<HTMLDivElement>(null)

  const plate1Ref = useRef<HTMLDivElement>(null)
  const plate2Ref = useRef<HTMLDivElement>(null)
  const plate3Ref = useRef<HTMLDivElement>(null)

  // Scroll reveal refs
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }, [])

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Navbar glass
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', scrollY > 80)
      }

      // Floating plates scroll rotation
      if (plate1Ref.current) {
        plate1Ref.current.style.transform = `rotate(${-2 + scrollY * 0.05}deg)`
      }
      if (plate2Ref.current) {
        plate2Ref.current.style.transform = `rotate(${-6 + scrollY * 0.05}deg)`
      }
      if (plate3Ref.current) {
        plate3Ref.current.style.transform = `rotate(${15 + scrollY * 0.05}deg)`
      }

      // Menu cards scroll carousel
      if (menuSectionRef.current && cardsStripRef.current) {
        const sectionTop = menuSectionRef.current.offsetTop
        const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / 716))
        const x = 100 + progress * -1000
        cardsStripRef.current.style.transform = `perspective(846px) translateX(${x}px)`
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
    return () => window.removeEventListener('scroll', handleScroll)
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

  const menuCards = [
    { src: '/Menu/DSC_0823-Mejorado-NR-5-min.jpg', title: 'Lomo al Trapo', num: '01' },
    { src: '/Menu/_MG_1420.jpg', title: 'Costillitas de Cerdo', num: '02' },
    { src: '/Menu/_MG_1421.jpg', title: 'Chicharrón Carnudo', num: '03' },
    { src: '/Menu/DSC_0930-Mejorado-NR-15-min.jpg', title: 'Bandeja Paisa', num: '04' },
    { src: '/Menu/_MG_5192.jpg', title: 'Ajiaco Bogotano', num: '05' },
    { src: '/Menu/SALARIO-16.jpg', title: 'Piquete Especial', num: '06' },
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
      location: 'Bogotá, Colombia',
      quote:
        '"El lugar más mágico para celebrar. La atmósfera es única, la comida increíble y el personal hace que cada detalle sea perfecto."',
    },
    {
      initial: 'C',
      name: 'Carlos R.',
      location: 'Medellín, Colombia',
      quote:
        '"Celebramos nuestro aniversario aquí y fue una experiencia que nunca olvidaremos. El horno de sal es simplemente espectacular."',
    },
    {
      initial: 'A',
      name: 'Ana María P.',
      location: 'Cali, Colombia',
      quote:
        '"Organizamos la boda de nuestra hija en Salario y todo fue perfecto. Espacios hermosos, gastronomía excepcional y atención impecable."',
    },
  ]

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

        <a href="#reservar" className="landing-btn-glass">RESERVAR MESA</a>
      </nav>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="landing-hero" id="inicio">
        {/* Left */}
        <div className="landing-hero-left">
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

          <div className="landing-hero-scroll">
            <div className="landing-hero-scroll-line" />
            <span className="landing-hero-scroll-text">SCROLL</span>
          </div>
        </div>

        {/* Right */}
        <div className="landing-hero-right" ref={heroRightRef}>
          <div className="landing-hero-main-img">
            <Image
              src="/Instalaciones/DSC_0668-Mejorado-NR-21.jpg"
              alt="Interior Salario de Zipa"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Floating plates */}
          <div className="landing-plate-wrap landing-plate-1" ref={plate1Ref}>
            <Image
              src="/Menu/_MG_1355.jpg"
              alt="Plato Salario"
              width={200}
              height={200}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>

          <div className="landing-plate-wrap landing-plate-2" ref={plate2Ref}>
            <Image
              src="/Menu/DSC_0786-Mejorado-NR-2-min.jpg"
              alt="Plato Salario"
              width={220}
              height={220}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>

          <div className="landing-plate-wrap landing-plate-3" ref={plate3Ref}>
            <Image
              src="/Menu/DSC_0811-Mejorado-NR-4-min.jpg"
              alt="Plato Salario"
              width={190}
              height={190}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
          GASTRONOMÍA / MENU
          ============================================================ */}
      <section className="landing-menu-section" id="gastronomia" ref={menuSectionRef as React.RefObject<HTMLElement>}>
        <div className="landing-menu-left ls-reveal" ref={addRevealRef}>
          <p className="landing-menu-eyebrow">GASTRONOMÍA</p>
          <WordBlur
            text="Sabores que cuentan nuestra historia"
            tag="h2"
            className="landing-menu-title"
          />
          <p className="landing-menu-body">
            Cada plato nace de recetas heredadas y técnicas ancestrales. Ingredientes frescos del campo, el calor del horno de sal y la pasión de nuestros cocineros se fusionan para crear una gastronomía que va más allá de la alimentación: es una experiencia cultural.
          </p>
          <a href="#" className="landing-menu-link">CONOCER MENÚ →</a>
        </div>

        <div className="landing-menu-right">
          <div
            className="landing-cards-strip"
            ref={cardsStripRef}
            style={{ transform: 'perspective(846px) translateX(100px)' }}
          >
            {menuCards.map((card, i) => (
              <div key={i} className="landing-card">
                <div className="landing-card-img">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="landing-card-overlay" />
                <span className="landing-card-num">{card.num}</span>
                <h3 className="landing-card-title">{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          AMBIENCE
          ============================================================ */}
      <section className="landing-ambience-section">
        <div className="landing-ambience-header ls-reveal" ref={addRevealRef}>
          <p className="landing-ambience-eyebrow">AMBIENCE</p>
          <WordBlur
            text="Un espacio diseñado para celebrar"
            tag="h2"
            className="landing-ambience-title"
          />
        </div>

        <div className="landing-ambience-grid">
          <div className="landing-ambience-img-wrap landing-ambience-large ls-reveal" ref={addRevealRef}>
            <Image
              src="/Instalaciones/DSC_0635-Mejorado-NR-8.jpg"
              alt="Salón Salario de Zipa"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="landing-ambience-img-wrap ls-reveal" ref={addRevealRef} style={{ position: 'relative' }}>
            <Image
              src="/Instalaciones/_MG_2033.jpg"
              alt="Detalle del espacio"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="landing-ambience-img-wrap ls-reveal" ref={addRevealRef} style={{ position: 'relative' }}>
            <Image
              src="/Instalaciones/_MG_2096h.jpg"
              alt="Ambiente del restaurante"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="landing-ambience-full ls-reveal" ref={addRevealRef}>
          <Image
            src="/Instalaciones/SALARIO-49.jpg"
            alt="Vista panorámica Salario de Zipa"
            fill
            style={{ objectFit: 'cover' }}
          />
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
          <WordBlur
            text="Lo que dicen nuestros invitados"
            tag="h2"
            className="landing-testimonios-title"
          />
        </div>

        <div className="landing-testimonios-grid">
          {testimonios.map((t, i) => (
            <div key={i} className="landing-testimonio-card ls-reveal" ref={addRevealRef}>
              <div className="landing-testimonio-stars">★★★★★</div>
              <p className="landing-testimonio-quote">{t.quote}</p>
              <div className="landing-testimonio-author">
                <div className="landing-testimonio-avatar">{t.initial}</div>
                <div className="landing-testimonio-info">
                  <span className="landing-testimonio-name">{t.name}</span>
                  <span className="landing-testimonio-location">{t.location}</span>
                </div>
              </div>
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
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="landing-cta-overlay" />
        <div className="landing-cta-content ls-reveal" ref={addRevealRef}>
          <span className="landing-cta-eyebrow">RESERVA TU EXPERIENCIA</span>
          <h2 className="landing-cta-title">Una mesa te espera</h2>
          <p className="landing-cta-body">
            Cra. 7 #2-83, Zipaquirá, Cundinamarca<br />
            Martes a domingo: 12:00 pm – 10:00 pm<br />
            +57 315 892 7463
          </p>
          <div className="landing-cta-actions">
            <a href="tel:+573158927463" className="landing-btn-glass">RESERVAR MESA</a>
            <a
              href="https://wa.me/573158927463?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20Salario%20de%20Zipa"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn-whatsapp"
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

    </div>
  )
}
