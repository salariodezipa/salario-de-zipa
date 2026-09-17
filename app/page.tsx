import Image from 'next/image'

export default function ComingSoon() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#1C0A00',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: 48 }}>
        <Image
          src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
          alt="Salario de Zipa"
          width={220}
          height={120}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      <div style={{
        width: 48,
        height: 1,
        background: '#C8956C',
        margin: '0 auto 40px',
      }} />

      <p style={{
        color: '#C8956C',
        letterSpacing: '0.25em',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        marginBottom: 20,
      }}>
        ZIPAQUIRÁ · COLOMBIA
      </p>

      <h1 style={{
        color: '#F5ECD7',
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        fontWeight: 400,
        lineHeight: 1.2,
        marginBottom: 24,
        letterSpacing: '0.02em',
      }}>
        Pronto estaremos<br />de vuelta
      </h1>

      <p style={{
        color: '#A89070',
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        maxWidth: 440,
        lineHeight: 1.7,
        marginBottom: 48,
      }}>
        Estamos preparando algo especial para ti.<br />
        Mientras tanto, puedes contactarnos por WhatsApp.
      </p>

      <a
        href="https://wa.me/573226048752"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: '#7B2D1E',
          color: '#F5ECD7',
          padding: '14px 32px',
          letterSpacing: '0.15em',
          fontSize: '0.8rem',
          textDecoration: 'none',
          textTransform: 'uppercase',
          borderRadius: 2,
          transition: 'background 0.2s',
        }}
      >
        Escríbenos por WhatsApp
      </a>

      <div style={{
        width: 48,
        height: 1,
        background: '#3A1A08',
        margin: '48px auto 0',
      }} />

      <p style={{
        color: '#4A3020',
        fontSize: '0.75rem',
        marginTop: 24,
        letterSpacing: '0.1em',
      }}>
        © {new Date().getFullYear()} Salario de Zipa
      </p>
    </main>
  )
}
