import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  Share2, 
  Layout, 
  Palette, 
  FileText, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/agencyData';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search,
  TrendingUp,
  Share2,
  Layout,
  Palette,
  FileText,
};

export const ServicesGrid: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#101010] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,_rgba(214,184,120,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-2">
              {t('services.badge', 'DISCIPLINED PRACTICES')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] leading-tight">
              {t('services.titlePart1', 'Comprehensive Services Engineered for')}{' '}
              <span className="gold-gradient-text">{t('services.titlePart2', 'Domination.')}</span>
            </h2>
          </div>
          <p className="text-sm text-[#B6B0A4] max-w-md">
            {t('services.subtitle', 'Six interconnected digital disciplines executing in complete harmony to capture market share, build prestige, and accelerate returns.')}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem, idx: number) => {
            const Icon = iconMap[service.iconName] || TrendingUp;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(214,184,120,0.12)] p-8 flex flex-col justify-between"
              >
                {/* Subtle Top Accent Indicator */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D6B878]/30 group-hover:via-[#D6B878] to-transparent transition-all duration-500" />

                <div>
                  {/* Top Row: Icon and Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#1C1A16] border border-[#383126] group-hover:border-[#D6B878] flex items-center justify-center text-[#D6B878] transition-colors duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(214,184,120,0.25)]">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-serif-luxury font-bold text-[#B6B0A4]/40 group-hover:text-[#D6B878] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <div className="text-xs text-[#D6B878] font-medium tracking-wide uppercase font-display mb-4">
                    {service.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#B6B0A4] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#383126]/60">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#B6B0A4] group-hover:text-[#F5F1E8] transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B878] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-[#383126]/40 flex items-center justify-between">
                  <span className="text-xs text-[#B6B0A4] font-medium">
                    {service.startingAt}
                  </span>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#D6B878] group-hover:text-[#F0DDAA] transition-colors font-display"
                  >
                    <span>{t('services.discover', 'Discover Service')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] transition-all duration-300 font-display hover:shadow-[0_0_20px_rgba(214,184,120,0.2)]"
          >
            <span>Compare All Practices, Scope & Engagement Models</span>
            <ArrowUpRight className="w-4 h-4 text-[#D6B878]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
