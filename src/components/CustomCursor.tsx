import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse coordinates for immediate dot tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring interpolation for fluid, cinematic trailing motion
  const ringX = useSpring(mouseX, { stiffness: 340, damping: 26, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 340, damping: 26, mass: 0.45 });

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover on clickable/interactive items
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer, [data-cursor-expand]'
      );
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none" aria-hidden="true">
      {/* Outer Floating Circular Ring with Gold Outline */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--gold-primary)] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: isHovered
            ? '0 0 25px var(--gold-glow), inset 0 0 15px rgba(214, 184, 120, 0.12)'
            : '0 0 10px var(--gold-glow)',
          backgroundColor: isHovered ? 'rgba(214, 184, 120, 0.08)' : 'transparent',
          borderColor: isHovered ? 'var(--gold-light)' : 'var(--gold-primary)',
        }}
        animate={{
          width: isHovered ? 58 : 34,
          height: isHovered ? 58 : 34,
          scale: isClicked ? 0.82 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.12 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Center Precision Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--gold-light)] shadow-[0_0_6px_var(--gold-primary)] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? (isHovered ? 0.35 : 0.95) : 0,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
