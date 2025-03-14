'use client';

import { ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const FadeInOnScroll = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}: FadeInOnScrollProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold,
    triggerOnce: triggerOnce,
  });

  // Set the initial and animate states based on the direction
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { x: 50, y: 0 };
      case 'right':
        return { x: -50, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const getAnimateValues = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        ...getAnimateValues(),
        transition: { 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
        },
      });
    }
  }, [controls, inView, delay, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...getInitialOffset(),
      }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll; 