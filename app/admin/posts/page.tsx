'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabaseWithJwt } from '../../lib/useSupabaseWithJwt';
import Head from 'next/head';
import { SearchPreview } from '../../../components/components/SearchPreview';

// Define Post type locally since the shared type was removed
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

export default function PostsPage() {
  const [token, setToken] = useState<string | null>(null);
  const supabase = useSupabaseWithJwt(token);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    published: false,
  });

  // Fetch all posts
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      return data;
    },
  });

  // Create post mutation
  const createPost = useMutation({
    mutationFn: async (postData: typeof formData) => {
      // Prepare the data
      const postToCreate = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        seo_title: postData.seo_title || postData.title,
        seo_description: postData.seo_description || postData.excerpt,
        seo_keywords: postData.seo_keywords,
        published: postData.published,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Creating post with data:', postToCreate);

      const { data, error } = await supabase
        .from('posts')
        .insert([postToCreate])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setShowNewPostForm(false);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        published: false,
      });
      setError(null);
    },
    onError: (error: any) => {
      console.error('Error creating post:', error);
      setError(error.message || 'Failed to create post. Please try again.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.slug || !formData.content) {
        throw new Error('Title, slug, and content are required');
      }

      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(formData.slug)) {
        throw new Error('Slug can only contain lowercase letters, numbers, and hyphens');
      }

      await createPost.mutateAsync(formData);
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      setError(error.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {showNewPostForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showNewPostForm && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                  placeholder="Enter post title"
                  title="Post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                  placeholder="enter-post-slug"
                  title="Post slug"
                  pattern="[a-z0-9-]+"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only lowercase letters, numbers, and hyphens allowed
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                  placeholder="Enter a brief excerpt"
                  title="Post excerpt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={10}
                  required
                  placeholder="Enter post content"
                  title="Post content"
                />
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter SEO title (defaults to post title)"
                      title="SEO title"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      If left empty, will use the post title. Recommended length: 50-60 characters.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                    <textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                      placeholder="Enter SEO description (defaults to excerpt)"
                      title="SEO description"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      If left empty, will use the post excerpt. Recommended length: 150-160 characters.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Keywords</label>
                    <input
                      type="text"
                      value={formData.seo_keywords}
                      onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter keywords separated by commas"
                      title="SEO keywords"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate keywords with commas. Example: blockchain, crypto, web3
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="mr-2"
                  title="Published status"
                />
                <label htmlFor="published" className="text-sm font-medium">
                  Published
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>

          <div className="lg:sticky lg:top-8">
            <SearchPreview
              post={{
                id: 'preview',
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                seo_title: formData.seo_title,
                seo_description: formData.seo_description,
                seo_keywords: formData.seo_keywords,
                published: formData.published,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Slug: {post.slug}</span>
                  <span>Status: {post.published ? 'Published' : 'Draft'}</span>
                  <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                {post.seo_keywords && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Keywords: {post.seo_keywords}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => router.push(`/admin/posts/${post.id}`)}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 