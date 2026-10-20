import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/agencyData';
import { Link } from 'react-router-dom';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[radial-gradient(circle,_rgba(214,184,120,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-3">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-4">
            Clarity Before <span className="gold-gradient-text">Commitment.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B6B0A4] leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our engagement models, delivery timelines, attribution standards, and partnership requirements.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#151515] border-[#D6B878] shadow-[0_10px_30px_rgba(214,184,120,0.08)]'
                    : 'bg-[#101010] border-[#383126] hover:border-[#D6B878]/50'
                }`}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="text-xs font-mono text-[#D6B878] font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-serif-luxury font-bold text-[#F5F1E8]">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#D6B878] text-[#080808] rotate-180'
                        : 'bg-[#1C1A16] border border-[#383126] text-[#D6B878]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-sm text-[#B6B0A4] leading-relaxed border-t border-[#383126]/40">
                        <div className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-[#1C1A16] text-[#D6B878] mb-3">
                          {item.category}
                        </div>
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#151515] border border-[#383126] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1A16] border border-[#383126] flex items-center justify-center text-[#D6B878]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif-luxury font-bold text-[#F5F1E8]">
                Have a specialized inquiry or RFP?
              </div>
              <div className="text-xs text-[#B6B0A4]">
                Our executive team typically responds within 4 business hours.
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F0DDAA] transition-colors"
          >
            <span>Speak with an Advisor</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D6B878]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
