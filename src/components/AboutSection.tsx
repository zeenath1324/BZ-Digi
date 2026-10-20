import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { Compass, Lightbulb, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { AGENCY_STATS } from '../data/agencyData';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Compass,
      title: t('about.pillarStrategy', 'Strategy'),
      desc: t('about.pillarStrategyDesc', 'Forensic market positioning and mathematical commercial modeling tailored to eliminate guesswork.'),
    },
    {
      icon: Lightbulb,
      title: t('about.pillarCreativity', 'Creativity'),
      desc: t('about.pillarCreativityDesc', 'Cinema-grade visual aesthetics, bespoke typography, and evocative storytelling that command reverence.'),
    },
    {
      icon: Cpu,
      title: t('about.pillarTech', 'Technology'),
      desc: t('about.pillarTechDesc', 'Sub-second headless web architectures, automated server-side attribution, and algorithmic bidding pipelines.'),
    },
    {
      icon: BarChart3,
      title: t('about.pillarPerf', 'Performance'),
      desc: t('about.pillarPerfDesc', 'Relentless conversion rate optimization and blended revenue growth engineering that scales top-line profit.'),
    },
  ];

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden">
      {/* Decorative Golden Line Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#383126] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Heading & Mission Statement */}
          <div className="lg:col-span-5">
            <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-3">
              {t('about.badge', 'AGENCY PHILOSOPHY')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] leading-[1.18] mb-6">
              {t('about.titlePart1', 'Strategy Meets')}{' '}
              <span className="gold-gradient-text">{t('about.titlePart2', 'Creativity.')}</span>
            </h2>
            <div className="w-16 h-1 bg-[#D6B878] mb-6 rounded-full" />
            <p className="text-base text-[#B6B0A4] leading-relaxed mb-6 font-normal">
              {t('about.p1', 'Most digital agencies force you to choose between breathtaking artistic design and cold, clinical performance marketing. BZ Digital was founded on the conviction that category leaders require both in equal measure.')}
            </p>
            <p className="text-sm text-[#B6B0A4]/80 leading-relaxed mb-8">
              {t('about.p2', 'We operate as a high-velocity extension of your executive leadership team, engineering full-funnel digital journeys that capture imagination and convert high-ticket intent into compounding enterprise valuation.')}
            </p>
            
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] transition-all duration-300 group"
            >
              <span>{t('about.cta', 'Discover Our Story & Leadership')}</span>
              <ArrowRight className="w-4 h-4 text-[#D6B878] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Interactive Pillars Grid & Decorative Graphic */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="group p-6 rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#1C1A16] border border-[#383126] group-hover:border-[#D6B878] flex items-center justify-center text-[#D6B878] mb-5 transition-colors shadow-inner">
                        <IconComp className="w-5 h-5 text-[#D6B878] group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#B6B0A4] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#383126]/50 flex items-center justify-between text-[11px] text-[#D6B878] font-display uppercase tracking-wider">
                      <span>Pillar 0{idx + 1}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D6B878]/60 group-hover:bg-[#D6B878]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Animated Statistics Row */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#101010] border border-[#383126] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(214,184,120,0.06)_0%,_transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {AGENCY_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="text-center sm:text-left border-l-2 border-[#383126] pl-4 sm:pl-6"
              >
                <div className="text-3xl sm:text-4xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-1">
                  <span className="gold-gradient-text">{stat.value}</span>
                </div>
                <div className="text-xs sm:text-sm text-[#B6B0A4] font-medium">
                  {stat.label}
                </div>
                <div className="text-[10px] text-[#B6B0A4]/60 mt-1 uppercase tracking-wider">
                  Verified metric
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#383126]/50 text-right">
            <span className="text-[10px] text-[#B6B0A4]/70 tracking-wider uppercase">
              * Demonstration figures representative of agency historical performance benchmarks
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
