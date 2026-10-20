import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Search, 
  Layers, 
  ShieldCheck, 
  Palette, 
  Check, 
  X, 
  ArrowRight, 
  Compass, 
  Lock, 
  Zap, 
  BarChart3, 
  Clock, 
  Code2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FeaturePillar {
  id: string;
  name: string;
  badge: string;
  icon: React.FC<{ className?: string }>;
  tagline: string;
  description: string;
  coreCapabilities: Array<{
    title: string;
    spec: string;
    detail: string;
  }>;
  deliverables: string[];
  roiMetric: string;
}

const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'webgl-headless',
    name: 'Headless Web & 3D WebGL',
    badge: 'DIGITAL CRAFTSMANSHIP',
    icon: Cpu,
    tagline: 'Cinema-Grade Frontend Architecture & Spatial 3D WebGL',
    description: 'We construct ultra-resilient, sub-second headless web applications designed to captivate affluent buyers through cinema-grade micro-interactions, procedural Three.js 3D ateliers, and mathematically sound typographic composition.',
    coreCapabilities: [
      {
        title: 'Sub-Second Edge Delivery',
        spec: '< 350ms Global TTFB',
        detail: 'Compiled with React, Vite, and distributed across global edge CDNs for instantaneous page transitions.'
      },
      {
        title: 'Interactive 3D Three.js Studio',
        spec: '60 FPS Universal WebGL',
        detail: 'Procedural CAD/mesh rendering, ACES filmic PBR materials, and exploded kinematics with zero GPU lag.'
      },
      {
        title: 'Core Web Vitals Supremacy',
        spec: '95+ Lighthouse Score',
        detail: 'Perfect scores in accessibility, semantic markup, performance, and best practices across all viewports.'
      },
      {
        title: '100% IP Transfer & Air-Gapped Code',
        spec: 'Zero Vendor Lock-in',
        detail: 'You own every line of proprietary code, custom shaders, and design tokens upon project delivery.'
      }
    ],
    deliverables: [
      'Custom React + TypeScript Codebase',
      'Interactive Three.js 3D Atelier Module',
      'Sub-Second Edge CDN Deployment',
      'Full Responsive UI/UX Design System'
    ],
    roiMetric: '+300% Engagement Duration'
  },
  {
    id: 'algorithmic-media',
    name: 'Omnichannel Acquisition',
    badge: 'HIGH-TICKET MEDIA',
    icon: TrendingUp,
    tagline: 'Algorithmic Media Buying & Server-Side Conversions API',
    description: 'Eliminate reliance on flawed platform reporting. We engineer server-side conversion pipelines and high-ticket programmatic bidding strategies that target verified institutional decision-makers and high-net-worth buyers.',
    coreCapabilities: [
      {
        title: 'Server-Side Conversions API (CAPI)',
        spec: '0% Third-Party Cookie Reliance',
        detail: 'Server-to-server event tracking that bypasses ad blockers and iOS privacy restrictions with 100% fidelity.'
      },
      {
        title: 'Blended MER & Net Margin Scaling',
        spec: 'Mathematical Commercial Models',
        detail: 'We optimize exclusively for cash-in-bank profit and enterprise enterprise valuation, never vanity ROAS.'
      },
      {
        title: 'High-Ticket Audience Orchestration',
        spec: 'Minimum $50K Deal Size Target',
        detail: 'Algorithmic targeting across Meta, Google PMax, LinkedIn Executive InMail, and private programmatic exchanges.'
      },
      {
        title: 'Rapid Creative Refresh Cadence',
        spec: 'Bi-Weekly High-Yield Assets',
        detail: 'Continuous production of cinema-grade motion typography and high-converting editorial video ads.'
      }
    ],
    deliverables: [
      'Server-Side CAPI Infrastructure',
      'Omnichannel Campaign Architecture',
      'Real-Time Blended MER Dashboard',
      'Bi-Weekly Creative Asset Production'
    ],
    roiMetric: '4.8x Verified Blended ROAS'
  },
  {
    id: 'semantic-search',
    name: 'Semantic AI & LLM Search',
    badge: 'ORGANIC DOMINANCE',
    icon: Search,
    tagline: 'Automated Entity Graphs & Generative AI Citation Capture',
    description: 'Traditional keyword stuffing is dead. We architect semantic entity graphs and authoritative digital assets that position your brand as the canonical, cited authority across Google, Perplexity, OpenAI, and Gemini.',
    coreCapabilities: [
      {
        title: 'Generative AI Citation Indexing',
        spec: 'LLM Knowledge Graph Capture',
        detail: 'Engineering authoritative entities so ChatGPT, Perplexity, and Google Gemini cite your brand first.'
      },
      {
        title: 'Programmatic Schema.org JSON-LD',
        spec: 'Rich Snippet Supremacy',
        detail: 'Deep semantic markup ensuring immediate knowledge panel claims and zero-click answer dominance.'
      },
      {
        title: 'Digital PR & High-Authority Placements',
        spec: 'DA 80+ Luxury Publications',
        detail: 'Editorial features in top-tier business, luxury, and technology journals that pass enduring domain authority.'
      },
      {
        title: 'Forensic Technical Crawl Audits',
        spec: 'Sub-Millisecond Indexation',
        detail: 'Complete eradication of crawl budget waste, canonical conflicts, and JavaScript rendering bottlenecks.'
      }
    ],
    deliverables: [
      'Comprehensive Entity Graph Schema',
      'LLM Answer Engine Optimization (AEO)',
      'High-Authority Digital PR Placements',
      'Continuous Semantic Content Architecture'
    ],
    roiMetric: '+340% Organic Enterprise ARR'
  },
  {
    id: 'conversion-cro',
    name: 'High-Ticket Neuromarketing',
    badge: 'CONVERSION PSYCHOLOGY',
    icon: Compass,
    tagline: 'Frictionless High-Value Checkout & Micro-Interaction Design',
    description: 'Affluent and enterprise clients evaluate value in milliseconds. We deploy cognitive psychological frameworks, neoclassical layout composition, and VIP concierge qualification pathways that eliminate decision friction.',
    coreCapabilities: [
      {
        title: 'Affluent Micro-Interaction Psychology',
        spec: 'Restrained Kinetic Motion',
        detail: 'Transitions engineered with inertia and tactile weight that subconsciously reinforce premium brand value.'
      },
      {
        title: 'Bespoke Typographic Hierarchy',
        spec: 'Mathematical Golden Ratio',
        detail: 'Editorial serif headlines paired with ultra-clean modern grotesques to evoke architectural authority.'
      },
      {
        title: 'VIP Concierge Funnels',
        spec: 'Instant Qualification Pathways',
        detail: 'Dynamic multi-step quote and booking engines that filter tire-kickers and fast-track high-value clients.'
      },
      {
        title: 'Continuous Multivariate Testing',
        spec: '99.5% Statistical Significance',
        detail: 'Rigorous A/B experimentation across headlines, value propositions, and checkout steps to scale margins.'
      }
    ],
    deliverables: [
      'Concierge Multi-Step Booking Funnel',
      'Bespoke Micro-Interaction Guidelines',
      'Multivariate A/B Testing Roadmaps',
      'Heatmap & Cognitive Behavior Audits'
    ],
    roiMetric: '+42% High-Ticket Conversion'
  },
  {
    id: 'attribution-telemetry',
    name: '24/7 Client Telemetry',
    badge: 'INSTITUTIONAL TRUST',
    icon: ShieldCheck,
    tagline: 'Tamper-Proof Live Dashboards & Direct Partner Access',
    description: 'We believe transparency is the ultimate luxury. Clients receive private 24/7 executive portals displaying hour-by-hour revenue attribution, direct Senior Partner access, and contractual mutual NDAs.',
    coreCapabilities: [
      {
        title: 'Live 24/7 Executive Portal',
        spec: 'Hour-by-Hour Commercial Data',
        detail: 'Tamper-proof dashboards synthesizing Shopify, Stripe, CRM, and ad network telemetry into one single source of truth.'
      },
      {
        title: 'Direct Senior Partner Access',
        spec: 'Max 4 Clients per Director',
        detail: 'No hand-offs to inexperienced account managers. You work directly with agency principals and tech leads.'
      },
      {
        title: 'Private Slack / Teams Channel',
        spec: 'Guaranteed 4-Hour SLA',
        detail: 'Direct real-time communication with the developers and strategists building your growth engine.'
      },
      {
        title: 'Mutual Non-Disclosure Covenants',
        spec: 'SOC2 & GDPR Compliant',
        detail: 'Strict air-gapped repositories and confidentiality protocols protecting your commercial IP.'
      }
    ],
    deliverables: [
      'Custom 24/7 Executive Dashboard',
      'Bi-Weekly Strategic Sprint Calls',
      'Dedicated Executive Slack Workspace',
      'Quarterly Board Performance Reviews'
    ],
    roiMetric: '98.4% Client Retention'
  },
  {
    id: 'brand-craftsmanship',
    name: 'Brand Identity & Video',
    badge: 'AESTHETIC REVERENCE',
    icon: Palette,
    tagline: 'Architectural Monograms, Cinema Video & Brand Systems',
    description: 'True prestige demands a visual identity that commands reverence without shouting. We craft custom gold monogram emblems, editorial art direction, 4K cinematic showreel assets, and comprehensive design systems.',
    coreCapabilities: [
      {
        title: 'Architectural Monogram Systems',
        spec: 'Sacred Geometric Proportions',
        detail: 'Vector-perfect monogram badges with dual gold borders, chamfered corner stars, and serif letterforms.'
      },
      {
        title: '4K Cinema Video Showreels',
        spec: 'ACES Filmic Color Grading',
        detail: 'Cinema-grade motion assets, animated brand openers, and product reels designed for high-resolution displays.'
      },
      {
        title: 'Comprehensive Brand Monograph',
        spec: 'Complete Design System Tokens',
        detail: 'Color palettes, typographic pairing rules, motion curves, and digital asset libraries tailored for scale.'
      },
      {
        title: 'Sonic & Auditory Signatures',
        spec: 'Web Audio API Synthesizers',
        detail: 'Tactile soundscapes and mechanical horlogerie audio cues synthesized purely in browser code.'
      }
    ],
    deliverables: [
      'Complete Master Monogram Vector Suite',
      '4K Cinematic Brand Video Assets',
      'Comprehensive Brand Identity Guidelines',
      'Digital Design Tokens & Component Library'
    ],
    roiMetric: 'Uncompromised Pricing Power'
  }
];

