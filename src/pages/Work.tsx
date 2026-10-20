import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES_DATA } from '../data/agencyData';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ClientMarquee } from '../components/ClientMarquee';

interface WorkProps {
  onOpenQuoteModal: () => void;
}

export const Work: React.FC<WorkProps> = ({ onOpenQuoteModal }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Performance', 'Web', 'SEO', 'Branding'];

  const filtered = filter === 'All'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((p) => p.category === filter);

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ARCHIVES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              Selected Works & <br />
              <span className="gold-gradient-text">Commercial Outcomes.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
              Explore our portfolio of high-impact digital flagship builds, search authority campaigns, and performance scaling engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-display ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] shadow-[0_0_15px_rgba(214,184,120,0.3)]'
                  : 'bg-[#151515] border border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-[#B6B0A4] bg-[#151515] px-3.5 py-1.5 rounded-full border border-[#383126] self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D6B878]" />
          <span>Fictional demonstration projects</span>
        </div>
      </div>

      {/* Work Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-2xl group"
            >
              {/* CSS Visual Preview Container */}
              <div className="h-64 sm:h-80 w-full bg-[#101010] relative flex items-center justify-center p-8 border-b border-[#383126] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(214,184,120,0.15)_0%,_transparent_70%)] pointer-events-none" />
                
                {/* Visual Decorative Card */}
                <div className="relative w-full max-w-sm rounded-2xl bg-[#1C1A16] border border-[#383126] group-hover:border-[#D6B878]/80 p-6 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#383126]">
                    <div className="w-2 h-2 rounded-full bg-[#D6B878]" />
                    <span className="text-[10px] uppercase tracking-widest text-[#D6B878] font-mono">
                      {item.category} • {item.year}
                    </span>
                  </div>
                  <div className="text-sm font-serif-luxury font-bold text-[#F5F1E8] mb-2">
                    {item.client}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {item.results.slice(0, 2).map((r, i) => (
                      <div key={i} className="p-2 rounded bg-[#101010] border border-[#383126]">
                        <div className="text-[9px] text-[#B6B0A4]">{r.label}</div>
                        <div className="text-xs font-bold text-[#F0DDAA]">{r.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#080808]/80 text-[#D6B878] border border-[#383126]">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-8">
                <div className="text-xs text-[#D6B878] uppercase tracking-wider font-semibold font-display mb-1">
                  {item.client}
                </div>
                <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed mb-6">
                  {item.tagline}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#101010] border border-[#383126] mb-6">
                  {item.results.map((res, i) => (
                    <div key={i}>
                      <div className="text-base sm:text-lg font-serif-luxury font-bold text-[#F0DDAA]">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-[#B6B0A4]">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/work/${item.id}`}
                  className="w-full py-3.5 rounded-xl bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-display"
                >
                  <span>Review Complete Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D6B878]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted By Luxury Marquee */}
      <ClientMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom CTA */}
        <div className="mt-20 p-10 rounded-3xl bg-[#151515] border border-[#383126] text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] mb-3">
            Want Similar Results for Your Brand?
          </h3>
          <p className="text-xs sm:text-sm text-[#B6B0A4] mb-6">
            Let’s review your metrics and construct an empirical growth plan customized to your target enterprise valuation.
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display"
          >
            Schedule a Confidential Consultation
          </button>
        </div>
      </div>

    </div>
  );
};
