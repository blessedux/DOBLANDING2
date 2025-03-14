'use client';

import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect, ReactNode } from "react";

type GradientSet = string[];

interface AnimatedGradientCardProps {
  children?: ReactNode;
  className?: string;
  colorSets: GradientSet[];
  duration?: number;
  delay?: number;
}

export default function AnimatedGradientCard({ 
  children, 
  className = '', 
  colorSets,
  duration = 8,
  delay = 0
}: AnimatedGradientCardProps) {
  // Create motion values for each color in our gradient
  const color1 = useMotionValue(colorSets[0][0]);
  const color2 = useMotionValue(colorSets[0][1]);
  const color3 = useMotionValue(colorSets[0][2]);

  useEffect(() => {
    // Extract the colors from each set to create animation targets
    const colors1 = colorSets.map(set => set[0]);
    const colors2 = colorSets.map(set => set[1]);
    const colors3 = colorSets.map(set => set[2]);

    // Wait for delay before starting animation
    const timeout = setTimeout(() => {
      // Animate through all color values in a loop
      animate(color1, colors1, {
        ease: "easeInOut",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop"
      });

      animate(color2, colors2, {
        ease: "easeInOut",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop"
      });

      animate(color3, colors3, {
        ease: "easeInOut",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop"
      });
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [color1, color2, color3, colorSets, duration, delay]);

  // Create a gradient template that will change as our motion values update
  const backgroundImage = useMotionTemplate`linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;

  return (
    <motion.div
      className={`rounded-lg p-6 shadow-lg relative overflow-hidden ${className}`}
      style={{ backgroundImage }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
} 