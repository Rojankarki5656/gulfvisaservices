import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface VisaApplication {
  id: string
  reference_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  nationality: string
  passport_number: string
  visa_type: string
  country: string
  travel_date: string
  status: "pending" | "processing" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  published_at: string
  tags: string[]
  meta_title: string
  meta_description: string
}
