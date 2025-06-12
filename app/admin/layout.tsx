'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Whitelisted admin addresses
const ADMIN_ADDRESSES = [
  '0xBe76b786E4D9A6039B9e9F188e0ee0a955Cae5C8',
  '0xABEA06eC4A77D4BEfaB943Dc939e81Bc9eE8F790',
];

// Function to truncate wallet address
const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready, login, logout } = usePrivy();
  const router = useRouter();

  // Debug logging
  useEffect(() => {
    if (ready && user) {
      console.log('Auth Status:', {
        isAuthenticated: !!user,
        isAdmin: user.email?.address?.toLowerCase() === 'admin@dobprotocol.com' || 
                (user.wallet?.address && ADMIN_ADDRESSES.includes(user.wallet.address.toLowerCase())),
        hasWallet: !!user.wallet?.address
      });
    }
  }, [ready, user]);

  // Pre-convert admin addresses to lowercase for case-insensitive comparison
  const adminAddressesLower = ADMIN_ADDRESSES.map(addr => addr.toLowerCase());

  // Check if user is admin (either by email or wallet address)
  const isAdmin = user?.email?.address?.toLowerCase() === 'admin@dobprotocol.com' || 
                 (user?.wallet?.address && adminAddressesLower.includes(user.wallet.address.toLowerCase()));

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please sign in to access the admin dashboard
            </p>
          </div>
          <div className="mt-8 space-y-6">
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Access Denied
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              You don't have permission to access this area
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={logout}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign Out and Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">DOB Admin</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/admin/posts"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Posts
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                {user?.email?.address || (user?.wallet?.address ? truncateAddress(user.wallet.address) : '')}
              </span>
              <button
                onClick={logout}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 