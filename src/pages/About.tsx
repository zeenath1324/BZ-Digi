import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Shield, Eye, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClientMarquee } from '../components/ClientMarquee';
import { AwardsMarquee } from '../components/AwardsMarquee';

interface AboutProps {
  onOpenQuoteModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal }) => {
  const leadership = [
    {
      name: 'Alexander Sterling',
      role: 'Founder & Chief Executive Officer',
      bio: 'Former senior growth advisor for global luxury conglomerates. Built and scaled digital ecosystems generating over $500M in transaction volume.',
      initials: 'AS',
      focus: 'Brand Architecture & Capital Strategy'
    },
    {
      name: 'Julian Vance',
      role: 'Principal Creative Director',
      bio: 'Award-winning design lead trained in Milan and London. Specializes in haute editorial typography, spatial motion design, and brand identity systems.',
      initials: 'JV',
      focus: 'Cinema-Grade Visual Systems'
    },
    {
      name: 'Claire Kensington',
      role: 'Head of Growth & Performance',
      bio: 'Quantitative media buying director managing 8-figure omnichannel budgets across Meta, Google Ads, and private programmatic networks.',
      initials: 'CK',
      focus: 'Conversion Modeling & Attribution'
    },
    {
      name: 'Siddharth Mehta',
      role: 'Director of Technical Systems',
      bio: 'Software engineer and search intelligence authority. Specializes in headless React architectures, sub-second web performance, and generative AI search.',
      initials: 'SM',
      focus: 'Jamstack Engineering & Semantic SEO'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Atelier Founded in London', desc: 'BZ Digital established in Mayfair to serve boutique European luxury and private wealth clients.' },
    { year: '2020', title: 'Performance Media Engine Launched', desc: 'Pioneered server-side attribution algorithms to insulate clients from third-party cookie loss.' },
    { year: '2022', title: 'New York & Dubai Expansion', desc: 'Opened transatlantic and Middle Eastern desks to support international luxury retail flagships.' },
    { year: '2024', title: '$100M Client Revenue Benchmark', desc: 'Surpassed nine figures in verified direct client gross revenue influenced across all accounts.' },
    { year: '2026', title: 'Next-Gen Semantic & AI Lab', desc: 'Deployed proprietary AI search entity architecture to command emerging LLM citation indexes.' },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-[#383126]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BZ DIGITAL MANIFESTO</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              We Reject Mediocrity In Pursuit of{' '}
              <span className="gold-gradient-text">Absolute Distinction.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
              BZ Digital was founded on a singular observation: the modern web is drowning in generic corporate templates and uninspired performance ads. We exist to restore aesthetic reverence, technical precision, and mathematical accountability to digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Editorial Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 space-y-6 text-[#B6B0A4] leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-4">
              Where High Taste Meets Ruthless Mathematics.
            </h2>
            <p>
              In high-stakes markets, first impressions are irreversible. An affluent client, private equity investor, or discerning consumer will form a permanent assessment of your brand within 200 milliseconds of landing on your digital touchpoints.
            </p>
            <p>
              If that experience feels generic, clunky, or desperate, no amount of aggressive discounting will salvage your margins. True prestige commands pricing power.
            </p>
            <p>
              At BZ Digital, we fuse the bespoke craft of a Parisian atelier with the forensic data science of a quantitative hedge fund. Every line of code, typography choice, and ad bidding model is calibrated to elevate your brand’s perceived value while relentlessly driving qualified conversion volume.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
              <div className="flex items-center gap-3 text-[#D6B878] mb-3">
                <Target className="w-5 h-5" />
                <h3 className="font-serif-luxury font-bold text-lg text-[#F5F1E8]">Our Core Creed</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed">
                “Never sacrifice brand equity for cheap short-term clicks. Build assets of enduring enterprise value that your competitors cannot replicate.”
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
              <div className="flex items-center gap-3 text-[#D6B878] mb-3">
                <Shield className="w-5 h-5" />
                <h3 className="font-serif-luxury font-bold text-lg text-[#F5F1E8]">Our Standard of Truth</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed">
                “Zero vanity metrics. We do not celebrate social likes or superficial impressions. We celebrate incremental cash flow, elevated gross margins, and expanding market share.”
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-[#101010] border-y border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-2">
              EXECUTIVE LEADERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#F5F1E8]">
              Led by Practitioners, Not Account Managers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="group rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#1C1A16] border border-[#383126] group-hover:border-[#D6B878] flex items-center justify-center text-lg font-serif-luxury font-bold text-[#F0DDAA] mb-5 shadow-inner">
                    {leader.initials}
                  </div>
                  <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors mb-1">
                    {leader.name}
                  </h3>
                  <div className="text-xs text-[#D6B878] font-medium mb-3">
                    {leader.role}
                  </div>
                  <p className="text-xs text-[#B6B0A4] leading-relaxed mb-4">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#383126]/60 text-[10px] uppercase tracking-wider text-[#B6B0A4]">
                  Focus: <span className="text-[#F5F1E8]">{leader.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chronological Milestones Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-2">
            OUR GENESIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#F5F1E8]">
            Key Institutional Milestones.
          </h2>
        </div>

        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-colors flex flex-col sm:flex-row sm:items-center gap-6"
            >
              <div className="text-3xl sm:text-4xl font-serif-luxury font-extrabold text-[#D6B878] min-w-[120px]">
                {m.year}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-1">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By Client Marquee */}
      <ClientMarquee />

      {/* Awards & Recognition Marquee */}
      <AwardsMarquee onOpenQuoteModal={onOpenQuoteModal} />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Block */}
        <div className="mt-20 p-10 rounded-3xl bg-[#151515] border border-[#383126] text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-3">
            Ready to Partner With BZ Digital?
          </h3>
          <p className="text-xs sm:text-sm text-[#B6B0A4] mb-6">
            We accept a maximum of 4 new client engagements per quarter to maintain uncompromised senior partner immersion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display"
            >
              Request a Strategic Proposal
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#1C1A16] border border-[#383126] text-[#F5F1E8] hover:border-[#D6B878]"
            >
              Contact Global Offices
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
