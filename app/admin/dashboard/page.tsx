'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseWithJwt } from '../../lib/useSupabaseWithJwt';
import Link from 'next/link';

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const supabase = useSupabaseWithJwt(token);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats', token],
    queryFn: async () => {
      if (!supabase) return { totalPosts: 0, publishedPosts: 0, draftPosts: 0 };
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*');
      if (postsError) throw postsError;
      const publishedPosts = posts.filter(post => post.published);
      const draftPosts = posts.filter(post => !post.published);
      return {
        totalPosts: posts.length,
        publishedPosts: publishedPosts.length,
        draftPosts: draftPosts.length,
      };
    },
    enabled: !!token && !!supabase,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Total Posts */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total Posts
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stats?.totalPosts || 0}
              </dd>
            </div>
          </div>

          {/* Published Posts */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Published Posts
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stats?.publishedPosts || 0}
              </dd>
            </div>
          </div>

          {/* Draft Posts */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Draft Posts
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stats?.draftPosts || 0}
              </dd>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Post
            </Link>
            <Link
              href="/admin/posts"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Manage Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 