import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
          <Shield className="w-4 h-4" />
          <span>LEGAL COMPLIANCE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#B6B0A4] mb-12">
          Effective Date: January 1, 2026 • Last Reviewed: October 2026
        </p>

        <div className="space-y-8 text-sm text-[#B6B0A4] leading-relaxed">
          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              1. Institutional Commitment to Confidentiality
            </h2>
            <p>
              BZ Digital Agency Ltd (&ldquo;BZ Digital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) treats the confidentiality and privacy of its clients, prospective partners, and site visitors with the highest degree of discretion. This policy outlines how we gather, utilize, and safeguard data in accordance with the UK Data Protection Act, EU GDPR, and California Consumer Privacy Act (CCPA).
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We exclusively collect corporate contact and project parameters voluntarily submitted through our strategic audit and quotation forms, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Executive Name and Corporate Email Address</li>
              <li>Company Entity and Operational Jurisdiction</li>
              <li>Telephone and WhatsApp Communication Identifiers</li>
              <li>Commercial Budget Allocations and Marketing Scope Parameters</li>
            </ul>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              3. Telemetry & Analytics
            </h2>
            <p>
              We do not sell, rent, or trade your corporate information to third-party data brokers under any circumstances. Analytics telemetry is utilized strictly to benchmark website load latencies and conversion friction points.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-[#151515] border border-[#383126]">
            <h2 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-3">
              4. Data Subject Rights & Contact
            </h2>
            <p>
              To request a copy of your stored records, exercise your right to erasure, or initiate a formal non-disclosure agreement before submitting commercial blueprints, contact our Data Protection Officer at:
            </p>
            <div className="mt-3 text-[#F0DDAA] font-mono text-xs">
              dpo@bzdigital.agency • 14 Berkeley Square, Mayfair, London W1J 6BQ
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
