'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TrustedBy = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // State to track if the primary SVGs fail to load
  const [svgLoadFailed, setSvgLoadFailed] = useState({
    polygon: false,
    avalanche: false,
    celo: false
  });

  // Inline SVG components as fallbacks with theme-aware colors
  const InlinePolygon = () => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L75 25L50 40L25 25L50 10Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M50 43L75 28V25L50 40V43Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M25 25V28L50 43V40L25 25Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M50 10V25L75 25L50 10Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M50 25L25 25L50 10V25Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
    </svg>
  );

  const InlineAvalanche = () => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10L25 40H45L50 30L55 40H75L50 10Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
    </svg>
  );

  const InlineCelo = () => (
    <svg width="140" height="70" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C61.0457 10 70 18.9543 70 30C70 41.0457 61.0457 50 50 50C38.9543 50 30 41.0457 30 30C30 18.9543 38.9543 10 50 10Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M45 25C47.7614 25 50 27.2386 50 30C50 32.7614 47.7614 35 45 35C42.2386 35 40 32.7614 40 30C40 27.2386 42.2386 25 45 25Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
      <path d="M55 25C57.7614 25 60 27.2386 60 30C60 32.7614 57.7614 35 55 35C52.2386 35 50 32.7614 50 30C50 27.2386 52.2386 25 55 25Z" fill={isDarkMode ? '#ffffff' : '#000000'}/>
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
        <div className="partner-logo bg-transparent">
          {svgLoadFailed.polygon ? (
            <InlinePolygon />
          ) : (
            <img 
              src="/partners/polygon.svg" 
              alt="Polygon" 
              onError={() => handleError('polygon')}
              className="h-16 object-contain"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </div>
      )
    },
    {
      id: 'base',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/base.svg" 
            alt="Base" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </div>
      )
    },
    {
      id: 'ehive',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/ehive.svg" 
            alt="eHive" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </div>
      )
    },
    {
      id: 'avalanche',
      component: (
        <div className="partner-logo bg-transparent">
          {svgLoadFailed.avalanche ? (
            <InlineAvalanche />
          ) : (
            <img 
              src="/partners/avalanche.svg" 
              alt="Avalanche" 
              onError={() => handleError('avalanche')}
              className="h-16 object-contain"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </div>
      )
    },
    {
      id: 'celo',
      component: (
        <div className="partner-logo bg-transparent">
          {svgLoadFailed.celo ? (
            <InlineCelo />
          ) : (
            <img 
              src="/partners/celo.svg" 
              alt="Celo" 
              onError={() => handleError('celo')}
              className="h-16 object-contain"
              style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            />
          )}
        </div>
      )
    },
    {
      id: 'vara',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/vara.svg" 
            alt="Vara" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </div>
      )
    },
    {
      id: 'virtuals',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/virtuals.svg" 
            alt="Virtuals" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain virtuals-logo"
          />
        </div>
      )
    },
    {
      id: 'odisea',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/odisea.svg" 
            alt="Odisea" 
            width={140} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </div>
      )
    },
    {
      id: 'ents',
      component: (
        <div className="partner-logo bg-transparent">
          <Image 
            src="/partners/ents.svg" 
            alt="Ents" 
            width={100} 
            height={70} 
            unoptimized 
            className="h-16 w-auto object-contain"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
        </div>
      )
    }
  ];

  return (
    <section className="w-full py-16 bg-white dark:bg-gray-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">Trusted by</h2>
      </div>
      
      <div className="marquee-container relative w-full">
        {/* Single slider row - moving left */}
        <div className="marquee">
          <div className="marquee-content flex items-center">
            {/* First set of logos */}
            {logoItems.map((item) => (
              <div key={`first-${item.id}`} className="mx-12">
                {item.component}
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {logoItems.map((item) => (
              <div key={`second-${item.id}`} className="mx-12">
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }
        
        .marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }
        
        .partner-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          flex-shrink: 0;
          padding: 10px;
          min-width: 150px;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .virtuals-logo {
          filter: brightness(0) saturate(100%);
        }

        :global(.dark) .virtuals-logo {
          filter: brightness(0) saturate(100%) invert(0.85);
        }
      `}</style>
    </section>
  );
};

export default TrustedBy; 