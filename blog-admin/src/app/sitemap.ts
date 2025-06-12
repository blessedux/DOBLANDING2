import { getAllBlogPosts } from '@/lib/contentful';

export default async function sitemap() {
  const posts = await getAllBlogPosts();
  
  const blogPosts = posts.map((post: any) => ({
    url: `https://dobprotocol.com/blog/${post.fields.slug}`,
    lastModified: new Date(post.fields.publishDate),
  }));

  return [
    {
      url: 'https://dobprotocol.com',
      lastModified: new Date(),
    },
    {
      url: 'https://dobprotocol.com/blog',
      lastModified: new Date(),
    },
    ...blogPosts,
  ];
} 