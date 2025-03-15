'use client';

import { useState, useEffect } from 'react';
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
    { label: 'Buy $DOB', href: '/buy-dob' },
    { label: 'Tokenomics', href: '/tokenomics' },
    { label: 'Roadmap', href: '/roadmap' },
  ];

  const dobiDropdownItems = [
    { label: 'Buy $DOBI', href: '/buy-dobi' },
    { label: 'AI Agent Workflow', href: '/workflow' },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNavMouseEnter = () => {
    setIsHoveringNav(true);
    setIsClosing(false);
  };

  const handleNavMouseLeave = () => {
    setIsHoveringNav(false);
    
    // Set closing state to trigger staggered exit animation
    setIsClosing(true);
    
    // First, close the dropdown (collapse height)
    setActiveDropdown(null);
    
    // Then, after a delay, reset the hovering button state to change border radius
    setTimeout(() => {
      setHoveringButton(null);
      setIsClosing(false);
    }, 400); // Delay should be long enough for height collapse animation
  };

  const handleButtonMouseEnter = (buttonName: string) => {
    setIsClosing(false);
    setHoveringButton(buttonName);
    // Short delay before showing dropdown for a more polished experience
    setTimeout(() => {
      if (hoveringButton === buttonName && !isClosing) {
        setActiveDropdown(buttonName);
      }
    }, 250); // Increased delay to allow border animation to complete first
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CSS for button hover effects
  const buttonHoverClass = "relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-gray-300 dark:before:hover:border-gray-600 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100";

  // Entry transition (opening)
  const borderRadiusEntryTransition = {
    duration: 0.6, // Slightly faster for border radius
    ease: [0.4, 0.0, 0.2, 1]
  };
  
  const heightEntryTransition = {
    duration: 0.8, // Normal duration for height
    delay: 0.15, // Delay height animation to start after border radius has begun changing
    ease: [0.4, 0.0, 0.2, 1]
  };
  
  // Exit transition (closing) - reversed order
  const heightExitTransition = {
    duration: 0.5, // Slightly faster collapse
    ease: [0.4, 0.0, 0.2, 1]
  };
  
  const borderRadiusExitTransition = {
    duration: 1.5, // Slowed down to 1/3 of original speed (was 0.5)
    delay: 0.3, // Delay border radius change until after height has mostly collapsed
    ease: [0.4, 0.0, 0.2, 1]
  };

  // Updated dropdown variants - removed slide animation
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 0.2 // Delay dropdown content until navbar has expanded
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
  const navHeight = activeDropdown ? "16rem" : "4rem";

  // Calculate the appropriate transitions based on whether we're opening or closing
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
          className="relative px-5 py-0 overflow-visible mt-4"
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
                  {/* Full-height hover area */}
                  <div 
                    className="absolute inset-0 -top-[20px] -bottom-[100px] w-[80px]" 
                    onMouseEnter={() => {
                      setHoveringButton('dob');
                      setIsClosing(false);
                      setTimeout(() => {
                        if (hoveringButton === 'dob' && !isClosing) {
                          setActiveDropdown('dob');
                        }
                      }, 180); // Delay dropdown appearance to see border radius change first
                    }}
                  />
                  <button
                    className={`flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#4F46E5] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass} z-10`}
                    onMouseEnter={() => handleButtonMouseEnter('dob')}
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
                              className="text-sm dark:text-gray-300 text-gray-700 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
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
                  {/* Full-height hover area */}
                  <div 
                    className="absolute inset-0 -top-[20px] -bottom-[100px] w-[80px]" 
                    onMouseEnter={() => {
                      setHoveringButton('dobi');
                      setIsClosing(false);
                      setTimeout(() => {
                        if (hoveringButton === 'dobi' && !isClosing) {
                          setActiveDropdown('dobi');
                        }
                      }, 180); // Delay dropdown appearance to see border radius change first
                    }}
                  />
                  <button
                    className={`flex items-center space-x-1 dark:text-gray-300 text-gray-700 hover:text-[#4F46E5] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass} z-10`}
                    onMouseEnter={() => handleButtonMouseEnter('dobi')}
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
                              className="text-sm dark:text-gray-300 text-gray-700 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
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
                <Link 
                  href="/faq" 
                  className={`dark:text-gray-300 text-gray-700 hover:text-[#4F46E5] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass}`}
                >
                  FAQ
                </Link>
                <Link 
                  href="/wiki" 
                  className={`dark:text-gray-300 text-gray-700 hover:text-[#4F46E5] dark:hover:text-white font-medium px-3 py-1.5 ${buttonHoverClass}`}
                >
                  Wiki
                </Link>
                <Link
                  href="https://home.dobprotocol.com/home"
                  className={`px-5 py-2 bg-[#4F46E5] text-white rounded-full hover:bg-[#4338CA] transition-colors dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-white/30 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100`}
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
          </div>
        </motion.nav>

        {/* Mobile Menu - Separate from main navbar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden mt-2 rounded-xl backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-3 space-y-4">
                {/* DOB Section */}
                <div>
                  <div
                    onClick={() => handleDropdownToggle('dob-mobile')}
                    className={`flex items-center justify-between px-2 py-1 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${buttonHoverClass}`}
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
                  </div>
                  <AnimatePresence>
                    {activeDropdown === 'dob-mobile' && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-1 pl-4 space-y-1"
                      >
                        {dobDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-1 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* DOBI Section */}
                <div>
                  <div
                    onClick={() => handleDropdownToggle('dobi-mobile')}
                    className={`flex items-center justify-between px-2 py-1 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${buttonHoverClass}`}
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
                  </div>
                  <AnimatePresence>
                    {activeDropdown === 'dobi-mobile' && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-1 pl-4 space-y-1"
                      >
                        {dobiDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-1 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regular Links */}
                <Link
                  href="/faq"
                  className={`block px-2 py-1 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${buttonHoverClass}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/wiki"
                  className={`block px-2 py-1 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${buttonHoverClass}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wiki
                </Link>
                <Link
                  href="/contact"
                  className={`block px-2 py-1 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${buttonHoverClass}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="https://home.dobprotocol.com/home"
                  className="block px-4 py-2 bg-[#4F46E5] text-white text-center rounded-full hover:bg-[#4338CA] transition-colors dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:hover:border-white/30 before:transition-all before:duration-300 before:opacity-0 before:hover:opacity-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Invest now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;