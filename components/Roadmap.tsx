'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RoadmapItem {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const roadmapData: RoadmapItem[] = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    description: 'Launch of DOB Protocol, smart contract development, and initial partnerships.',
    status: 'completed',
  },
  {
    phase: 'Phase 2',
    title: 'Growth',
    description: 'Expansion of liquidity pools, community building, and market presence.',
    status: 'in-progress',
  },
  {
    phase: 'Phase 3',
    title: 'Scaling',
    description: 'Integration with major platforms, enhanced features, and global expansion.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 4',
    title: 'Innovation',
    description: 'Advanced protocol features, cross-chain capabilities, and ecosystem development.',
    status: 'upcoming',
  },
];

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState<string>(roadmapData[1].phase);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-primary-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Our Roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our journey as we revolutionize decentralized options trading
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200/30"></div>
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative pl-12 pb-8 cursor-pointer group ${
                  activePhase === item.phase ? 'opacity-100' : 'opacity-70'
                }`}
                onClick={() => setActivePhase(item.phase)}
              >
                <div
                  className={`absolute left-0 w-8 h-8 rounded-full ${
                    getStatusColor(item.status)
                  } border-4 border-background transition-transform group-hover:scale-110`}
                ></div>
                <h3 className="text-xl font-bold mb-2">{item.phase}</h3>
                <p className="text-muted-foreground">{item.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Phase Details */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary-100/10 to-primary-400/10 rounded-2xl p-8 border border-primary-500/20"
          >
            {roadmapData.map((item) =>
              item.phase === activePhase ? (
                <div key={item.phase}>
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    ></span>
                    <span className="text-sm uppercase tracking-wider text-muted-foreground">
                      {item.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ) : null
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 