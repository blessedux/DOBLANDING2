'use client'
import Image from 'next/image';

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
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 dark:text-gray-100">
            Working with Technology Leaders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've partnered with established networks to bring you trusted, income-producing machine investments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <a 
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-300 hover:shadow-lg"
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
            </a>
          ))}
        </div>

        {/* Partnership integration message */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl max-w-4xl mx-auto transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4 text-center dark:text-gray-100">How Our Partnerships Benefit You</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="dark:text-gray-300">Access to verified, high-performing machines across multiple technology sectors</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="dark:text-gray-300">Technical integration ensures reliable performance data and income tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="dark:text-gray-300">Combined expertise creates a more resilient and profitable ecosystem</span>
            </li>
          </ul>
        </div>

        {/* Illustration suggestion */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 mx-auto transition-colors duration-300">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">Illustration Suggestion:</p>
          <p className="text-blue-700 dark:text-blue-400 text-center">
            Create a hub-and-spoke design with the DobProtocol logo in center, connected to partner logos by animated lines showing data/value flowing in both directions. When a user hovers over each partner logo, a simple popup should appear explaining the partnership benefit.
          </p>
        </div>
      </div>
    </section>
  );
} 