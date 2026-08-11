'use client'

import { useEffect, useState } from 'react'
import { supabase, type PopupConfig } from '@/lib/supabase'

export default function Popup({ lang }: { lang: 'es' | 'en' }) {
  const [config, setConfig] = useState<PopupConfig | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    supabase.from('popup_config').select('*').single().then(({ data }) => {
      if (data?.enabled) {
        // Only show once per session
        const key = 'salario_popup_seen'
        if (!sessionStorage.getItem(key)) {
          setConfig(data)
          setTimeout(() => setVisible(true), 1500)
          sessionStorage.setItem(key, '1')
        }
      }
    })
  }, [])

  if (!visible || !config) return null

  const title = lang === 'es' ? config.title_es : config.title_en
  const body  = lang === 'es' ? config.body_es  : config.body_en
  const cta   = lang === 'es' ? config.cta_label_es : config.cta_label_en

  return (
    <div className="ls-popup-backdrop" onClick={() => setVisible(false)}>
      <div className="ls-popup-card" onClick={e => e.stopPropagation()}>
        <button className="ls-popup-close" onClick={() => setVisible(false)} aria-label="Cerrar">✕</button>
        {config.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="ls-popup-img-wrap">
            <img src={config.image_url} alt={title ?? ''} className="ls-popup-img" />
          </div>
        )}
        <div className="ls-popup-body">
          {title && <h2 className="ls-popup-title">{title}</h2>}
          {body  && <p  className="ls-popup-text">{body}</p>}
          {cta && config.cta_url && (
            <a href={config.cta_url} target="_blank" rel="noopener noreferrer" className="ls-popup-cta"
              onClick={() => setVisible(false)}>
              {cta}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
