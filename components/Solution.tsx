'use client';

import Image from "next/image"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Animation variants - ensure full opacity after animation
const leftTopCardVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: 'easeOut' } 
  }
};

const leftBottomCardVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.4, ease: 'easeOut', delay: 0.2 } 
  }
};

const rightTopCardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: 'easeOut' } 
  }
};

const rightBottomCardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.4, ease: 'easeOut', delay: 0.2 } 
  }
};

// Card shadow settings
const cardShadowStyle = {
  initial: {
    boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
  },
  hover: {
    boxShadow: '0 25px 50px -12px rgba(89, 124, 233, 0.6)',
    y: -10,
    scale: 1.05,
    zIndex: 10,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

// Card container style with stronger shadow
const cardContainerStyle = {
  boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
};

// Enhanced hover style with stronger shadow and more growth
const cardHoverStyle = {
  boxShadow: '0 25px 50px -12px rgba(89, 124, 233, 0.6)',
  transform: 'translateY(-10px) scale(1.05)',
  zIndex: 10
};

// Define types for AnimatedText component
interface AnimatedTextProps {
  text: string;
  className: string;
}

// Text animation component
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

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section 
      id="solution" 
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedText 
              text="Now you can own a piece of the digital future"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 dark:text-gray-100"
            />
            <AnimatedText 
              text="DobProtocol splits ownership of valuable machines into affordable digital shares, giving you access to steady income from technology that's building tomorrow's world."
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            />
            
            {/* List items */}
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Invest in real-world machines with as little as $10</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Receive automatic payments as your devices generate revenue</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Build a diverse portfolio of income-producing technology</span>
              </li>
            </ul>
          </div>
          
          {/* Animated Cards */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              {/* Left Column */}
              <div className="flex flex-col space-y-4">
                <motion.div
                  className="rounded-lg overflow-hidden h-32 relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "0px 0px -200px 0px", amount: "some" }}
                  whileHover="hover"
                  variants={{
                    initial: { ...leftTopCardVariants.initial, boxShadow: cardShadowStyle.initial.boxShadow },
                    animate: leftTopCardVariants.animate,
                    hover: cardShadowStyle.hover
                  }}
                >
                  <Image 
                    src="/icons/cubos.gif" 
                    alt="Animated cubes representing tokenized assets" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </motion.div>
                
                <motion.div
                  className="rounded-lg overflow-hidden h-48 relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "0px 0px -200px 0px", amount: "some" }}
                  whileHover="hover"
                  variants={{
                    initial: { ...leftBottomCardVariants.initial, boxShadow: cardShadowStyle.initial.boxShadow },
                    animate: leftBottomCardVariants.animate,
                    hover: cardShadowStyle.hover
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-lg"
                  >
                    <source src="/icons/mockup.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col space-y-4">
                <motion.div
                  className="rounded-lg overflow-hidden h-48 relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "0px 0px -200px 0px", amount: "some" }}
                  whileHover="hover"
                  variants={{
                    initial: { ...rightTopCardVariants.initial, boxShadow: cardShadowStyle.initial.boxShadow },
                    animate: rightTopCardVariants.animate,
                    hover: cardShadowStyle.hover
                  }}
                >
                  <Image 
                    src="/icons/dashboard.gif" 
                    alt="User dashboard showing investment returns" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </motion.div>
                
                <motion.div
                  className="rounded-lg overflow-hidden h-32 relative"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "0px 0px -200px 0px", amount: "some" }}
                  whileHover="hover"
                  variants={{
                    initial: { ...rightBottomCardVariants.initial, boxShadow: cardShadowStyle.initial.boxShadow },
                    animate: rightBottomCardVariants.animate,
                    hover: cardShadowStyle.hover
                  }}
                >
                  <Image 
                    src="/icons/cubos.gif" 
                    alt="Animated cubes representing fractional ownership" 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