interface AgencyFeaturesSectionProps {
  onOpenQuoteModal: () => void;
}

export const AgencyFeaturesSection: React.FC<AgencyFeaturesSectionProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const [selectedPillarId, setSelectedPillarId] = useState<string>('webgl-headless');
  const [activeTab, setActiveTab] = useState<'capabilities' | 'comparison' | 'included'>('capabilities');

  const selectedPillar = FEATURE_PILLARS.find((p) => p.id === selectedPillarId) || FEATURE_PILLARS[0];
  const IconComponent = selectedPillar.icon;

  const comparisonItems = [
    {
      feature: 'Frontend Architecture',
      typical: 'Off-the-shelf WordPress / Shopify theme with 40+ plugins',
      bzDigital: 'Sub-second headless React/Vite architecture with custom Three.js WebGL',
      advantage: '4x Faster Page Loads'
    },
    {
      feature: 'Tracking & Attribution',
      typical: 'Client-side Google Analytics & self-reported ad network ROAS',
      bzDigital: 'Server-side CAPI, first-party cookie architecture & Blended MER modeling',
      advantage: 'Tamper-Proof Revenue Truth'
    },
    {
      feature: 'Search Strategy',
      typical: 'Basic meta tags, keyword density stuffing & generic blog posts',
      bzDigital: 'Automated entity graph schemas, LLM citation capture & technical audits',
      advantage: 'AI Answer Engine Dominance'
    },
    {
      feature: 'Team Allocation',
      typical: 'Sold by agency founder, handed off to junior coordinators (15+ accounts)',
      bzDigital: 'Senior Partner and Technical Director direct immersion (max 4 accounts)',
      advantage: 'Artisanal Executive Attention'
    },
    {
      feature: 'Intellectual Property',
      typical: 'Proprietary platform lock-in; agency retains custom code/assets',
      bzDigital: '100% intellectual property transfer upon delivery; zero vendor lock-in',
      advantage: 'Full Corporate Ownership'
    },
    {
      feature: 'Visual Identity',
      typical: 'Generic stock photos and template hero graphics',
      bzDigital: 'Cinema-grade 4K animated video showreels and bespoke gold monograms',
      advantage: 'Category Prestige & Authority'
    }
  ];

  const standardInclusions = [
    'Sub-Second Headless React Architecture',
    'Full Three.js Procedural 3D Atelier Integration',
    'Server-Side Meta & Google Conversions API (CAPI)',
    'Automated Schema.org Entity Graph Architecture',
    'Custom 24/7 Executive Telemetry Dashboard',
    'Direct Senior Partner Strategic Oversight',
    'Private Executive Slack / Teams Integration',
    '100% Intellectual Property & Code Ownership Transfer',
    'Mutual Comprehensive Non-Disclosure Covenant',
    'Guaranteed 4-Hour Response SLA',
    'ACES Filmic PBR 3D Shaders & Cinema Video Reels',
    'Bi-Weekly Strategic Sprint Reviews'
  ];

  return (
    <section 
      id="agency-features" 
      aria-label="Features & Capabilities Architecture" 
      className="py-24 sm:py-32 bg-[var(--bg-secondary)] border-y border-[var(--border-gold)]/80 relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Lighting Atmospheric Layer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-[radial-gradient(ellipse,_var(--gold-glow)_0%,_transparent_75%)] pointer-events-none opacity-80" />
      <div className="absolute -top-40 right-10 w-80 h-80 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)] font-display mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
            <span>ENTERPRISE ARCHITECTURE & CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] tracking-tight leading-[1.18] mb-6">
            Features Needed for <br />
            <span className="gold-gradient-text">Category Domination.</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            What serious brands require in 2026 to command pricing power: cinema-grade web engineering, procedural 3D, server-side attribution, and algorithmic media execution.
          </p>

          {/* Master View Mode Switcher */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('capabilities')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeTab === 'capabilities'
                  ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-bold shadow-[0_0_15px_var(--gold-glow)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              6 Core Disciplines
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-bold shadow-[0_0_15px_var(--gold-glow)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Enterprise Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('included')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeTab === 'included'
                  ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-bold shadow-[0_0_15px_var(--gold-glow)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Engagement Inclusions
            </button>
          </div>
        </div>

        {/* View 1: 6 Core Discipline Pillars & Detailed Capabilities */}
        {activeTab === 'capabilities' && (
          <div className="space-y-10">
            {/* Horizontal Pillar Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {FEATURE_PILLARS.map((pillar) => {
                const isSelected = selectedPillarId === pillar.id;
                const PillIcon = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--bg-card)] border-[var(--gold-primary)] shadow-[0_10px_25px_rgba(214,184,120,0.18)] scale-[1.02]'
                        : 'bg-[var(--bg-card)]/60 border-[var(--border-gold)] hover:border-[var(--gold-primary)]/50'
                    }`}
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                        isSelected 
                          ? 'bg-[var(--gold-primary)] text-[#080808]' 
                          : 'bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--gold-primary)]'
                      }`}>
                        <PillIcon className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)] font-bold mb-1">
                        {pillar.badge}
                      </div>
                      <div className="text-xs font-serif-luxury font-bold text-[var(--text-main)] leading-snug">
                        {pillar.name}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--border-gold)]/50 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                      <span>ROI</span>
                      <span className="text-[var(--gold-primary)] font-semibold">{pillar.roiMetric.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Feature Showcase Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-gold)] shadow-2xl relative overflow-hidden"
              >
                {/* Background glow accent */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  
                  {/* Left Column: Pillar Manifesto & Deliverables */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs font-mono font-semibold text-[var(--gold-primary)]">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{selectedPillar.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[var(--text-main)] leading-tight">
                      {selectedPillar.tagline}
                    </h3>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                      {selectedPillar.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-[var(--border-gold)]/60">
                      <div className="text-xs uppercase font-mono tracking-wider text-[var(--gold-primary)] font-semibold">
                        Key Deliverables:
                      </div>
                      {selectedPillar.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs text-[var(--text-main)]">
                          <div className="w-4 h-4 rounded-full bg-[var(--gold-primary)]/20 border border-[var(--gold-primary)] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-[var(--gold-primary)]" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Highlight Box */}
                    <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)]">Verified Benchmark</div>
                        <div className="text-base font-serif-luxury font-bold text-[var(--gold-primary)]">{selectedPillar.roiMetric}</div>
                      </div>
                      <button
                        type="button"
                        onClick={onOpenQuoteModal}
                        className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-display flex items-center gap-1.5 cursor-pointer font-bold"
                      >
                        <span>Commission Practice</span>
                        <ArrowRight className="w-3 h-3 text-[#080808]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 4 Deep Specifications Grid */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPillar.coreCapabilities.map((cap, capIdx) => (
                      <div
                        key={capIdx}
                        className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-gold)]">
                              Spec 0{capIdx + 1}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[var(--text-main)]">
                              {cap.spec}
                            </span>
                          </div>
                          <h4 className="text-base font-serif-luxury font-bold text-[var(--text-main)] group-hover:text-[var(--gold-light)] transition-colors mb-2">
                            {cap.title}
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                            {cap.detail}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[var(--border-gold)]/40 flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
                          <span>Verified Production Spec</span>
                          <Sparkles className="w-3 h-3 text-[var(--gold-primary)] opacity-60 group-hover:opacity-100" />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* View 2: Conventional Agency vs. BZ Digital Enterprise Architecture */}
        {activeTab === 'comparison' && (
          <div className="rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-gold)] overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8 border-b border-[var(--border-gold)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[var(--text-main)]">
                  The Enterprise Architectural Difference
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  How BZ Digital replaces conventional vendor bloat with cinema-grade performance and mathematical accountability.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-display font-bold shrink-0 cursor-pointer"
              >
                Request Architectural Audit
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] border-b border-[var(--border-gold)] text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                    <th className="py-4 px-6 w-1/4">Digital Domain</th>
                    <th className="py-4 px-6 w-1/3 text-[var(--text-muted)]">Conventional Digital Agency</th>
                    <th className="py-4 px-6 w-1/3 text-[var(--gold-light)] bg-[var(--gold-primary)]/5 font-bold">BZ Digital Enterprise Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-gold)]/60 text-[var(--text-muted)]">
                  {comparisonItems.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-[var(--text-main)] font-display">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                          <span>{row.feature}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[var(--text-muted)]">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{row.typical}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 bg-[var(--gold-primary)]/5 text-[var(--text-main)] font-medium">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[var(--gold-primary)] shrink-0 mt-0.5" />
                          <div>
                            <div>{row.bzDigital}</div>
                            <span className="inline-block mt-1 text-[10px] font-mono text-[var(--gold-primary)] uppercase bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-gold)]">
                              ★ {row.advantage}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 3: Complete Standard Engagement Inclusions Checklist */}
        {activeTab === 'included' && (
          <div className="rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-gold)] p-8 sm:p-12 shadow-2xl">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs font-mono font-semibold text-[var(--gold-primary)] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CONTRACTUAL INCLUSIONS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[var(--text-main)]">
                The Non-Negotiable Standard in Every BZ Engagement
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                We believe core enterprise infrastructure should not be an upsell. Every client engagement includes full IP transfer, server-side attribution, 3D WebGL capabilities, and direct Senior Partner access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {standardInclusions.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-start gap-3 hover:border-[var(--gold-primary)] transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-bold">
                    <Check className="w-3 h-3 text-[#080808]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--text-main)] leading-snug block">
                      {item}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--gold-primary)] uppercase tracking-wider">
                      Standard Inclusion
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-gold)]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <Lock className="w-4 h-4 text-[var(--gold-primary)]" />
                <span>Protected under mutual NDA prior to discovery consultation</span>
              </div>

              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] font-display font-bold cursor-pointer"
              >
                Incorporate Features into Proposal
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
