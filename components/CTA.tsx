'use client';

import Image from 'next/image';
// import FadeInOnScroll from './animations/FadeInOnScroll';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-gray-100">Finance the Infrastructure Revolution</h2>
            <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Unlock capital to deploy more devices and capture market share in the rapidly expanding $35T DePIN economy
            </p>
          </div>
          <div className="space-x-4 mt-8">
            <div className="inline-block">
              <Link 
                href="https://home.dobprotocol.com/home" 
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-500"
              >
                Get Financing Now
              </Link>
            </div>
            <div className="inline-block">
              <a 
                href="https://t.me/dobprotocol_official" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
        
        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Tokenized Financing</h3>
            <p className="text-gray-600 dark:text-gray-300">Turn your future device revenue into immediate capital through our tokenization platform. Deploy more machines faster without debt or equity dilution.</p>
          </div>
          
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">AI-Powered Operations</h3>
            <p className="text-gray-600 dark:text-gray-300">Our AI agents handle revenue verification, distribution, and performance monitoring, letting you focus on growing your network instead of administration.</p>
          </div>
          
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Rapid Scaling</h3>
            <p className="text-gray-600 dark:text-gray-300">Tap into our network of investors ready to finance your expansion. DePIN operators using DOB can scale 3-5x faster than through traditional financing methods.</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Partner with DOB Protocol</p>
          <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Are you operating Helium hotspots, Render nodes, DIMO devices, or other DePIN infrastructure?</h3>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Join over 650+ active DePIN projects already using DOB Protocol to bridge the $20B+ financing gap in decentralized infrastructure. The future isn't just about building—it's about scaling.
          </p>
          <a 
            href="https://t.me/dobprotocol_official"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

