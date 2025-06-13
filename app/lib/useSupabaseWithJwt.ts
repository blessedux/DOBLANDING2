import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

export function useSupabaseWithJwt(token: string | null) {
  return useMemo(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        },
      }
    ), [token]);
} 