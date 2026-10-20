import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const AnimatedBrandGraphic: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'midnight-gold';
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Subtle parallax offsets
  const parallaxX = shouldReduceMotion ? 0 : mousePos.x * 16;
  const parallaxY = shouldReduceMotion ? 0 : mousePos.y * 16;
  const deepParallaxX = shouldReduceMotion ? 0 : mousePos.x * 28;
  const deepParallaxY = shouldReduceMotion ? 0 : mousePos.y * 28;

  return (
    <div 
      className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="BZ Digital luxury orbital brand symbol with animated gold rings and glowing core"
    >
      {/* Golden Ambient Glow Filter Layer */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(214,184,120,0.18) 0%, rgba(156,123,61,0.08) 45%, transparent 70%)',
          filter: 'blur(45px)',
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px) scale(${isHovered ? 1.15 : 1})`,
        }}
      />

      {/* Floating Particle Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '15%', left: '20%', size: 4, delay: 0 },
          { top: '75%', left: '18%', size: 3, delay: 1.2 },
          { top: '25%', left: '80%', size: 5, delay: 2.1 },
          { top: '80%', left: '72%', size: 4, delay: 0.8 },
          { top: '10%', left: '60%', size: 3, delay: 1.8 },
          { top: '65%', left: '88%', size: 3, delay: 2.7 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#F0DDAA] shadow-[0_0_8px_#D6B878]"
            style={{
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -18, 0],
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.9, 1.3, 0.9],
                  }
            }
            transition={{
              duration: 4.5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pt.delay,
            }}
          />
        ))}
      </div>

      {/* Main Interactive Motion Group */}
      <motion.div
        className="relative w-[90%] h-[90%] flex items-center justify-center"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -12, 0],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Champagne Gold Gradients */}
            <linearGradient id="champagneGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F3E8" />
              <stop offset="25%" stopColor="#F0DDAA" />
              <stop offset="65%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#9C7B3D" />
            </linearGradient>

            <linearGradient id="champagneGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0DDAA" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#D6B878" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#383126" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="darkMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#25211B" : "#EBE1CE"} />
              <stop offset="50%" stopColor={isDark ? "#151515" : "#FAF6EE"} />
              <stop offset="100%" stopColor={isDark ? "#0A0A0A" : "#FFFFFF"} />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8F3E8" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#F0DDAA" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#D6B878" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D6B878" stopOpacity="0" />
            </radialGradient>

            <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#D6B878" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Outer Dashed Orbit Ring */}
          <g
            className={shouldReduceMotion ? '' : 'animate-spin-slow origin-center'}
            style={{ transformOrigin: '250px 250px' }}
          >
            <ellipse
              cx="250"
              cy="250"
              rx="228"
              ry="228"
              stroke="#D6B878"
              strokeWidth="1.2"
              strokeDasharray="6 14"
              strokeOpacity="0.4"
            />
            {/* Orbit Node 1 */}
            <circle cx="250" cy="22" r="5" fill="#F0DDAA" filter="url(#goldShadow)" />
            <circle cx="250" cy="478" r="3.5" fill="#9C7B3D" stroke="#D6B878" strokeWidth="1" />
            <circle cx="22" cy="250" r="3.5" fill="#D6B878" />
            <circle cx="478" cy="250" r="4" fill="#F8F3E8" />
          </g>

          {/* Tilted Elliptical Orbit Ring (Opposite Rotation) */}
          <g
            className={shouldReduceMotion ? '' : 'animate-spin-reverse-slow origin-center'}
            style={{ transformOrigin: '250px 250px' }}
          >
            <ellipse
              cx="250"
              cy="250"
              rx="205"
              ry="95"
              stroke="url(#champagneGrad1)"
              strokeWidth="1.5"
              strokeDasharray="14 10"
              strokeOpacity="0.65"
              transform="rotate(-28 250 250)"
            />
            {/* Orbit Satellite along ellipse */}
            <g transform="rotate(-28 250 250)">
              <circle cx="455" cy="250" r="4.5" fill="#F0DDAA" filter="url(#goldShadow)" />
              <circle cx="45" cy="250" r="3" fill="#D6B878" />
            </g>
          </g>

          {/* Fine Secondary Tilted Orbit */}
          <g
            className={shouldReduceMotion ? '' : 'animate-spin-slow origin-center'}
            style={{ transformOrigin: '250px 250px' }}
          >
            <ellipse
              cx="250"
              cy="250"
              rx="210"
              ry="115"
              stroke="#383126"
              strokeWidth="1"
              strokeOpacity="0.8"
              transform="rotate(45 250 250)"
            />
            <g transform="rotate(45 250 250)">
              <circle cx="460" cy="250" r="3" fill="#9C7B3D" />
            </g>
          </g>

          {/* Deep Parallax Central Sphere Group */}
          <g
            style={{
              transform: `translate(${deepParallaxX * 0.4}px, ${deepParallaxY * 0.4}px)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            {/* Sphere Background Dark Body */}
            <circle
              cx="250"
              cy="250"
              r="140"
              fill="url(#darkMetalGrad)"
              stroke="#383126"
              strokeWidth="1.5"
            />

            {/* Glowing inner core illumination */}
            <circle
              cx="250"
              cy="250"
              r="120"
              fill="url(#centerGlow)"
              opacity="0.45"
              className={shouldReduceMotion ? '' : 'animate-pulse-glow origin-center'}
            />

            {/* Geometric Segment 1 - Left Arching Blade */}
            <path
              d="M 250,115 C 310,130 365,185 365,250 C 365,315 310,370 250,385 C 290,340 315,295 315,250 C 315,205 290,160 250,115 Z"
              fill="url(#champagneGrad1)"
              opacity="0.88"
            />

            {/* Geometric Segment 2 - Inner Curving Crescent */}
            <path
              d="M 250,125 C 200,140 160,190 160,250 C 160,310 200,360 250,375 C 220,335 200,295 200,250 C 200,205 220,165 250,125 Z"
              fill="url(#champagneGrad2)"
              opacity="0.82"
            />

            {/* Segment 3 - Center S-Curve Ribbon (BZ Dynamic Monogram Silhouette) */}
            <path
              d="M 210,160 C 270,155 310,195 290,235 C 275,260 225,240 210,270 C 190,310 240,345 285,340 C 240,355 185,325 195,280 C 205,240 265,255 270,225 C 275,195 240,170 205,175 Z"
              fill="url(#champagneGrad1)"
              filter="url(#goldShadow)"
              opacity="0.95"
            />

            {/* Segment 4 - Fine Latitude & Meridian Grid Lines */}
            <ellipse
              cx="250"
              cy="250"
              rx="138"
              ry="55"
              stroke="#D6B878"
              strokeWidth="0.85"
              strokeOpacity="0.4"
              strokeDasharray="4 6"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="75"
              ry="138"
              stroke="#D6B878"
              strokeWidth="0.85"
              strokeOpacity="0.35"
              strokeDasharray="5 7"
            />

            {/* Center Monogram Core "BZ" Stylized Mark */}
            <g transform="translate(250, 250)">
              <circle r="36" fill={isDark ? "#151515" : "#FFFFFF"} stroke={isDark ? "#D6B878" : "#9C7B3D"} strokeWidth="1.5" />
              <circle r="42" stroke={isDark ? "#9C7B3D" : "#D8CCB8"} strokeWidth="0.75" strokeDasharray="3 4" strokeOpacity="0.6" />
              
              {/* B Monogram */}
              <text
                x="-14"
                y="8"
                fontFamily="Cinzel, serif"
                fontSize="22"
                fontWeight="700"
                fill={isDark ? "#F8F3E8" : "#181511"}
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                B
              </text>
              {/* Z Monogram */}
              <text
                x="12"
                y="8"
                fontFamily="Cinzel, serif"
                fontSize="22"
                fontWeight="700"
                fill={isDark ? "#D6B878" : "#9C7B3D"}
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                Z
              </text>
            </g>
          </g>

          {/* Compass / Star Accents on Crosshairs */}
          <g stroke="#D6B878" strokeWidth="1.2" strokeOpacity="0.5">
            <line x1="250" y1="5" x2="250" y2="25" />
            <line x1="250" y1="475" x2="250" y2="495" />
            <line x1="5" y1="250" x2="25" y2="250" />
            <line x1="475" y1="250" x2="495" y2="250" />
          </g>

          {/* Modern Precision Coordinates Text */}
          <text
            x="250"
            y="492"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="8"
            fill={isDark ? "#B6B0A4" : "#645E52"}
            textAnchor="middle"
            letterSpacing="0.3em"
            opacity="0.75"
          >
            EST. MMXXIV • DIGITAL EXCELLENCE • 08°08′N 16°18′E
          </text>
        </svg>
      </motion.div>

      {/* Floating Interactive Badge (Subtle Luxury Accolade) */}
      <motion.div
        className="absolute -bottom-4 right-4 sm:right-8 bg-[#151515]/90 backdrop-blur-md border border-[#383126] hover:border-[#D6B878] rounded-xl px-4 py-2.5 shadow-2xl flex items-center gap-3 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#D6B878] animate-ping" />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#D6B878] font-semibold">
            Bespoke Architecture
          </div>
          <div className="text-[12px] text-[#F5F1E8] font-medium">
            Next-Gen Growth Systems
          </div>
        </div>
      </motion.div>
    </div>
  );
};
