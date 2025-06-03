'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { InfiniteSlider } from './InfiniteSlider';

const TrustedBy = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // State to track if the primary SVGs fail to load
  const [svgLoadFailed, setSvgLoadFailed] = useState({
    polygon: false,
    avalanche: false,
    celo: false
  });

  // Purple color for hover state - using direct color instead of filter
  const purpleColor = "#597CE9";

  // Inline SVG components as fallbacks with theme-aware colors
  const InlinePolygon = ({ isPurple = false }) => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L75 25L50 40L25 25L50 10Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M50 43L75 28V25L50 40V43Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M25 25V28L50 43V40L25 25Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M50 10V25L75 25L50 10Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M50 25L25 25L50 10V25Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
    </svg>
  );

  const InlineAvalanche = ({ isPurple = false }) => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L25 40H45L50 30L55 40H75L50 10Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
    </svg>
  );

  const InlineCelo = ({ isPurple = false }) => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C61.0457 10 70 18.9543 70 30C70 41.0457 61.0457 50 50 50C38.9543 50 30 41.0457 30 30C30 18.9543 38.9543 10 50 10Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M45 25C47.7614 25 50 27.2386 50 30C50 32.7614 47.7614 35 45 35C42.2386 35 40 32.7614 40 30C40 27.2386 42.2386 25 45 25Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
      <path d="M55 25C57.7614 25 60 27.2386 60 30C60 32.7614 57.7614 35 55 35C52.2386 35 50 32.7614 50 30C50 27.2386 52.2386 25 55 25Z" fill={isPurple ? purpleColor : (isDarkMode ? '#ffffff' : '#000000')}/>
    </svg>
  );

  // Handle image load errors
  const handleError = (logo: keyof typeof svgLoadFailed) => {
    setSvgLoadFailed(prev => ({
      ...prev,
      [logo]: true
    }));
  };

  // Create logo array for easier duplication
  const logoItems = [
    {
      id: 'polygon',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          {svgLoadFailed.polygon ? (
            <motion.div
              initial={false}
              whileHover="hover"
              variants={{
                hover: { opacity: 1 }
              }}
            >
              {/* Use conditional rendering for immediate color change */}
              <motion.div 
                initial={false}
                variants={{
                  normal: { opacity: 1 },
                  hover: { opacity: 0, display: 'none' }
                }}
                whileHover="hover"
              >
                <InlinePolygon isPurple={false} />
              </motion.div>
              <motion.div 
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }} 
                variants={{
                  normal: { opacity: 0 },
                  hover: { opacity: 1, display: 'block' }
                }}
                whileHover="hover"
              >
                <InlinePolygon isPurple={true} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.img 
              src="/partners/polygon.svg" 
              alt="Polygon" 
              onError={() => handleError('polygon')}
              className="h-16 object-contain purple-hover-target"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </motion.div>
      )
    },
    {
      id: 'base',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/base.svg" 
            alt="Base" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    },
    {
      id: 'stellar',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/stellar.svg" 
            alt="Stellar" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    },
    {
      id: 'ehive',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/ehive.svg" 
            alt="eHive" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    },
    {
      id: 'avalanche',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          {svgLoadFailed.avalanche ? (
            <motion.div
              initial={false}
              whileHover="hover"
              variants={{
                hover: { opacity: 1 }
              }}
            >
              {/* Use conditional rendering for immediate color change */}
              <motion.div 
                initial={false}
                variants={{
                  normal: { opacity: 1 },
                  hover: { opacity: 0, display: 'none' }
                }}
                whileHover="hover"
              >
                <InlineAvalanche isPurple={false} />
              </motion.div>
              <motion.div 
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }} 
                variants={{
                  normal: { opacity: 0 },
                  hover: { opacity: 1, display: 'block' }
                }}
                whileHover="hover"
              >
                <InlineAvalanche isPurple={true} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.img 
              src="/partners/Avalanche.svg" 
              alt="Avalanche" 
              onError={() => handleError('avalanche')}
              className="h-16 object-contain purple-hover-target"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </motion.div>
      )
    },
    {
      id: 'celo',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          {svgLoadFailed.celo ? (
            <motion.div
              initial={false}
              whileHover="hover"
              variants={{
                hover: { opacity: 1 }
              }}
            >
              {/* Use conditional rendering for immediate color change */}
              <motion.div 
                initial={false}
                variants={{
                  normal: { opacity: 1 },
                  hover: { opacity: 0, display: 'none' }
                }}
                whileHover="hover"
              >
                <InlineCelo isPurple={false} />
              </motion.div>
              <motion.div 
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }} 
                variants={{
                  normal: { opacity: 0 },
                  hover: { opacity: 1, display: 'block' }
                }}
                whileHover="hover"
              >
                <InlineCelo isPurple={true} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.img 
              src="/partners/Celo.svg" 
              alt="Celo" 
              onError={() => handleError('celo')}
              className="h-16 object-contain purple-hover-target"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </motion.div>
      )
    },
    {
      id: 'vara',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/vara.svg" 
            alt="Vara" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    },
    {
      id: 'virtuals',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/virtuals.svg" 
            alt="Virtuals" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ 
              filter: isDarkMode 
                ? 'brightness(0) invert(1)' 
                : 'brightness(0) saturate(0)'
            }}
          />
        </motion.div>
      )
    },
    {
      id: 'odisea',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/odisea.svg" 
            alt="Odisea" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    },
    {
      id: 'ents',
      component: (
        <motion.div 
          className="partner-logo bg-transparent"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="/partners/ents.svg" 
            alt="Ents" 
            width={100} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain purple-hover-target"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </motion.div>
      )
    }
  ];

  return (
    <section className="w-full py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">Trusted by</h2>
      </div>
      
      <div className="px-4 md:px-6">
        <InfiniteSlider
          gap={32}
          duration={35}
          durationOnHover={70}
          className="py-4"
        >
          {logoItems.map((item) => (
            <div key={item.id} className="flex items-center justify-center">
              {item.component}
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <style jsx global>{`
        .partner-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          flex-shrink: 0;
          padding: 10px;
          min-width: 150px;
          transition: transform 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        
        .partner-logo:hover .purple-hover-target {
          filter: brightness(0) saturate(100%) invert(45%) sepia(61%) saturate(3146%) hue-rotate(220deg) brightness(93%) contrast(93%) !important;
          transition: none !important;
        }
        
        :global(.dark) .partner-logo:hover .purple-hover-target {
          filter: brightness(0) saturate(100%) invert(45%) sepia(61%) saturate(3146%) hue-rotate(220deg) brightness(93%) contrast(93%) !important;
          transition: none !important;
        }

        @media (max-width: 768px) {
          .partner-logo {
            min-width: 100px;
            padding: 5px;
          }
        }

        @media (min-width: 769px) {
          .partner-logo {
            min-width: 120px;
            height: 60px;
          }
          
          .partner-logo img,
          .partner-logo svg {
            height: 40px !important;
            width: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBy; 