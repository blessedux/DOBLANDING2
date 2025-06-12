import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getPrivyUser } from '@/lib/privy';

// GET /api/posts - Get all published posts
export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          wallet_address
        )
      `)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post (admin/editor only)
export async function POST(request: Request) {
  try {
    const user = await getPrivyUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin or editor
    const { data: dbUser, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', user.wallet.address)
      .single();

    if (userError || !dbUser || (dbUser.role !== 'ADMIN' && dbUser.role !== 'EDITOR')) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, excerpt, imageUrl, tags } = body;

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        content,
        excerpt,
        image_url: imageUrl,
        author_id: dbUser.id,
        tags,
        published: false,
      })
      .select(`
        *,
        users (
          wallet_address
        )
      `)
      .single();

    if (postError) throw postError;

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 