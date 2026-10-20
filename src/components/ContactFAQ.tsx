import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Layers, 
  TrendingUp, 
  Users, 
  Globe2, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FAQItem {
  id: string;
  category: 'Retainers & Pricing' | 'NDAs & Security' | 'Velocity & Sprints' | 'Partnership & Team' | 'Attribution & 3D';
  question: string;
  answer: string;
  takeaways: string[];
  icon: React.FC<{ className?: string }>;
}

const CONTACT_FAQS: FAQItem[] = [
  {
    id: 'retainers-pricing',
    category: 'Retainers & Pricing',
    question: 'What are BZ Digital’s typical investment minimums and retainer structures?',
    answer: 'We provide clear, transparent engagement frameworks tailored to market complexity. Ongoing growth retainers (encompassing enterprise SEO, performance media, and creative design) typically start between $5,000 and $12,500 monthly. Bespoke digital flagships and interactive 3D WebGL experiences are delivered on fixed-milestone scopes starting at $15,000, with no hidden surcharges or surprise billing.',
    takeaways: ['$5K – $12.5K/mo Growth Retainers', 'Milestone-Based Fixed Fees', 'Zero Hidden Surcharges'],
    icon: TrendingUp
  },
  {
    id: 'ndas-security',
    category: 'NDAs & Security',
    question: 'How do you safeguard proprietary brand IP, trade secrets, and confidentiality?',
    answer: 'Confidentiality is sacrosanct in luxury and high-growth sectors. We routinely execute mutual, comprehensive Non-Disclosure Agreements prior to preliminary discovery calls. Furthermore, 100% of custom code, design tokens, 3D asset files, and first-party attribution data produced during our engagement become your exclusive property upon delivery.',
    takeaways: ['Mutual NDA Prior to Briefing', '100% Intellectual Property Transfer', 'Strict Air-Gapped Repositories'],
    icon: Lock
  },
  {
    id: 'velocity-sprints',
    category: 'Velocity & Sprints',
    question: 'What is your onboarding timeline from discovery call to active deployment?',
    answer: 'Upon contract execution, Sprint 01 begins within 5 business days. Technical infrastructure audits, tracking server setups, and creative styleguides are established during week 1. Performance campaigns go live by week 2, while full-scale headless web and 3D builds operate in rapid two-week agile sprints with weekly staging deploys.',
    takeaways: ['5-Day Sprint 01 Initiation', '2-Week Agile Cadence', 'Real-Time Staging Previews'],
    icon: Clock
  },
  {
    id: 'partnership-senior',
    category: 'Partnership & Team',
    question: 'Will our brand work directly with Senior Partners or junior account managers?',
    answer: 'We reject the traditional agency bait-and-switch. Every brand is directly led by a Principal Creative Director and a Senior Technical Strategist who actively architect and review every deliverable. We cap each senior partner at a maximum of four concurrent client engagements to maintain obsessive attention to detail.',
    takeaways: ['Direct Senior Partner Allocation', 'Maximum 4 Accounts per Lead', 'Private Executive Slack Access'],
    icon: Users
  },
  {
    id: 'internal-integration',
    category: 'Partnership & Team',
    question: 'Can BZ Digital integrate with our in-house marketing, design, and engineering teams?',
    answer: 'Yes. Over 65% of our client partnerships function as a hybrid co-pilot model alongside in-house CMOs, internal developers, and brand managers. We seamlessly connect into your existing Slack, Figma, GitHub, and Jira workflows, elevating internal capabilities rather than creating friction.',
    takeaways: ['Embedded Co-Pilot Architecture', 'Figma & GitHub Synchronization', 'Seamless Workflow Extension'],
    icon: Layers
  },
  {
    id: 'attribution-verification',
    category: 'Attribution & 3D',
    question: 'How do you measure and verify multi-channel revenue attribution?',
    answer: 'We refuse to rely on self-reported platform metrics. We implement server-side Conversions API (CAPI), first-party server cookies, and mathematical Blended Marketing Efficiency Ratios (MER). Every client receives a custom 24/7 executive analytics dashboard showing precise revenue generation down to the exact dollar.',
    takeaways: ['Server-Side Conversions API', 'Blended MER & Net Margin Focus', '24/7 Live Executive Portal'],
    icon: ShieldCheck
  },
  {
    id: '3d-webgl-hosting',
    category: 'Attribution & 3D',
    question: 'Do interactive Three.js 3D Atelier experiences require specialized hosting?',
    answer: 'No specialized infrastructure or expensive GPU servers are necessary. Our procedural 3D models and shader pipelines are mathematically compiled into ultra-compact WebGL bundles that deploy onto modern standard CDNs (Cloudflare, Vercel, AWS). They load in sub-second times across mobile and desktop devices alike.',
    takeaways: ['Zero Proprietary Server Overhead', 'Sub-Second WebGL Asset Loading', 'Universal 60 FPS Mobile Support'],
    icon: Sparkles
  },
  {
    id: 'global-desks-timezone',
    category: 'Velocity & Sprints',
    question: 'How do you coordinate operations across different international time zones?',
    answer: 'With primary offices in London Mayfair and New York Park Avenue, plus partner availability in Zurich and Dubai, we maintain continuous cross-continental coverage. Your dedicated strategic team guarantees a maximum 4-hour response SLA during your active business day.',
    takeaways: ['London & New York Executive Desks', 'Guaranteed 4-Hour Response SLA', 'Multi-Currency Transacting'],
    icon: Globe2
  }
];

