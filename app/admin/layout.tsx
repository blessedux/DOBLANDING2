'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WalletSignInButton from '../../components/components/WalletSignInButton';
import WalletDisplay from '../../components/components/WalletDisplay';
import Link from 'next/link';

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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('jwtToken');
    // Optionally, disconnect wallet provider here if needed
    router.push('/admin');
  };

  // Check if we have a stored wallet address AND jwt token
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    const storedToken = localStorage.getItem('jwtToken');
    if (storedAddress && storedToken) {
      setWalletAddress(storedAddress);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setWalletAddress(null);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please connect your wallet to access the admin dashboard
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <WalletSignInButton onAuth={(address, token) => {
              setWalletAddress(address);
              setIsAuthenticated(true);
              localStorage.setItem('walletAddress', address);
              localStorage.setItem('jwtToken', token);
              // Redirect to dashboard after successful login
              router.push('/admin/dashboard');
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                  DOB Protocol Admin
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin/dashboard"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/posts"
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Posts
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {walletAddress && (
                <WalletDisplay address={walletAddress} onLogout={handleLogout} />
              )}
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