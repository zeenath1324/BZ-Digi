import React from 'react';
import { Hero } from '../components/Hero';
import { ClientMarquee } from '../components/ClientMarquee';
import { AwardsMarquee } from '../components/AwardsMarquee';
import { AboutSection } from '../components/AboutSection';
import { ServicesGrid } from '../components/ServicesGrid';
import { AgencyFeaturesSection } from '../components/AgencyFeaturesSection';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { MetricsSection } from '../components/MetricsSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { ContactForm } from '../components/ContactForm';
import { Mail, Phone, MapPin, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  onOpenQuoteModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();

  return (
    <main>
      {/* 1. Cinematic Hero with custom Animated Brand Graphic */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} />

      {/* 2. Client Logo Marquee with two continuous rows moving in opposite directions */}
      <ClientMarquee />

      {/* 2.5. Awards & Recognition Horizontal Carousel Marquee */}
      <AwardsMarquee onOpenQuoteModal={onOpenQuoteModal} />

      {/* 3. About Section: "Strategy Meets Creativity" */}
      <AboutSection />

      {/* 4. Disciplined Practices (Services Grid: 6 services) */}
      <ServicesGrid />

      {/* 4.5. Enterprise Features Architecture & Capabilities Matrix */}
      <AgencyFeaturesSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5. Curated Case Studies / Our Work */}
      <PortfolioGrid />

      {/* 5.5. Real-Time Three.js 3D Atelier Showcase Section */}
      <section className="py-20 bg-[var(--bg-card)] border-y border-[var(--border-gold)] relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-2xl bg-[#0D0C0A] border border-[#383126] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            {/* Ambient gold radial glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D6B878]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1812] border border-[#383126] text-xs font-mono tracking-wider text-[#D6B878]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('atelier.badge', 'NEW: REAL-TIME THREE.JS 3D ATELIER')}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#F5F1E8] tracking-tight leading-tight">
                  {t('atelier.titlePart1', 'Immersive Procedural')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B878] via-[#F3D28E] to-[#AA853D]">
                    {t('atelier.titlePart2', '3D Digital Craftsmanship')}
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-[#B6B0A4] font-light leading-relaxed max-w-2xl">
                  {t('atelier.desc', 'Step inside our interactive Three.js 3D Studio. Inspect procedural Haute Horlogerie chronographs, kinetic monoliths, and aerodynamic silhouettes rendered with studio ACES filmic PBR lighting, exploded layer kinematics, and interactive material customization.')}
                </p>

                {/* Specs Pill List */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#181613] text-[#D6B878] border border-[#2A241C]">
                    • 11-Part Procedural Assembly
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#181613] text-[#D6B878] border border-[#2A241C]">
                    • Interactive Exploded View
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#181613] text-[#D6B878] border border-[#2A241C]">
                    • 4 PBR Material Finishes
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#181613] text-[#D6B878] border border-[#2A241C]">
                    • 60 FPS WebGL Studio
                  </span>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="/atelier"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_30px_rgba(214,184,120,0.4)] hover:brightness-105 active:scale-95 transition-all duration-300 font-display"
                  >
                    <span>{t('atelier.cta', 'Enter 3D Atelier & Studio')}</span>
                    <span className="text-base font-bold">→</span>
                  </a>

                  <button
                    onClick={onOpenQuoteModal}
                    className="px-6 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-[#D6B878] bg-[#14120F] border border-[#383126] hover:border-[#D6B878] hover:text-[#F5DEB3] transition-all"
                  >
                    Commission 3D Experience
                  </button>
                </div>
              </div>

              {/* 3D Visual Teaser Card */}
              <div className="lg:col-span-5 relative">
                <a
                  href="/atelier"
                  className="group block relative rounded-xl border border-[#383126] bg-[#14120E] p-6 hover:border-[#D6B878] transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  <div className="aspect-[4/3] rounded-lg bg-[#080809] border border-[#241F18] flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_40px_rgba(214,184,120,0.15)] transition-all">
                    {/* Concentric gold rings graphic */}
                    <div className="w-48 h-48 rounded-full border border-[#D6B878]/30 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                      <div className="w-36 h-36 rounded-full border border-[#D6B878]/50 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-[#D6B878]/70 flex items-center justify-center bg-[#15120B]">
                          <span className="font-serif-luxury font-bold text-2xl text-[#F3D28E]">
                            3D
                          </span>
                        </div>
                      </div>
                      {/* Satellite indicator */}
                      <div className="absolute top-2 right-6 w-3 h-3 rounded-full bg-[#D6B878] shadow-[0_0_10px_#D6B878]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#A8A296] bg-[#100E0B]/90 p-2.5 rounded-lg border border-[#241F18]">
                      <span className="font-mono text-[#D6B878]">Haute Horlogerie 3D</span>
                      <span className="text-[10px] uppercase font-bold text-[#F3D28E] group-hover:translate-x-1 transition-transform">
                        Launch Viewport ↗
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four-Step Process: Discover, Strategize, Create, Optimize */}
      <ProcessTimeline />

      {/* 7. Client Testimonials Carousel */}
      <TestimonialCarousel />

      {/* 8. Results & Metrics Section with interactive SVG charts */}
      <MetricsSection />

      {/* 9. FAQ Section */}
      <FAQAccordion />

      {/* 10. Contact & Lead Generation Section */}
      <section id="contact-section" className="py-24 sm:py-32 bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-300">
        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Editorial Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--gold-primary)] uppercase tracking-wider font-display mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>START A CONVERSATION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] leading-tight mb-4">
                  Let’s Turn Ambition Into <span className="gold-gradient-text">Reality.</span>
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Whether you are scaling direct acquisition, repositioning a heritage luxury brand, or preparing for high-growth venture capital, our partners are ready to engineer your digital advantage.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-gold)]">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-main)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Executive Inquiries</div>
                    <a href="mailto:inquiries@bzdigital.agency" className="text-[var(--gold-light)] hover:underline font-medium">
                      inquiries@bzdigital.agency
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-main)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Direct Desk (London Mayfair)</div>
                    <span className="text-[var(--text-main)] font-medium">+44 (0) 20 7946 0912</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-main)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Headquarters</div>
                    <span className="text-[var(--text-main)]">14 Berkeley Square, Mayfair, London W1J 6BQ</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-main)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Response Guarantee</div>
                    <span className="text-[var(--text-main)]">Under 4 business hours for enterprise evaluations</span>
                  </div>
                </div>
              </div>

              {/* Quick Quote Trigger Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--gold-light)] text-xs font-semibold uppercase tracking-wider transition-colors w-full sm:w-auto hover:shadow-[0_0_15px_var(--gold-glow)]"
                >
                  Need an Instant Estimate? Open Quote Calculator →
                </button>
              </div>
            </div>

            {/* Right: Lead Generation Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>

        </div>
      </section>
    </main>
  );
};
