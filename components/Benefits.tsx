'use client';

import { motion } from 'framer-motion';

export default function Benefits() {
  const benefits = [
    {
      title: "Own Real Infrastructure",
      description: "Secure your wealth with tokenized ownership of physical machines generating reliable revenue",
      delay: 0
    },
    {
      title: "AI-Managed Assets",
      description: "Our AI agents handle everything from verification to revenue distribution automatically",
      delay: 0.1
    },
    {
      title: "Future-Proof Investments",
      description: "As AI and automation grow, owning the infrastructure becomes more valuable than labor",
      delay: 0.2
    },
    {
      title: "Decentralized Ownership",
      description: "Break the monopoly on critical infrastructure by democratizing access to ownership",
      delay: 0.3
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100">
            Stop Chasing Money. Start Building Wealth.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Earn up to 30% annual yield through our DefAI model and LDI platform. We finance decentralized infrastructure devices with AI-managed revenue distribution, creating passive income from the machine economy.
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

        <div className="mt-12 text-center">
          <a 
            href="https://home.dobprotocol.com/home"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary-600 px-10 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-700"
          >
            Start Investing Now
          </a>
        </div>
      </div>
    </section>
  );
}

