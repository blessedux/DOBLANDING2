'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WalletDisplayProps {
  address: string;
  onLogout: () => void;
}

export default function WalletDisplay({ address, onLogout }: WalletDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div 
      className="flex items-center space-x-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {truncateAddress(address)}
      </span>
      <button
        onClick={onLogout}
        title="Logout"
        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
} 