import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { ContactFAQ } from '../components/ContactFAQ';
import { OFFICE_LOCATIONS } from '../data/agencyData';
import { Mail, Phone, MapPin, Clock, Sparkles, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onOpenQuoteModal: () => void;
}

export const Contact: React.FC<ContactPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL DESKS & ENQUIRIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              Initiate a Strategic <br />
              <span className="gold-gradient-text">Dialogue.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed">
              We welcome confidential inquiries from executive boards, luxury founders, and high-growth leadership teams seeking exponential market share.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Main Information */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Global Desks */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#D6B878] font-semibold font-display mb-2">
                Executive Locations
              </div>
              <h2 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] mb-6">
                Our Physical Presence
              </h2>
            </div>

            <div className="space-y-6">
              {OFFICE_LOCATIONS.map((loc) => (
                <div
                  key={loc.city}
                  className="p-6 rounded-2xl bg-[#151515] border border-[#383126] hover:border-[#D6B878] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8]">
                      {loc.city} Desk
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-[#D6B878] bg-[#1C1A16] px-2.5 py-1 rounded-md border border-[#383126]">
                      {loc.hours}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#B6B0A4]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#D6B878] flex-shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D6B878] flex-shrink-0" />
                      <span className="text-[#F5F1E8]">{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#D6B878] flex-shrink-0" />
                      <span className="text-[#D6B878]">{loc.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Calculator Card */}
            <div className="p-8 rounded-2xl bg-[#1C1A16] border border-[#383126] text-center">
              <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-2">
                Need a rapid budget calculation?
              </h3>
              <p className="text-xs text-[#B6B0A4] mb-4">
                Use our interactive quote builder to select deliverables and estimate engagement costs in under 60 seconds.
              </p>
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] text-xs font-semibold uppercase tracking-wider font-display cursor-pointer"
              >
                Launch Instant Quote Builder
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#B6B0A4]/70 p-4 rounded-xl bg-[#101010] border border-[#383126]">
              <ShieldCheck className="w-4 h-4 text-[#D6B878] flex-shrink-0" />
              <span>All strategic discussions are protected under standard mutual non-disclosure covenants upon initial request.</span>
            </div>

          </div>

        </div>
      </section>

      {/* Luxury-Themed Animated FAQ Accordion for Client Inquiries */}
      <ContactFAQ onOpenQuoteModal={onOpenQuoteModal} />

    </div>
  );
};
