'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';

// Define TypeScript interfaces
interface CardData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

interface CardProps {
  card: CardData;
}

// Card data
const cardData: CardData[] = [
  {
    id: "verification",
    title: "Advanced Verification",
    description: "Our verification systems ensure machine performance and validate revenue streams in real-time, creating complete transparency for all investors. Each DePIN device is continuously monitored for optimal performance and authentic revenue generation.",
    imageSrc: "/images/verification.jpg",
    imageAlt: "Advanced verification systems",
    index: 1
  },
  {
    id: "ai-management",
    title: "AI-Powered Management",
    description: "Our AI agents automatically manage and distribute revenue to investors with zero human intervention. This creates a trustless system where machines operate, generate value, and distribute returns without middlemen or operational overhead.",
    imageSrc: "/images/ai-management.jpg",
    imageAlt: "AI-powered management",
    index: 2
  },
  {
    id: "ecosystem",
    title: "Self-Sustaining Ecosystem",
    description: "Our LDI platform uses future machine revenues as collateral to finance network expansion, creating a self-sustaining ecosystem. This innovative approach allows for rapid scaling without dilution, enabling up to 30% annual yields for investors.",
    imageSrc: "/images/ecosystem.jpg",
    imageAlt: "Self-sustaining ecosystem",
    index: 3
  }
];

const numCards = cardData.length;

export default function DamCards(): JSX.Element {
  return (
    <section className="dam-section relative">
      <div className="container px-4 mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center dark:text-gray-100">
          Decentralized Autonomous Machines
        </h2>
        
        <div className="stack-container">
          <StackCards />
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');
        
        .dam-section {
          padding: 6rem 0;
          min-height: 250vh;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .dam-section h2 {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
    </section>
  );
}

function StackCards(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="stack-wrapper">
      {cardData.map((card) => (
        <Card 
          key={card.id}
          card={card}
          containerRef={containerRef}
        />
      ))}
      
      <style jsx>{`
        .stack-wrapper {
          position: relative;
          height: 200vh;
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

function Card({ card, containerRef }: { card: CardData, containerRef: React.RefObject<HTMLDivElement> }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  
  // Calculate the progress range for this card
  const start = 0.1 + ((card.index - 1) * 0.2); // Stagger the start points
  const end = start + 0.2; // Small range for quick stacking
  
  // Use the container as the scroll target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform based on scroll progress
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [600, (card.index - 1) * 40] // Final position leaves 40px of the card above visible
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start],
    [0, 1]
  );
  
  const zIndex = card.index * 10;
  
  const motionStyle: MotionStyle = {
    position: "sticky",
    top: "100px",
    y,
    opacity,
    zIndex
  };

  return (
    <motion.div 
      ref={ref}
      className="card-container"
      style={motionStyle}
    >
      <div className="card-content">
        <div className="text-content">
          <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{card.description}</p>
        </div>
        <figure className="image-container">
          <Image 
            src={card.imageSrc} 
            alt={card.imageAlt} 
            width={500}
            height={350}
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </figure>
      </div>
      
      <style jsx>{`
        .card-container {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
        }
      `}</style>
      
      <style jsx global>{`
        .card-content {
          box-shadow: 0 0.3em 1em rgba(0, 0, 0, 0.15), 0 1em 2em rgba(0, 0, 0, 0.1);
          background: white;
          color: #131212;
          border-radius: 1.5rem;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          align-items: stretch;
          padding: 2em;
          margin: 0 auto;
          width: 100%;
          max-width: 900px;
          will-change: transform;
        }
        
        .text-content {
          padding-right: 2em;
        }
        
        .card-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: bold;
          font-size: 2rem;
        }
        
        .card-content p {
          font-weight: 300;
          line-height: 1.5;
          font-size: 1.1rem;
        }
        
        .image-container {
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        /* Dark mode styles */
        :global(.dark) .card-content {
          background: #1f2937;
          color: #f3f4f6;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .card-content {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 1.5em;
            padding: 1.5em;
          }
          
          .text-content {
            padding-right: 0;
            order: 2;
          }
          
          .image-container {
            order: 1;
          }
        }
      `}</style>
    </motion.div>
  );
} 