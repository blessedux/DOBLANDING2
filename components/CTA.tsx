'use client';

import Image from 'next/image';
// import FadeInOnScroll from './animations/FadeInOnScroll';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Define types for AnimatedText component
interface AnimatedTextProps {
  text: string;
  className: string;
}

// Text animation component
const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Setup scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"]
  });
  
  // Split text into words
  const words = text.split(' ');
  
  return (
    <motion.div ref={containerRef} className={`${className} overflow-hidden`}>
      {words.map((word, index) => {
        // Calculate progress value for this word
        const wordProgress = useTransform(
          scrollYProgress,
          [0, index / (words.length * 1.5), (index + 1) / (words.length * 1.5), 1],
          [0, 0, 1, 1]
        );
        
        return (
          <motion.span
            key={`${word}-${index}`}
            style={{
              display: 'inline-block',
              opacity: useTransform(wordProgress, [0, 1], [0.55, 1]),
              marginRight: '0.25em',
              filter: useTransform(
                wordProgress,
                [0, 1],
                ["blur(4px)", "blur(0px)"]
              ),
            }}
          >
            <motion.span
              style={{
                display: 'inline-block',
                color: useTransform(
                  wordProgress,
                  [0, 1],
                  ["#597CE9", isDarkMode ? "#ffffff" : "#000000"]
                ),
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default function CTA() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <section className="w-full py-12 md:py-24 cta-section">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="space-y-1">
              <AnimatedText
                text="Start With One Device"
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100"
              />
              <AnimatedText
                text="Build an Asset Portfolio"
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100"
              />
            </div>
            <AnimatedText
              text="Invest in high-performing Real World Assets generating up to 30% APY"
              className="text-xl text-gray-600 md:text-2xl dark:text-gray-300 mt-2"
            />
          </div>
        </div>
        
        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Zero Debt Financing</h3>
            <p className="text-gray-600 dark:text-gray-300">Convert future device earnings into immediate capital without giving up equity or taking on traditional debt. Deploy more machines faster.</p>
          </div>
          
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Seamless Operations</h3>
            <p className="text-gray-600 dark:text-gray-300">Our AI agents automate revenue verification and distribution, freeing you to focus on what matters – growing your network and optimizing performance.</p>
          </div>
          
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800 transition-colors duration-300">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Fast-Track Growth</h3>
            <p className="text-gray-600 dark:text-gray-300">DePIN businesses using DOB typically scale 3-5x faster than competitors. Get the capital you need when opportunities arise, not months later.</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Join the DePIN Revolution</p>
          <AnimatedText
            text="Already running Helium, Render, DIMO, or other network devices?"
            className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          />
          <AnimatedText
            text="Whether you have 5 devices or 5,000, we can help you expand your operation and maximize your earnings potential. Don't let capital constraints limit your growth."
            className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8"
          />
          <div className="gradient-button-wrapper">
            <a 
              href="https://t.me/dobprotocol_official"
              target="_blank"
              rel="noopener noreferrer" 
              className="gradient-button z-10"
            >
              Schedule a Demo
            </a>
            <div className="gradient-button-bg"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .cta-section {
          position: relative;
          z-index: 20;
          overflow: visible;
          color: #1a202c;
          background: #FFFFFF;
          background-image: linear-gradient(to bottom, 
            #FFFFFF 0%, 
            #FFFFFF 70%, 
            rgba(255, 255, 255, 0.5) 85%,
            rgba(255, 255, 255, 0) 100%);
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          bottom: -100px;
          left: 0;
          width: 100%;
          height: 300px;
          background: transparent;
          pointer-events: none;
          z-index: 15;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          opacity: 1;
          transform: translateY(-50%);
          mask-image: linear-gradient(to top, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 0.4) 25%, 
            rgba(0, 0, 0, 0.8) 50%, 
            rgba(0, 0, 0, 1) 100%);
          -webkit-mask-image: linear-gradient(to top, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 0.4) 25%, 
            rgba(0, 0, 0, 0.8) 50%, 
            rgba(0, 0, 0, 1) 100%);
        }
        
        @media (prefers-color-scheme: dark) {
          .cta-section {
            background: rgba(31, 41, 55, 1);
            background-image: linear-gradient(to bottom, 
              rgba(31, 41, 55, 1) 0%, 
              rgba(31, 41, 55, 1) 50%,
              rgba(31, 41, 55, 0.7) 80%,
              rgba(31, 41, 55, 0) 100%);
            color: white;
          }
          
          .cta-section::before {
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            opacity: 0.9;
          }
        }
        
        /* Make sure content is above the blur effect */
        .cta-section > div {
          position: relative;
          z-index: 25;
        }
        
        .gradient-button-wrapper {
          position: relative;
          display: inline-block;
          margin: 2px;
        }
        
        .gradient-button {
          display: inline-flex;
          position: relative;
          z-index: 1;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5rem;
          padding: 0.75rem 2.5rem;
          background-color: #1E293B;
          color: white;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 2px solid transparent;
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
          opacity: 1;
          filter: blur(2.5px);
        }
        
        .gradient-button-wrapper:hover .gradient-button {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.5);
        }
        
        .gradient-button-wrapper:hover .gradient-button-bg {
          transform: translate(-2px, -3px);
        }
        
        @keyframes AnimateBorder {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </section>
  );
}

