'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import WalletSignInButton from '../../components/components/WalletSignInButton';

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
  // Remove all Privy logic. Only show WalletSignInButton for login.
  // You can add your own EVM wallet session check here if needed.
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
          <WalletSignInButton />
        </div>
      </div>
    </div>
  );
} 