'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase, type MenuItem, type Evento, type GaleriaItem, type PopupConfig } from '@/lib/supabase'
import '../admin.css'

/* ─── helpers ─── */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

function storageUrl(bucket: string, path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

function isExternalUrl(url: string) {
  return url.startsWith('http') || url.startsWith('//')
}

function resolveImg(url: string) {
  return url || ''
}

/* ─── Toast ─── */
function Toast({ msg, type, onDone }: { msg: string; type: 'success' | 'error'; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])
  return <div className={`adm-toast ${type}`}>{msg}</div>
}

/* ─── Image Uploader ─── */
function ImgUploader({
  bucket, current, onUploaded,
}: { bucket: string; current: string; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(current)

  useEffect(() => { setPreview(current) }, [current])

  async function handleFile(file: File) {
    setUploading(true)
    setProgress(20)
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}.${ext}`
    setProgress(50)
    const { error } = await supabase.storage.from(bucket).upload(filename, file, { upsert: true })
    setProgress(90)
    if (!error) {
      const url = storageUrl(bucket, filename)
      setPreview(url)
      onUploaded(url)
    }
    setProgress(100)
    setTimeout(() => { setUploading(false); setProgress(0) }, 600)
  }

  return (
    <div>
      <div className="adm-img-uploader" onClick={() => inputRef.current?.click()}>
        {preview
          ? <img src={isExternalUrl(preview) ? preview : preview} alt="preview" className="adm-img-preview" />
          : <div className="adm-img-uploader-hint">Sin imagen</div>}
        <p className="adm-img-uploader-hint">
          <strong>Haz clic para cambiar</strong> · JPG, PNG, WEBP
        </p>
        {uploading && (
          <div className="adm-upload-progress">
            <div className="adm-upload-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}

/* ─── Menu Tab ─── */
function MenuTab({ showToast }: { showToast: (m: string, t: 'success' | 'error') => void }) {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('menu_items').select('*').order('display_order')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase.from('menu_items').update({
      category: editing.category,
      name: editing.name,
      desc_es: editing.desc_es,
      desc_en: editing.desc_en,
      price: editing.price,
      image_url: editing.image_url,
      is_featured: editing.is_featured,
    }).eq('id', editing.id)
    setSaving(false)
    if (error) { showToast('Error al guardar', 'error') }
    else { showToast('Guardado correctamente', 'success'); setEditing(null); load() }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar este plato?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    showToast('Plato eliminado', 'success')
    load()
  }

  async function add() {
    const { data } = await supabase.from('menu_items').insert({
      display_order: items.length + 1,
      num: String(items.length + 1).padStart(2, '0'),
      category: 'PARRILLA',
      name: 'Nuevo plato',
      desc_es: '',
      desc_en: '',
      price: '',
      image_url: '',
      is_featured: false,
    }).select().single()
    if (data) { setEditing(data); load() }
  }

  if (loading) return <div className="adm-loading">Cargando platos...</div>

  return (
    <>
      <div className="adm-section-header">
        <span className="adm-section-title">Platos del menú ({items.length})</span>
        <button className="adm-btn-add" onClick={add}>+ Agregar plato</button>
      </div>
      <div className="adm-grid">
        {items.map(item => (
          <div className="adm-card" key={item.id}>
            {item.image_url
              ? <img src={resolveImg(item.image_url)} alt={item.name} className="adm-card-img" />
              : <div className="adm-card-img-placeholder">Sin imagen</div>}
            <div className="adm-card-body">
              <div className="adm-card-category">{item.category}</div>
              <div className="adm-card-name">{item.name}</div>
              <div className="adm-card-desc">{item.desc_es}</div>
              <div className="adm-card-price">{item.price || '—'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span className={`adm-badge ${item.is_featured ? 'adm-badge-green' : 'adm-badge-gray'}`}>
                  {item.is_featured ? 'Destacado' : 'No destacado'}
                </span>
              </div>
              <div className="adm-card-actions">
                <button className="adm-btn-edit" onClick={() => setEditing(item)}>Editar</button>
                <button className="adm-btn-delete" onClick={() => del(item.id)}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="adm-modal-backdrop" onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <span className="adm-modal-title">Editar: {editing.name}</span>
              <button className="adm-modal-close" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <ImgUploader bucket="menu-images" current={editing.image_url}
                onUploaded={url => setEditing(p => p ? { ...p, image_url: url } : p)} />
              <div className="adm-form-group">
                <label className="adm-label">Categoría</label>
                <input className="adm-input" value={editing.category}
                  onChange={e => setEditing(p => p ? { ...p, category: e.target.value } : p)} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Nombre del plato</label>
                <input className="adm-input" value={editing.name}
                  onChange={e => setEditing(p => p ? { ...p, name: e.target.value } : p)} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Descripción (Español)</label>
                <textarea className="adm-textarea" value={editing.desc_es}
                  onChange={e => setEditing(p => p ? { ...p, desc_es: e.target.value } : p)} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Descripción (English)</label>
                <textarea className="adm-textarea" value={editing.desc_en}
                  onChange={e => setEditing(p => p ? { ...p, desc_en: e.target.value } : p)} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Precio</label>
                <input className="adm-input" value={editing.price}
                  onChange={e => setEditing(p => p ? { ...p, price: e.target.value } : p)} placeholder="$59.850" />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={editing.is_featured}
                  onChange={e => setEditing(p => p ? { ...p, is_featured: e.target.checked } : p)} />
                <span style={{ fontSize: '0.875rem' }}>Mostrar en sección destacada de la página</span>
              </label>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-cancel" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="adm-btn-save" onClick={save} disabled={saving}>
                {saving ? 'Guardando...' : '✓ Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Eventos Tab ─── */
function EventosTab({ showToast }: { showToast: (m: string, t: 'success' | 'error') => void }) {
  const [items, setItems] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Evento | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('eventos').select('*').order('display_order')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase.from('eventos').update({
      label_es: editing.label_es, label_en: editing.label_en,
      desc_es: editing.desc_es, desc_en: editing.desc_en,
      image_url: editing.image_url,
    }).eq('id', editing.id)
    setSaving(false)
    if (error) showToast('Error al guardar', 'error')
    else { showToast('Guardado correctamente', 'success'); setEditing(null); load() }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar este evento?')) return
    await supabase.from('eventos').delete().eq('id', id)
    showToast('Evento eliminado', 'success')
    load()
  }

  async function add() {
    const { data } = await supabase.from('eventos').insert({
      display_order: items.length + 1, label_es: 'NUEVO EVENTO', label_en: 'NEW EVENT',
      desc_es: '', desc_en: '', image_url: '',
    }).select().single()
    if (data) { setEditing(data); load() }
  }

  if (loading) return <div className="adm-loading">Cargando eventos...</div>

  return (
    <>
      <div className="adm-section-header">
        <span className="adm-section-title">Carrusel de eventos ({items.length})</span>
        <button className="adm-btn-add" onClick={add}>+ Agregar evento</button>
      </div>
      <div className="adm-grid">
        {items.map(item => (
          <div className="adm-card" key={item.id}>
            {item.image_url
              ? <img src={resolveImg(item.image_url)} alt={item.label_es} className="adm-card-img" />
              : <div className="adm-card-img-placeholder">Sin imagen</div>}
            <div className="adm-card-body">
              <div className="adm-card-name">{item.label_es}</div>
              <div className="adm-card-desc">{item.desc_es}</div>
              <div className="adm-card-actions">
                <button className="adm-btn-edit" onClick={() => setEditing(item)}>Editar</button>
                <button className="adm-btn-delete" onClick={() => del(item.id)}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="adm-modal-backdrop" onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <span className="adm-modal-title">Editar evento</span>
              <button className="adm-modal-close" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <ImgUploader bucket="eventos-images" current={editing.image_url}
                onUploaded={url => setEditing(p => p ? { ...p, image_url: url } : p)} />
              <div className="adm-field-row">
                <div className="adm-form-group">
                  <label className="adm-label">Nombre (Español)</label>
                  <input className="adm-input" value={editing.label_es}
                    onChange={e => setEditing(p => p ? { ...p, label_es: e.target.value } : p)} />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Name (English)</label>
                  <input className="adm-input" value={editing.label_en}
                    onChange={e => setEditing(p => p ? { ...p, label_en: e.target.value } : p)} />
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Descripción (Español)</label>
                <textarea className="adm-textarea" value={editing.desc_es}
                  onChange={e => setEditing(p => p ? { ...p, desc_es: e.target.value } : p)} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Description (English)</label>
                <textarea className="adm-textarea" value={editing.desc_en}
                  onChange={e => setEditing(p => p ? { ...p, desc_en: e.target.value } : p)} />
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-cancel" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="adm-btn-save" onClick={save} disabled={saving}>
                {saving ? 'Guardando...' : '✓ Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Galería Tab ─── */
function GaleriaTab({ showToast }: { showToast: (m: string, t: 'success' | 'error') => void }) {
  const [items, setItems] = useState<GaleriaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<GaleriaItem | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('galeria').select('*').order('display_order')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase.from('galeria').update({
      label_es: editing.label_es, label_en: editing.label_en, image_url: editing.image_url,
    }).eq('id', editing.id)
    setSaving(false)
    if (error) showToast('Error al guardar', 'error')
    else { showToast('Guardado correctamente', 'success'); setEditing(null); load() }
  }

  async function del(id: string) {
    if (!confirm('¿Eliminar esta foto?')) return
    await supabase.from('galeria').delete().eq('id', id)
    showToast('Foto eliminada', 'success')
    load()
  }

  async function add() {
    const { data } = await supabase.from('galeria').insert({
      display_order: items.length + 1, label_es: 'NUEVA FOTO', label_en: 'NEW PHOTO', image_url: '',
    }).select().single()
    if (data) { setEditing(data); load() }
  }

  if (loading) return <div className="adm-loading">Cargando galería...</div>

  return (
    <>
      <div className="adm-section-header">
        <span className="adm-section-title">Fotos de galería ({items.length})</span>
        <button className="adm-btn-add" onClick={add}>+ Agregar foto</button>
      </div>
      <div className="adm-grid">
        {items.map(item => (
          <div className="adm-card" key={item.id}>
            {item.image_url
              ? <img src={resolveImg(item.image_url)} alt={item.label_es} className="adm-card-img" />
              : <div className="adm-card-img-placeholder">Sin imagen</div>}
            <div className="adm-card-body">
              <div className="adm-card-name">{item.label_es}</div>
              <div className="adm-card-actions">
                <button className="adm-btn-edit" onClick={() => setEditing(item)}>Editar</button>
                <button className="adm-btn-delete" onClick={() => del(item.id)}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="adm-modal-backdrop" onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <span className="adm-modal-title">Editar foto de galería</span>
              <button className="adm-modal-close" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <ImgUploader bucket="galeria-images" current={editing.image_url}
                onUploaded={url => setEditing(p => p ? { ...p, image_url: url } : p)} />
              <div className="adm-field-row">
                <div className="adm-form-group">
                  <label className="adm-label">Etiqueta (Español)</label>
                  <input className="adm-input" value={editing.label_es}
                    onChange={e => setEditing(p => p ? { ...p, label_es: e.target.value } : p)} />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Label (English)</label>
                  <input className="adm-input" value={editing.label_en}
                    onChange={e => setEditing(p => p ? { ...p, label_en: e.target.value } : p)} />
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-cancel" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="adm-btn-save" onClick={save} disabled={saving}>
                {saving ? 'Guardando...' : '✓ Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Popup Tab ─── */
function PopupTab({ showToast }: { showToast: (m: string, t: 'success' | 'error') => void }) {
  const [config, setConfig] = useState<PopupConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('popup_config').select('*').single().then(({ data }) => {
      setConfig(data)
      setLoading(false)
    })
  }, [])

  async function save() {
    if (!config) return
    setSaving(true)
    const { error } = await supabase.from('popup_config').update({
      enabled: config.enabled,
      title_es: config.title_es, title_en: config.title_en,
      body_es: config.body_es, body_en: config.body_en,
      image_url: config.image_url,
      cta_label_es: config.cta_label_es, cta_label_en: config.cta_label_en,
      cta_url: config.cta_url,
      updated_at: new Date().toISOString(),
    }).eq('id', config.id)
    setSaving(false)
    if (error) showToast('Error al guardar', 'error')
    else showToast('Popup actualizado correctamente', 'success')
  }

  if (loading || !config) return <div className="adm-loading">Cargando configuración...</div>

  return (
    <div className="adm-popup-card">
      <div className="adm-toggle-row">
        <div>
          <div className="adm-toggle-label">Popup activo</div>
          <div className="adm-toggle-sublabel">
            {config.enabled ? 'El popup se muestra al entrar a la página' : 'El popup está desactivado'}
          </div>
        </div>
        <label className="adm-toggle">
          <input type="checkbox" checked={config.enabled}
            onChange={e => setConfig(p => p ? { ...p, enabled: e.target.checked } : p)} />
          <span className="adm-toggle-slider" />
        </label>
      </div>

      <div className="adm-popup-fields">
        <div>
          <label className="adm-label" style={{ display: 'block', marginBottom: 6 }}>Imagen del popup</label>
          <ImgUploader bucket="popup-images" current={config.image_url}
            onUploaded={url => setConfig(p => p ? { ...p, image_url: url } : p)} />
        </div>

        <div className="adm-field-row">
          <div className="adm-form-group">
            <label className="adm-label">Título (Español)</label>
            <input className="adm-input" value={config.title_es}
              onChange={e => setConfig(p => p ? { ...p, title_es: e.target.value } : p)}
              placeholder="¡Evento especial este fin de semana!" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Title (English)</label>
            <input className="adm-input" value={config.title_en}
              onChange={e => setConfig(p => p ? { ...p, title_en: e.target.value } : p)}
              placeholder="Special event this weekend!" />
          </div>
        </div>

        <div className="adm-field-row">
          <div className="adm-form-group">
            <label className="adm-label">Texto (Español)</label>
            <textarea className="adm-textarea" value={config.body_es}
              onChange={e => setConfig(p => p ? { ...p, body_es: e.target.value } : p)}
              placeholder="Descripción del evento o promoción..." />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Text (English)</label>
            <textarea className="adm-textarea" value={config.body_en}
              onChange={e => setConfig(p => p ? { ...p, body_en: e.target.value } : p)}
              placeholder="Event or promotion description..." />
          </div>
        </div>

        <div className="adm-field-row">
          <div className="adm-form-group">
            <label className="adm-label">Botón (Español)</label>
            <input className="adm-input" value={config.cta_label_es}
              onChange={e => setConfig(p => p ? { ...p, cta_label_es: e.target.value } : p)}
              placeholder="RESERVAR AHORA" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Button (English)</label>
            <input className="adm-input" value={config.cta_label_en}
              onChange={e => setConfig(p => p ? { ...p, cta_label_en: e.target.value } : p)}
              placeholder="BOOK NOW" />
          </div>
        </div>

        <div className="adm-form-group">
          <label className="adm-label">URL del botón</label>
          <input className="adm-input" value={config.cta_url}
            onChange={e => setConfig(p => p ? { ...p, cta_url: e.target.value } : p)}
            placeholder="https://wa.me/573226048752" />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="adm-btn-save" onClick={save} disabled={saving}>
          {saving ? 'Guardando...' : '✓ Guardar configuración del popup'}
        </button>
      </div>
    </div>
  )
}

/* ─── Nav icons ─── */
const ICONS = {
  menu: <svg className="adm-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  eventos: <svg className="adm-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  galeria: <svg className="adm-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  popup: <svg className="adm-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
}

type Tab = 'menu' | 'eventos' | 'galeria' | 'popup'

/* ─── MAIN DASHBOARD ─── */
export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('menu')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin/login')
      else setChecking(false)
    })
  }, [router])

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A6A5A' }}>Verificando sesión...</p>
    </div>
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: 'menu', label: 'Menú' },
    { key: 'eventos', label: 'Eventos' },
    { key: 'galeria', label: 'Galería' },
    { key: 'popup', label: 'Popup' },
  ]

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img
            src="/LOGOS SALARIO/LOGO SALARIO BLANCO_Mesa de trabajo 1 copia 7.png"
            alt="Salario de Zipa"
            style={{ height: 44, objectFit: 'contain' }}
          />
        </div>
        <span className="adm-sidebar-label">Contenido</span>
        <nav className="adm-nav">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`adm-nav-item ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {ICONS[t.key]}
              {t.label}
            </button>
          ))}
        </nav>
        <div className="adm-sidebar-bottom">
          <a href="/" target="_blank" className="adm-logout-btn" style={{ textDecoration: 'none' }}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Ver página web
          </a>
          <button className="adm-logout-btn" onClick={logout}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <div className="adm-page-header">
          <h1 className="adm-page-title">
            {tab === 'menu' && 'Menú del restaurante'}
            {tab === 'eventos' && 'Eventos'}
            {tab === 'galeria' && 'Galería de fotos'}
            {tab === 'popup' && 'Popup de la página'}
          </h1>
          <p className="adm-page-desc">
            {tab === 'menu' && 'Edita los platos, fotos, descripciones y precios del menú destacado.'}
            {tab === 'eventos' && 'Administra el carrusel de eventos del restaurante.'}
            {tab === 'galeria' && 'Administra las fotos del carrusel de galería.'}
            {tab === 'popup' && 'Configura el popup que aparece al entrar a la página.'}
          </p>
        </div>

        {tab === 'menu'    && <MenuTab    showToast={showToast} />}
        {tab === 'eventos' && <EventosTab showToast={showToast} />}
        {tab === 'galeria' && <GaleriaTab showToast={showToast} />}
        {tab === 'popup'   && <PopupTab   showToast={showToast} />}
      </main>

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </div>
  )
}
