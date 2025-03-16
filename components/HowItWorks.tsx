'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Define types for AnimatedText component
interface AnimatedTextProps {
  text: string;
  className: string;
}

// Text animation component - same as in Solution component
const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characters = Array.from(text);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Setup scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"]
  });
  
  return (
    <motion.div ref={containerRef} className={`${className} overflow-hidden`}>
      {characters.map((char, index) => {
        // Calculate progress value for this character
        const charProgress = useTransform(
          scrollYProgress,
          [0, index / (characters.length * 1.5), (index + 1) / (characters.length * 1.5), 1],
          [0, 0, 1, 1]
        );
        
        return (
          <motion.span
            key={`${char}-${index}`}
            style={{
              display: char === ' ' ? 'inline-block' : 'inline-block',
              width: char === ' ' ? '0.25em' : 'auto',
              opacity: useTransform(charProgress, [0, 1], [0.85, 1]),
            }}
          >
            <motion.span
              style={{
                display: 'inline-block',
                color: useTransform(
                  charProgress,
                  [0, 1],
                  ["#597CE9", isDarkMode ? "#ffffff" : "#000000"]
                ),
              }}
            >
              {char}
            </motion.span>
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <AnimatedText 
            text="Own the Digital Real Estate of Tomorrow"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100"
          />
          <AnimatedText 
            text="Secure your stake in Web3 and AI infrastructure — the backbone of future technologies that generate automated revenue streams"
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Steps (Vertical) */}
          <div className="flex flex-col space-y-6">
            {/* Step 1 */}
            <div 
              className="flex flex-col items-start p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
            >
              <div className="flex items-center w-full mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 flex-shrink-0">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-300">1</span>
                </div>
                <h3 className="text-xl font-bold dark:text-gray-100">Choose your investment</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-16">
                Browse verified machines already generating real value in the world
              </p>
            </div>

            {/* Step 2 */}
            <div 
              className="flex flex-col items-start p-6 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
            >
              <div className="flex items-center w-full mb-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800/50 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 flex-shrink-0">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300">2</span>
                </div>
                <h3 className="text-xl font-bold dark:text-gray-100">Purchase digital shares</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-16">
                Buy affordable portions that fit your budget, starting from just $10
              </p>
            </div>

            {/* Step 3 */}
            <div 
              className="flex flex-col items-start p-6 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300"
            >
              <div className="flex items-center w-full mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 flex-shrink-0">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-300">3</span>
                </div>
                <h3 className="text-xl font-bold dark:text-gray-100">Collect regular income</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-16">
                Receive automatic payments as your machines generate revenue
              </p>
            </div>
          </div>

          {/* Right Column - Blank Card */}
          <div className="h-full flex items-center justify-center">
            <div className="w-full h-[450px] rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-md transition-colors duration-300 p-6">
              {/* Blank card content - can be filled later */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

