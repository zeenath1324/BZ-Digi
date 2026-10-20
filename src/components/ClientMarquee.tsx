import React, { useState } from 'react';
import { 
  MARQUEE_CLIENTS_ROW_1, 
  MARQUEE_CLIENTS_ROW_2, 
  MarqueeClientItem 
} from '../data/agencyData';
import { ClientLogo } from './ClientLogo';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Award,
  Layers,
  Pause,
  Play
} from 'lucide-react';

export const ClientMarquee: React.FC = () => {
  const { t } = useLanguage();
  const [selectedClient, setSelectedClient] = useState<MarqueeClientItem | null>(null);
  const [activeSector, setActiveSector] = useState<string>('All');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Duplication for seamless infinite marquee loop
  const row1Duplicated = [...MARQUEE_CLIENTS_ROW_1, ...MARQUEE_CLIENTS_ROW_1];
  const row2Duplicated = [...MARQUEE_CLIENTS_ROW_2, ...MARQUEE_CLIENTS_ROW_2];

  const sectors = [
    { id: 'All', label: 'All Partners' },
    { id: 'Horlogerie', label: 'Horlogerie & Fashion' },
    { id: 'Aviation', label: 'Aviation & Mobility' },
    { id: 'Wealth', label: 'Private Wealth & Tech' },
    { id: 'Architecture', label: 'Estates & Design' }
  ];

  const isSectorMatch = (item: MarqueeClientItem) => {
    if (activeSector === 'All') return true;
    if (activeSector === 'Horlogerie') return item.sector === 'Horlogerie' || item.sector === 'Fashion' || item.sector === 'Jewelry';
    if (activeSector === 'Aviation') return item.sector === 'Aviation' || item.sector === 'Automotive';
    if (activeSector === 'Wealth') return item.sector === 'Wealth' || item.sector === 'Tech';
    if (activeSector === 'Architecture') return item.sector === 'Architecture' || item.sector === 'Hospitality' || item.sector === 'Health';
    return true;
  };

  return (
    <section 
      id="trusted-by"
      aria-label="Trusted By — Luxury Client Portfolio" 
      className="relative py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-gold)]/80 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--gold-glow)] via-transparent to-transparent opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D6B878]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-gold)] text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D6B878] font-display mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />
          <span>{t('marquee.badge', 'TRUSTED BY GLOBAL LEADERS')}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[var(--text-main)] tracking-tight">
          {t('marquee.title', 'Trusted by Preeminent Luxury & Growth Brands.')}
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-3 max-w-2xl mx-auto font-light leading-relaxed">
          {t('marquee.subtitle', 'Distinguished global partners across Haute Horlogerie, Private Aviation, Sovereign Wealth, and Frontier Technology.')}
        </p>

        {/* Sector Filter & Play/Pause Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-[var(--bg-card)]/80 border border-[var(--border-gold)]/60 backdrop-blur-md">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSector(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 font-display ${
                  activeSector === s.id
                    ? 'bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] shadow-[0_0_12px_rgba(214,184,120,0.35)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)]/50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume Marquee Animation" : "Pause Marquee Animation"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/80 border border-[var(--border-gold)]/60 text-xs font-mono text-[var(--text-muted)] hover:text-[#D6B878] transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#D6B878]" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Marquee Wrapper with side gradient masks */}
      <div className={`relative w-full overflow-hidden marquee-container ${isPaused ? 'marquee-paused' : ''}`}>
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-secondary)]/90 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-l from-[var(--bg-secondary)] via-[var(--bg-secondary)]/90 to-transparent" />

        {/* Row 1 — Moving Left */}
        <div className="flex mb-4">
          <div 
            className="animate-marquee-left flex items-center gap-4 sm:gap-5"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {row1Duplicated.map((client, idx) => {
              const matches = isSectorMatch(client);
              return (
                <div
                  key={`r1-${client.id}-${idx}`}
                  onClick={() => setSelectedClient(client)}
                  className={`group relative flex-shrink-0 w-64 sm:w-72 h-28 rounded-2xl bg-[var(--bg-card)] border transition-all duration-300 flex items-center px-4 sm:px-5 gap-3.5 cursor-pointer shadow-md ${
                    matches 
                      ? 'border-[var(--border-gold)] hover:border-[#D6B878] hover:shadow-[0_0_25px_rgba(214,184,120,0.22)] hover:-translate-y-0.5' 
                      : 'opacity-40 border-[var(--border-subtle)] grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
                >
                  {/* Luxury Vector SVG Logo */}
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-[#0B0A08] border border-[#2D261C] p-2 flex items-center justify-center group-hover:border-[#D6B878]/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
                    <ClientLogo type={client.logoType} className="w-full h-full text-[#D6B878]" />
                    <div className="absolute inset-0 bg-[#D6B878]/5 rounded-xl pointer-events-none group-hover:bg-[#D6B878]/15 transition-colors" />
                  </div>

                  {/* Brand Typography & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-[var(--text-main)] group-hover:text-[#F0DDAA] transition-colors tracking-wider truncate">
                        {client.name}
                      </h3>
                      {client.established && (
                        <span className="text-[9px] font-mono text-[#9C7B3D] tracking-widest hidden sm:inline">
                          {client.established}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] group-hover:text-[#D6B878] transition-colors font-medium tracking-wide truncate">
                      {client.tag}
                    </div>

                    {/* Metric pill */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#181613] text-[#D6B878] border border-[#2F271E] group-hover:border-[#D6B878]/40 transition-colors">
                        <TrendingUp className="w-2.5 h-2.5 text-[#D6B878]" />
                        <span>{client.metric}</span>
                      </span>
                    </div>
                  </div>

                  {/* Subtle corner indicator with inspect icon */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D6B878]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — Moving Right */}
        <div className="flex">
          <div 
            className="animate-marquee-right flex items-center gap-4 sm:gap-5"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {row2Duplicated.map((client, idx) => {
              const matches = isSectorMatch(client);
              return (
                <div
                  key={`r2-${client.id}-${idx}`}
                  onClick={() => setSelectedClient(client)}
                  className={`group relative flex-shrink-0 w-64 sm:w-72 h-28 rounded-2xl bg-[var(--bg-card)] border transition-all duration-300 flex items-center px-4 sm:px-5 gap-3.5 cursor-pointer shadow-md ${
                    matches 
                      ? 'border-[var(--border-gold)] hover:border-[#D6B878] hover:shadow-[0_0_25px_rgba(214,184,120,0.22)] hover:-translate-y-0.5' 
                      : 'opacity-40 border-[var(--border-subtle)] grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
                >
                  {/* Luxury Vector SVG Logo */}
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-[#0B0A08] border border-[#2D261C] p-2 flex items-center justify-center group-hover:border-[#D6B878]/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
                    <ClientLogo type={client.logoType} className="w-full h-full text-[#D6B878]" />
                    <div className="absolute inset-0 bg-[#D6B878]/5 rounded-xl pointer-events-none group-hover:bg-[#D6B878]/15 transition-colors" />
                  </div>

                  {/* Brand Typography & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-[var(--text-main)] group-hover:text-[#F0DDAA] transition-colors tracking-wider truncate">
                        {client.name}
                      </h3>
                      {client.established && (
                        <span className="text-[9px] font-mono text-[#9C7B3D] tracking-widest hidden sm:inline">
                          {client.established}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] group-hover:text-[#D6B878] transition-colors font-medium tracking-wide truncate">
                      {client.tag}
                    </div>

                    {/* Metric pill */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#181613] text-[#D6B878] border border-[#2F271E] group-hover:border-[#D6B878]/40 transition-colors">
                        <TrendingUp className="w-2.5 h-2.5 text-[#D6B878]" />
                        <span>{client.metric}</span>
                      </span>
                    </div>
                  </div>

                  {/* Subtle corner indicator with inspect icon */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D6B878]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Trust Stat Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[var(--text-muted)] border-t border-[var(--border-gold)]/40 pt-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D6B878]" />
          <span>Verified Enterprise Growth Partnerships</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D6B878]" />
          <span>100% Confidentiality & Non-Disclosure Adherence</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#D6B878]" />
          <span>Click Any Client Mark to Inspect Dossier</span>
        </div>
      </div>

      {/* Client Dossier Modal */}
      {selectedClient && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedClient(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0E0D0B] border border-[#383126] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient gold radial glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D6B878]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#1C1A16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Logo Pedestal & Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#14120F] border border-[#383126] p-3 flex items-center justify-center shadow-inner">
                <ClientLogo type={selectedClient.logoType} className="w-full h-full text-[#D6B878]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#F5F1E8]">
                    {selectedClient.name}
                  </h3>
                  {selectedClient.established && (
                    <span className="text-xs font-mono text-[#D6B878] bg-[#1C1812] px-2 py-0.5 rounded border border-[#383126]">
                      {selectedClient.established}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#D6B878] font-medium mt-0.5">
                  {selectedClient.tag}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#B6B0A4] leading-relaxed mb-6 font-light">
              {selectedClient.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#14120F] border border-[#2B241A]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#9C7B3D] uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3 text-[#D6B878]" />
                  <span>Headquarters</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#F5F1E8]">
                  {selectedClient.location}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#14120F] border border-[#2B241A]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#9C7B3D] uppercase tracking-wider mb-1">
                  <TrendingUp className="w-3 h-3 text-[#D6B878]" />
                  <span>Verified Impact</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#D6B878]">
                  {selectedClient.metric}
                </div>
              </div>
            </div>

            {/* Deliverables Scope */}
            <div className="p-3.5 rounded-xl bg-[#14120F] border border-[#2B241A] mb-6">
              <div className="text-[10px] font-mono text-[#9C7B3D] uppercase tracking-wider mb-1">
                Engagement Scope & Deliverables
              </div>
              <div className="text-xs sm:text-sm text-[#F5F1E8] font-medium">
                {selectedClient.deliverables}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#2A2318]">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#181613] transition-colors"
              >
                Close Dossier
              </button>
              <a
                href="/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-display bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_20px_rgba(214,184,120,0.35)] transition-all"
              >
                <span>View Selected Works</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
