'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

// List of authorized wallet addresses that can access the admin panel
const AUTHORIZED_ADDRESSES = [
  // Add your authorized wallet addresses here
  '0x...', // Replace with actual addresses
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    } else if (ready && authenticated && user?.wallet?.address) {
      const isAuthorized = AUTHORIZED_ADDRESSES.includes(user.wallet.address.toLowerCase());
      if (!isAuthorized) {
        router.push('/');
      }
    }
  }, [ready, authenticated, user, router]);

  if (!ready || !authenticated) {
    return null;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-gray-900">Blog Admin</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/admin/posts"
                      className={`${
                        pathname === '/admin/posts'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Posts
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </nav>
          <main className="py-10">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
} 