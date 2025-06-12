'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1M0T2HXGZN"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1M0T2HXGZN');
          `,
        }} />
      </head>
      <body className={inter.className}>
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
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              {!isAdminRoute && <Navbar />}
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
