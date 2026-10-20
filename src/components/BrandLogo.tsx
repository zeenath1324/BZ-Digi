import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  asLink?: boolean;
  to?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Luxury Growth Agency',
  asLink = false,
  to = '/',
  className = '',
  onClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'midnight-gold';

  // Dimension mapping for the emblem and typography
  const sizeConfig = {
    sm: {
      box: 'w-9 h-9 sm:w-10 sm:h-10',
      letterSize: 'text-base sm:text-lg',
      titleSize: 'text-lg sm:text-xl',
      subtitleSize: 'text-[8.5px] sm:text-[9.5px]',
      gap: 'gap-2.5 sm:gap-3',
      sparkSize: 'w-1.5 h-1.5',
    },
    md: {
      box: 'w-10 h-10 sm:w-11 sm:h-11',
      letterSize: 'text-lg sm:text-xl',
      titleSize: 'text-xl sm:text-2xl',
      subtitleSize: 'text-[9.5px] sm:text-[10px]',
      gap: 'gap-3 sm:gap-3.5',
      sparkSize: 'w-2 h-2',
    },
    lg: {
      box: 'w-12 h-12 sm:w-14 sm:h-14',
      letterSize: 'text-xl sm:text-2xl',
      titleSize: 'text-2xl sm:text-3xl',
      subtitleSize: 'text-[10px] sm:text-[11px]',
      gap: 'gap-3.5 sm:gap-4',
      sparkSize: 'w-2.5 h-2.5',
    },
    xl: {
      box: 'w-16 h-16 sm:w-20 sm:h-20',
      letterSize: 'text-3xl sm:text-4xl',
      titleSize: 'text-3xl sm:text-4xl',
      subtitleSize: 'text-xs sm:text-sm',
      gap: 'gap-4 sm:gap-5',
      sparkSize: 'w-3 h-3',
    },
  }[size];

  const content = (
    <div
      className={`group/logo inline-flex items-center ${sizeConfig.gap} shrink-0 flex-shrink-0 min-w-max select-none cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Precision Geometric Monogram Emblem - GUARANTEED UN-SHRUNK */}
      <div
        className={`relative ${sizeConfig.box} shrink-0 flex-shrink-0 aspect-square rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
          isDark
            ? 'bg-gradient-to-br from-[#1C1A16] via-[#141311] to-[#0A0A09] border border-[#D6B878]/60 group-hover/logo:border-[#F0DDAA] group-hover/logo:shadow-[0_0_20px_rgba(214,184,120,0.35)]'
            : 'bg-gradient-to-br from-[#FFFFFF] via-[#F8F4EC] to-[#EBE1CE] border border-[#9C7B3D]/70 group-hover/logo:border-[#9C7B3D] group-hover/logo:shadow-[0_0_18px_rgba(156,123,61,0.25)]'
        }`}
        style={{
          boxShadow: isDark
            ? '0 4px 14px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
            : '0 4px 14px rgba(156, 123, 61, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        }}
      >
        {/* Subtle inner gold accent rim */}
        <div className="absolute inset-[2px] rounded-[9px] border border-[#D6B878]/20 pointer-events-none" />

        {/* B & Z Luxury Monogram Characters */}
        <div className="relative flex items-center justify-center tracking-normal font-serif-luxury font-bold">
          <span
            className={`${sizeConfig.letterSize} transition-colors duration-300 ${
              isDark
                ? 'text-[#F5F1E8] group-hover/logo:text-white'
                : 'text-[#181511] group-hover/logo:text-[#080808]'
            }`}
          >
            B
          </span>
          <span
            className={`${sizeConfig.letterSize} transition-colors duration-300 ${
              isDark
                ? 'text-[#D6B878] group-hover/logo:text-[#F0DDAA]'
                : 'text-[#9C7B3D] group-hover/logo:text-[#6E5320]'
            }`}
            style={{
              textShadow: isDark ? '0 0 8px rgba(214,184,120,0.4)' : 'none',
            }}
          >
            Z
          </span>
        </div>

        {/* Precision Four-Point Gold Star / Spark Indicator */}
        <div
          className={`absolute -top-1 -right-1 ${sizeConfig.sparkSize} rounded-full bg-[#D6B878] shadow-[0_0_8px_#D6B878] group-hover/logo:scale-125 transition-transform duration-300`}
        />
      </div>

      {/* Brand Wordmark & Subtitle - NEVER SHRUNK, NEVER WRAPPED */}
      <div className="flex flex-col shrink-0 flex-shrink-0 min-w-max whitespace-nowrap justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif-luxury font-bold tracking-[0.20em] uppercase transition-colors duration-300 ${sizeConfig.titleSize} ${
              isDark
                ? 'text-[#F5F1E8] group-hover/logo:text-[#F0DDAA]'
                : 'text-[#181511] group-hover/logo:text-[#080808]'
            }`}
          >
            <span
              className={
                isDark
                  ? 'bg-gradient-to-r from-[#FFF6E5] via-[#F0DDAA] to-[#D6B878] bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#181511] via-[#4A3814] to-[#9C7B3D] bg-clip-text text-transparent'
              }
            >
              BZ
            </span>{' '}
            <span className="tracking-[0.22em]">DIGITAL</span>
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-sans-clean font-semibold uppercase tracking-[0.28em] transition-colors duration-300 leading-none mt-1 ${sizeConfig.subtitleSize} ${
              isDark
                ? 'text-[#B6B0A4] group-hover/logo:text-[#D6B878]'
                : 'text-[#645E52] group-hover/logo:text-[#9C7B3D]'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        to={to}
        className="inline-flex shrink-0 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#D6B878]/50 rounded-xl"
        aria-label="BZ Digital Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
