import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type MenuItem = {
  id: string
  display_order: number
  num: string
  category: string
  name: string
  desc_es: string
  desc_en: string
  price: string
  image_url: string
  is_featured: boolean
}

export type Evento = {
  id: string
  display_order: number
  label_es: string
  label_en: string
  desc_es: string
  desc_en: string
  image_url: string
}

export type GaleriaItem = {
  id: string
  display_order: number
  label_es: string
  label_en: string
  image_url: string
}

export type PopupConfig = {
  id: string
  enabled: boolean
  title_es: string
  title_en: string
  body_es: string
  body_en: string
  image_url: string
  cta_label_es: string
  cta_label_en: string
  cta_url: string
}
