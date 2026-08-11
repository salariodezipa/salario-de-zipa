'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import '../admin.css'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-logo">
          <Image
            src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
            alt="Salario de Zipa"
            width={120}
            height={56}
            style={{ objectFit: 'contain', filter: 'brightness(0)' }}
          />
        </div>
        <p className="adm-login-subtitle">Portal de administración</p>

        <form onSubmit={handleLogin}>
          <div className="adm-form-group">
            <label className="adm-label">Correo electrónico</label>
            <input
              className="adm-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@salariodezipa.com"
              required
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Contraseña</label>
            <input
              className="adm-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button className="adm-btn-primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'INGRESAR'}
          </button>
          {error && <div className="adm-error">{error}</div>}
        </form>
      </div>
    </div>
  )
}
