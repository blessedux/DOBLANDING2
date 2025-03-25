'use client'
import Image from 'next/image';
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

export default function Partners() {
  const partners = [
    { 
      name: "Helium", 
      description: "The people's wireless network", 
      url: "https://www.helium.com/",
      logo: "/icons/helium.png"
    },
    { 
      name: "Dimo", 
      description: "Connecting the future of transportation",
      url: "https://dimo.org/",
      logo: "/icons/dimo.png"
    },
    { 
      name: "Render", 
      description: "Powering next-generation computing",
      url: "https://rendernetwork.com/",
      logo: "/icons/render-token-logo.png"
    },
    { 
      name: "TAO", 
      description: "Building smarter autonomous systems",
      url: "https://bittensor.com/",
      logo: "/icons/bittensor.png"
    },
    { 
      name: "IoTeX", 
      description: "DePIN + AI for everyone",
      url: "https://iotex.io/",
      logo: "/icons/IOTX.png"
    },
    { 
      name: "SpaceCoin", 
      description: "Decentralized infrastructure for space",
      url: "https://spacecoin.org/",
      logo: "/spacecoin_logo.png"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <AnimatedText
            text="Dobprotocol is Working with Technology Leaders"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100"
          />
          <AnimatedText
            text="We are working on partnerships with established networks to bring you trusted, income-producing machine investments"
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.a 
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-sm dark:shadow-gray-900/10">
                <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden">
                  <Image 
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="64px"
                    style={{ objectFit: 'contain' }}
                    className="p-1"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{partner.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{partner.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
} 