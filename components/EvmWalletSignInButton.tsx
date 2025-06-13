'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

export default function EvmWalletSignInButton({ onAuth }: { onAuth?: (token: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function signInWithEthereum() {
    if (!window.ethereum) {
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

      if (onAuth) onAuth(token);
      alert('Wallet authenticated!');
    } catch (err: any) {
      alert('Wallet sign-in failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={signInWithEthereum}
      disabled={loading}
      className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
    >
      {loading ? 'Connecting...' : 'Sign in with MetaMask'}
    </button>
  );
}