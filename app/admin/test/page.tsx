'use client';

import { useState, useEffect } from 'react';
import { useSupabaseWithJwt } from '../../lib/useSupabaseWithJwt';
import { ethers } from 'ethers';

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [step, setStep] = useState<'idle'|'wallet'|'jwt'|'supabase'|'done'>('idle');
  const [jwtError, setJwtError] = useState<string | null>(null);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [envVars, setEnvVars] = useState({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 10)}...`
      : 'Not set',
  });
  const [createdPost, setCreatedPost] = useState<any>(null);

  const supabase = useSupabaseWithJwt(token);

  // Step 1: Connect Wallet
  const connectWallet = async () => {
    setStep('wallet');
    setJwtError(null);
    setSupabaseError(null);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(address);
        setStep('jwt');
        return address;
      } else {
        throw new Error('MetaMask not found');
      }
    } catch (err: any) {
      setJwtError(err.message);
      setStep('idle');
      return null;
    }
  };

  // Step 2: Fetch JWT
  const fetchJwt = async (address: string) => {
    try {
      const message = `Sign in to DOB Protocol at ${new Date().toISOString()}`;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      const res = await fetch('/api/auth/evm-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature }),
      });
      const { token, error } = await res.json();
      if (error) throw new Error(error);
      setToken(token);
      localStorage.setItem('jwtToken', token);
      setStep('supabase');
      return token;
    } catch (err: any) {
      setJwtError(err.message);
      setStep('idle');
      return null;
    }
  };

  // Step 3: Test Supabase
  const testSupabase = async () => {
    setIsTesting(true);
    setSupabaseError(null);
    try {
      if (!supabase) throw new Error('Supabase client not ready.');
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*');
      if (postsError) throw new Error(`Connection test failed: ${postsError.message}`);
      setTestResults({
        success: true,
        message: 'Supabase connection and query succeeded!',
        details: { postsCount: posts.length },
      });
      setStep('done');
    } catch (err: any) {
      setSupabaseError(err.message);
      setTestResults({
        success: false,
        message: err.message,
      });
      setStep('done');
    } finally {
      setIsTesting(false);
    }
  };

  // Step 4: Create Test Post
  const createTestPost = async () => {
    setIsTesting(true);
    setSupabaseError(null);
    setCreatedPost(null);
    try {
      if (!supabase) throw new Error('Supabase client not ready.');
      const testPost = {
        title: 'Test Post',
        slug: `test-post-${Date.now()}`,
        excerpt: 'This is a test post',
        content: 'Test content',
        published: false,
        author_id: walletAddress,
        image_url: null,
        tags: [],
        published_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from('posts')
        .insert([testPost])
        .select()
        .single();
      if (error) throw new Error(error.message);
      setCreatedPost(data);
      setTestResults({
        success: true,
        message: 'Test post created successfully!',
        details: data,
      });
      setStep('done');
    } catch (err: any) {
      setSupabaseError(err.message);
      setTestResults({
        success: false,
        message: err.message,
      });
      setStep('done');
    } finally {
      setIsTesting(false);
    }
  };

  // UI
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Auth Debug Test</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Step-by-Step Debug</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={async () => {
                const address = await connectWallet();
                if (address) await fetchJwt(address);
              }}
              disabled={step !== 'idle'}
            >
              1. Connect Wallet & Fetch JWT
            </button>
            {walletAddress && <div className="mt-2 text-sm">Wallet: <span className="font-mono">{walletAddress}</span></div>}
            {jwtError && <div className="mt-2 text-red-600">{jwtError}</div>}
          </li>
          <li>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 mt-2"
              onClick={testSupabase}
              disabled={step !== 'supabase' || isTesting}
            >
              2. Test Supabase Connection
            </button>
            {token && <div className="mt-2 text-xs break-all">JWT: <span className="font-mono">{token}</span></div>}
            {supabaseError && <div className="mt-2 text-red-600">{supabaseError}</div>}
          </li>
          <li>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 mt-2"
              onClick={createTestPost}
              disabled={step !== 'done' || isTesting}
            >
              3. Create Test Post
            </button>
            {createdPost && (
              <div className="mt-2 text-green-700 text-xs break-all">Created Post ID: {createdPost.id}</div>
            )}
          </li>
        </ol>
      </div>
      {/* Test Results */}
      {testResults && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className={`p-4 rounded ${testResults.success ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-semibold mb-2">
              {testResults.success ? '✅ Tests Passed' : '❌ Tests Failed'}
            </p>
            <p className="mb-4">{testResults.message}</p>
            {testResults.details && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Details:</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
                  {JSON.stringify(testResults.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 