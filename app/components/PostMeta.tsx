'use client';

import Head from 'next/head';
import type { Post } from '@/lib/supabase';

interface PostMetaProps {
  post: Post;
  baseUrl?: string;
}

export function PostMeta({ post, baseUrl = 'https://dobprotocol.com' }: PostMetaProps) {
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const url = `${baseUrl}/blog/${post.slug}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {post.seo_keywords && <meta name="keywords" content={post.seo_keywords} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="article:published_time" content={post.created_at} />
      <meta property="article:modified_time" content={post.updated_at} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data for Blog Post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: description,
            datePublished: post.created_at,
            dateModified: post.updated_at,
            author: {
              '@type': 'Organization',
              name: 'DOB Protocol'
            },
            publisher: {
              '@type': 'Organization',
              name: 'DOB Protocol',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url
            }
          })
        }}
      />
    </Head>
  );
} 