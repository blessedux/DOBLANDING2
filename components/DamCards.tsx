'use client';

import Image from 'next/image';

// Define TypeScript interfaces
interface CardData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

// Single card data
const cardData: CardData = {
  id: "verification",
  title: "Advanced Verification",
  description: "Our verification systems ensure machine performance and validate revenue streams in real-time, creating complete transparency for all investors. Each DePIN device is continuously monitored for optimal performance and authentic revenue generation.",
  imageSrc: "/images/verification.jpg",
  imageAlt: "Advanced verification systems"
};

export default function DamCards(): JSX.Element {
  return (
    <section className="dam-section relative">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="static-card-container">
          <div className="card-content">
            <div className="text-content">
              <h3 className="text-2xl font-bold mb-4">{cardData.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{cardData.description}</p>
            </div>
            <figure className="image-container">
              <Image 
                src={cardData.imageSrc} 
                alt={cardData.imageAlt} 
                width={500}
                height={350}
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </figure>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');
        
        .dam-section {
          padding: 1rem 0;
          min-height: auto;
          max-width: 100%;
        }
        
        .static-card-container {  
          max-width: 900px;
          margin: 5px auto 2rem auto;
        }
        
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
          width: 100%;
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
    </section>
  );
} 