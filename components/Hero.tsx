'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroVideo from './HeroVideo';

const Hero = () => {
  // Calculate animation end time for planning subsequent animations
  // Base animation takes around 3.6s (3.2s duration + 0.3s initial delay + small buffer)
  const headingAnimationEndTime = 3.6;
  const subtitleDelayTime = headingAnimationEndTime;
  const interactivityDelayTime = headingAnimationEndTime + 1; // Add 1 second after subtitle starts
  
  // State to track which word is being hovered
  const [hoveredWordGroup, setHoveredWordGroup] = useState<number | null>(null);
  // State to track if animation sequence is complete and hover should be enabled
  const [hoverEnabled, setHoverEnabled] = useState(false);

  // Enable hover effect after subtitle has faded in
  useEffect(() => {
    const timer = setTimeout(() => {
      setHoverEnabled(true);
    }, interactivityDelayTime * 1000); // Convert to milliseconds
    
    return () => clearTimeout(timer);
  }, []);

  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      }
    }
  };
  
  const chunkVariant = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 3.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Special variant for "Today" - twice as slow
  const todayVariant = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 6.4, // Twice as slow as regular text
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8 // Pause before animating "Today"
      }
    }
  };

  // Heading text broken into lines and words for better hover control
  // Combining "Own the" and "of Tomorrow" as requested
  const headingGroups = [
    { id: 0, text: "Own the", className: "inline-block" },
    { id: 1, text: "Infrastructure", className: "inline-block sm:block mt-1 sm:mt-0 ml-2 sm:ml-0" },
    { id: 2, text: "of Tomorrow,", className: "inline-block sm:block mt-1 sm:mt-0 ml-2 sm:ml-0" },
    { id: 3, text: "Today", className: "inline-block sm:inline ml-3", variant: "today" }
  ];

  // Function to handle word hover - only if hover is enabled
  const handleWordHover = (id) => {
    // Disabled hover effect
  };
  
  // Function to handle mouse leave
  const handleMouseLeave = () => {
    // Disabled hover effect
  };

  // Function to get blur style based on current hover state
  const getBlurStyle = (id) => {
    return {};
  };
  
  // Function to split text into animated spans for each character
  const animateCharacters = (text: string, isToday = false) => {
    return Array.from(text).map((char, i) => (
      <motion.span
        key={`char-${i}`}
        variants={isToday ? todayVariant : chunkVariant}
        className="inline-block"
        style={{ 
          marginLeft: char === ' ' ? '0.25em' : undefined,
          width: char === ' ' ? '0.25em' : undefined
        }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 mt-0 pt-0">
      {/* Background video with shadow */}
      <div className="absolute inset-0 w-full h-full" >
        <div className="relative w-full h-full p-12 pb-24 sm:p-6 sm:pb-16 xs:p-4 xs:pb-12 mobile-video-container">
          <div className="relative w-full h-full rounded-[2%] overflow-hidden bg-black" 
              style={{ 
                boxShadow: '0 0 40px 15px rgba(0, 0, 0, 0.8)',
                position: 'relative'
              }}>
            <HeroVideo />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl mx-auto pt-16 sm:pt-10 md:pt-0">
          {/* Content */}
          <div className="flex flex-col justify-center text-center">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-gray-100 mb-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {headingGroups.map((group) => (
                <div
                  key={group.id}
                  className={group.className}
                  style={getBlurStyle(group.id)}
                >
                  {group.variant === "today" ? 
                    <motion.span
                      variants={todayVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      {animateCharacters(group.text, true)}
                    </motion.span>
                    : 
                    animateCharacters(group.text)
                  }
                </div>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: subtitleDelayTime }}
              className="text-xl md:text-2xl text-white dark:text-gray-300 mb-8"
            >
              Own pieces of smart devices that earn money – from solar panels to WiFi networks
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: subtitleDelayTime + 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a 
                href="https://wiki.dobprotocol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Learn more
              </a>
              <div className="gradient-button-wrapper">
                <a 
                  href="https://home.dobprotocol.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-button bg-primary-600 text-white font-bold"
                >
                  Invest now
                </a>
                <div className="gradient-button-bg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url(https://fonts.googleapis.com/css?family=Hind:700);
        
        .hover:shadow-glow {
          box-shadow: 0 0 28px 10px rgba(89, 124, 233, 0.8);
        }
        
        .shadow-glow {
          box-shadow: 0 0 0px 0px rgba(89, 124, 233, 0);
          transition: box-shadow 0.4s ease;
        }
        
        .shadow-glow:hover {
          box-shadow: 0 0 28px 10px rgba(89, 124, 233, 0.8);
        }

        .gradient-button-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .gradient-button {
          display: inline-flex;
          position: relative;
          z-index: 1;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5rem;
          padding: 0.75rem 2.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .gradient-button-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 30%, #EC4899 68%, #3B82F6 100%);
          background-size: 300% 300%;
          border-radius: 0.5rem;
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

        /* Mobile video container styling - only for smaller screens */
        @media (max-width: 640px) {
          .video-frame {
            transform: translate(-50%, -50%) scale(3) !important;
            width: 300% !important;
            height: 300% !important;
          }
          
          .mobile-video-container {
            padding: 4px !important;
          }
        }
        
        /* Extra small screens - very aggressive scaling */
        @media (max-width: 480px) {
          .video-frame {
            transform: translate(-50%, -50%) scale(3.5) !important;
            width: 350% !important;
            height: 350% !important;
          }
          
          .mobile-video-container {
            padding: 2px !important;
          }
        }
        
        /* Medium screens - moderate scaling */
        @media (min-width: 641px) and (max-width: 1024px) {
          .video-frame {
            transform: translate(-50%, -50%) scale(1.5) !important;
            width: 150% !important;
            height: 150% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

