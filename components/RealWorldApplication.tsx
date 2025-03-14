'use client'
import Image from 'next/image';
import { useState } from 'react';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import FadeInOnScroll from './animations/FadeInOnScroll';
import { motion, AnimatePresence } from 'framer-motion';

const RealWorldApplication = () => {
  const [activeTab, setActiveTab] = useState('energy');

  const categories = [
    {
      id: 'energy',
      label: 'Energy Producers',
      description: 'Own shares of solar panels helping communities access clean energy while generating steady returns for you',
      image: '/icons/solar-panel.png',
      color: 'bg-amber-100 dark:bg-amber-900/30',
      borderColor: 'border-amber-200 dark:border-amber-700',
      textColor: 'text-amber-800 dark:text-amber-300'
    },
    {
      id: 'connectivity',
      label: 'Connection Networks',
      description: 'Invest in WiFi systems that earn by providing internet access to underserved areas',
      image: '/icons/wifi-router.png',
      color: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
      textColor: 'text-blue-800 dark:text-blue-300'
    },
    {
      id: 'digital',
      label: 'Digital Helpers',
      description: 'Back intelligent machines that perform valuable services and share their earnings with you',
      image: '/icons/robot.png',
      color: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-700',
      textColor: 'text-purple-800 dark:text-purple-300'
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100">
            Smart Machines You Can Invest In Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from verified devices already generating value in the real world
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === category.id
                  ? `${category.color} ${category.textColor} ${category.borderColor} border`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Category Content */}
        <div className="relative min-h-[400px] bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 md:p-8 overflow-hidden transition-colors duration-300">
          <AnimatePresence mode='wait'>
            {categories.map((category) => (
              activeTab === category.id && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${category.textColor}`}>
                      {category.label}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      {category.description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className={`w-6 h-6 ${category.textColor} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="dark:text-gray-300">Verified performance data for informed decisions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className={`w-6 h-6 ${category.textColor} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="dark:text-gray-300">Automatic distribution of earnings to your wallet</span>
                      </li>
                      <li className="flex items-start">
                        <svg className={`w-6 h-6 ${category.textColor} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="dark:text-gray-300">Real-time monitoring of your investment performance</span>
                      </li>
                    </ul>
                  </div>
                  <div className={`flex items-center justify-center p-8 ${category.color} rounded-xl transition-colors duration-300`}>
                    {/* Placeholder for category image - replace with actual images */}
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 rounded-xl transition-colors duration-300">
                        <p className="text-center p-4 dark:text-gray-300">
                          [Illustration: {category.label} with income tokens flowing to investors]
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Illustration suggestion */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 max-w-4xl mx-auto transition-colors duration-300">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">Illustration Suggestion:</p>
          <p className="text-blue-700 dark:text-blue-400 text-center">
            Create three interactive category cards with clean, modern illustrations:
            <br/>1. Energy Card: Simple solar panel with sun rays hitting it, producing both electricity bolts and small coins/tokens
            <br/>2. Connection Card: WiFi router with expanding signal waves reaching houses/devices, with tokens flowing back to the router
            <br/>3. Helper Card: Friendly robot assistant performing a service task, with reward tokens appearing afterward
          </p>
        </div>
      </div>
    </section>
  );
};

export default RealWorldApplication; 