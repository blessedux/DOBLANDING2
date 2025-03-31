'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [blurAmount, setBlurAmount] = useState(0);

  // Delay navbar appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setBlurAmount(12); // Set initial blur amount
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for background and shadow effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dobDropdownItems = [
    { label: 'Buy $DOB', href: 'https://presale.dobprotocol.com/', target: '_blank' },
    { label: 'Tokenomics', href: 'https://dobprotocol.notion.site/DOB-Tokenomics-Roadmap-17beffc346f181959c10c001070ba64a', target: '_blank' },
    { label: 'Roadmap', href: 'https://dobprotocol.notion.site/Dobprotocol-Roadmap-17beffc346f18122affcefebb73fa03c', target: '_blank' },
    { label: 'White Paper', href: 'https://drive.google.com/file/d/1PWjl_nYhb0cx4ewhcfgiKe7EP-qLHkWV/view', target: '_blank' },
  ];

  const dobiDropdownItems = [
    { label: 'Buy $DOBI', href: 'https://app.virtuals.io/virtuals/13315', target: '_blank' },
    { label: 'AI Agent Workflow', href: 'https://dobi.agents.dobprotocol.com/', target: '_blank' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 mt-4 md:mt-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          opacity: { duration: 1.2, ease: "easeOut" }
        }}
        className="flex justify-center w-full max-w-3xl"
      >
        <motion.nav 
          initial={{ borderRadius: "9999px" }}
          animate={{ 
            borderRadius: mobileMenuOpen ? "16px" : "9999px"
          }}
          className="relative px-5 py-0 overflow-visible w-full"
          style={{
            opacity: isVisible ? 1 : 0,
            backdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: isScrolled 
              ? theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)' 
              : theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
            transition: `backdrop-filter 0.5s ease-in-out, 
                        background-color 0.5s ease-in-out, 
                        box-shadow 0.5s ease-in-out`
          }}
        >
          {/* Main navbar content */}
          <div className="flex justify-between items-center h-16 relative w-full">
            {/* Logo as dark mode toggle */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                className="focus:outline-none relative"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <Image 
                  src="/dob_imagotipo.svg" 
                  alt="DOB Protocol" 
                  width={320} 
                  height={320} 
                  className="cursor-pointer h-24 w-auto"
                />
              </button>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center justify-end flex-1 ml-6 space-x-4">
              {/* DOB Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5">
                  <span>DOB</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 pt-2 w-48 hidden group-hover:block z-50">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1">
                    {dobDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-[#597CE9] transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* DOBI Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5">
                  <span>DOBI</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 pt-2 w-48 hidden group-hover:block z-50">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1">
                    {dobiDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-[#597CE9] transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regular Links */}
              <Link
                href="https://dobprotocol.notion.site/Dobprotocol-FAQ-17beffc346f180f995f2e1a15c62bf46"
                className="block text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white transition-colors text-base px-3 py-1.5"
              >
                FAQ
              </Link>
              
              <Link
                href="https://wiki.dobprotocol.com"
                className="block text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white transition-colors text-base px-3 py-1.5"
              >
                Wiki
              </Link>
              
              <div className="gradient-button-wrapper relative">
                <Link
                  href="https://home.dobprotocol.com/home"
                  className="gradient-button bg-[#597CE9] text-white font-medium"
                >
                  Invest
                </Link>
                <div className="gradient-button-bg"></div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center justify-end z-20">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white p-1.5"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden w-full pt-4 pb-6 px-2"
              >
                <div className="space-y-6 mt-8">
                  {/* DOB Section */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
                      DOB
                    </p>
                    <div className="mt-2 space-y-1">
                      {dobDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* DOBI Section */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
                      DOBI
                    </p>
                    <div className="mt-2 space-y-1">
                      {dobiDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Regular Links */}
                  <div className="space-y-1 px-4">
                    <Link
                      href="https://dobprotocol.notion.site/Dobprotocol-FAQ-17beffc346f180f995f2e1a15c62bf46"
                      className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-[#597CE9]"
                    >
                      FAQ
                    </Link>
                    
                    <Link
                      href="https://wiki.dobprotocol.com"
                      className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-[#597CE9]"
                    >
                      Wiki
                    </Link>
                  </div>
                  
                  <div className="pt-4 px-4">
                    <div className="gradient-button-wrapper relative">
                      <Link
                        href="https://home.dobprotocol.com/home"
                        className="gradient-button bg-[#597CE9] text-white text-center w-full font-semibold"
                      >
                        Invest now
                      </Link>
                      <div className="gradient-button-bg"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>

      <style jsx>{`
        .gradient-button-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .gradient-button {
          display: inline-flex;
          position: relative;
          z-index: 1;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5rem;
          padding: 0.75rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .gradient-button-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 30%, #EC4899 68%, #3B82F6 100%);
          background-size: 300% 300%;
          border-radius: 50px;
          animation: AnimateBorder 4s ease infinite;
          z-index: 0;
          transform: translate(-2px, -2px);
          transition: filter 0.5s ease;
          opacity: 0;
        }
        
        .gradient-button-wrapper:hover .gradient-button-bg {
          filter: blur(6px);
          opacity: 1;
        }
        
        .gradient-button-wrapper:hover .gradient-button {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.5);
        }
        
        @keyframes AnimateBorder {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  );
};

export default Navbar;