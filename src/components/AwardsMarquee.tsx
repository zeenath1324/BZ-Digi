import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AWARDS_DATA, 
  AwardItem 
} from '../data/agencyData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Award, 
  ArrowUpRight, 
  Pause, 
  Play, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Gold-Tinted Luxury Badges & Crests SVG Components                          */
/* -------------------------------------------------------------------------- */

export const AwardBadgeIcon: React.FC<{ type: AwardItem['badgeType']; className?: string }> = ({ 
  type, 
  className = "w-8 h-8" 
}) => {
  switch (type) {
    case 'wreath':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradWreath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBF4E6" />
              <stop offset="50%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#8C6E2E" />
            </linearGradient>
            <radialGradient id="goldGlowWreath" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D6B878" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D6B878" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="20" fill="url(#goldGlowWreath)" />
          {/* Outer Roman Laurel Wreath Leaves */}
          <path
            d="M12 34C10 30 10 22 13 16C15 13 18 10 22 8M36 34C38 30 38 22 35 16C33 13 30 10 26 8"
            stroke="url(#goldGradWreath)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Leaf pairs */}
          <path d="M12 32C9 30 9 27 11 26M13 25C10 24 10 20 13 19M15 19C13 17 14 14 17 14M20 13C19 10 22 8 24 8" stroke="url(#goldGradWreath)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M36 32C39 30 39 27 37 26M35 25C38 24 38 20 35 19M33 19C35 17 34 14 31 14M28 13C29 10 26 8 24 8" stroke="url(#goldGradWreath)" strokeWidth="1.6" strokeLinecap="round" />
          {/* Center Medallion Star */}
          <circle cx="24" cy="24" r="8" fill="#15120B" stroke="url(#goldGradWreath)" strokeWidth="1.5" />
          <polygon points="24,19 25.5,22.5 29,23 26.5,25.5 27,29 24,27 21,29 21.5,25.5 19,23 22.5,22.5" fill="url(#goldGradWreath)" />
          {/* Base Ribbon Knot */}
          <path d="M20 36C22 34 26 34 28 36M22 36L19 41M26 36L29 41" stroke="url(#goldGradWreath)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'trophy':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradTrophy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#E0C283" />
              <stop offset="100%" stopColor="#9C772C" />
            </linearGradient>
          </defs>
          {/* Cup Silhouette */}
          <path
            d="M16 10H32V20C32 25 28 29 24 29C20 29 16 25 16 20V10Z"
            fill="#15120B"
            stroke="url(#goldGradTrophy)"
            strokeWidth="2"
          />
          {/* Trophy Handles */}
          <path d="M16 13H11C9 13 8 16 9 19C10 22 13 23 16 22" stroke="url(#goldGradTrophy)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M32 13H37C39 13 40 16 39 19C38 22 35 23 32 22" stroke="url(#goldGradTrophy)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Stem & Pedestal */}
          <path d="M24 29V35M19 35H29M16 39H32L34 41H14L16 39Z" stroke="url(#goldGradTrophy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Front Star Embellishment */}
          <polygon points="24,15 25,18 28,18 25.5,20 26.5,23 24,21 21.5,23 22.5,20 20,18 23,18" fill="url(#goldGradTrophy)" />
        </svg>
      );

    case 'crown':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradCrown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF1E1" />
              <stop offset="50%" stopColor="#D9BB7B" />
              <stop offset="100%" stopColor="#96732B" />
            </linearGradient>
          </defs>
          {/* Coronet Points */}
          <path
            d="M10 32L13 16L19 23L24 13L29 23L35 16L38 32H10Z"
            fill="#15120B"
            stroke="url(#goldGradCrown)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Pearl Jewels on Peaks */}
          <circle cx="13" cy="15" r="2.2" fill="url(#goldGradCrown)" />
          <circle cx="24" cy="12" r="2.5" fill="url(#goldGradCrown)" />
          <circle cx="35" cy="15" r="2.2" fill="url(#goldGradCrown)" />
          {/* Base Trim with Diamond Insets */}
          <rect x="10" y="32" width="28" height="5" rx="1.5" fill="url(#goldGradCrown)" />
          <circle cx="17" cy="34.5" r="1" fill="#15120B" />
          <circle cx="24" cy="34.5" r="1.2" fill="#15120B" />
          <circle cx="31" cy="34.5" r="1" fill="#15120B" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradStar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5E0" />
              <stop offset="50%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#8C6A24" />
            </linearGradient>
          </defs>
          {/* 8-Point Faceted Compass Star */}
          <path
            d="M24 6L28 19L41 24L28 29L24 42L20 29L7 24L20 19L24 6Z"
            fill="#15120B"
            stroke="url(#goldGradStar)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Geometric Radiant Facets */}
          <path d="M24 6V42M7 24H41" stroke="url(#goldGradStar)" strokeWidth="1.2" opacity="0.6" />
          <circle cx="24" cy="24" r="3.5" fill="url(#goldGradStar)" />
        </svg>
      );

    case 'diamond':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradDiamond" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCF4E6" />
              <stop offset="50%" stopColor="#D9BA77" />
              <stop offset="100%" stopColor="#916E25" />
            </linearGradient>
          </defs>
          <path
            d="M15 13H33L40 22L24 38L8 22L15 13Z"
            fill="#15120B"
            stroke="url(#goldGradDiamond)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Beveled Facets */}
          <path d="M8 22H40M15 13L24 38M33 13L24 38M20 13L24 22L28 13" stroke="url(#goldGradDiamond)" strokeWidth="1.3" />
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF1E0" />
              <stop offset="50%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#8C6820" />
            </linearGradient>
          </defs>
          {/* Heraldic Shield */}
          <path
            d="M12 11C18 11 24 8 24 8C24 8 30 11 36 11V24C36 32 29 38 24 41C19 38 12 32 12 24V11Z"
            fill="#15120B"
            stroke="url(#goldGradShield)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Chevron & Stars */}
          <path d="M17 21L24 27L31 21" stroke="url(#goldGradShield)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="16" r="1.8" fill="url(#goldGradShield)" />
        </svg>
      );

    case 'ribbon':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3DC" />
              <stop offset="50%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#8F6C26" />
            </linearGradient>
          </defs>
          {/* Round Seal */}
          <circle cx="24" cy="20" r="13" fill="#15120B" stroke="url(#goldGradRibbon)" strokeWidth="2" />
          <circle cx="24" cy="20" r="10" stroke="url(#goldGradRibbon)" strokeWidth="1" strokeDasharray="2 2" />
          {/* Star in Center */}
          <polygon points="24,14 25.5,18 29.5,18.5 26.5,21.5 27.5,25.5 24,23.5 20.5,25.5 21.5,21.5 18.5,18.5 22.5,18" fill="url(#goldGradRibbon)" />
          {/* Ribbon Tails */}
          <path d="M18 31L14 42L20 38L24 42L22 32" fill="#1A160F" stroke="url(#goldGradRibbon)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M30 31L34 42L28 38L24 42L26 32" fill="#1A160F" stroke="url(#goldGradRibbon)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'seal':
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <defs>
            <linearGradient id="goldGradSeal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF6E5" />
              <stop offset="50%" stopColor="#D6B878" />
              <stop offset="100%" stopColor="#947028" />
            </linearGradient>
          </defs>
          {/* Concentric Milled Coin Edge */}
          <circle cx="24" cy="24" r="19" fill="#15120B" stroke="url(#goldGradSeal)" strokeWidth="1.8" />
          <circle cx="24" cy="24" r="16" stroke="url(#goldGradSeal)" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="24" cy="24" r="13" stroke="url(#goldGradSeal)" strokeWidth="1.2" />
          {/* Roman Monogram BZ */}
          <text x="24" y="27.5" textAnchor="middle" fill="url(#goldGradSeal)" fontSize="9" fontWeight="bold" fontFamily="serif" letterSpacing="1.5">BZ</text>
        </svg>
      );
  }
};

