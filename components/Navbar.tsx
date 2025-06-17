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
    { label: 'Team', href: '/team', target: undefined },
  ];

  const dobiDropdownItems = [
    { label: 'Buy $DOBI', href: 'https://app.virtuals.io/virtuals/13315', target: '_blank' },
    { label: 'AI Agent Workflow', href: 'https://dobi.agents.dobprotocol.com/', target: '_blank' },
  ];

  return (
    <>
      {/* Full-screen mobile menu background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, borderRadius: "50%", width: "30px", height: "30px", top: "40px", right: "20px" }}
            animate={{ opacity: 1, borderRadius: 0, width: "100vw", height: "100vh", top: 0, right: 0 }}
            exit={{ opacity: 0, borderRadius: "50%", width: "30px", height: "30px", top: "40px", right: "20px" }}
            transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed bg-gradient-to-br from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 z-40"
            style={{ 
              transformOrigin: "top right",
              boxShadow: "0 2px 30px 0 rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 mt-4 md:mt-6">
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
              borderRadius: mobileMenuOpen ? "16px" : "9999px",
              opacity: mobileMenuOpen ? 0 : 1
            }}
            transition={{ 
              borderRadius: { duration: 0.5 },
              opacity: { duration: 0.3 }
            }}
            className="relative px-5 py-0 overflow-visible w-full"
            style={{
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
              {/* Logo - Now part of the navbar */}
              <div className="flex-shrink-0">
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

              {/* Hamburger Menu Button */}
              <div className="md:hidden ml-20 flex items-center justify-center z-50">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-full ${mobileMenuOpen ? 'bg-white bg-opacity-10 text-white' : 'dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white'}`}
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
                    style={{ borderRadius: '9999px' }}
                  >
                    Invest
                  </Link>
                  <div className="gradient-button-bg"></div>
                </div>
              </div>

              {/* Empty space for mobile menu button - Placeholder only */}
              <div className="md:hidden w-6"></div>
            </div>
          </motion.nav>
        </motion.div>
      </div>
      
      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden fixed inset-0 z-50 flex flex-col items-center pt-32"
          >
            <div className="w-full max-w-md px-6 overflow-y-auto max-h-[calc(100vh-8rem)] pb-20">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* DOB Section */}
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-sm font-medium text-indigo-300 dark:text-indigo-300 uppercase tracking-wider px-4 mb-3"
                  >
                    DOB
                  </motion.p>
                  <div className="mt-2 space-y-2">
                    {dobDropdownItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                      >
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2.5 text-lg text-white dark:text-white hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DOBI Section */}
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-sm font-medium text-indigo-300 dark:text-indigo-300 uppercase tracking-wider px-4 mb-3"
                  >
                    DOBI
                  </motion.p>
                  <div className="mt-2 space-y-2">
                    {dobiDropdownItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                      >
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2.5 text-lg text-white dark:text-white hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Regular Links */}
                <div className="space-y-3 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 }}
                  >
                    <Link
                      href="https://dobprotocol.notion.site/Dobprotocol-FAQ-17beffc346f180f995f2e1a15c62bf46"
                      className="block py-2.5 text-lg text-white dark:text-white font-medium hover:text-[#597CE9] dark:hover:text-[#597CE9]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.5 }}
                  >
                    <Link
                      href="https://wiki.dobprotocol.com"
                      className="block py-2.5 text-lg text-white dark:text-white font-medium hover:text-[#597CE9] dark:hover:text-[#597CE9]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Wiki
                    </Link>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                  className="pt-4 px-4"
                >
                  <div className="gradient-button-wrapper w-full relative">
                    <Link
                      href="https://home.dobprotocol.com/home"
                      className="gradient-button bg-[#597CE9] text-white text-center w-full font-semibold rounded-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Invest now
                    </Link>
                    <div className="gradient-button-bg"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          font-size: 0.875rem;
          line-height: 1.25rem;
          padding: 0.625rem 1.5rem;
          border-radius: 9999px !important;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
          width: auto;
          min-width: 100px;
          justify-content: center;
          background: #597CE9;
          height: 2.5rem;
          align-items: center;
        }
        
        .gradient-button-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 30%, #EC4899 68%, #3B82F6 100%);
          background-size: 300% 300%;
          border-radius: 9999px !important;
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
    </>
  );
};

export default Navbar;