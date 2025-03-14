'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100">
            Three Simple Steps to Earning from Smart Machines
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start your journey to passive income from technology infrastructure in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div 
            className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">Choose your investment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse verified machines already generating real value in the world
            </p>
          </div>

          {/* Step 2 */}
          <div 
            className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800/50 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">Purchase digital shares</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Buy affordable portions that fit your budget, starting from just $10
            </p>
          </div>

          {/* Step 3 */}
          <div 
            className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">Collect regular income</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive automatic payments as your machines generate revenue
            </p>
          </div>
        </div>

        {/* Illustration suggestion */}
        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 max-w-4xl mx-auto transition-colors duration-300">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">Illustration Suggestion:</p>
          <p className="text-blue-700 dark:text-blue-400 text-center">
            Create a horizontal process flow with three connected illustrations:
            <br/>1. "Choose" - A hand selecting from 3-4 different machine cards (solar panel, WiFi router, small robot)
            <br/>2. "Purchase" - The selected card transforming into multiple smaller share certificates
            <br/>3. "Collect" - Income coins flowing from the certificates to a wallet icon
            <br/><br/>Add a subtle animation showing a continuous flow from Step 1 through to the income generation in Step 3.
          </p>
        </div>
      </div>
    </section>
  );
}

