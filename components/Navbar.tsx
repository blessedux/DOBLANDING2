'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [shouldSlideDown, setShouldSlideDown] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  // Delay navbar appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Enable slide down animation only when initially showing
      setShouldSlideDown(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Manage blur amount based on visibility and scroll position
  useEffect(() => {
    let blurTimer: NodeJS.Timeout;
    
    if (isVisible && !isAtTop) {
      // Slowly increase blur when navbar becomes visible and not at top
      blurTimer = setTimeout(() => {
        setBlurAmount(12); // More aggressive blur amount
      }, 300); // Faster onset
    } else if (!isVisible || isAtTop) {
      // Quickly decrease blur when navbar should hide or at top
      setBlurAmount(0); // Immediate blur removal for more aggressive transition
    }
    
    return () => clearTimeout(blurTimer);
  }, [isVisible, isAtTop]);

  // Track scroll position for subtle navbar animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      setIsAtTop(scrollPosition === 0);
      
      // If we were at the top and now scrolled down, enable slide down
      if (isAtTop && scrollPosition > 0) {
        setShouldSlideDown(true);
      }
      
      // If we scrolled back to top, disable slide down for next appearance
      if (scrollPosition === 0) {
        setShouldSlideDown(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAtTop]);

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

  // Show navbar only when not at top or when dropdown is active
  const showNavbar = !isAtTop;

  // Calculate fade-out speed - twice as fast
  const fadeOutDuration = 0.75; // 1.5s / 2 = 0.75s

  // Calculate the vertical position - only slide down when appearing, not when disappearing
  const navbarPosition = shouldSlideDown && !isAtTop ? '1rem' : '0';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
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
            transform: `translateY(${navbarPosition})`,
            opacity: showNavbar ? (isScrolled ? 1 : 0.95) : 0,
            backdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: isScrolled 
              ? theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)' 
              : theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
            transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
                        opacity ${isAtTop ? fadeOutDuration : 1.5}s ease-in-out, 
                        backdrop-filter ${isAtTop ? 1.0 : 2.5}s ease-in-out, 
                        background-color ${isAtTop ? fadeOutDuration : 1.5}s ease-in-out, 
                        box-shadow ${isAtTop ? fadeOutDuration : 1.5}s ease-in-out`
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
              
              <Link
                href="https://home.dobprotocol.com/home"
                className="relative px-5 py-2 bg-[#597CE9] text-white rounded-full hover:bg-[#3252c7] transition-colors dark:bg-[#597CE9] dark:hover:bg-[#3252c7] group overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-white/30 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100 before:hover:shadow-[0_0_15px_rgba(89,124,233,0.5)]"
              >
                <span className="relative z-10">Invest</span>
                <span className="absolute -inset-3 opacity-0 group-hover:opacity-30 bg-white blur-xl transition-opacity duration-300 rounded-full animate-pulse-slow"></span>
              </Link>
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
                    <Link
                      href="https://home.dobprotocol.com/home"
                      className="block w-full py-3 bg-[#597CE9] text-white text-center rounded-full hover:bg-[#3252c7] transition-colors dark:bg-[#597CE9] dark:hover:bg-[#3252c7] text-base font-semibold"
                    >
                      Invest now
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>
    </div>
  );
};

export default Navbar;