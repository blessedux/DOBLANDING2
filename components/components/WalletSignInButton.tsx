import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { isWhitelistedAddress } from '../../app/config/auth';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletSignInButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithMetaMask() {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const message = `Sign in to DOB Protocol at ${new Date().toISOString()}`;
      const signature = await signer.signMessage(message);

      // Send to backend
      const res = await fetch('/api/auth/evm-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature }),
      });
      const { token, error } = await res.json();
      if (error) throw new Error(error);

      // Check if the address is whitelisted
      if (isWhitelistedAddress(address)) {
        router.push('/admin/dashboard');
      } else {
        alert('Unauthorized access. Your wallet is not whitelisted.');
      }
    } catch (err: any) {
      alert('Wallet sign-in failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={signInWithMetaMask}
      disabled={loading}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      ) : (
        'Sign in with MetaMask'
      )}
    </button>
  );
}