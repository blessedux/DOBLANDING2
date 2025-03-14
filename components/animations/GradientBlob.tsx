'use client';

import { motion, Variants } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface GradientBlobProps {
  colors: string[];
  className?: string;
  size?: number | string;
  duration?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export default function GradientBlob({
  colors,
  className = '',
  size = '100%',
  duration = 20,
  children,
  style = {},
}: GradientBlobProps) {
  const blobVariants: Variants = {
    animate: {
      scale: [1, 1.05, 0.95, 1.02, 1],
      rotate: [0, 5, -5, 3, 0],
      borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '50% 50% 50% 50% / 50% 50% 50% 50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
      transition: {
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
  };

  // Convert the array of colors to a CSS linear gradient
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    ...style
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={gradientStyle}
      variants={blobVariants}
      animate="animate"
    >
      {children}
    </motion.div>
  );
} 