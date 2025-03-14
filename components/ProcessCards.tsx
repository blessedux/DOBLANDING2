'use client';

import FadeInOnScroll from './animations/FadeInOnScroll';

const ProcessCards = () => {
  const cards = [
    {
      title: 'DOBI AI Agent',
      description: 'Our agent tackles uncertainty in accounting data with Fuzzy AI, generating Zero-Knowledge Proofs (ZKP) for privacy and data integrity.'
    },
    {
      title: 'Automated distribution system',
      description: 'Turning everyday machines into Decentralized Autonomous Machines (DAMs) that anyone can invest in.'
    },
    {
      title: 'Collateral as guarantee',
      description: 'Your investment is backed to deliver greater and more secure benefits compared to other investments.'
    },
    {
      title: 'A new economic model',
      description: 'Consumers become owners, expenses become investments, and wealth creation is truly democratized.'
    }
  ];

  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center w-3/5">
        <FadeInOnScroll>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Invest in tokenized assets backed by AI agents</h2>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <FadeInOnScroll key={index} delay={0.2 * index} direction="up">
              <div className="rounded-lg shadow-md dark:shadow-gray-900/20 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#9A99FF]/30 cursor-pointer group">
                <div className="flex-none h-32 bg-[#9A99FF] dark:bg-[#7A79DF] rounded-t-lg transition-colors duration-300">
                  {/* Placeholder for video */}
                </div>
                <div className="flex-grow p-6 bg-[#597CE9] dark:bg-[#495FBF] rounded-b-lg transition-all duration-300 group-hover:bg-[#4A6FE0] dark:group-hover:bg-[#3A4FA0]">
                  <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-white text-sm">{card.description}</p>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessCards; 