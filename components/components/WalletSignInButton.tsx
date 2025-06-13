'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { isWhitelistedAddress } from '../../app/config/auth';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletSignInButtonProps {
  onAuth?: (address: string, token: string) => void;
}

export default function WalletSignInButton({ onAuth }: WalletSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const message = `Sign in to DOB Protocol at ${new Date().toISOString()}`;
        const signature = await signer.signMessage(message);
        // Send to backend to get JWT
        const res = await fetch('/api/auth/evm-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, message, signature }),
        });
        const { token, error } = await res.json();
        if (error) throw new Error(error);
        if (onAuth) {
          onAuth(address, token);
        }
    } else {
        alert('Please install MetaMask to use this feature');
    }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsLoading(false);
  }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        'Connect wallet'
      )}
    </button>
  );
} 