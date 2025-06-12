'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Blog Admin Dashboard</h1>
        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Welcome, {session.user?.name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your blog posts and content here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 