import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none h-[2.5px] overflow-visible"
      aria-hidden="true"
    >
      {/* Background track (nearly invisible, subtle hint) */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Animated Gold Gradient Fill Bar */}
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold-primary)] to-[var(--gold-light)] shadow-[0_0_10px_var(--gold-glow)] relative"
        style={{ scaleX }}
      >
        {/* Leading edge golden light dot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--gold-light)] blur-[2px] opacity-80 -mr-0.5" />
      </motion.div>
    </div>
  );
};
