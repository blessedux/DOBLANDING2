'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
      filter: "blur(15px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
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
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
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
    { id: 0, text: "Own the", className: "inline-block cursor-pointer" },
    { id: 1, text: "Infrastructure", className: "inline-block sm:block mt-1 sm:mt-0 ml-2 sm:ml-0 cursor-pointer" },
    { id: 2, text: "of Tomorrow,", className: "inline-block sm:block mt-1 sm:mt-0 ml-2 sm:ml-0 cursor-pointer" },
    { id: 3, text: "Today", className: "inline-block sm:inline ml-3 cursor-pointer", variant: "today" }
  ];

  // Function to handle word hover - only if hover is enabled
  const handleWordHover = (id) => {
    if (hoverEnabled) {
      setHoveredWordGroup(id);
    }
  };
  
  // Function to handle mouse leave
  const handleMouseLeave = () => {
    if (hoverEnabled) {
      setHoveredWordGroup(null);
    }
  };

  // Function to get blur style based on current hover state
  const getBlurStyle = (id) => {
    if (!hoverEnabled || hoveredWordGroup === null) return {};
    
    return id !== hoveredWordGroup
      ? { filter: 'blur(10px)', opacity: 0.88, transition: 'filter 0.3s ease, opacity 0.3s ease' }
      : { filter: 'blur(0px)', opacity: 1, transition: 'filter 0.3s ease, opacity 0.3s ease' };
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
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full p-12">
          <div className="relative w-full h-full rounded-[2%] overflow-hidden bg-black" 
              style={{ 
                boxShadow: '0 0 40px 15px rgba(0, 0, 0, 0.8)'
              }}>
            <iframe 
              className="pointer-events-none"
              src="https://player.vimeo.com/video/1066229665?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
              }}
              frameBorder="0" 
              allow="autoplay; fullscreen" 
              title="Background Video"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white/40 dark:from-gray-900/40 dark:to-gray-800/40 transition-colors duration-300 rounded-[2%]" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          {/* Content */}
          <div className="flex flex-col justify-center text-center">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-gray-100 mb-6"
              variants={container}
              initial="hidden"
              animate="visible"
              onMouseLeave={handleMouseLeave}
            >
              {headingGroups.map((group) => (
                <div
                  key={group.id}
                  className={group.className}
                  style={getBlurStyle(group.id)}
                  onMouseEnter={() => handleWordHover(group.id)}
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
                href="https://t.me/dobprotocol_official"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Learn more
              </a>
              <a 
                href="https://home.dobprotocol.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all duration-400 hover:shadow-purple-glow shadow-purple z-10"
              >
                Invest now
              </a>  
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

        .shadow-purple {
          box-shadow: 0 0 0px 0px rgba(79, 70, 229, 0);
          transition: all 0.4s ease;
        }
        
        .hover\\:shadow-purple-glow:hover {
          box-shadow: 0 0 25px 5px rgba(79, 70, 229, 0.6);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default Hero;

