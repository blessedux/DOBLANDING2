'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PrivyProvider } from '@privy-io/react-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DOB Protocol',
  description: 'DOB Protocol Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ['wallet'],
            appearance: {
              theme: 'light',
              accentColor: '#4F46E5',
            },
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
} 