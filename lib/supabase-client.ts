import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Only attempt to create the client in the browser. In RSC / Node contexts we return null and
// defer to client-side effects (components already guard with `if (!supabase) ...`).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Silent fail (UI will show auth unavailable). Avoid throwing which could crash dev server.
      return null
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
    })
  }
  return _supabase
}

export const supabase = getSupabase() as SupabaseClient | null