/* -------------------------------------------------------------------------- */
/* Main Awards & Recognition Marquee Component                                */
/* -------------------------------------------------------------------------- */

interface AwardsMarqueeProps {
  onOpenQuoteModal?: () => void;
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export const AwardsMarquee: React.FC<AwardsMarqueeProps> = ({
  onOpenQuoteModal,
  title,
  subtitle,
  badgeText
}) => {
  const { t } = useLanguage();
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Duplication for seamless infinite marquee loop
  const duplicatedAwards = [...AWARDS_DATA, ...AWARDS_DATA];

  const categories = [
    { id: 'All', label: 'All Accolades' },
    { id: 'Craft & WebGL', label: 'Craft & 3D WebGL' },
    { id: 'Strategy & Growth', label: 'Growth & Strategy' },
    { id: 'Design & UX', label: 'Design & Aesthetics' },
    { id: 'Enterprise SEO', label: 'Enterprise SEO' },
  ];

  const isCategoryMatch = (item: AwardItem) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  };

  return (
    <section 
      id="awards-recognition" 
      aria-label="Awards & Industry Recognition"
      className="relative py-20 sm:py-28 bg-[var(--bg-main)] border-y border-[var(--border-gold)]/80 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient luxury lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse,_var(--gold-glow)_0%,_transparent_75%)] pointer-events-none opacity-70" />
      <div className="absolute -top-32 right-12 w-72 h-72 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)] font-display mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
          <span>{badgeText || 'ACCOLADES & GLOBAL HONORS'}</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] tracking-tight leading-tight mb-4">
          {title || (
            <>
              Awards & International <span className="gold-gradient-text">Recognition.</span>
            </>
          )}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto font-normal leading-relaxed">
          {subtitle || 'Validated by the world’s preeminent digital design juries, high-ticket luxury summits, and enterprise search institutions.'}
        </p>

