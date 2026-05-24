import { createClient } from '@supabase/supabase-js';

// Enforce types so TypeScript knows these will never be undefined in production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);