import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, BarChart2, ShieldCheck, Zap } from 'lucide-react';
import { AGENCY_METRICS } from '../data/agencyData';

export const MetricsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<'revenue' | 'organic' | 'roas'>('revenue');

  // Chart datasets (all normalized for SVG viewBox 0 0 600 240)
  const charts = {
    revenue: {
      title: 'Attributed Client Revenue Trajectory ($M)',
      path: 'M 30,200 C 120,190 180,160 250,130 C 320,100 400,60 570,30',
      area: 'M 30,200 C 120,190 180,160 250,130 C 320,100 400,60 570,30 L 570,220 L 30,220 Z',
      points: [
        { x: 30, y: 200, label: 'Q1', val: '$12M' },
        { x: 180, y: 160, label: 'Q2', val: '$38M' },
        { x: 320, y: 100, label: 'Q3', val: '$82M' },
        { x: 570, y: 30, label: 'Q4', val: '$140M+' },
      ],
      description: 'Continuous compound growth curve across active client campaigns over a 12-month lifecycle.',
      highlight: '+340% YoY Lift'
    },
    organic: {
      title: 'Semantic Organic Impressions & Authority Index',
      path: 'M 30,210 C 100,195 200,170 300,110 C 410,50 490,40 570,25',
      area: 'M 30,210 C 100,195 200,170 300,110 C 410,50 490,40 570,25 L 570,220 L 30,220 Z',
      points: [
        { x: 30, y: 210, label: 'M1', val: '45K' },
        { x: 200, y: 170, label: 'M3', val: '180K' },
        { x: 380, y: 80, label: 'M6', val: '650K' },
        { x: 570, y: 25, label: 'M12', val: '2.4M' },
      ],
      description: 'Search visibility acceleration following Core Web Vitals remediation and semantic cluster deployment.',
      highlight: 'Top 3 SERP Dominance'
    },
    roas: {
      title: 'Blended Paid Media Efficiency (MER Multiplier)',
      path: 'M 30,190 C 120,170 240,140 340,90 C 430,70 510,55 570,40',
      area: 'M 30,190 C 120,170 240,140 340,90 C 430,70 510,55 570,40 L 570,220 L 30,220 Z',
      points: [
        { x: 30, y: 190, label: 'Wk 2', val: '1.8x' },
        { x: 180, y: 150, label: 'Wk 6', val: '3.1x' },
        { x: 360, y: 85, label: 'Wk 12', val: '4.2x' },
        { x: 570, y: 40, label: 'Wk 20', val: '4.8x' },
      ],
      description: 'First-party conversion API and dynamic creative modeling driving sustained CAC reduction.',
      highlight: '4.8x Blended Return'
    }
  };

  const currentChart = charts[activeTab];

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#101010] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-3">
            EMPIRICAL RIGOUR
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-4">
            Results That Transcend <span className="gold-gradient-text">Vanity.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B6B0A4] leading-relaxed">
            We measure success exclusively in commercial reality: revenue attributed, enterprise valuations augmented, and market moats fortified.
          </p>
        </div>

        {/* 4 Animated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AGENCY_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(214,184,120,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1C1A16] border border-[#383126] flex items-center justify-center text-[#D6B878]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D6B878] tracking-widest uppercase">
                    KPI 0{idx + 1}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-2">
                  <span className="gold-gradient-text">
                    {metric.prefix}{metric.value}{metric.suffix}
                  </span>
                </div>

                <div className="text-sm font-semibold text-[#F5F1E8] mb-2 font-display">
                  {metric.label}
                </div>
              </div>

              <div className="pt-4 border-t border-[#383126]/60 text-xs text-[#B6B0A4]">
                {metric.note}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Performance Graph */}
        <div className="rounded-3xl bg-[#151515] border border-[#383126] p-6 sm:p-10 shadow-2xl relative">
          
          {/* Top Bar with Tab Selectors */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#383126]/70 mb-8">
            <div>
              <div className="text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#D6B878]" />
                <span>Interactive Growth Model</span>
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#F5F1E8] mt-1">
                {currentChart.title}
              </h3>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#101010] border border-[#383126]">
              {(['revenue', 'organic', 'roas'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-display ${
                    activeTab === tab
                      ? 'bg-[#D6B878] text-[#080808] shadow-md'
                      : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
                  }`}
                >
                  {tab === 'revenue' ? 'Revenue' : tab === 'organic' ? 'SEO Lift' : 'Paid ROAS'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart Graphic */}
          <div className="relative w-full aspect-[21/9] min-h-[220px] max-h-[360px] bg-[#101010] rounded-xl border border-[#383126] p-4 sm:p-6 overflow-hidden">
            {/* Grid Lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, #383126 1px, transparent 1px), linear-gradient(to bottom, #383126 1px, transparent 1px)`,
                backgroundSize: '50px 40px',
              }}
            />

            <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--bg-card)" stopOpacity="0.0" />
                </linearGradient>

                <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gold-deep)" />
                  <stop offset="50%" stopColor="var(--gold-primary)" />
                  <stop offset="100%" stopColor="var(--gold-light)" />
                </linearGradient>
              </defs>

              {/* Area Under Curve */}
              <motion.path
                key={`area-${activeTab}`}
                d={currentChart.area}
                fill="url(#chartFillGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Champagne Gold Curve Line */}
              <motion.path
                key={`line-${activeTab}`}
                d={currentChart.path}
                fill="none"
                stroke="url(#chartLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />

              {/* Interactive Key Plot Points */}
              {currentChart.points.map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="var(--bg-card)"
                    stroke="var(--gold-primary)"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:r-7 transition-all"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    fill="var(--gold-primary)"
                    fontSize="11"
                    fontFamily="Cinzel, serif"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {pt.val}
                  </text>
                  <text
                    x={pt.x}
                    y={232}
                    fill="var(--text-muted)"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAnchor="middle"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Graph Narrative */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#383126]/60">
            <p className="text-xs text-[#B6B0A4] max-w-xl">
              {currentChart.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1C1A16] border border-[#383126] text-xs font-semibold text-[#D6B878] font-display">
              <Zap className="w-3.5 h-3.5" />
              <span>{currentChart.highlight}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <span className="text-[10px] text-[#B6B0A4]/60 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#D6B878]" />
              Fictional demonstration metrics modeled on historic cross-client median trajectory.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
