import { createClient } from '@supabase/supabase-js';

// Expect env vars NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Faltan variables de entorno de Supabase: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
