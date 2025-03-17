'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Set up cursor tracking using CSS variables for better performance
  useEffect(() => {
    const footer = footerRef.current;
    const card = cardRef.current;
    if (!footer || !card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      
      // Calculate mouse position relative to the footer
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate percentage position for card movement (from -1 to 1)
      const xPercentage = ((x / rect.width) - 0.5) * 2; // -1 to 1
      const yPercentage = ((y / rect.height) - 0.5) * 2; // -1 to 1
      
      // Apply subtle transform to the card
      card.style.transform = `translate(${xPercentage * 5}px, ${yPercentage * 5}px)`;
    };
    
    const handleMouseLeave = () => {
      // Reset transform when mouse leaves
      card.style.transform = 'translate(0px, 0px)';
    };
    
    footer.addEventListener('mousemove', handleMouseMove);
    footer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      footer.removeEventListener('mousemove', handleMouseMove);
      footer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-24 md:py-24 px-4 mt-[-200px] md:mt-[-200px] relative footer-container">
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`max-w-7xl mx-auto rounded-2xl p-4 md:p-8 mt-[140px] md:mt-[170px] flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 glassmorphism ${isDarkMode ? 'footer-dark' : 'footer-light'}`}
      >
        <div className="w-full flex flex-row justify-between items-start md:items-center">
          {/* Left side: Logo + Social Icons on mobile */}
          <div className="flex flex-col items-start space-y-4 md:space-y-0 pl-2 md:pl-0">
            {/* Logo with theme toggle functionality */}
            <button 
              className="focus:outline-none relative flex items-center space-x-3"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Image
                src="/dob_imagotipo.svg"
                alt="DOB Protocol"
                width={150}
                height={150}
                className="h-20 md:h-24 w-full cursor-pointer"
              />
            </button>

            {/* Social Links (now part of left column on mobile) */}
            <div className="flex md:hidden items-center space-x-6 mt-2 pl-1">
              <Link href="https://t.me/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image src="/telegram.svg" alt="Telegram" width={20} height={20} />
              </Link>
              <Link href="https://twitter.com/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image src="/x-twitter.svg" alt="X (Twitter)" width={20} height={20} />
              </Link>
              <Link href="https://linkedin.com/company/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
              </Link>
            </div>
          </div>

          {/* Right side: Support links on mobile */}
          <div className="md:hidden flex flex-col items-start justify-start mt-1 pr-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 block text-left w-full mb-1">Support</span>
            <div className="flex flex-col items-start w-full space-y-1">
              <Link href="/faq" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>FAQ</span>
              </Link>
              <Link href="/wiki" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Wiki</span>
              </Link>
              <Link href="/careers" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Careers</span>
              </Link>
              <Link href="/contact" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Contact us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links - Desktop only */}
        <div className="hidden md:grid grid-cols-3 gap-12 ml-auto w-1/2 h-full">
          {/* DOB Token Section */}
          <div className="flex flex-col items-start justify-start h-full mt-0">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 block text-left w-full mb-1">$DOB token</span>
            <div className="flex flex-col items-start w-full space-y-2">
              <Link href="/buy-dob" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Buy $DOB</span>
              </Link>
              <Link href="/tokenomics" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Tokenomics</span>
              </Link>
              <Link href="/roadmap" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Roadmap</span>
              </Link>
            </div>
          </div>

          {/* DOBI AI-Agent Section */}
          <div className="flex flex-col items-start justify-start h-full mt-0">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 block text-left w-full mb-1">DOBI AI-Agent</span>
            <div className="flex flex-col items-start w-full space-y-2">
              <Link href="/buy-dobi" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Buy $DOBI</span>
              </Link>
              <Link href="/workflow" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Workflow</span>
              </Link>
            </div>
          </div>

          {/* Support Section - Desktop */}
          <div className="flex flex-col items-start justify-start h-full mt-0">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 block text-left w-full mb-1">Support</span>
            <div className="flex flex-col items-start w-full space-y-2">
              <Link href="/faq" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>FAQ</span>
              </Link>
              <Link href="/wiki" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Wiki</span>
              </Link>
              <Link href="/careers" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Careers</span>
              </Link>
              <Link href="/contact" className="footer-animated-link">
                <span className="arrow">→</span>
                <span>Contact us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links - Desktop only */}
        <div className="hidden md:flex flex-col items-start md:items-center space-y-4">
          <div className="flex items-center space-x-6">
            <Link href="https://t.me/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/telegram.svg" alt="Telegram" width={20} height={20} />
            </Link>
            <Link href="https://twitter.com/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/x-twitter.svg" alt="X (Twitter)" width={20} height={20} />
            </Link>
            <Link href="https://linkedin.com/company/dobprotocol" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </Link>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .footer-link {
          text-align: left !important;
          justify-content: flex-start !important;
          display: block !important;
          width: 100% !important;
        }
        
        .footer-container {
          overflow: hidden;
          min-height: 320px;
          padding-top: 170px;
          background: transparent;
          position: relative;
          z-index: 10;
        }
        
        @media (min-width: 768px) {
          .footer-container {
            min-height: 400px;
            padding-top: 200px;
          }
        }
        
        /* Light mode styling */
        .footer-light.glassmorphism {
          background-color: #FFFFFF;
          background: #FFFFFF;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease, transform 0.2s ease;
        }
        
        /* Dark mode styling */
        .footer-dark.glassmorphism {
          background: rgba(66, 66, 77, 0.65);
          background-color: rgba(66, 66, 77, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 8px 32px 0 rgba(79, 70, 229, 0.2),
            0 0 0 1px rgba(79, 70, 229, 0.1) inset;
        }
        
        .glassmorphism:hover {
          box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.12);
        }
        
        .footer-dark.glassmorphism:hover {
          box-shadow: 
            0 12px 42px 0 rgba(79, 70, 229, 0.3),
            0 0 0 1px rgba(79, 70, 229, 0.2) inset;
        }
        
        /* Footer animated links styling */
        .footer-animated-link {
          position: relative;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #4F46E5;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          text-align: left;
          width: 100%;
          overflow: hidden;
          transition: color 0.3s ease;
          z-index: 1;
        }
        
        @media (max-width: 767px) {
          .footer-animated-link {
            padding: 0.15rem 0.4rem;
            font-size: 0.8rem;
          }
        }
        
        .footer-animated-link:hover {
          color: white;
        }
        
        .footer-animated-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background-color: #4F46E5;
          transition: width 0.3s ease;
          z-index: -1;
          border-radius: 0.375rem;
        }
        
        .footer-animated-link:hover::before {
          width: 100%;
        }
        
        .footer-animated-link .arrow {
          opacity: 0;
          transform: translateX(-8px);
          margin-right: 0.5rem;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .footer-animated-link:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }
        
        .footer-animated-link {
          color: #4F46E5;
        }
        
        .footer-animated-link:hover {
          color: white;
        }
      `}</style>
    </footer>
  );
};

export default Footer;



  