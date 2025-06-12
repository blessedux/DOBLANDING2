import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Types for our database tables
export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  wallet_address: string;
  role: 'ADMIN' | 'EDITOR' | 'READER';
  created_at: string;
  updated_at: string;
}; 