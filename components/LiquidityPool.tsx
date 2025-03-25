'use client'
import React from 'react';
import { motion } from 'framer-motion';

const LiquidityPool = () => {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Liquidity Pool
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the power of our decentralized liquidity pool system
          </motion.p>
        </div>
        
        {/* Placeholder Rectangle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto h-96 rounded-2xl bg-gradient-to-br from-primary-100/10 to-primary-400/10 border border-primary-500/20 p-8"
        >
          <div className="h-full flex items-center justify-center">
            <p className="text-xl text-muted-foreground">
              Liquidity Pool Visualization Coming Soon
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiquidityPool; 