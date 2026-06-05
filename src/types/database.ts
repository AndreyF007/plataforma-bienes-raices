export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          subdomain: string
          custom_domain: string | null
          status: 'active' | 'suspended' | 'trial'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subdomain: string
          custom_domain?: string | null
          status?: 'active' | 'suspended' | 'trial'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subdomain?: string
          custom_domain?: string | null
          status?: 'active' | 'suspended' | 'trial'
          created_at?: string
          updated_at?: string
        }
      }
      tenant_settings: {
        Row: {
          tenant_id: string
          brand_name: string
          logo_url: string | null
          colors: Json
          fonts: Json
          spacing: Json
          theme_style: string // 'minimal', 'cinematic', 'editorial', 'classic-luxury'
          contact_email: string | null
          contact_phone: string | null
          whatsapp: string | null
          social_links: Json
          seo_metadata: Json
        }
        Insert: {
          tenant_id: string
          brand_name?: string
          logo_url?: string | null
          colors?: Json
          fonts?: Json
          spacing?: Json
          theme_style?: string
          contact_email?: string | null
          contact_phone?: string | null
          whatsapp?: string | null
          social_links?: Json
          seo_metadata?: Json
        }
        Update: {
          tenant_id?: string
          brand_name?: string
          logo_url?: string | null
          colors?: Json
          fonts?: Json
          spacing?: Json
          theme_style?: string
          contact_email?: string | null
          contact_phone?: string | null
          whatsapp?: string | null
          social_links?: Json
          seo_metadata?: Json
        }
      }
      properties: {
        Row: {
          id: string
          tenant_id: string
          title: string
          slug: string
          description: string | null
          price: number
          currency: string
          status: 'available' | 'sold' | 'rented' | 'draft'
          type: string
          bedrooms: number | null
          bathrooms: number | null
          area_m2: number | null
          featured: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
