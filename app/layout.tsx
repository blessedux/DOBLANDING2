'use client';

import { Inter } from 'next/font/google';
import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            config={{
              loginMethods: ['email', 'wallet'],
              appearance: {
                theme: 'light',
                accentColor: '#6366f1',
              },
            }}
          >
            <ThemeProvider>
              <Navbar />
              <main className="">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </PrivyProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
