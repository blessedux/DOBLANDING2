'use client';

import Image from 'next/image';
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

export default function Problem() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 dark:text-gray-100">
          Why should big companies be the only ones profiting from essential technology?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Until now, only corporations could own and profit from the infrastructure powering our daily lives – the networks, energy systems, and smart devices we all rely on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">High Entry Barriers</h3>
            <p className="text-gray-600 dark:text-gray-300">Traditional infrastructure investments require massive capital, limiting opportunities to institutional investors</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">Wealth Concentration</h3>
            <p className="text-gray-600 dark:text-gray-300">Revenue from essential technology flows to a small number of companies instead of being widely distributed</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <h3 className="text-xl font-bold mb-3 dark:text-gray-100">Limited Access</h3>
            <p className="text-gray-600 dark:text-gray-300">Average people have been excluded from the growing machine economy that's building our future</p>
          </div>
        </div>
        
       
      </div>
    </section>
  );
}

