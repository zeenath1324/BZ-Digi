import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Play, 
  Film, 
  Compass, 
  X, 
  Volume2, 
  VolumeX, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { AnimatedBrandGraphic } from './AnimatedBrandGraphic';
import { HeroCinematicVideo } from './HeroCinematicVideo';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [heroVisualMode, setHeroVisualMode] = useState<'video' | '3d'>('video');
  const [isTheaterOpen, setIsTheaterOpen] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Architectural Grid & Subtle Gold Spotlights */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--grid-opacity)',
          backgroundImage: `linear-gradient(to right, var(--gold-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--gold-primary) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Atmospheric Radial Spotlights & Animated Light Sweep */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column — Editorial Hero Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] border border-[#383126] text-[#D6B878] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F0DDAA] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase font-display">
                  {t('hero.badge', 'CREATIVE DIGITAL MARKETING AGENCY')}
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] tracking-tight leading-[1.12] mb-6"
            >
              {t('hero.titlePart1', 'We Turn Digital Ambition Into')}{' '}
              <span className="gold-gradient-text relative inline-block">
                {t('hero.titlePart2', 'Real Growth.')}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D6B878] to-transparent opacity-60" />
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#B6B0A4] max-w-2xl leading-relaxed mb-9 font-normal"
            >
              {t('hero.description')}
            </motion.p>

            {/* Call-to-Action Buttons with Video Showreel trigger */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12"
            >
              <button
                onClick={onOpenQuoteModal}
                className="group px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_30px_rgba(214,184,120,0.45)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 font-display flex items-center justify-center gap-3 cursor-pointer font-bold"
              >
                <span>{t('hero.ctaGrowth', 'Let’s Talk Growth')}</span>
                <ArrowRight className="w-4 h-4 text-[#080808] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsTheaterOpen(true)}
                className="group px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#181612] border border-[#D6B878]/60 text-[#F0DDAA] hover:bg-[#201D17] hover:border-[#D6B878] hover:shadow-[0_0_20px_rgba(214,184,120,0.25)] transition-all duration-300 font-display flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--gold-primary)] text-[#080808] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Play className="w-3 h-3 fill-current translate-x-0.5" />
                </div>
                <span>Watch 2026 Reel</span>
                <span className="text-[10px] font-mono text-[#D6B878]/80 hidden sm:inline">(1:24)</span>
              </button>

              <Link
                to="/work"
                className="group px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#151515] border border-[#383126] text-[#F5F1E8] hover:border-[#D6B878] hover:text-[#F0DDAA] hover:bg-[#1C1A16] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{t('hero.ctaWork', 'Explore Our Work')}</span>
              </Link>
            </motion.div>

            {/* Subtle Trust Indicators & Client Count */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[#383126]/70 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#B6B0A4]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#151515] border border-[#383126] flex items-center justify-center text-[#D6B878]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#F5F1E8] font-bold text-sm tracking-wide font-display">$140M+</div>
                  <div className="text-[11px] text-[#B6B0A4]">{t('hero.statRevenue', 'Attributed Client Revenue')}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#151515] border border-[#383126] flex items-center justify-center text-[#D6B878]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#F5F1E8] font-bold text-sm tracking-wide font-display">98.4%</div>
                  <div className="text-[11px] text-[#B6B0A4]">{t('hero.statRetention', 'Client Retention Rate')}</div>
                </div>
              </div>

              <div className="flex -space-x-2 overflow-hidden items-center pl-2 border-l border-[#383126]/60">
                {['AV', 'SL', 'JT', 'CM'].map((initials, idx) => (
                  <div
                    key={idx}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#080808] bg-[#1C1A16] border border-[#383126] text-[10px] font-bold text-[#D6B878] flex items-center justify-center"
                  >
                    {initials}
                  </div>
                ))}
                <span className="pl-3 text-[11px] text-[#B6B0A4]">
                  {t('hero.statPartners', '50+ Global Brand Partners')}
                </span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column — Dual Mode: Animative Video Player vs 3D Orbital Emblem */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Mode Switcher Pill */}
            <div className="mb-4 inline-flex p-1 rounded-full bg-[#14120E] border border-[#383126] shadow-md z-20">
              <button
                type="button"
                onClick={() => setHeroVisualMode('video')}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase font-display flex items-center gap-1.5 transition-all cursor-pointer ${
                  heroVisualMode === 'video'
                    ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-bold shadow-[0_0_12px_var(--gold-glow)]'
                    : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Cinema Video</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroVisualMode('3d')}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase font-display flex items-center gap-1.5 transition-all cursor-pointer ${
                  heroVisualMode === '3d'
                    ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-bold shadow-[0_0_12px_var(--gold-glow)]'
                    : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>3D Emblem</span>
              </button>
            </div>

            {/* Active Display Panel with Smooth Transition */}
            <AnimatePresence mode="wait">
              {heroVisualMode === 'video' ? (
                <motion.div
                  key="hero-video"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full flex justify-center"
                >
                  <HeroCinematicVideo onOpenShowreelModal={() => setIsTheaterOpen(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="hero-3d"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full flex justify-center"
                >
                  <AnimatedBrandGraphic />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* Fullscreen Cinema Theater Modal */}
      <AnimatePresence>
        {isTheaterOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setIsTheaterOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0D0B08] border-2 border-[var(--gold-primary)] p-4 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Theater Close Button */}
              <button
                type="button"
                onClick={() => setIsTheaterOpen(false)}
                className="absolute top-5 right-5 z-40 p-2.5 rounded-xl bg-[#1C1812] border border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8] hover:border-[var(--gold-primary)] transition-all cursor-pointer"
                aria-label="Close cinema theater"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Theater Header */}
              <div className="flex items-center gap-3 mb-4 pr-12">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold-primary)] text-[#080808] flex items-center justify-center font-bold">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-[#F5F1E8]">
                    BZ DIGITAL • 2026 CINEMATIC AGENCY SHOWREEL
                  </h3>
                  <div className="text-xs text-[#D6B878] font-mono">
                    ACES FILMIC PBR • 4K ULTRA-HD MASTER • 60 FPS RUNTIME
                  </div>
                </div>
              </div>

              {/* Fullscreen Video Player Frame */}
              <div className="w-full flex justify-center">
                <HeroCinematicVideo />
              </div>

              {/* Theater Footer Direct CTA */}
              <div className="mt-5 pt-4 border-t border-[#383126]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#B6B0A4]">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B878]" />
                  <span>Curated works spanning Haute Horlogerie, Private Aviation & Sovereign Tech.</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsTheaterOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display font-bold cursor-pointer"
                >
                  Commission This Level of Craft
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
