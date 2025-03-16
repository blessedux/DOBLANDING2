'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Card shadow settings (from Solution section)
const cardShadowStyle = {
  initial: {
    boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
  },
  hover: {
    boxShadow: '0 25px 50px -12px rgba(89, 124, 233, 0.6)', // Purple neon effect
    y: -10,
    scale: 1.05,
    zIndex: 10,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

// Define types for AnimatedText component
interface AnimatedTextProps {
  text: string;
  className: string;
}

// Text animation component with word-by-word animation
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

export default function Benefits() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  const benefits = [
    {
      title: "Own Real Infrastructure",
      description: "Secure your wealth with tokenized ownership of physical machines generating reliable revenue",
      delay: 0,
      bgFrom: "from-blue-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-blue-900/20"
    },
    {
      title: "AI-Managed Assets",
      description: "Our AI agents handle everything from verification to revenue distribution automatically",
      delay: 0.1,
      bgFrom: "from-indigo-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-indigo-900/20"
    },
    {
      title: "Future-Proof Investments",
      description: "As AI and automation grow, owning the infrastructure becomes more valuable than labor",
      delay: 0.2,
      bgFrom: "from-purple-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-purple-900/20"
    },
    {
      title: "Decentralized Ownership",
      description: "Break the monopoly on critical infrastructure by democratizing access to ownership",
      delay: 0.3,
      bgFrom: "from-violet-50",
      bgTo: "to-white",
      darkBgFrom: "dark:from-violet-900/20"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <AnimatedText 
            text="Stop Chasing Money. Start Building Wealth."
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100"
          />
          <AnimatedText 
            text="Earn up to 30% annual yield through our DefAI model and LDI platform. We finance decentralized infrastructure devices with AI-managed revenue distribution, creating passive income from the machine economy."
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        <motion.div 
          ref={benefitsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => {
            const { scrollYProgress } = useScroll({
              target: benefitsRef,
              offset: ["start 70%", "start 30%"]
            });
            
            // Calculate when this specific card should animate
            const cardProgress = useTransform(
              scrollYProgress,
              [0.2 + index * 0.1, 0.4 + index * 0.1], 
              [0, 1]
            );
            
            return (
              <motion.div
                key={index}
                className={`flex flex-col p-6 rounded-xl border border-gray-100 dark:border-gray-700 bg-gradient-to-b ${benefit.bgFrom} ${benefit.bgTo} ${benefit.darkBgFrom} dark:to-gray-800`}
                style={{
                  opacity: cardProgress,
                  filter: useTransform(
                    cardProgress,
                    [0, 1],
                    ["blur(8px)", "blur(0px)"]
                  ),
                  transform: useTransform(
                    cardProgress,
                    [0, 1],
                    ["translateY(15px)", "translateY(0px)"]
                  ),
                  boxShadow: cardShadowStyle.initial.boxShadow
                }}
                whileHover={{
                  boxShadow: cardShadowStyle.hover.boxShadow,
                  y: cardShadowStyle.hover.y,
                  scale: cardShadowStyle.hover.scale,
                  zIndex: cardShadowStyle.hover.zIndex,
                  transition: cardShadowStyle.hover.transition
                }}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-gray-100">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <div className="gradient-button-wrapper">
            <a 
              href="https://home.dobprotocol.com/home"
              target="_blank"
              rel="noopener noreferrer" 
              className="gradient-button bg-primary-600 text-white font-medium"
            >
              Start Investing Now
            </a>
            <div className="gradient-button-bg"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
          border-radius: 50px;
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
          border-radius: 50px;
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
      `}</style>
    </section>
  );
}

