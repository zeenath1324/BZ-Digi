import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';

export const ProcessTimeline: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" ref={ref} className="py-24 sm:py-32 bg-[#101010] relative overflow-hidden">
      {/* Golden subtle ambient light */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(214,184,120,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-3">
            METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-4">
            Our Four-Step <span className="gold-gradient-text">Growth Engine.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B6B0A4] leading-relaxed">
            A battle-tested scientific progression that transforms volatile market conditions into predictable, compounding digital returns.
          </p>
        </div>

        {/* Desktop Connected Progress Timeline */}
        <div className="relative mb-16 hidden lg:block">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-1 bg-[#383126] z-0" />
          
          {/* Animated Champagne Gold Progress Line */}
          <motion.div
            className="absolute top-1/2 left-12 -translate-y-1/2 h-1 bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] z-0 shadow-[0_0_12px_rgba(214,184,120,0.5)]"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 90}%` } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/* 4 Interactive Timeline Nodes */}
          <div className="relative z-10 grid grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  {/* Step Bubble Indicator */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-serif-luxury font-bold text-lg transition-all duration-300 shadow-xl mb-4 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#F0DDAA] to-[#D6B878] text-[#080808] scale-110 shadow-[0_0_25px_rgba(214,184,120,0.5)] ring-4 ring-[#1C1A16]'
                        : isPassed
                        ? 'bg-[#1C1A16] border-2 border-[#D6B878] text-[#F0DDAA]'
                        : 'bg-[#151515] border border-[#383126] text-[#B6B0A4] group-hover:border-[#D6B878]/60'
                    }`}
                  >
                    {step.number}
                  </div>

                  <span className={`text-base font-serif-luxury font-bold transition-colors ${
                    isSelected ? 'text-[#F0DDAA]' : 'text-[#F5F1E8] group-hover:text-[#D6B878]'
                  }`}>
                    {step.title}
                  </span>
                  <span className="text-[11px] text-[#B6B0A4] mt-1 max-w-[160px] line-clamp-1">
                    {step.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Expanded Highlight Box */}
        <div className="rounded-2xl bg-[#151515] border border-[#383126] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(214,184,120,0.08)_0%,_transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-md bg-[#1C1A16] border border-[#383126] text-xs font-serif-luxury font-bold text-[#D6B878]">
                  STEP {PROCESS_STEPS[activeStep].number} OF 04
                </span>
                <span className="text-xs uppercase tracking-wider text-[#B6B0A4] font-display flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />
                  {PROCESS_STEPS[activeStep].tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-4">
                {PROCESS_STEPS[activeStep].title} — {PROCESS_STEPS[activeStep].highlight}
              </h3>

              <p className="text-sm sm:text-base text-[#B6B0A4] leading-relaxed mb-8">
                {PROCESS_STEPS[activeStep].description}
              </p>

              {/* Mobile Step Selector buttons */}
              <div className="flex lg:hidden items-center gap-2 mb-6">
                {PROCESS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      activeStep === i
                        ? 'bg-[#D6B878] text-[#080808]'
                        : 'bg-[#1C1A16] text-[#B6B0A4] border border-[#383126]'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Deliverables Column */}
            <div className="lg:col-span-5 bg-[#1C1A16] border border-[#383126] rounded-xl p-6 sm:p-8">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#D6B878] font-display mb-4">
                Key Milestone Deliverables
              </div>
              <ul className="space-y-3.5">
                {PROCESS_STEPS[activeStep].deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F1E8]">
                    <div className="w-5 h-5 rounded-full bg-[#151515] border border-[#D6B878] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#D6B878]">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
