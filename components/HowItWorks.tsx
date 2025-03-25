'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';
// Define types for AnimatedText component
interface AnimatedTextProps {
  text: string;
  className: string;
}

// Text animation component - updated to use words instead of characters
const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Setup scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"]
  });
  
  // Split text into words instead of characters
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

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  
  // Define step data
  const steps = [
    {
      number: "1",
      title: "Choose your investment",
      description: "Browse verified machines already generating real value in the world",
      bgFrom: "from-blue-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-blue-900/20",
      numberBg: "bg-blue-100",
      darkNumberBg: "dark:bg-blue-800/50",
      numberColor: "text-blue-600",
      darkNumberColor: "dark:text-blue-300"
    },
    {
      number: "2",
      title: "Purchase digital shares",
      description: "Buy affordable portions that fit your budget, starting from just $10",
      bgFrom: "from-indigo-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-indigo-900/20",
      numberBg: "bg-indigo-100",
      darkNumberBg: "dark:bg-indigo-800/50",
      numberColor: "text-indigo-600",
      darkNumberColor: "dark:text-indigo-300"
    },
    {
      number: "3",
      title: "Collect regular income",
      description: "Receive automatic payments as your machines generate revenue",
      bgFrom: "from-purple-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-purple-900/20",
      numberBg: "bg-purple-100",
      darkNumberBg: "dark:bg-purple-800/50",
      numberColor: "text-purple-600",
      darkNumberColor: "dark:text-purple-300"
    }
  ];
  
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
          {/* Left Column - Steps (Vertical) with blur animation */}
          <motion.div 
            ref={stepsRef}
            className="flex flex-col space-y-6"
          >
            {steps.map((step, index) => {
              const { scrollYProgress } = useScroll({
                target: stepsRef,
                offset: ["start 60%", "start 20%"]
              });
              
              // Calculate when this specific step should animate
              // Stagger the animations by delaying each step's trigger point
              const stepProgress = useTransform(
                scrollYProgress,
                [0.3 + index * 0.15, 0.5 + index * 0.15], 
                [0, 1]
              );
              
              return (
                <motion.div 
                  key={index}
                  className={`flex flex-col items-start p-6 bg-gradient-to-b ${step.bgFrom} ${step.bgTo} ${step.darkBgFrom} dark:to-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/10 transition-colors duration-300`}
                  style={{
                    opacity: stepProgress,
                    transform: useTransform(
                      stepProgress,
                      [0, 1],
                      ["translateY(15px)", "translateY(0px)"]
                    )
                  }}
                >
                  <div className="flex items-center w-full mb-4">
                    <div className={`w-12 h-12 ${step.numberBg} ${step.darkNumberBg} rounded-full flex items-center justify-center mr-4 transition-colors duration-300 flex-shrink-0`}>
                      <span className={`text-xl font-bold ${step.numberColor} ${step.darkNumberColor}`}>{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold dark:text-gray-100">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-16">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Blank Card */}
          <div className="h-full flex items-center justify-center">
            <div className="w-full h-[450px] rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-md transition-colors duration-300 p-6 relative overflow-hidden">
              <Image 
                src="/charging-station-powering-up-electric-car.webp" 
                alt="DOB Protocol" 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

