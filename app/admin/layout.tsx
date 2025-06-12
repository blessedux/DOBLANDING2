'use client';

import { Inter } from 'next/font/google';
import { usePrivy } from '@privy-io/react-auth';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Whitelisted admin addresses
const ADMIN_ADDRESSES = [
  '0xBe76b786E4D9A6039B9e9F188e0ee0a955Cae5C8', 
  '0xABEA06eC4A77D4BEfaB943Dc939e81Bc9eE8F790', 
].map(addr => addr.toLowerCase());

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready, authenticated, login, logout } = usePrivy();
  const pathname = usePathname();

  // Debug logging
  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      console.log('Authentication status:', {
        isAuthenticated: authenticated,
        isAdmin: ADMIN_ADDRESSES.includes(user.wallet.address.toLowerCase()),
        hasWallet: !!user.wallet?.address
      });
    }
  }, [ready, authenticated, user?.wallet?.address]);

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If not authenticated, show login UI
  if (ready && !authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Admin Access Required
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please sign in to access the admin dashboard
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={login}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in with Privy
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is admin (either by email or wallet address)
  const isAdmin = 
    user?.email?.address === 'admin@dobprotocol.com' || 
    (user?.wallet?.address && ADMIN_ADDRESSES.includes(user.wallet.address.toLowerCase()));

  // If authenticated but not admin, show access denied with option to try again
  if (ready && authenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Access Denied
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              You don't have permission to access the admin dashboard
            </p>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Connected as: {user?.email?.address || user?.wallet?.address}
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={logout}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Out and Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/admin"
                  className={`${
                    pathname === '/admin'
                      ? 'border-indigo-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </a>
                <a
                  href="/admin/posts"
                  className={`${
                    pathname === '/admin/posts'
                      ? 'border-indigo-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Posts
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email?.address || user?.wallet?.address}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 