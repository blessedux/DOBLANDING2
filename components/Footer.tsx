'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      {/* CSS for the hover animation */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .style2 {
          position: relative;
          display: inline-block;
          vertical-align: bottom;
          overflow: hidden;
          transition: all 0.4s;
          padding: 0.25rem 0.75rem 0.25rem 2rem; /* Increased left padding for arrow */
          border-radius: 9999px; /* Full rounded */
          margin: -0.25rem 0;
          min-width: max-content; /* Ensure container is at least as wide as content */
        }
        .style2:after {
          content: attr(data-link);
          background: #4F46E5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align content to the left */
          position: absolute;
          top: 0; 
          left: -150%;
          width: 150%; /* Wider container to ensure text fits */
          height: 100%;
          transition: all 0.4s;
          border-radius: 9999px; /* Full rounded */
          padding-left: 0.75rem; /* Padding on the left for alignment */
        }
        .style2:after::before {
          content: "→";
          margin-right: 0.5rem;
          animation: spin 2s linear infinite;
        }
        .style2:hover:after {
          left: 0;
        }
        .dark .style2:after {
          background: #818CF8;
          color: white;
        }
        
        /* For the arrow icon and its animation */
        .arrow-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 100%;
        }
        
        .arrow-icon {
          display: inline-block;
          margin-right: 8px;
          transform-origin: center;
          animation: spin 2s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
          position: absolute;
          left: -1.25rem; /* Positioned further left */
        }
        
        .style2:hover .arrow-icon {
          opacity: 1;
        }
        
        /* Glass effect container */
        .glass-container {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .dark .glass-container {
          background-color: rgba(31, 41, 55, 0.8);
          border: 1px solid rgba(75, 85, 99, 0.18);
        }
      `}</style>

      <footer className="w-full py-12 px-4 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto glass-container dark:bg-gray-800/70 rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8 flex flex-col md:flex-row items-center justify-between border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden"
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 mb-6 md:mb-0">
            <Image
              src="/dob_imagotipo.svg"
              alt="DOB Protocol"
              width={150}
              height={150}
              className="h-24 w-full transition-all duration-300"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:grid grid-cols-3 gap-12 ml-auto w-1/2 h-full">
            {/* DOB Token Section */}
            <div className="flex flex-col items-start justify-center h-full mt-0">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">$DOB token</span>
              <div className="flex flex-col space-y-2 mt-1">
                <Link href="/buy-dob" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Buy $DOB">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Buy $DOB
                  </span>
                </Link>
                <Link href="/tokenomics" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Tokenomics">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Tokenomics
                  </span>
                </Link>
                <Link href="/roadmap" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Roadmap">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Roadmap
                  </span>
                </Link>
              </div>
            </div>

            {/* DOBI AI-Agent Section */}
            <div className="flex flex-col items-start h-full mt-0">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">DOBI AI-Agent</span>
              <div className="flex flex-col space-y-2 mt-1">
                <Link href="/buy-dobi" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Buy $DOBI">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Buy $DOBI
                  </span>
                </Link>
                <Link href="/workflow" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Workflow">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Workflow
                  </span>
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className="flex flex-col items-start h-full mt-0">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Support</span>
              <div className="flex flex-col space-y-2 mt-1">
                <Link href="/faq" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ FAQ">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    FAQ
                  </span>
                </Link>
                <Link href="/wiki" className="text-sm text-[#4F46E5] dark:text-blue-400 transition-colors style2" data-link="→ Wiki">
                  <span className="arrow-container">
                    <span className="arrow-icon">→</span>
                    Wiki
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Networks</span>
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
            <Link 
              href="/contact"
              className="mt-4 px-4 py-2 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-gray-700 transition-colors style2"
              data-link="→ Contact us"
            >
              <span className="arrow-container">
                <span className="arrow-icon">→</span>
                Contact us
              </span>
            </Link>
          </div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} DOB Protocol. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

