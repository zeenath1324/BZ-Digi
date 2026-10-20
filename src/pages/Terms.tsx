import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B6B0A4] hover:text-[#D6B878] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
          <Scale className="w-4 h-4" />
          <span>LEGAL FRAMEWORK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#B6B0A4] mb-12">
          Effective Date: January 1, 2026 • Governing Law: England & Wales
        </p>

        <div className="space-y-8 text-sm text-[#B6B0A4] leading-relaxed">
          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              1. Engagement Architecture & Scope
            </h2>
            <p>
              All professional engagements executed by BZ Digital Agency Ltd are governed by mutually countersigned Master Services Agreements (MSAs) and specific Statements of Work (SOWs). No proposal or online form submission establishes an agency-client relationship until execution of definitive legal documentation.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              2. Intellectual Property Rights
            </h2>
            <p>
              Upon final settlement of engagement retainers, custom codebases, design system tokens, and approved media deliverables transition entirely into the client&rsquo;s intellectual property. BZ Digital retains proprietary ownership of our underlying internal tooling frameworks, attribution scripts, and development boilerplate.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              3. Performance & Demonstration Metrics
            </h2>
            <p>
              Case studies, metrics illustrations, and testimonial cards displayed on this website represent demonstration models and historical client benchmarks. While our systems are engineered for maximal commercial return, third-party advertising platform algorithms and consumer macroeconomic volatility preclude unconditional future revenue guarantees.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              4. Governing Jurisdiction
            </h2>
            <p>
              These terms are governed and construed in accordance with the substantive laws of England and Wales, with exclusive jurisdiction resting in the Commercial Courts of London.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
