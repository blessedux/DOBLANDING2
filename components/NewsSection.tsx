import Image from 'next/image';

const NewsSection = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Dobprotocol in news</h2>
        <div className="flex justify-center items-center space-x-8">
          <Image src="/cointelegraph.svg" alt="Cointelegraph" width={250} height={100} />
          <Image src="/cnn.svg" alt="CNN" width={150} height={50} />
        </div>
        </div>
        </section>
    );
};

export default NewsSection; 