'use client';

import Image from "next/image"
import { motion } from 'framer-motion';

// Animation variants
const leftTopCardVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }
};

const leftBottomCardVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.4, ease: 'easeOut', delay: 0.2 } }
};

const rightTopCardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }
};

const rightBottomCardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.4, ease: 'easeOut', delay: 0.2 } }
};

export default function Solution() {
  return (
    <section id="solution" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 dark:text-gray-100">
              Now you can own a piece of the digital future
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              DobProtocol splits ownership of valuable machines into affordable digital shares, giving you access to steady income from technology that's building tomorrow's world.
            </p>
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
                  className="rounded-lg shadow-md overflow-hidden h-32 relative"
                  variants={leftTopCardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
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
                  className="rounded-lg shadow-md overflow-hidden h-48 relative"
                  variants={leftBottomCardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
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
                  className="rounded-lg shadow-md overflow-hidden h-48 relative"
                  variants={rightTopCardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
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
                  className="rounded-lg shadow-md overflow-hidden h-32 relative"
                  variants={rightBottomCardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
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
  )
}

