import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { useLanguage } from '../context/LanguageContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [selectedServices, setSelectedServices] = useState<string[]>(['seo']);
  const [budget, setBudget] = useState('$5,000 – $10,000 / mo');
  const [timeline, setTimeline] = useState('Immediate (Next 14 Days)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', phone: '', notes: '' });
    }, 300);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#080808]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-gold)] rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6B878] to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6 sm:py-8 px-2"
          >
            {/* Animated Golden Badge with Expanding Ripple & Particles */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center mb-6">
              {/* Expanding subtle gold pulse rings */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0.9 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.3, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border border-[var(--gold-primary)]"
              />
              <motion.div
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 2.1, opacity: 0 }}
                transition={{ duration: 1.6, ease: 'easeOut', delay: 0.15 }}
                className="absolute inset-0 rounded-full border border-[var(--gold-light)]"
              />

              {/* Golden Ambient Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_var(--gold-glow)_0%,_transparent_70%)] blur-md"
              />

              {/* Particle Sparkles radiating outward */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <motion.div
                  key={deg}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos((deg * Math.PI) / 180) * 46,
                    y: Math.sin((deg * Math.PI) / 180) * 46,
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0.4],
                  }}
                  transition={{ duration: 0.95, delay: 0.18 + i * 0.035, ease: 'easeOut' }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[var(--gold-light)] shadow-[0_0_6px_var(--gold-primary)] pointer-events-none"
                />
              ))}

              {/* Central Crest Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
                className="relative w-20 h-20 rounded-2xl bg-[var(--bg-elevated)] border-2 border-[var(--gold-primary)] flex items-center justify-center shadow-[0_0_25px_var(--gold-glow)]"
              >
                {/* SVG Animated Draw Checkmark */}
                <svg className="w-10 h-10" viewBox="0 0 52 52" fill="none">
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="var(--gold-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M15 27 L22 34 L37 19"
                    stroke="url(#quoteSuccessCheckGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <defs>
                    <linearGradient id="quoteSuccessCheckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8F3E8" />
                      <stop offset="40%" stopColor="#F0DDAA" />
                      <stop offset="100%" stopColor="#D6B878" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            {/* Staggered Content Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[10.5px] font-semibold text-[var(--gold-primary)] uppercase tracking-wider font-display">
                <Sparkles className="w-3 h-3 text-[var(--gold-light)] animate-pulse" />
                <span>Proposal Request Registered</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[var(--text-main)]">
                Specification Dossier <span className="gold-gradient-text">Initiated.</span>
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="text-[var(--gold-primary)] font-semibold">{formData.name}</span>. A custom commercial roadmap for <span className="text-[var(--gold-primary)] font-semibold">{formData.company || 'your brand'}</span> is being prepared and routed to our Senior Growth Strategist.
              </p>
            </motion.div>

            {/* Summary Specification Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-gold)] text-left max-w-lg mx-auto space-y-3 shadow-inner"
            >
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border-gold)]/60">
                <span className="text-[var(--text-muted)]">Dispatch Destination:</span>
                <span className="text-[var(--text-main)] font-mono font-medium">{formData.email}</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--border-gold)]/60">
                <span className="text-[var(--text-muted)]">Budget Allocation:</span>
                <span className="text-[var(--gold-primary)] font-semibold">{budget}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Timeline Target:</span>
                <span className="text-[var(--text-main)] font-medium">{timeline}</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedServices.map((id) => {
                  const s = SERVICES_DATA.find((item) => item.id === id);
                  return s ? (
                    <span
                      key={id}
                      className="px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold tracking-wider bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--gold-primary)]"
                    >
                      {s.title.split('&')[0]}
                    </span>
                  ) : null;
                })}
              </div>
            </motion.div>

            {/* Response Time SLA Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
              <span>Guaranteed Senior Partner review within 4 business hours</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-light)] to-[var(--gold-primary)] text-[#080808] font-display hover:shadow-[0_0_20px_var(--gold-glow)] transition-all cursor-pointer"
              >
                Close & Return
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', company: '', phone: '', notes: '' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[var(--bg-elevated)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[var(--text-main)] transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Growth Estimate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8]">
                {t('quote.title', 'Request a Bespoke Proposal')}
              </h2>
              <p className="text-xs text-[#B6B0A4] mt-1">
                {t('quote.subtitle', 'Select your required disciplines and budget scope to receive an exact financial framework.')}
              </p>
            </div>

            {/* Disciplines Checkbox Pills */}
            <div>
              <label className="block text-xs font-semibold text-[#F5F1E8] mb-2 uppercase tracking-wider font-display">
                Select Target Disciplines (Multi-select)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_DATA.map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all duration-200 flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#1C1A16] border-[#D6B878] text-[#F0DDAA] shadow-[0_0_10px_rgba(214,184,120,0.15)]'
                          : 'bg-[#101010] border-[#383126] text-[#B6B0A4] hover:border-[#D6B878]/50'
                      }`}
                    >
                      <span className="truncate pr-1">{srv.title.split('&')[0]}</span>
                      {isChecked && <div className="w-2 h-2 rounded-full bg-[#D6B878] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8] mb-1 font-display uppercase tracking-wider">
                  Target Budget Scope
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] focus:border-[#D6B878] focus:outline-none"
                >
                  <option>$3,500 – $5,000 / mo (Starter Retainer)</option>
                  <option>$5,000 – $10,000 / mo (Standard Scale)</option>
                  <option>$10,000 – $25,000 / mo (Omnichannel Domination)</option>
                  <option>$25,000+ / mo (Enterprise Acceleration)</option>
                  <option>Fixed Project ($8,500 – $30,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F1E8] mb-1 font-display uppercase tracking-wider">
                  Project Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] focus:border-[#D6B878] focus:outline-none"
                >
                  <option>Immediate (Next 14 Days)</option>
                  <option>Within 30–60 Days</option>
                  <option>Next Quarter Planning</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#B6B0A4] mb-1 font-display">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Executive Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:border-[#D6B878] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#B6B0A4] mb-1 font-display">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:border-[#D6B878] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#B6B0A4] mb-1 font-display">Company / Brand</label>
                <input
                  type="text"
                  placeholder="Brand Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:border-[#D6B878] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#B6B0A4] mb-1 font-display">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101010] border border-[#383126] text-xs text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:border-[#D6B878] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_20px_rgba(214,184,120,0.35)] transition-all duration-300 font-display flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Calculating Proposal...</span>
                ) : (
                  <>
                    <span>Generate Tailored Proposal</span>
                    <ArrowRight className="w-4 h-4 text-[#080808]" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#B6B0A4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B878]" />
              <span>Confidential strategic evaluation. No obligation.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
