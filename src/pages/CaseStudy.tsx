import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CASE_STUDIES_DATA } from '../data/agencyData';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  ShieldCheck, 
  Calendar, 
  Building,
  Target
} from 'lucide-react';

interface CaseStudyProps {
  onOpenQuoteModal: () => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ onOpenQuoteModal }) => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();

  const project = CASE_STUDIES_DATA.find((p) => p.id === caseStudyId);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B6B0A4] hover:text-[#D6B878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies Archive</span>
        </Link>
      </div>

      {/* Case Header */}
      <section className="py-12 sm:py-20 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#151515] text-[#D6B878] border border-[#383126]">
                {project.category}
              </span>
              <span className="text-xs text-[#B6B0A4] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D6B878]" />
                Completed {project.year}
              </span>
              <span className="text-xs text-[#B6B0A4] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#D6B878]" />
                {project.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#F0DDAA] font-light leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Results Bar */}
      <section className="py-12 bg-[#101010] border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((res, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#151515] border border-[#383126]">
                <div className="text-3xl sm:text-4xl font-serif-luxury font-extrabold text-[#D6B878] mb-1">
                  {res.value}
                </div>
                <div className="text-xs font-semibold text-[#F5F1E8] mb-1">
                  {res.label}
                </div>
                <div className="text-[10px] text-[#B6B0A4] uppercase tracking-wider">
                  {res.change}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-[10px] text-[#B6B0A4]/70 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#D6B878]" />
              Fictional demonstration study metrics illustrative of typical engagement performance.
            </span>
          </div>
        </div>
      </section>

      {/* Challenge, Solution & Key Architecture */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Editorial Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* The Challenge */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>THE COMMERCIAL BOTTLENECK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-4">
                The Strategic Challenge
              </h2>
              <p className="text-base text-[#B6B0A4] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE INTERVENTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-4">
                The BZ Digital Solution
              </h2>
              <p className="text-base text-[#B6B0A4] leading-relaxed mb-6">
                {project.solution}
              </p>

              {/* Implemented Features */}
              <div className="p-6 rounded-2xl bg-[#151515] border border-[#383126]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D6B878] font-display mb-4">
                  Architectural Pillars Deployed:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#F5F1E8]">
                      <CheckCircle2 className="w-4 h-4 text-[#D6B878] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Testimonial Callout */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#151515] border border-[#383126] overflow-hidden">
              <Quote className="absolute right-6 bottom-4 w-28 h-28 text-[#383126]/20 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-lg sm:text-xl font-serif-luxury italic text-[#F5F1E8] mb-6 leading-relaxed">
                  “{project.testimonial.quote}”
                </p>
                <div>
                  <div className="font-serif-luxury font-bold text-[#F0DDAA]">
                    {project.testimonial.author}
                  </div>
                  <div className="text-xs text-[#B6B0A4]">
                    {project.testimonial.role} • {project.testimonial.company}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar CTA */}
          <div className="lg:col-span-4 bg-[#151515] border border-[#383126] rounded-2xl p-8 sticky top-28">
            <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-2">
              Explore a Similar Scope
            </h3>
            <p className="text-xs text-[#B6B0A4] leading-relaxed mb-6">
              Every client engagement begins with a confidential assessment to benchmark your current funnel, technical foundation, and untapped revenue capacity.
            </p>

            <button
              onClick={onOpenQuoteModal}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] text-xs font-semibold uppercase tracking-wider font-display hover:shadow-[0_0_20px_rgba(214,184,120,0.3)] transition-all cursor-pointer mb-3"
            >
              Request Custom Proposal
            </button>

            <Link
              to="/contact"
              className="w-full py-3 rounded-xl bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors font-display"
            >
              Contact Growth Advisor
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
