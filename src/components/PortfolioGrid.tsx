import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES_DATA, CaseStudyItem } from '../data/agencyData';

export const PortfolioGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Performance', 'Web', 'SEO', 'Branding'];

  const filteredProjects = filter === 'All'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter((p) => p.category === filter);

  return (
    <section className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden">
      {/* Subtle background ambient gold */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(214,184,120,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-2">
              CURATED CASE STUDIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8]">
              Our Work Speaks in{' '}
              <span className="gold-gradient-text">Milestones.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#B6B0A4] bg-[#151515] px-3.5 py-1.5 rounded-full border border-[#383126]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B878]" />
              Fictional demonstration case studies
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 border-b border-[#383126]/60 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-display ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] shadow-[0_0_15px_rgba(214,184,120,0.3)]'
                  : 'bg-[#151515] border border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8] hover:border-[#D6B878]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid — Luxury Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: CaseStudyItem, idx: number) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              >
                <div>
                  {/* Visual CSS-Rendered Cinema Preview */}
                  <div className="relative h-64 sm:h-72 w-full bg-[#101010] overflow-hidden border-b border-[#383126] flex items-center justify-center p-6">
                    {/* Atmospheric Glow */}
                    <div 
                      className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(214,184,120,0.18) 0%, transparent 65%)`
                      }}
                    />

                    {/* Architectural Grid inside Preview */}
                    <div 
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, #383126 1px, transparent 1px), linear-gradient(to bottom, #383126 1px, transparent 1px)`,
                        backgroundSize: '36px 36px',
                      }}
                    />

                    {/* Stylized Abstract Device/Monograph Graphic */}
                    <div className="relative w-full max-w-sm rounded-xl bg-[#1C1A16] border border-[#383126] group-hover:border-[#D6B878]/70 p-5 shadow-2xl transition-all duration-500 transform group-hover:scale-[1.03]">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#383126]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#383126] group-hover:bg-[#D6B878] transition-colors" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#383126]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#383126]" />
                        </div>
                        <span className="text-[10px] font-mono text-[#D6B878] tracking-widest uppercase">
                          {project.year} • {project.category}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="h-3 w-3/4 rounded bg-gradient-to-r from-[#D6B878]/40 to-transparent" />
                        <div className="h-2 w-1/2 rounded bg-[#383126]" />
                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <div className="p-2 rounded bg-[#151515] border border-[#383126]">
                            <div className="text-[9px] text-[#B6B0A4]">{project.results[0].label}</div>
                            <div className="text-xs font-bold text-[#F0DDAA]">{project.results[0].value}</div>
                          </div>
                          <div className="p-2 rounded bg-[#151515] border border-[#383126]">
                            <div className="text-[9px] text-[#B6B0A4]">{project.results[1].label}</div>
                            <div className="text-xs font-bold text-[#D6B878]">{project.results[1].value}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#080808]/85 text-[#F0DDAA] border border-[#383126] backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-[#080808]/80 border border-[#383126] group-hover:border-[#D6B878] flex items-center justify-center text-[#F5F1E8] group-hover:text-[#D6B878] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8">
                    <div className="text-xs font-medium text-[#D6B878] uppercase tracking-wider mb-1 font-display">
                      {project.client}
                    </div>
                    <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed mb-6">
                      {project.tagline}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#101010] border border-[#383126] mb-6">
                      {project.results.map((res, rIdx) => (
                        <div key={rIdx} className="text-left">
                          <div className="text-base sm:text-lg font-serif-luxury font-bold text-[#F0DDAA]">
                            {res.value}
                          </div>
                          <div className="text-[10px] text-[#B6B0A4] line-clamp-1">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-8 pb-8 pt-0">
                  <Link
                    to={`/work/${project.id}`}
                    className="w-full py-3.5 rounded-xl bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group/link"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D6B878] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-transparent border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] transition-all duration-300 font-display"
          >
            <span>View All Client Archives & Methodologies</span>
            <Sparkles className="w-4 h-4 text-[#D6B878]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
