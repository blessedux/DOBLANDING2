'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

// List of whitelisted admin wallet addresses
const ADMIN_WALLETS = [
  // Add your whitelisted wallet addresses here
  '0x...', // Replace with actual wallet addresses
];

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
          loginMethods: ['wallet', 'email'],
          appearance: {
            theme: 'light',
            accentColor: '#6366f1',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
        }}
      >
        {children}
      </PrivyProvider>
    </QueryClientProvider>
  );
}

// Helper function to check if a wallet is an admin
export function isAdminWallet(address: string): boolean {
  return ADMIN_WALLETS.includes(address.toLowerCase());
} 