interface ContactFAQProps {
  onOpenQuoteModal: () => void;
}

export const ContactFAQ: React.FC<ContactFAQProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Retainers & Pricing',
    'NDAs & Security',
    'Velocity & Sprints',
    'Partnership & Team',
    'Attribution & 3D',
  ];

  const filteredFaqs = useMemo(() => {
    return CONTACT_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.takeaways.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="contact-faq" 
      aria-label="Frequently Asked Questions & Due Diligence" 
      className="py-24 sm:py-32 bg-[var(--bg-main)] border-t border-[var(--border-gold)]/80 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Architectural Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,_var(--gold-glow)_0%,_transparent_75%)] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)] font-display mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
            <span>CLIENT DUE DILIGENCE & INQUIRIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[var(--text-main)] tracking-tight leading-[1.18] mb-6">
            Clarity Before Commitment.{' '}
            <span className="gold-gradient-text block sm:inline">
              Terms & Methodology.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            Essential intelligence on our engagement thresholds, non-disclosure protocols, senior partner allocation, and deployment velocity.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Live Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--gold-primary)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search common questions (e.g., NDA, retainers, sprints, attribution)..."
              className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-gold)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 font-display cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] border-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-glow)] font-bold'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--gold-primary)]/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Count Summary */}
          <div className="text-center text-xs text-[var(--text-muted)]">
            Showing <span className="font-semibold text-[var(--gold-primary)]">{filteredFaqs.length}</span> of {CONTACT_FAQS.length} inquiries
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[var(--bg-card)] border border-[var(--border-gold)] space-y-3">
              <HelpCircle className="w-8 h-8 text-[var(--gold-primary)] mx-auto opacity-70" />
              <div className="text-base font-serif-luxury font-bold text-[var(--text-main)]">
                No matching inquiries found
              </div>
              <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                No questions matched your search criteria. Please adjust your keywords or submit a direct inquiry below.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-xs font-semibold text-[var(--gold-primary)] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const IconComp = faq.icon;

              return (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`group rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isOpen
                      ? 'bg-[var(--bg-card)] border-[var(--gold-primary)] shadow-[0_10px_35px_rgba(214,184,120,0.12)]'
                      : 'bg-[var(--bg-card)]/80 border-[var(--border-gold)] hover:border-[var(--gold-primary)]/60'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-5 sm:py-6 px-6 sm:px-8 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 pr-2">
                      {/* Numeric Index Badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-colors ${
                        isOpen 
                          ? 'bg-[var(--gold-primary)] text-[#080808]' 
                          : 'bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--gold-primary)]'
                      }`}>
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </div>

                      {/* Icon & Question text */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)] px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-gold)]/80 inline-block">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-serif-luxury font-bold transition-colors ${
                          isOpen ? 'text-[var(--gold-light)]' : 'text-[var(--text-main)] group-hover:text-[var(--gold-light)]'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Circular Chevron Expander */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] rotate-180 shadow-[0_0_12px_var(--gold-glow)]'
                          : 'bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--gold-primary)] group-hover:border-[var(--gold-primary)]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Answer Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-2 border-t border-[var(--border-gold)]/70">
                          {/* Answer Narrative */}
                          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-5">
                            {faq.answer}
                          </p>

                          {/* Executive Takeaway Badges */}
                          <div className="pt-3 border-t border-[var(--border-gold)]/40 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--gold-primary)] font-semibold flex items-center gap-1.5 mr-1">
                              <Sparkles className="w-3 h-3 text-[var(--gold-primary)]" />
                              Key Terms:
                            </span>
                            {faq.takeaways.map((pill, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-main)] flex items-center gap-1.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                                {pill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom Executive Concierge CTA */}
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-gold)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] pointer-events-none" />

          <div className="space-y-2 text-center md:text-left rtl:md:text-right relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--gold-primary)] uppercase tracking-wider font-display">
              <ShieldCheck className="w-4 h-4 text-[var(--gold-primary)]" />
              <span>CUSTOM COMMERCIAL REQUIREMENTS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[var(--text-main)]">
              Have an enterprise RFP or proprietary inquiry?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg">
              Our Senior Growth Directors review tenders and confidential specifications under mutual NDA with guaranteed 4-hour SLA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] hover:shadow-[0_0_20px_var(--gold-glow)] transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <span>Instant Quote Builder</span>
              <ArrowRight className="w-4 h-4 text-[#080808]" />
            </button>

            <a
              href="mailto:inquiries@bzdigital.agency?subject=Confidential%20Executive%20Inquiry"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[var(--bg-elevated)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--text-main)] hover:text-[var(--gold-primary)] transition-all font-display flex items-center justify-center gap-2"
            >
              <span>Direct Executive Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
