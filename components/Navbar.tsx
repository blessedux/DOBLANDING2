'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const dobDropdownItems = [
    { label: 'Buy $DOB', href: '/buy-dob' },
    { label: 'Tokenomics', href: '/tokenomics' },
    { label: 'Roadmap', href: '/roadmap' },
  ];

  const dobiDropdownItems = [
    { label: 'Buy $DOBI', href: '/buy-dobi' },
    { label: 'Workflow', href: '/workflow' },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-gray-900/90 bg-white/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo as dark mode toggle */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              className="focus:outline-none transform transition hover:scale-105 relative"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Image 
                src={theme === 'dark' ? "/dob_imagotipo.svg" : "/dob_imagotipo.svg"} 
                alt="DOB Protocol" 
                width={180} 
                height={180} 
                className="cursor-pointer"
              />
              <div className="absolute -right-2 -top-2 w-6 h-6 flex items-center justify-center rounded-full text-xs">
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* DOB Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('dob')}
                className="flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                <span>DOB</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'dob' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {activeDropdown === 'dob' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg dark:bg-gray-800 bg-white ring-1 ring-black ring-opacity-5 dark:ring-opacity-20"
                  >
                    <div className="py-1">
                      {dobDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DOBI AI-Agent Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('dobi')}
                className="flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                <span>DOBI AI-Agent</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'dobi' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {activeDropdown === 'dobi' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg dark:bg-gray-800 bg-white ring-1 ring-black ring-opacity-5 dark:ring-opacity-20"
                  >
                    <div className="py-1">
                      {dobiDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Regular Links */}
            <Link href="/faq" className="dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white">
              FAQ
            </Link>
            <Link href="/wiki" className="dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white">
              Wiki
            </Link>
            <Link href="/contact" className="dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white">
              Contact us
            </Link>
            <Link
              href="/invest"
              className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors dark:bg-[#6366F1] dark:hover:bg-[#4F46E5]"
            >
              Invest now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 