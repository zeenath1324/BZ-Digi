import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Globe2, 
  ArrowRight, 
  Sliders, 
  Zap, 
  FileCheck,
  Plus,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface RequiredFeature {
  id: string;
  title: string;
  category: 'Flagship Web & 3D' | 'Attribution & Ads' | 'Security & Global' | 'Governance & SLA';
  importance: 'CRITICAL ARCHITECTURE' | 'HIGH-IMPACT GROWTH' | 'ENTERPRISE PREREQUISITE';
  whyNeeded: string;
  commercialYield: string;
  technicalStandard: string;
  defaultSelected?: boolean;
}

export const REQUIRED_FEATURES: RequiredFeature[] = [
  {
    id: 'feat-3d-atelier',
    title: 'Procedural 3D WebGL & Three.js Studio',
    category: 'Flagship Web & 3D',
    importance: 'CRITICAL ARCHITECTURE',
    whyNeeded: 'Discerning luxury buyers require visceral tactile inspection before committing to high-ticket transactions. Traditional 2D flat photographs fail to convey weight, materiality, and craftsmanship.',
    commercialYield: '+310% dwell time on flagship pages & 2.4x higher conversion into private appointments.',
    technicalStandard: 'Sub-second asset compression, ACES filmic PBR materials, 60 FPS universal mobile runtime.',
    defaultSelected: true,
  },
  {
    id: 'feat-headless-jamstack',
    title: 'Sub-Second Headless Jamstack Architecture',
    category: 'Flagship Web & 3D',
    importance: 'CRITICAL ARCHITECTURE',
    whyNeeded: 'Affluent users abandon sites with visible latency. A 1-second delay in page load erodes high-ticket conversion by 26%. Monolithic legacy CMS platforms destroy brand equity with sluggish navigation.',
    commercialYield: 'Zero page reloads, 98+ Google Lighthouse performance scores, and instantaneous global edge delivery.',
    technicalStandard: 'React, TypeScript, Vite, Tailwind CSS, global edge caching (Cloudflare/AWS).',
    defaultSelected: true,
  },
  {
    id: 'feat-server-capi',
    title: 'Server-Side Conversions API (CAPI) & First-Party Data',
    category: 'Attribution & Ads',
    importance: 'CRITICAL ARCHITECTURE',
    whyNeeded: 'Browser privacy crackdowns (iOS tracking protection, third-party cookie phaseout) cause standard ad pixels to lose up to 45% of attribution signals. Guesswork in ad spend burns capital.',
    commercialYield: '100% deterministic attribution, 30% reduction in customer acquisition cost (CAC), and insulated ad algorithms.',
    technicalStandard: 'Direct server-to-server webhook pipelines to Meta CAPI, Google Enhanced Conversions, and LinkedIn API.',
    defaultSelected: true,
  },
  {
    id: 'feat-blended-mer',
    title: 'Blended Marketing Efficiency Ratio (MER) Modeling',
    category: 'Attribution & Ads',
    importance: 'HIGH-IMPACT GROWTH',
    whyNeeded: 'Siloed ad platform ROAS metrics are notoriously self-serving and misleading. Category leaders measure blended business cash flow and incremental contribution margin, not vanity click metrics.',
    commercialYield: 'Eliminates cannibalization across paid search and social, scaling net operating profit to 4.8x blended return.',
    technicalStandard: 'Automated 24/7 executive revenue dashboards synchronized with ERP/CRM data.',
    defaultSelected: true,
  },
  {
    id: 'feat-multilingual-rtl',
    title: 'Multilingual Localization & Native Arabic RTL Engine',
    category: 'Security & Global',
    importance: 'ENTERPRISE PREREQUISITE',
    whyNeeded: 'Over 40% of global luxury capital originates in Middle Eastern (GCC) and European private hubs. A purely monolingual storefront forfeits market dominance in Zurich, Paris, Dubai, and Riyadh.',
    commercialYield: 'Unlocks multi-market sovereign liquidity, localized currency pricing, and frictionless cross-border conversion.',
    technicalStandard: 'Bidirectional HTML layout (LTR/RTL), regional typography optimization, and automated locale persistence.',
    defaultSelected: true,
  },
  {
    id: 'feat-airgap-security',
    title: 'Sovereign Mutual NDA & Air-Gapped Code Repositories',
    category: 'Security & Global',
    importance: 'ENTERPRISE PREREQUISITE',
    whyNeeded: 'Proprietary brand assets, confidential customer databases, and upcoming product lines must never be exposed or shared across agency subcontractors. Leaks damage enterprise valuation.',
    commercialYield: 'Guaranteed 100% intellectual property ownership transfer, zero vendor lock-in, and institutional peace of mind.',
    technicalStandard: 'Private GitHub organizations, SOC2/GDPR compliance covenants, and mutual NDA execution.',
    defaultSelected: true,
  },
  {
    id: 'feat-partner-copilot',
    title: 'Direct Senior Partner & Technical Director Allocation',
    category: 'Governance & SLA',
    importance: 'CRITICAL ARCHITECTURE',
    whyNeeded: 'Traditional agencies pitch with senior executives and immediately hand accounts over to inexperienced junior coordinators. Luxury growth demands continuous senior strategic immersion.',
    commercialYield: 'Eliminates bureaucratic delays; strategic decisions are executed within sprint cycles rather than quarterly reviews.',
    technicalStandard: 'Strict maximum of 4 client accounts per Senior Partner; dedicated real-time Slack and Teams channel.',
    defaultSelected: true,
  },
  {
    id: 'feat-semantic-seo',
    title: 'Semantic AI Entity Search & Organic Dominance Infrastructure',
    category: 'Attribution & Ads',
    importance: 'HIGH-IMPACT GROWTH',
    whyNeeded: 'AI search engines (Perplexity, ChatGPT, Google AI Overviews) bypass conventional keyword-stuffed articles. Brands must be established as authoritative entities within global knowledge graphs.',
    commercialYield: 'Permanent organic search authority, 340% YoY organic ARR growth, and prominent AI search citations.',
    technicalStandard: 'JSON-LD schema microdata, entity relationship mapping, and high-authority institutional backlinks.',
    defaultSelected: false,
  },
];

