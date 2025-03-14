'use client';

import { motion } from 'framer-motion';

export default function Benefits() {
  const benefits = [
    {
      title: "Real-World Backed",
      description: "Every investment is tied to actual machines doing valuable work",
      delay: 0
    },
    {
      title: "Future-Ready",
      description: "As smart devices become essential, your investment grows in value",
      delay: 0.1
    },
    {
      title: "Hands-Off Income",
      description: "No technical knowledge needed – the system manages everything",
      delay: 0.2
    },
    {
      title: "Start With Any Amount",
      description: "Begin with as little as $10 and grow your portfolio over time",
      delay: 0.3
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100">
            Why Smart Machine Investments Make Sense
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The infrastructure powering our digital future is becoming the next big investment opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/10 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-gray-100">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Illustration suggestion */}
        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 max-w-4xl mx-auto transition-colors duration-300">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">Illustration Suggestion:</p>
          <p className="text-blue-700 dark:text-blue-400 text-center">
            Create four modern icon illustrations with subtle animations:
            <br/>1. Real-World Backed: A physical machine with a digital authentication checkmark
            <br/>2. Future-Ready: A graph with upward trajectory, with small IoT devices along the curve
            <br/>3. Hands-Off Income: A relaxed person receiving notifications of income while the system works automatically
            <br/>4. Start Small: A small stack of coins growing into a larger stack over time
          </p>
        </div>
      </div>
    </section>
  );
}

