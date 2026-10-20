import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/agencyData';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Share2, 
  Layout, 
  Palette, 
  FileText 
} from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search,
  TrendingUp,
  Share2,
  Layout,
  Palette,
  FileText,
};

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE DISCIPLINES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              Specialized Capabilities. <br />
              <span className="gold-gradient-text">Unified Velocity.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
              Every practice at BZ Digital is led by recognized authorities in their domain. We operate as specialized craft ateliers connected by an overarching commercial strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = iconMap[service.iconName] || TrendingUp;

            return (
              <div
                key={service.id}
                id={service.id}
                className="rounded-3xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] p-8 sm:p-12 transition-all duration-300 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Title, Desc, and Deliverables */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1C1A16] border border-[#383126] flex items-center justify-center text-[#D6B878]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-serif-luxury font-bold text-[#D6B878]">
                          PRACTICE 0{idx + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8]">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="text-xs uppercase tracking-wider text-[#D6B878] font-semibold mb-4 font-display">
                      {service.subtitle}
                    </div>

                    <p className="text-sm sm:text-base text-[#B6B0A4] leading-relaxed mb-8">
                      {service.fullDescription}
                    </p>

                    <div>
                      <div className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-display mb-3">
                        Key Deliverables Included:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-[#B6B0A4]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B878] flex-shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Quick Actions */}
                  <div className="lg:col-span-4 bg-[#1C1A16] border border-[#383126] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#B6B0A4] font-semibold mb-1">
                        Investment Framework
                      </div>
                      <div className="text-2xl font-serif-luxury font-bold text-[#F0DDAA] mb-4">
                        {service.startingAt}
                      </div>

                      <div className="space-y-3 mb-6 text-xs text-[#B6B0A4]">
                        <div className="flex justify-between pb-2 border-b border-[#383126]/60">
                          <span>Sprint Duration:</span>
                          <span className="text-[#F5F1E8] font-medium">{service.timeline}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-[#383126]/60">
                          <span>Demonstrated ROI:</span>
                          <span className="text-[#D6B878] font-medium">{service.metricsSample}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Link
                        to={`/services/${service.id}`}
                        className="w-full py-3 rounded-xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <span>Deep-Dive Service Page</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D6B878]" />
                      </Link>

                      <button
                        onClick={onOpenQuoteModal}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 font-display"
                      >
                        <span>Request Custom Scope</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
