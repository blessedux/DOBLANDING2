import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOB Protocol | Fractional Machine Ownership Platform",
  description: "Invest in income-producing machines and technology assets through fractional ownership. Earn passive income from the machine economy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1M0T2HXGZN"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1M0T2HXGZN');
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Set light mode as default
            localStorage.setItem('dob-theme', 'light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
