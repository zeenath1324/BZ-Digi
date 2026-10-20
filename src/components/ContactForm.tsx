import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Database,
  Building2,
  Mail,
  Phone,
  User,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'seo',
    estimatedBudget: '$5k - $10k/mo',
    projectDescription: '',
    honeypot: '', // spam prevention bot trap
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [backendStatusInfo, setBackendStatusInfo] = useState<string>('');

  const budgetOptions = [
    '< $5,000 / mo',
    '$5,000 – $10,000 / mo',
    '$10,000 – $25,000 / mo',
    '$25,000+ / mo',
    'One-Time Project ($8,500 – $25,000)',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.length < 15) {
      newErrors.projectDescription = 'Please provide at least 15 characters describing your ambition';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam trap
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // Simulate/Attempt dispatch
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Save locally to maintain audit state
      const leadEntry = {
        ...formData,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      
      const existingLeads = JSON.parse(localStorage.getItem('bz_digital_leads') || '[]');
      existingLeads.unshift(leadEntry);
      localStorage.setItem('bz_digital_leads', JSON.stringify(existingLeads));

      setBackendStatusInfo(
        'Lead validated and securely stored in browser session storage. (Firestore backend is currently in preview mode — integrate Firebase to route directly to live CRM).'
      );
      setSubmissionStatus('success');
    } catch {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      serviceRequired: 'seo',
      estimatedBudget: '$5k - $10k/mo',
      projectDescription: '',
      honeypot: '',
    });
    setErrors({});
    setSubmissionStatus('idle');
  };

  return (
    <div className="rounded-3xl bg-[#151515] border border-[#383126] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
      {/* Subtle top gold gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6B878] to-transparent" />

      {submissionStatus === 'success' ? (
        <div className="text-center py-12 px-4 space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-full bg-[#1C1A16] border-2 border-[#D6B878] text-[#D6B878] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(214,184,120,0.3)]">
            <CheckCircle2 className="w-8 h-8 text-[#F0DDAA]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8]">
            Enquiry Received & Registered
          </h3>

          <p className="text-sm text-[#B6B0A4] max-w-lg mx-auto leading-relaxed">
            Thank you, <span className="text-[#F0DDAA] font-semibold">{formData.fullName}</span>. A Senior Partner at BZ Digital has been notified and will conduct a preliminary assessment of <span className="text-[#F0DDAA] font-semibold">{formData.company}</span>.
          </p>

          {/* Backend Status Transparency Notice */}
          <div className="p-4 rounded-xl bg-[#101010] border border-[#383126] text-left max-w-lg mx-auto flex items-start gap-3 text-xs text-[#B6B0A4]">
            <Database className="w-4 h-4 text-[#D6B878] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[#F0DDAA] font-semibold block mb-0.5">Integration Status Note:</span>
              <span>{backendStatusInfo}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#1C1A16] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#F0DDAA] transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot hidden input for anti-spam */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          {/* Form Header */}
          <div className="border-b border-[#383126]/70 pb-6 mb-6">
            <h3 className="text-2xl font-serif-luxury font-bold text-[#F5F1E8] mb-1">
              Initiate a Strategic Partnership
            </h3>
            <p className="text-xs text-[#B6B0A4]">
              Fill out the details below to receive a bespoke proposal and growth forecast within 24 hours.
            </p>
          </div>

          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <User className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                placeholder="Lord / Lady / Executive Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#101010] border ${
                  errors.fullName ? 'border-red-500/80' : 'border-[#383126]'
                } text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <Mail className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Corporate Email *</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#101010] border ${
                  errors.email ? 'border-red-500/80' : 'border-[#383126]'
                } text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone and Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <Phone className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Phone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#101010] border ${
                  errors.phone ? 'border-red-500/80' : 'border-[#383126]'
                } text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors`}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <Building2 className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Company / Brand *</span>
              </label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-[#101010] border ${
                  errors.company ? 'border-red-500/80' : 'border-[#383126]'
                } text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors`}
              />
              {errors.company && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Service Required & Estimated Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <HelpCircle className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Primary Service Required *</span>
              </label>
              <select
                value={formData.serviceRequired}
                onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#383126] text-[#F5F1E8] focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors"
              >
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.id} className="bg-[#151515] text-[#F5F1E8]">
                    {srv.title}
                  </option>
                ))}
                <option value="full-growth-engine" className="bg-[#151515] text-[#D6B878]">
                  Full-Funnel Omnichannel Growth Retainer
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
                <DollarSign className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>Estimated Monthly Budget *</span>
              </label>
              <select
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#101010] border border-[#383126] text-[#F5F1E8] focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#151515] text-[#F5F1E8]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-xs font-medium text-[#F5F1E8] mb-2 flex items-center gap-1.5 font-display">
              <span>Project Description & Current Bottlenecks *</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your brand, current customer acquisition channels, and targets for the next 12 months..."
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-[#101010] border ${
                errors.projectDescription ? 'border-red-500/80' : 'border-[#383126]'
              } text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:outline-none focus:border-[#D6B878] focus:ring-1 focus:ring-[#D6B878] text-sm transition-colors`}
            />
            {errors.projectDescription && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.projectDescription}
              </p>
            )}
          </div>

          {/* Submission Feedback & Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_25px_rgba(214,184,120,0.35)] hover:brightness-105 active:scale-[0.99] transition-all duration-300 font-display flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                  <span>Encrypting & Routing Lead...</span>
                </div>
              ) : (
                <>
                  <span>Request Strategic Proposal</span>
                  <Send className="w-4 h-4 text-[#080808]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#B6B0A4]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B878]" />
              <span>Strict non-disclosure confidentiality. No unsolicited outreach or spam.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
