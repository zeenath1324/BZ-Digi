import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ThemeSwitcher } from './ThemeSwitcher';
import { BrandLogo } from './BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#383126] relative overflow-hidden select-none">
      {/* Subtle Golden Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse,_rgba(214,184,120,0.05)_0%,_transparent_75%)] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Top Newsletter / Pre-Footer Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-[#151515] border border-[#383126] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('footer.memorandum', 'THE BZ DIGITAL MEMORANDUM')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#F5F1E8]">
              {t('footer.newsletterTitle', 'Insights for Category Leaders.')}
            </h3>
            <p className="text-xs sm:text-sm text-[#B6B0A4] mt-2">
              {t('footer.newsletterSubtitle', 'Curated intelligence on luxury web architecture, algorithmic attribution, and macroeconomic media buying delivered bi-weekly.')}
            </p>
          </div>

          {isSubscribed ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1C1812] border border-[#D6B878] text-[#F0DDAA] text-sm animate-in fade-in duration-300">
              <CheckCircle2 className="w-4 h-4 text-[#D6B878]" />
              <span>{t('footer.subscribed', 'Thank you. You have been added to the memorandum dispatch.')}</span>
            </div>
          ) : (
            <form 
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="executive@company.com"
                className="px-5 py-3 rounded-xl bg-[#101010] border border-[#383126] text-sm text-[#F5F1E8] placeholder-[#B6B0A4]/40 focus:border-[#D6B878] focus:outline-none min-w-[260px]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display hover:shadow-[0_0_20px_rgba(214,184,120,0.3)] transition-all cursor-pointer"
              >
                {t('footer.subscribe', 'Subscribe')}
              </button>
            </form>
          )}
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#383126]/60">
          
          {/* Column 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <BrandLogo asLink to="/" size="lg" subtitleText="Digital Experiences. Measurable Growth." />

            <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed max-w-sm">
              A premier luxury digital marketing and engineering agency transforming ambitious brands into undisputed market leaders through cinema-grade web design, technical SEO, and algorithmic media buying.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#B6B0A4] hover:text-[#D6B878] flex items-center justify-center transition-colors"
                aria-label="BZ Digital LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#B6B0A4] hover:text-[#D6B878] flex items-center justify-center transition-colors"
                aria-label="BZ Digital Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#B6B0A4] hover:text-[#D6B878] flex items-center justify-center transition-colors"
                aria-label="BZ Digital Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Practices / Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-4">
              {t('footer.corePractices', 'Core Practices')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B6B0A4]">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.id}`}
                    className="hover:text-[#F0DDAA] transition-colors block py-0.5"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Agency (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-4">
              {t('footer.agency', 'Agency')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B6B0A4]">
              <li>
                <Link to="/about" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  About BZ Digital
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Case Studies
                </Link>
              </li>
              <li>
                <a href="/#process" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Our Process
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#F0DDAA] transition-colors block py-0.5">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Desks (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#D6B878] uppercase tracking-wider font-display mb-4">
              Executive Desks
            </h4>
            
            <div className="text-xs text-[#B6B0A4] space-y-1">
              <div className="text-[#F5F1E8] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>London Mayfair</span>
              </div>
              <p className="text-[11px] text-[#B6B0A4]/80">14 Berkeley Square, London W1J</p>
            </div>

            <div className="text-xs text-[#B6B0A4] space-y-1 pt-2">
              <div className="text-[#F5F1E8] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D6B878]" />
                <span>New York Office</span>
              </div>
              <p className="text-[11px] text-[#B6B0A4]/80">430 Park Ave, New York, NY</p>
            </div>

            <div className="pt-2 text-xs space-y-1">
              <a href="mailto:inquiries@bzdigital.agency" className="text-[#D6B878] hover:underline flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <span>inquiries@bzdigital.agency</span>
              </a>
              <div className="text-[#B6B0A4] flex items-center gap-1.5 text-[11px]">
                <Phone className="w-3 h-3 text-[#D6B878]" />
                <span>+44 (0) 20 7946 0912</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B6B0A4]">
          <div>
            © {new Date().getFullYear()} BZ Digital Agency Ltd. {t('footer.rights', 'All rights reserved. Engineered for category leaders worldwide.')}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <LanguageSwitcher align="left" />
            <ThemeSwitcher />
            <Link to="/privacy" className="hover:text-[#F0DDAA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F0DDAA] transition-colors">
              Terms & Conditions
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151515] border border-[#383126] hover:border-[#D6B878] text-[#F5F1E8] hover:text-[#D6B878] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>{t('footer.backToTop', 'Back to Top')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