interface RequiredFeaturesSectionProps {
  onOpenQuoteModal: () => void;
}

export const RequiredFeaturesSection: React.FC<RequiredFeaturesSectionProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    REQUIRED_FEATURES.filter((f) => f.defaultSelected).map((f) => f.id)
  );
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Flagship Web & 3D',
    'Attribution & Ads',
    'Security & Global',
    'Governance & SLA',
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length > 2) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const filteredFeatures = REQUIRED_FEATURES.filter(
    (f) => activeCategory === 'All' || f.category === activeCategory
  );

  const readinessPercentage = Math.round((selectedFeatures.length / REQUIRED_FEATURES.length) * 100);

  const getReadinessLevel = (pct: number) => {
    if (pct >= 85) return { label: 'Category Dominator (Elite Tier)', color: 'text-[#D6B878]' };
    if (pct >= 60) return { label: 'Category Leader (Strong Baseline)', color: 'text-[#F0DDAA]' };
    return { label: 'Essential Growth Stack', color: 'text-[#B6B0A4]' };
  };

  const readiness = getReadinessLevel(readinessPercentage);

  return (
    <section 
      id="required-features"
      aria-label="Features Needed for Luxury Digital Leadership"
      className="py-24 sm:py-32 bg-[var(--bg-secondary)] border-y border-[var(--border-gold)]/80 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,_var(--gold-glow)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)] font-display mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
            <span>ARCHITECTURAL CAPABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] tracking-tight leading-tight mb-6">
            What Features Are Needed For{' '}
            <span className="gold-gradient-text block sm:inline">
              Category Domination?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            Generic website templates fail because luxury buyers demand visceral craftsmanship and mathematical certainty. Discover the essential digital features required to lead your market in 2026.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 font-display cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] border-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-glow)] font-bold'
                    : 'bg-[var(--bg-card)] border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--gold-primary)]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {filteredFeatures.map((feat) => {
            const isSelected = selectedFeatures.includes(feat.id);

            return (
              <div
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={`group rounded-3xl p-6 sm:p-8 transition-all duration-300 border flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[var(--bg-card)] border-[var(--gold-primary)] shadow-[0_15px_40px_rgba(214,184,120,0.12)] -translate-y-0.5'
                    : 'bg-[var(--bg-card)]/70 border-[var(--border-gold)] hover:border-[var(--gold-primary)]/60'
                }`}
              >
                {/* Active Indicator Strip */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-light)] to-[var(--gold-primary)]" />
                )}

                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#1C1812] text-[var(--gold-primary)] border border-[#383126]">
                        {feat.importance}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {feat.category}
                      </span>
                    </div>

                    {/* Toggle Checkbox Button */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[var(--gold-primary)] text-[#080808] shadow-[0_0_12px_var(--gold-glow)]'
                        : 'bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-muted)]'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Feature Title */}
                  <h3 className={`text-xl sm:text-2xl font-serif-luxury font-bold mb-3 transition-colors ${
                    isSelected ? 'text-[var(--gold-light)]' : 'text-[var(--text-main)] group-hover:text-[var(--gold-light)]'
                  }`}>
                    {feat.title}
                  </h3>

                  {/* Why Needed Narrative */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold mb-1">
                        Why It Is Needed:
                      </div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {feat.whyNeeded}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)]/70">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold-light)] font-bold flex items-center gap-1.5 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                        Commercial Impact:
                      </div>
                      <p className="text-xs text-[var(--text-main)] font-medium">
                        {feat.commercialYield}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Standard Footer */}
                <div className="pt-4 border-t border-[var(--border-gold)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <Cpu className="w-3.5 h-3.5 text-[var(--gold-primary)] shrink-0" />
                    <span className="truncate">{feat.technicalStandard}</span>
                  </div>

                  <span className={`text-[10px] font-mono uppercase font-semibold shrink-0 ${
                    isSelected ? 'text-[var(--gold-primary)]' : 'text-[var(--text-muted)]'
                  }`}>
                    {isSelected ? 'Included in Spec' : '+ Add Feature'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope Summary Dock */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-gold)] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left rtl:lg:text-right relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--gold-primary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--gold-primary)]" />
              <span>Tailored Architecture Spec</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[var(--text-main)]">
              Your Growth Readiness: <span className={readiness.color}>{readiness.label}</span>
            </h4>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
              Selected <span className="font-bold text-[var(--gold-primary)]">{selectedFeatures.length} of {REQUIRED_FEATURES.length} essential features</span>. Estimated deployment timeline: 6 to 10 weeks across dedicated senior partner sprint cycles.
            </p>

            {/* Visual Progress Bar */}
            <div className="w-full max-w-md h-2 bg-[#201C14] rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] rounded-full transition-all duration-300"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-light)] to-[var(--gold-primary)] text-[#080808] hover:shadow-[0_0_25px_var(--gold-glow)] hover:brightness-105 active:scale-95 transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <span>Transfer Spec to Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#080808]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