        {/* Category Filter Pills & Pause Control */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 font-display cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] border-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-glow)] font-bold'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--gold-primary)]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {/* Marquee Motion Pause Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-all flex items-center gap-1.5 cursor-pointer ml-1"
            title={isPaused ? 'Resume Animation' : 'Pause Animation'}
            aria-label={isPaused ? 'Resume marquee' : 'Pause marquee'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-mono">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Marquee Wrapper with side gradient masks */}
      <div className={`relative w-full overflow-hidden marquee-container ${isPaused ? 'marquee-paused' : ''}`}>
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/90 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-l from-[var(--bg-main)] via-[var(--bg-main)]/90 to-transparent" />

        {/* Continuous Horizontal Marquee Carousel */}
        <div className="flex py-3">
          <div 
            className="animate-marquee-left flex items-center gap-5 sm:gap-6"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {duplicatedAwards.map((award, idx) => {
              const matches = isCategoryMatch(award);
              return (
                <div
                  key={`${award.id}-${idx}`}
                  onClick={() => setSelectedAward(award)}
                  className={`group relative flex-shrink-0 w-80 sm:w-96 rounded-2xl bg-[var(--bg-card)] border transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer shadow-lg ${
                    matches
                      ? 'border-[var(--border-gold)] hover:border-[var(--gold-primary)] hover:shadow-[0_10px_35px_rgba(214,184,120,0.2)] hover:-translate-y-1'
                      : 'opacity-40 border-[var(--border-subtle)] grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
                >
                  {/* Card Header: Gold Badge & Metadata */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Gold-Tinted Emblem Badge */}
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1C1812] to-[#100E0A] border border-[var(--border-gold)] p-2.5 flex items-center justify-center group-hover:border-[var(--gold-primary)] group-hover:shadow-[0_0_20px_var(--gold-glow)] transition-all duration-300 shadow-inner">
                      <AwardBadgeIcon type={award.badgeType} className="w-full h-full text-[var(--gold-primary)] group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-[var(--gold-primary)]/5 rounded-2xl pointer-events-none group-hover:bg-[var(--gold-primary)]/15 transition-colors" />
                    </div>

                    {/* Year & Category Pills */}
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#1C1A16] text-[var(--gold-primary)] border border-[#383126] mb-1">
                        {award.year}
                      </span>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                        {award.category}
                      </div>
                    </div>
                  </div>

                  {/* Organization & Award Title */}
                  <div className="space-y-1 mb-4 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--gold-primary)] font-display">
                      {award.organization}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[var(--text-main)] group-hover:text-[var(--gold-light)] transition-colors leading-snug">
                      {award.title}
                    </h3>
                    <div className="text-xs text-[var(--text-muted)] line-clamp-1 pt-0.5">
                      {award.project}
                    </div>
                  </div>

                  {/* Card Bottom: Metric & Inspect CTA */}
                  <div className="pt-3 border-t border-[var(--border-gold)]/60 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#14120E] text-[var(--gold-primary)] border border-[#2E271F] group-hover:border-[var(--gold-primary)]/50 transition-colors">
                      <Sparkles className="w-3 h-3 text-[var(--gold-primary)]" />
                      <span className="font-semibold">{award.metric}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[var(--gold-primary)] group-hover:translate-x-0.5 transition-transform">
                      <span>Citation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Accreditation / Citation Modal */}
      <AnimatePresence>
        {selectedAward && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl bg-[#121212] border-2 border-[var(--gold-primary)] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Radial gold background atmosphere */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedAward(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#1C1A16] border border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8] hover:border-[var(--gold-primary)] transition-all cursor-pointer"
                aria-label="Close award modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Top Header with Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#201C14] to-[#12100C] border-2 border-[var(--gold-primary)] p-3 flex items-center justify-center shadow-[0_0_25px_var(--gold-glow)]">
                  <AwardBadgeIcon type={selectedAward.badgeType} className="w-full h-full text-[var(--gold-primary)]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--gold-primary)] uppercase tracking-wider mb-1">
                    <span>{selectedAward.year} OFFICIAL ACCREDITATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F5F1E8]">
                    {selectedAward.title}
                  </h3>
                  <div className="text-xs text-[#B6B0A4] font-medium font-display">
                    Conferred by {selectedAward.organization}
                  </div>
                </div>
              </div>

              {/* Citation Body */}
              <div className="space-y-4 pt-4 border-t border-[#383126]/70">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#D6B878] mb-1.5">
                    Official Jury Citation
                  </div>
                  <blockquote className="text-sm sm:text-base text-[#F5F1E8] italic font-serif-luxury leading-relaxed bg-[#181613] p-4 rounded-xl border border-[#383126]">
                    &ldquo;{selectedAward.citation}&rdquo;
                  </blockquote>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#151515] border border-[#383126]">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[#B6B0A4]">Attributed Project</div>
                    <div className="text-xs font-semibold text-[#F5F1E8] truncate mt-0.5">{selectedAward.project}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151515] border border-[#383126]">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[#B6B0A4]">Evaluation Metric</div>
                    <div className="text-xs font-semibold text-[#D6B878] truncate mt-0.5">{selectedAward.metric}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#151515] border border-[#383126] flex items-center justify-between text-xs">
                  <span className="text-[#B6B0A4]">Accreditation Board:</span>
                  <span className="text-[#F5F1E8] font-medium">{selectedAward.jury}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-[#383126]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#B6B0A4]">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B878]" />
                  <span>Audited Industry Distinction</span>
                </div>

                {onOpenQuoteModal ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAward(null);
                      onOpenQuoteModal();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display flex items-center justify-center gap-2 cursor-pointer font-bold"
                  >
                    <span>Commission Award-Winning Flagship</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedAward(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#1C1A16] border border-[#383126] text-[#F5F1E8] hover:border-[#D6B878] cursor-pointer"
                  >
                    Close Brief
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
