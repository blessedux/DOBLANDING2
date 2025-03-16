'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [shouldSlideDown, setShouldSlideDown] = useState(false);
  const [hoveringButton, setHoveringButton] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [scope, animate] = useAnimate();
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

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
    { label: 'Tokenomics', href: '/tokenomics', target: '_blank' },
    { label: 'Roadmap', href: '/roadmap', target: '_blank' },
  ];

  const dobiDropdownItems = [
    { label: 'Buy $DOBI', href: 'https://app.virtuals.io/virtuals/13315', target: '_blank' },
    { label: 'AI Agent Workflow', href: 'https://dobi.agents.dobprotocol.com/', target: '_blank' },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Clear any existing timers to prevent race conditions
  const clearAllTimers = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavMouseEnter = () => {
    setIsHoveringNav(true);
    setIsClosing(false);
    clearAllTimers();
  };

  const handleNavMouseLeave = () => {
    setIsHoveringNav(false);
    
    // Set closing state to trigger exit animation
    setIsClosing(true);
    
    // Immediately close the dropdown
    setActiveDropdown(null);
    
    // Reset the hovering button state immediately to have synchronized animations
    clearAllTimers();
    setHoveringButton(null);
    
    // Add a small timeout to reset the closing state after animations complete
    closeTimerRef.current = setTimeout(() => {
      setIsClosing(false);
    }, 300); // Shorter delay since we've sped up animations
  };

  const activateDropdown = (buttonName: string) => {
    // Set all states immediately for synchronized animations
    setHoveringButton(buttonName);
    setIsClosing(false);
    clearAllTimers();
    setActiveDropdown(buttonName);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CSS for button hover effects
  const buttonHoverClass = "relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-gray-300 dark:before:hover:border-gray-600 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100";

  // Define separate entry and exit transitions
  // Entry transitions (opening)
  const borderRadiusEntryTransition = {
    duration: 0.15, // Very fast border radius change
    ease: [0.25, 0.1, 0.25, 1.0],
    type: "tween"
  };
  
  const heightEntryTransition = {
    duration: 0.4, // Slower dropdown animation
    delay: 0.05, // Small delay to ensure border radius starts changing first
    ease: [0.25, 0.1, 0.25, 1.0]
  };

  // Exit transitions (closing) - reversed order
  const heightExitTransition = {
    duration: 0.25, // Faster collapse
    ease: [0.25, 0.1, 0.25, 1.0]
  };
  
  const borderRadiusExitTransition = {
    duration: 0.3, // Slightly slower border radius change for smoothness
    delay: 0.2, // Delay border radius change until dropdown is mostly collapsed
    ease: [0.25, 0.1, 0.25, 1.0],
    type: "tween"
  };
  
  // Updated dropdown variants with different entry/exit behaviors
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25, // Faster exit for height
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4, // Slower entry
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.1 // Small delay to let border radius change first
      }
    }
  };

  // Show navbar only when not at top or when dropdown is active
  const showNavbar = !isAtTop || activeDropdown !== null;

  // Calculate fade-out speed - twice as fast
  const fadeOutDuration = 0.75; // 1.5s / 2 = 0.75s

  // Calculate the vertical position - only slide down when appearing, not when disappearing
  const navbarPosition = shouldSlideDown && !isAtTop ? '1rem' : '0';

  // Determine border radius based on button hover or active dropdown
  const borderRadius = hoveringButton || activeDropdown ? "16px" : "9999px";
  
  // Calculate navHeight based on active dropdown or mobile menu
  const getNavHeight = () => {
    // If mobile menu is open, provide more height
    if (mobileMenuOpen) {
      // Add extra height for mobile dropdown if active
      if (activeDropdown === 'dob-mobile' || activeDropdown === 'dobi-mobile') {
        return "22rem"; // More space for dropdown items
      }
      return "18rem"; // Base height for mobile menu
    }
    
    // For desktop dropdowns
    return activeDropdown ? "16rem" : "4rem";
  };
  
  const navHeight = getNavHeight();

  // Provide different transitions based on whether we're opening or closing
  const getTransitions = () => {
    if (isClosing) {
      return {
        borderRadius: borderRadiusExitTransition,
        height: heightExitTransition
      };
    }
    return {
      borderRadius: borderRadiusEntryTransition,
      height: heightEntryTransition
    };
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

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
          ref={scope}
          initial={{ height: "4rem", borderRadius: "9999px" }}
          animate={{ 
            borderRadius: borderRadius,
            height: navHeight,
          }}
          transition={getTransitions()}
          className="relative px-5 py-0 overflow-visible"
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
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
        >
          {/* Main navbar content - removed horizontal movement */}
          <div className="flex justify-between items-start h-full relative w-full">
            <div className="flex items-center justify-between w-full h-16">
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
                {/* DOB Dropdown - Full height column */}
                <div className="relative h-full flex flex-col items-center">
                  {/* Expanded hover area for better hit detection */}
                  <div 
                    className="absolute inset-0 -top-[20px] -bottom-[100px] -left-[10px] -right-[10px] w-[100px]" 
                    onMouseEnter={() => activateDropdown('dob')}
                  />
                  <button
                    className={`flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass} z-10`}
                    onClick={() => activateDropdown('dob')}
                    onMouseEnter={() => activateDropdown('dob')}
                  >
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

                  {/* DOB Dropdown content - fade animation only */}
                  <AnimatePresence mode="wait">
                    {activeDropdown === 'dob' && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-0 right-0 mt-2 px-3 pb-2 pt-2 z-10 top-[30px]"
                      >
                        <div className="flex flex-col gap-1">
                          {dobDropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              target={item.target}
                              rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                              className="text-sm dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium transition-colors duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* DOBI AI-Agent Dropdown - Full height column */}
                <div className="relative h-full flex flex-col items-center">
                  {/* Expanded hover area for better hit detection */}
                  <div 
                    className="absolute inset-0 -top-[20px] -bottom-[100px] -left-[10px] -right-[10px] w-[100px]" 
                    onMouseEnter={() => activateDropdown('dobi')}
                  />
                  <button
                    className={`flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass} z-10`}
                    onClick={() => activateDropdown('dobi')}
                    onMouseEnter={() => activateDropdown('dobi')}
                  >
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

                  {/* DOBI Dropdown content - fade animation only */}
                  <AnimatePresence mode="wait">
                    {activeDropdown === 'dobi' && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-0 right-0 mt-2 px-3 pb-2 pt-2 z-10 top-[30px]"
                      >
                        <div className="flex flex-col gap-1">
                          {dobiDropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              target={item.target}
                              rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                              className="text-sm dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium transition-colors duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regular Links - Update hover colors to match new primary color */}
                <Link 
                  href="/faq" 
                  className={`dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass}`}
                >
                  FAQ
                </Link>
                <Link 
                  href="/wiki" 
                  className={`dark:text-gray-300 text-gray-700 hover:text-[#597CE9] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass}`}
                >
                  Wiki
                </Link>
                <Link
                  href="https://home.dobprotocol.com/home"
                  className={`px-5 py-2 bg-[#597CE9] text-white rounded-full hover:bg-[#3252c7] transition-colors dark:bg-[#597CE9] dark:hover:bg-[#3252c7] relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-white/30 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100`}
                >
                  Invest
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`dark:text-gray-300 text-gray-700 hover:text-gray-900 dark:hover:text-white p-1.5 ${buttonHoverClass}`}
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
            
            {/* Mobile Menu - Inside navbar container */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.1, 0.25, 1.0],
                    staggerChildren: 0.05
                  }}
                  className="md:hidden w-full pt-4 pb-3 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* DOB Section */}
                    <div>
                      <motion.div
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleDropdownToggle('dob-mobile')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white cursor-pointer transition-colors`}
                      >
                        <span>DOB</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'dob-mobile' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {activeDropdown === 'dob-mobile' && (
                          <motion.div
                            variants={{
                              hidden: { 
                                opacity: 0,
                                height: 0,
                                y: -10,
                                transition: {
                                  duration: 0.2,
                                  ease: [0.25, 0.1, 0.25, 1.0]
                                }
                              },
                              visible: { 
                                opacity: 1,
                                height: "auto",
                                y: 0,
                                transition: {
                                  duration: 0.3,
                                  ease: [0.25, 0.1, 0.25, 1.0]
                                }
                              }
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="mt-1 pl-5 space-y-2 overflow-hidden"
                          >
                            {dobDropdownItems.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.2,
                                  delay: index * 0.05 + 0.1
                                }}
                              >
                                <Link
                                  href={item.href}
                                  target={item.target}
                                  rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium py-1.5 transition-colors duration-200"
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* DOBI Section */}
                    <div>
                      <motion.div
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleDropdownToggle('dobi-mobile')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white cursor-pointer transition-colors`}
                      >
                        <span>DOBI</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'dobi-mobile' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {activeDropdown === 'dobi-mobile' && (
                          <motion.div
                            variants={{
                              hidden: { 
                                opacity: 0,
                                height: 0,
                                y: -10,
                                transition: {
                                  duration: 0.2,
                                  ease: [0.25, 0.1, 0.25, 1.0]
                                }
                              },
                              visible: { 
                                opacity: 1,
                                height: "auto",
                                y: 0,
                                transition: {
                                  duration: 0.3,
                                  ease: [0.25, 0.1, 0.25, 1.0]
                                }
                              }
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="mt-1 pl-5 space-y-2 overflow-hidden"
                          >
                            {dobiDropdownItems.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.2,
                                  delay: index * 0.05 + 0.1
                                }}
                              >
                                <Link
                                  href={item.href}
                                  target={item.target}
                                  rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-[#597CE9] dark:hover:text-[#597CE9] font-medium py-1.5 transition-colors duration-200"
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Regular Links */}
                    <motion.div
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Link
                        href="/faq"
                        className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white transition-colors"
                      >
                        FAQ
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                    >
                      <Link
                        href="/wiki"
                        className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#597CE9] dark:hover:text-white transition-colors"
                      >
                        Wiki
                      </Link>
                    </motion.div>
                    
                    <motion.div 
                      className="pt-2"
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <Link
                        href="https://home.dobprotocol.com/home"
                        className="block w-full px-4 py-2 bg-[#597CE9] text-white text-center rounded-full hover:bg-[#3252c7] transition-colors dark:bg-[#597CE9] dark:hover:bg-[#3252c7]"
                      >
                        Invest now
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </motion.div>
    </div>
  );
};

export default Navbar;