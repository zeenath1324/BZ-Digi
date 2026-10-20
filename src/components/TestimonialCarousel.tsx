import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Pause, 
  Play, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/agencyData';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 }
    }
  })
};

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const total = TESTIMONIALS_DATA.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return next;
    });
  }, [total]);

  const selectTestimonial = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay effect - pauses when hovered or toggled off
  useEffect(() => {
    if (!isAutoplay || isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoplay, isHovered, paginate]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      paginate(-1);
    } else if (e.key === 'ArrowRight') {
      paginate(1);
    }
  };

  const active = TESTIMONIALS_DATA[currentIndex];

  return (
    <section 
      id="testimonials-section"
      className="py-24 sm:py-32 bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-300"
      aria-label="Client Testimonials Carousel"
    >
      {/* Background ambient gold radial spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[480px] pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, var(--gold-glow) 0%, transparent 72%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Decorative subtle grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[var(--grid-opacity)]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--dot-color) 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)] font-display mb-3">
              <Sparkles className="w-3 h-3 text-[var(--gold-primary)]" />
              <span>CLIENT ENDORSEMENTS & PROVEN IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] tracking-tight">
              Words of <span className="gold-gradient-text">Distinction.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-xl font-sans-clean">
              Direct counsel from CEOs, Founders, and Chief Marketing Officers whose market share and enterprise value we have accelerated.
            </p>
          </div>

          {/* Autoplay & Carousel Nav Controls */}
          <div className="flex items-center gap-3">
            {/* Autoplay Pause / Play Toggle */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-all duration-300 text-xs font-medium"
              title={isAutoplay ? 'Pause auto-rotation' : 'Resume auto-rotation'}
              aria-label={isAutoplay ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            >
              {isAutoplay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Paused</span>
                </>
              )}
            </button>

            {/* Previous Button */}
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--text-main)] hover:text-[var(--gold-primary)] hover:shadow-[0_0_15px_var(--gold-glow)] transition-all duration-300 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--text-main)] hover:text-[var(--gold-primary)] hover:shadow-[0_0_15px_var(--gold-glow)] transition-all duration-300 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Carousel Showcase Card */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-live="polite"
          className="relative rounded-3xl bg-[var(--bg-card)] border border-[var(--border-gold)] p-7 sm:p-12 lg:p-16 shadow-[var(--card-shadow)] overflow-hidden transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--gold-primary)]"
        >
          {/* Subtle Top Gold Filament Line */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-80" />

          {/* Large Quote Watermark Background */}
          <Quote 
            className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 w-36 h-36 sm:w-56 sm:h-56 text-[var(--border-gold)] opacity-15 pointer-events-none select-none transition-opacity" 
            aria-hidden="true"
          />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 flex flex-col justify-between min-h-[340px] sm:min-h-[300px]"
            >
              {/* Header Badges & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                {/* Star Rating & Verified Status */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[var(--bg-elevated)] px-3 py-1.5 rounded-full border border-[var(--border-gold)]">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--gold-primary)] text-[var(--gold-primary)]" />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold text-[var(--gold-primary)] font-mono">
                      5.0
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[11px] font-medium text-[var(--text-muted)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                    <span className="hidden sm:inline">Verified Client Engagement</span>
                    <span className="sm:hidden">Verified</span>
                  </div>
                </div>

                {/* Key Result Highlight Badge */}
                {active.resultsHighlighted && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--gold-primary)]/40 text-xs font-semibold text-[var(--gold-light)] font-display shadow-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                    <span>{active.resultsHighlighted}</span>
                  </div>
                )}
              </div>

              {/* The Quote Body - Distinct Luxury Serif Font */}
              <div className="my-auto py-2">
                <blockquote className="font-quote-serif italic font-normal text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] text-[var(--text-main)] leading-relaxed sm:leading-[1.4] tracking-wide">
                  <span className="text-[var(--gold-primary)] not-italic mr-1 text-2xl sm:text-3xl font-serif">“</span>
                  {active.quote}
                  <span className="text-[var(--gold-primary)] not-italic ml-1 text-2xl sm:text-3xl font-serif">”</span>
                </blockquote>
              </div>

              {/* Author, Company, Scope & Metric Metadata */}
              <div className="pt-8 sm:pt-10 mt-8 border-t border-[var(--border-gold)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Client Profile */}
                <div className="flex items-center gap-4">
                  {/* Luxury Monogram Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-deep)] text-[#080808] font-serif-luxury font-extrabold text-lg flex items-center justify-center shadow-lg flex-shrink-0 ring-2 ring-[var(--border-gold)] ring-offset-2 ring-offset-[var(--bg-card)]">
                    {active.avatarText}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-serif-luxury font-bold text-[var(--text-main)]">
                        {active.clientName}
                      </h3>
                      <span title="Verified partner" className="inline-flex">
                        <CheckCircle2 className="w-4 h-4 text-[var(--gold-primary)]" />
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-[var(--text-muted)] font-sans-clean mt-0.5">
                      <span>{active.role}</span>
                      <span className="mx-1.5 text-[var(--border-gold)]">•</span>
                      <span className="text-[var(--gold-primary)] font-semibold">{active.company}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)]/80 mt-1 uppercase tracking-wider">
                      <span>Industry: {active.industry}</span>
                      {active.location && (
                        <>
                          <span className="text-[var(--border-gold)]">•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[var(--gold-primary)]" />
                            {active.location}
                          </span>
                        </>
                      )}
                      {active.year && (
                        <>
                          <span className="text-[var(--border-gold)]">•</span>
                          <span>{active.year}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Project Scope or Metric Badge */}
                {active.metricValue && active.metricLabel && (
                  <div className="flex items-center gap-4 bg-[var(--bg-elevated)] px-4 py-3 rounded-2xl border border-[var(--border-gold)] flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-serif-luxury font-extrabold text-[var(--gold-light)] leading-tight">
                        {active.metricValue}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] font-sans-clean uppercase tracking-wider">
                        {active.metricLabel}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar & Indicators Bottom Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--border-gold)]">
            
            {/* Interactive Dot Buttons */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => selectTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    currentIndex === i
                      ? 'w-10 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] shadow-[0_0_8px_var(--gold-glow)]'
                      : 'w-2 bg-[var(--border-gold)] hover:bg-[var(--text-muted)]'
                  }`}
                  aria-label={`Jump to testimonial ${i + 1} from ${item.clientName}`}
                  title={`${item.clientName} (${item.company})`}
                />
              ))}
            </div>

            {/* Slide Index Counter with Autoplay indicator */}
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
              {isAutoplay && !isHovered && (
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--gold-primary)] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] animate-ping" />
                  <span>Cycling</span>
                </div>
              )}
              <span>
                <strong className="text-[var(--gold-primary)]">0{currentIndex + 1}</strong> / 0{total}
              </span>
            </div>
          </div>
        </div>

        {/* Client Thumbnail Selector Strip - One-click access to all testimonials */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TESTIMONIALS_DATA.map((item, i) => {
            const isSelected = currentIndex === i;
            return (
              <button
                key={item.id}
                onClick={() => selectTestimonial(i)}
                className={`text-left p-3.5 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[var(--bg-elevated)] border-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-glow)]'
                    : 'bg-[var(--bg-card)] border-[var(--border-gold)] hover:border-[var(--gold-primary)]/50 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg text-xs font-serif font-bold flex items-center justify-center flex-shrink-0 ${
                    isSelected 
                      ? 'bg-[var(--gold-primary)] text-[#080808]' 
                      : 'bg-[var(--bg-elevated)] text-[var(--gold-primary)] border border-[var(--border-gold)]'
                  }`}>
                    {item.avatarText}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[var(--text-main)] truncate font-serif-luxury">
                      {item.clientName}
                    </div>
                    <div className="text-[10px] text-[var(--gold-primary)] truncate font-sans-clean">
                      {item.company}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Transparency / Demonstration Disclaimer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[var(--text-muted)] opacity-70 font-sans-clean">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold-primary)] flex-shrink-0" />
          <span>Verified Client Partnership Case Studies • Benchmark Metrics & Narrative Testimonials</span>
        </div>

      </div>
    </section>
  );
};
