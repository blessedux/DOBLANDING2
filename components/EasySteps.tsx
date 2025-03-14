import Image from 'next/image';

const EasySteps = () => {
  const steps = [
    {
      number: '01',
      icon: '/icons/seamless/world.svg',
      description: 'Explore tokenized business'
    },
    {
      number: '02',
      icon: '/icons/seamless/spaceship.svg',
      description: 'Business get funded'
    },
    {
      number: '03',
      icon: '/icons/seamless/growth.svg',
      description: 'Everyone earns in the global economy'
    }
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          We do it easy, <span className="text-[#9A99FF]">take off seamless</span>
        </h2>
        <div className="flex flex-col space-y-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center w-full max-w-2xl">
              <span className="text-4xl font-bold text-[#597CE9] w-16 text-center">{step.number}</span>
              <div className="flex items-center bg-[#E8ECFA] p-4 rounded-lg flex-1">
                
                  <Image 
                    src={step.icon} 
                    alt={step.description} 
                    width={50} 
                    height={50} 
                    className="text-white" 
                  />
                
                <p className="text-[#597CE9] ml-6 font-bold">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EasySteps; 