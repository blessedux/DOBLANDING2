'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.slug],
    queryFn: async () => {
      // Placeholder for the removed supabase usage
      return {
        title: 'Placeholder Title',
        excerpt: 'Placeholder Excerpt',
        content: 'Placeholder Content',
        created_at: new Date().toISOString(),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* <PostMeta post={post} /> */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Published on {new Date(post.created_at).toLocaleDateString()}
          </div>
        </header>
        <div className="prose dark:prose-invert max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
} 