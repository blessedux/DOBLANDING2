import Image from 'next/image';

const TechnologyStack = () => {
  const techStack = [
    {
      icon: '/icons/eth.svg',
      title: 'Built on Ethereum, VARA & Layer-2 Solutions',
      description: ''
    },
    {
      icon: '/icons/dobi.svg',
      title: 'Backed with DOBI, our AI-Agent',
      description: ''
    },
    {
      icon: '/icons/blockchain.svg',
      title: 'Decentralized Marketplace & Participation Tokens',
      description: ''
    },
    {
      icon: '/icons/distribution.svg',
      title: 'Upgradeable Logic & Automated Profit Sharing',
      description: ''
    }
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold mb-8">
          <span className="text-[#9A99FF]">Technology</span> <span className="text-gray-800">Stack</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {techStack.map((tech, index) => {
            // Determine if this card is on the left (0, 2) or right (1, 3)
            const isLeftCard = index === 0 || index === 2;
            const isRightCard = index === 1 || index === 3;
            
            return (
              <div 
                key={index} 
                className={`p-6 rounded-lg shadow-md flex items-center h-32 ${isLeftCard ? 'bg-[#597CE9]' : 'bg-white'}`}
              >
                <div className={`flex items-center justify-center w-20 h-20 rounded-lg ${isLeftCard ? 'bg-white' : 'bg-[#597CE9]'} border ${isLeftCard ? 'border-[#597CE9]' : 'border-white'}`}>
                  <div className="relative w-12 h-12">
                    <Image 
                      src={tech.icon} 
                      alt={tech.title} 
                      fill={true}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-semibold ${isLeftCard ? 'text-white' : 'text-[#597CE9]'}`}>
                    {tech.title.split(', ').map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack; 