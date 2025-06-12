'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
  const { login, authenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  useEffect(() => {
    if (authenticated) {
      router.push(callbackUrl);
    }
  }, [authenticated, callbackUrl, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to DOB Protocol Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect your wallet to access the admin dashboard
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={login}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
} 