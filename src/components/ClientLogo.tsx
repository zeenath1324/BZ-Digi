import React from 'react';

interface ClientLogoProps {
  type: string;
  className?: string;
  variant?: 'gold' | 'monochrome' | 'subtle';
}

export const ClientLogo: React.FC<ClientLogoProps> = ({ 
  type, 
  className = "w-10 h-10", 
  variant = 'gold' 
}) => {
  const strokeColor = variant === 'gold' ? '#D6B878' : 'currentColor';
  const accentFill = variant === 'gold' ? '#F0DDAA' : 'currentColor';
  const secondaryStroke = variant === 'gold' ? '#9C7B3D' : 'currentColor';

  switch (type) {
    // 1. AURELIA LUXE — Haute Horlogerie (Tourbillon & escapement wheel)
    case 'aurelia':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Outer Roman Chapter Ring */}
          <circle cx="32" cy="32" r="28" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="1 3" />
          <circle cx="32" cy="32" r="24" stroke={secondaryStroke} strokeWidth="0.8" />
          {/* Tourbillon 3-arm cage */}
          <circle cx="32" cy="32" r="16" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M32 16V24M32 40V48M18.14 24L25.07 28M38.93 36L45.86 40M18.14 40L25.07 36M38.93 28L45.86 24" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          {/* Balance Wheel rim */}
          <circle cx="32" cy="32" r="9" stroke={secondaryStroke} strokeWidth="1.5" />
          {/* Center Synthetic Ruby jewel */}
          <circle cx="32" cy="32" r="3.5" fill={accentFill} />
          <circle cx="32" cy="32" r="1.5" fill="#080808" />
        </svg>
      );

    // 2. VESPERA — Private Aviation (Aerodynamic Supersonic Wing & Star)
    case 'vespera':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Global Navigation Latitude Ring */}
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="32" cy="32" rx="26" ry="10" stroke={secondaryStroke} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
          {/* Twin Delta Wings */}
          <path d="M32 10L14 46L32 40L50 46L32 10Z" stroke={strokeColor} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
          <path d="M32 18L24 41L32 38L40 41L32 18Z" fill={accentFill} fillOpacity="0.25" stroke={strokeColor} strokeWidth="1" />
          <path d="M32 10V40" stroke={strokeColor} strokeWidth="1.2" />
          {/* Cardinal North Star */}
          <circle cx="32" cy="10" r="2" fill={accentFill} />
        </svg>
      );

    // 3. LUMINA CAPITAL — Wealth Advisory (Faceted Diamond Prism)
    case 'lumina':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Outer Prism Ring */}
          <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" stroke={secondaryStroke} strokeWidth="0.9" />
          {/* Brilliant Cut Diamond Facets */}
          <path d="M32 8L44 24H20L32 8Z" fill={accentFill} fillOpacity="0.2" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M10 20L20 24L10 44" stroke={strokeColor} strokeWidth="1" />
          <path d="M54 20L44 24L54 44" stroke={strokeColor} strokeWidth="1" />
          <path d="M20 24L32 56L44 24" stroke={strokeColor} strokeWidth="1.3" />
          <path d="M10 44L32 56L54 44" stroke={secondaryStroke} strokeWidth="1" />
          <line x1="10" y1="20" x2="54" y2="20" stroke={strokeColor} strokeWidth="1" />
          {/* Golden Apex Sparkle */}
          <circle cx="32" cy="8" r="2" fill={accentFill} />
          <circle cx="32" cy="56" r="1.5" fill={strokeColor} />
        </svg>
      );

    // 4. NOIR ATELIER — Milano Haute Couture (Interlocking Serif Monogram)
    case 'noir':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Octagonal Couture Seal */}
          <polygon points="20,10 44,10 54,20 54,44 44,54 20,54 10,44 10,20" stroke={secondaryStroke} strokeWidth="1" />
          <circle cx="32" cy="32" r="20" stroke={secondaryStroke} strokeWidth="0.6" strokeDasharray="1 2" />
          {/* Stylized Interlocking Monogram N */}
          <path d="M22 44V20H26L38 44H42V20" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="square" />
          {/* Serif horizontal feet */}
          <line x1="18" y1="20" x2="26" y2="20" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="18" y1="44" x2="26" y2="44" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="38" y1="20" x2="46" y2="20" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="38" y1="44" x2="46" y2="44" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="32" cy="32" r="2" fill={accentFill} />
        </svg>
      );

    // 5. KROMA STUDIOS — Architecture & Design (Minimalist Pavilion Arch)
    case 'kroma':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Modernist Arch */}
          <path d="M16 52V28C16 19.16 23.16 12 32 12C40.84 12 48 19.16 48 28V52" stroke={strokeColor} strokeWidth="1.5" />
          {/* Inner Golden Ratio Arch */}
          <path d="M22 52V30C22 24.48 26.48 20 32 20C37.52 20 42 24.48 42 30V52" stroke={secondaryStroke} strokeWidth="1" />
          {/* Architectural Pillars & Horizon */}
          <line x1="10" y1="52" x2="54" y2="52" stroke={strokeColor} strokeWidth="1.8" />
          <line x1="12" y1="56" x2="52" y2="56" stroke={secondaryStroke} strokeWidth="0.8" />
          {/* Cantilever Geometric Line */}
          <line x1="32" y1="12" x2="32" y2="52" stroke={secondaryStroke} strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="32" cy="20" r="2.5" fill={accentFill} />
        </svg>
      );

    // 6. SOLIS HEALTH — Longevity Tech (Radiant Solar Crest)
    case 'solis':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Concentric Longevity Orbit Rings */}
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="32" cy="32" r="20" stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="32" cy="32" r="12" stroke={secondaryStroke} strokeWidth="1" />
          {/* Central Vitality Core */}
          <circle cx="32" cy="32" r="6" fill={accentFill} />
          {/* Radiant 8-Axis Solar Rays */}
          <line x1="32" y1="6" x2="32" y2="10" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="32" y1="54" x2="32" y2="58" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="6" y1="32" x2="10" y2="32" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="54" y1="32" x2="58" y2="32" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="13.62" y1="13.62" x2="16.45" y2="16.45" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="47.55" y1="47.55" x2="50.38" y2="50.38" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="13.62" y1="50.38" x2="16.45" y2="47.55" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="47.55" y1="16.45" x2="50.38" y2="13.62" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );

    // 7. ZENITH MOTORS — Electric Hypercars (Aerodynamic Shield & Vector)
    case 'zenith':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Shield Outline */}
          <path d="M32 8L50 14V32C50 43 42 51 32 56C22 51 14 43 14 32V14L32 8Z" stroke={strokeColor} strokeWidth="1.4" strokeLinejoin="round" />
          {/* Aerodynamic Speed Curves */}
          <path d="M22 24C28 20 36 20 42 24" stroke={secondaryStroke} strokeWidth="1" />
          <path d="M19 32C27 27 37 27 45 32" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M22 40C28 36 36 36 42 40" stroke={secondaryStroke} strokeWidth="1" />
          {/* Central Apex Emblem */}
          <polygon points="32,16 35,26 45,26 37,32 40,42 32,36 24,42 27,32 19,26 29,26" fill={accentFill} fillOpacity="0.2" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );

    // 8. VELOX SYSTEMS — AI Computing (Quantum Hex Lattice)
    case 'velox':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Outer Hexagon */}
          <polygon points="32,8 52,19.5 52,42.5 32,54 12,42.5 12,19.5" stroke={strokeColor} strokeWidth="1.3" />
          {/* Inner Hexagon */}
          <polygon points="32,18 43,24.5 43,37.5 32,44 21,37.5 21,24.5" stroke={secondaryStroke} strokeWidth="1" />
          {/* Neural Connection Rays to Core */}
          <line x1="32" y1="8" x2="32" y2="18" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="52" y1="19.5" x2="43" y2="24.5" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="52" y1="42.5" x2="43" y2="37.5" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="32" y1="54" x2="32" y2="44" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="12" y1="42.5" x2="21" y2="37.5" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="12" y1="19.5" x2="21" y2="24.5" stroke={strokeColor} strokeWidth="1.2" />
          {/* Center Quantum Core */}
          <circle cx="32" cy="31" r="3.5" fill={accentFill} />
        </svg>
      );

    // 9. ELIXIR BOTANICALS — Luxury Wellness (Apothecary Lotus)
    case 'elixir':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" strokeDasharray="1 3" />
          {/* Central Lotus Petal */}
          <path d="M32 14C32 24 24 38 32 48C40 38 32 24 32 14Z" fill={accentFill} fillOpacity="0.25" stroke={strokeColor} strokeWidth="1.3" />
          {/* Left Petal */}
          <path d="M32 48C22 46 16 36 20 26C24 34 29 42 32 48Z" stroke={strokeColor} strokeWidth="1.1" />
          {/* Right Petal */}
          <path d="M32 48C42 46 48 36 44 26C40 34 35 42 32 48Z" stroke={strokeColor} strokeWidth="1.1" />
          {/* Dew Drop Pearl */}
          <circle cx="32" cy="20" r="2.2" fill={accentFill} />
          {/* Pedestal Arc */}
          <path d="M22 52C27 54 37 54 42 52" stroke={secondaryStroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // 10. AESTHETE LIVING — Interior Architecture (Cantilevered Planes)
    case 'aesthete':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" />
          {/* Minimalist Isometric Spatial Architecture */}
          <path d="M14 26L32 16L50 26L32 36L14 26Z" stroke={strokeColor} strokeWidth="1.3" fill={accentFill} fillOpacity="0.15" />
          <path d="M14 26V38L32 48V36" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M50 26V38L32 48" stroke={secondaryStroke} strokeWidth="1.2" />
          <line x1="32" y1="36" x2="32" y2="48" stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="32" cy="16" r="2" fill={accentFill} />
        </svg>
      );

    // 11. VALKYRIE DEFENSE — Aerospace Engineering (Winged Titanium Spearhead)
    case 'valkyrie':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Circular Target Radar Horizon */}
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" opacity="0.6" />
          <line x1="8" y1="32" x2="56" y2="32" stroke={secondaryStroke} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5" />
          {/* Winged Spearhead */}
          <path d="M32 10L37 26L48 30L36 38L38 52L32 45L26 52L28 38L16 30L27 26L32 10Z" stroke={strokeColor} strokeWidth="1.3" fill={accentFill} fillOpacity="0.2" strokeLinejoin="round" />
          <line x1="32" y1="14" x2="32" y2="42" stroke={strokeColor} strokeWidth="1" />
          <circle cx="32" cy="10" r="1.8" fill={accentFill} />
        </svg>
      );

    // 12. ORYX VENTURES — Private Equity (Sovereign Oryx Crest)
    case 'oryx':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Arabian Heraldic Arch */}
          <path d="M16 52V30C16 20 24 14 32 10C40 14 48 20 48 30V52" stroke={secondaryStroke} strokeWidth="1" />
          {/* Elegant Sweeping Oryx Horns */}
          <path d="M28 36C26 26 22 18 18 12" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M36 36C38 26 42 18 46 12" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
          {/* Geometric Diamond Crown */}
          <polygon points="32,24 38,32 32,40 26,32" stroke={strokeColor} strokeWidth="1.2" fill={accentFill} fillOpacity="0.3" />
          <line x1="12" y1="52" x2="52" y2="52" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="32" cy="10" r="2.2" fill={accentFill} />
        </svg>
      );

    // 13. MIRAGE RESIDENCES — Ultra-Luxury Estates (Waterfront Portico & Sun)
    case 'mirage':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Classical Estate Arch */}
          <rect x="14" y="14" width="36" height="36" rx="4" stroke={secondaryStroke} strokeWidth="0.8" />
          <path d="M20 50V30C20 23.37 25.37 18 32 18C38.63 18 44 23.37 44 30V50" stroke={strokeColor} strokeWidth="1.3" />
          {/* Horizon Sun & Waves */}
          <circle cx="32" cy="28" r="5" fill={accentFill} />
          <path d="M18 42C24 40 28 44 32 42C36 40 40 44 46 42" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <path d="M20 46C25 45 28 47 32 46C36 45 39 47 44 46" stroke={secondaryStroke} strokeWidth="0.8" strokeLinecap="round" />
          <line x1="12" y1="50" x2="52" y2="50" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    // 14. CREST & CROWN — Fine Jewelry (Imperial Coronet)
    case 'crest':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Circular Hallmark Ring */}
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" strokeDasharray="1 2" />
          {/* Coronet with 5 Points */}
          <path d="M16 42L18 24L26 32L32 18L38 32L46 24L48 42H16Z" stroke={strokeColor} strokeWidth="1.4" fill={accentFill} fillOpacity="0.2" strokeLinejoin="round" />
          {/* Pearl Jewels on Crown Tips */}
          <circle cx="18" cy="24" r="2" fill={accentFill} />
          <circle cx="26" cy="32" r="1.5" fill={strokeColor} />
          <circle cx="32" cy="18" r="2.5" fill={accentFill} />
          <circle cx="38" cy="32" r="1.5" fill={strokeColor} />
          <circle cx="46" cy="24" r="2" fill={accentFill} />
          {/* Crown Base Filigree */}
          <line x1="16" y1="45" x2="48" y2="45" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="24" cy="38" r="1.2" fill={strokeColor} />
          <circle cx="32" cy="38" r="1.5" fill={accentFill} />
          <circle cx="40" cy="38" r="1.2" fill={strokeColor} />
        </svg>
      );

    // 15. CHRONOS LABS — Fintech Protocol (Celestial Astrolabe)
    case 'chronos':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Celestial Astrolabe Orbits */}
          <circle cx="32" cy="32" r="26" stroke={strokeColor} strokeWidth="1.2" />
          <ellipse cx="32" cy="32" rx="26" ry="12" stroke={secondaryStroke} strokeWidth="1" transform="rotate(-30 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="12" stroke={secondaryStroke} strokeWidth="1" transform="rotate(30 32 32)" />
          <circle cx="32" cy="32" r="12" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 3" />
          {/* Golden Center Node */}
          <circle cx="32" cy="32" r="4.5" fill={accentFill} />
          <circle cx="32" cy="32" r="1.8" fill="#080808" />
          {/* Orbiting Satellite Node */}
          <circle cx="48" cy="22" r="2" fill={strokeColor} />
          <circle cx="16" cy="42" r="2" fill={strokeColor} />
        </svg>
      );

    // 16. MONARCH HOTELS — Boutique Hospitality (Imperial Grand Crest)
    case 'monarch':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" stroke={secondaryStroke} strokeWidth="0.8" />
          {/* Monarch Butterfly Wings */}
          <path d="M32 32C24 20 14 20 16 34C18 42 28 44 32 44C36 44 46 42 48 34C50 20 40 20 32 32Z" stroke={strokeColor} strokeWidth="1.3" fill={accentFill} fillOpacity="0.2" />
          <path d="M32 32C22 24 16 16 22 14C28 12 30 22 32 32Z" stroke={strokeColor} strokeWidth="1" />
          <path d="M32 32C42 24 48 16 42 14C36 12 34 22 32 32Z" stroke={strokeColor} strokeWidth="1" />
          {/* Central Body & Hotel 5-Star Crown */}
          <line x1="32" y1="20" x2="32" y2="44" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="32" cy="18" r="2" fill={accentFill} />
          <circle cx="32" cy="46" r="1.5" fill={strokeColor} />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="24" stroke={strokeColor} strokeWidth="1.2" />
          <polygon points="32,16 44,24 44,40 32,48 20,40 20,24" stroke={secondaryStroke} strokeWidth="1" />
          <circle cx="32" cy="32" r="4" fill={accentFill} />
        </svg>
      );
  }
};
