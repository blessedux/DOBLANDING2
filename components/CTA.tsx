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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-gray-100">Ready to Start Earning Passive Income?</h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Join thousands of investors who have already started building their wealth through machine investments
            </p>
          </div>
          <div className="space-x-4 mt-8">
            <div className="inline-block">
              <Link 
                href="#waitlist" 
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-500"
              >
                Join Waitlist
              </Link>
            </div>
            <div className="inline-block">
              <Link 
                href="#learn-more" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-5xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
          <h3 className="mb-4 text-xl font-bold dark:text-gray-100">What Our Investors Say</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700 transition-colors duration-300">
              <p className="italic text-gray-600 mb-4 dark:text-gray-300">"I've been earning consistent passive income for 6 months now. The platform makes it so easy to monitor my earnings."</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">- Sarah J.</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700 transition-colors duration-300">
              <p className="italic text-gray-600 mb-4 dark:text-gray-300">"The diversity of technology investments available has helped me build a resilient income portfolio."</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">- Michael T.</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700 transition-colors duration-300">
              <p className="italic text-gray-600 mb-4 dark:text-gray-300">"The fractional ownership model made it possible for me to invest in technologies I could never afford otherwise."</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">- Alex R.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

