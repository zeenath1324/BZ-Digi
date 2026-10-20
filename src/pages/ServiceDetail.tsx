import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES_DATA, CASE_STUDIES_DATA } from '../data/agencyData';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ShieldCheck,
  Search,
  TrendingUp,
  Share2,
  Layout,
  Palette,
  FileText
} from 'lucide-react';

interface ServiceDetailProps {
  onOpenQuoteModal: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search,
  TrendingUp,
  Share2,
  Layout,
  Palette,
  FileText,
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onOpenQuoteModal }) => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const service = SERVICES_DATA.find((s) => s.id === serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = iconMap[service.iconName] || TrendingUp;

  // Find related case study
  const relatedCaseStudy = CASE_STUDIES_DATA[0];

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B6B0A4] hover:text-[#D6B878] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Practices</span>
        </Link>
      </div>

      {/* Hero Header for Service */}
      <section className="py-12 sm:py-20 border-b border-[#383126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C1A16] border border-[#383126] flex items-center justify-center text-[#D6B878]">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#D6B878] font-semibold font-display">
                  {service.subtitle}
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif-luxury font-extrabold text-[#F5F1E8] mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-[#B6B0A4] leading-relaxed max-w-2xl">
                {service.fullDescription}
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#151515] border border-[#383126] rounded-2xl p-8 shadow-2xl">
              <div className="text-xs uppercase tracking-wider text-[#D6B878] font-semibold font-display mb-2">
                Practice Overview
              </div>
              <div className="text-2xl font-serif-luxury font-bold text-[#F0DDAA] mb-6">
                {service.startingAt}
              </div>

              <div className="space-y-4 text-xs text-[#B6B0A4] pb-6 border-b border-[#383126]/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D6B878]" />
                  <span>Cycle: <strong className="text-[#F5F1E8]">{service.timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6B878]" />
                  <span>Impact: <strong className="text-[#D6B878]">{service.metricsSample}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D6B878]" />
                  <span>Senior Partner Lead Guarantee</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] text-xs font-semibold uppercase tracking-wider font-display hover:shadow-[0_0_20px_rgba(214,184,120,0.3)] transition-all cursor-pointer"
                >
                  Book Discovery Call for {service.title.split('&')[0]}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Deliverables & Scope Checklist */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8] mb-6">
              Full Scope & Deliverables
            </h2>
            <div className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#151515] border border-[#383126] flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1C1A16] border border-[#D6B878] flex items-center justify-center text-[#D6B878] flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F5F1E8] mb-1 font-display">
                      {item}
                    </h3>
                    <p className="text-xs text-[#B6B0A4] leading-relaxed">
                      Executed according to BZ Digital proprietary enterprise standards, verified with weekly sprint retrospectives and executive dashboards.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#101010] border border-[#383126]">
              <div className="text-xs uppercase tracking-wider text-[#D6B878] font-semibold mb-2 font-display">
                Featured Case Study In This Domain
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#F5F1E8] mb-2">
                {relatedCaseStudy.title}
              </h3>
              <p className="text-xs text-[#B6B0A4] leading-relaxed mb-4">
                {relatedCaseStudy.challenge}
              </p>
              <div className="p-3 rounded-lg bg-[#151515] border border-[#383126] mb-4">
                <span className="text-[11px] text-[#D6B878] font-semibold block">Primary Result Achieved:</span>
                <span className="text-base font-serif-luxury font-bold text-[#F0DDAA]">
                  {relatedCaseStudy.results[0].value} {relatedCaseStudy.results[0].label}
                </span>
              </div>
              <Link
                to={`/work/${relatedCaseStudy.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6B878] hover:text-[#F0DDAA]"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-[#151515] border border-[#383126] text-center">
              <h3 className="text-lg font-serif-luxury font-bold text-[#F5F1E8] mb-2">
                Unsure if this practice fits your roadmap?
              </h3>
              <p className="text-xs text-[#B6B0A4] mb-4">
                Our partners offer an initial complimentary 30-minute forensic evaluation of your existing digital setup.
              </p>
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-2.5 rounded-lg bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F0DDAA] text-xs font-semibold uppercase tracking-wider"
              >
                Request Free Audit
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
