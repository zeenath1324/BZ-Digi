import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#383126]/80 py-3.5 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo - GUARANTEED UN-SHRUNK */}
        <BrandLogo asLink to="/" size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 shrink min-w-0" aria-label="Main Navigation">
          <Link
            to="/"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md shrink-0 ${
              isActive('/')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            {t('nav.home', 'Home')}
          </Link>

          <Link
            to="/about"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md shrink-0 ${
              isActive('/about')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            {t('nav.about', 'About')}
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              to="/services"
              className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 shrink-0 ${
                isActive('/services')
                  ? 'text-[#F0DDAA] bg-[#1C1A16]'
                  : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
              }`}
            >
              <span>{t('nav.services', 'Services')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#D6B878]' : ''
                }`}
              />
            </Link>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div 
                className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="bg-[#151515] border border-[#383126] rounded-xl p-2 shadow-2xl backdrop-blur-xl">
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#D6B878] border-b border-[#383126]/60 mb-1 flex items-center justify-between">
                    <span>{t('nav.practicesTitle', 'Core Agency Practices')}</span>
                    <Sparkles className="w-3 h-3 text-[#D6B878]" />
                  </div>
                  {SERVICES_DATA.map((srv) => (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.id}`}
                      className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#1C1A16] transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#D6B878] mt-2 group-hover:scale-125 transition-transform" />
                      <div>
                        <div className="text-sm font-medium text-[#F5F1E8] group-hover:text-[#F0DDAA] transition-colors">
                          {srv.title}
                        </div>
                        <div className="text-xs text-[#B6B0A4] line-clamp-1">
                          {srv.subtitle}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#383126]/60">
                    <Link
                      to="/services"
                      className="block px-3 py-1.5 text-xs text-[#D6B878] hover:text-[#F0DDAA] font-medium text-center hover:underline"
                    >
                      {t('nav.allPractices', 'View All 6 Practices & Pricing →')}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/work"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md shrink-0 ${
              isActive('/work')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            {t('nav.work', 'Our Work')}
          </Link>

          <Link
            to="/atelier"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md flex items-center gap-1.5 shrink-0 ${
              isActive('/atelier') || isActive('/3d-studio')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>{t('nav.atelier3d', '3D Atelier')}</span>
          </Link>

          <a
            href="/#process"
            className="px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515] transition-colors rounded-md shrink-0"
          >
            {t('nav.process', 'Process')}
          </a>

          <Link
            to="/blog"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md shrink-0 ${
              isActive('/blog')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            {t('nav.blog', 'Blog')}
          </Link>

          <Link
            to="/contact"
            className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md shrink-0 ${
              isActive('/contact')
                ? 'text-[#F0DDAA] bg-[#1C1A16]'
                : 'text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#151515]'
            }`}
          >
            {t('nav.contact', 'Contact')}
          </Link>
        </nav>

        {/* CTA, Language Switcher, Theme Switcher & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Dynamic Theme Switcher */}
          <ThemeSwitcher />

          <button
            onClick={onOpenQuoteModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] text-[#080808] hover:shadow-[0_0_20px_rgba(214,184,120,0.4)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 font-display"
          >
            <span>{t('nav.getQuote', 'Get a Free Quote')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#080808]" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#151515] border border-[#383126] text-[#F5F1E8] hover:text-[#D6B878] focus:outline-none focus:ring-2 focus:ring-[#D6B878]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101010] border-b border-[#383126] px-4 pt-4 pb-6 mt-2 space-y-3 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          {/* Mobile Drawer Brand Header - ALWAYS UN-SHRUNK */}
          <div className="pb-3 border-b border-[#383126]/60 flex items-center justify-between">
            <BrandLogo size="sm" asLink to="/" onClick={() => setMobileMenuOpen(false)} />
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#D6B878] px-2.5 py-1 rounded bg-[#1C1A16] border border-[#383126]">
              Menu
            </span>
          </div>

          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.home', 'Home')}
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.about', 'About BZ Digital')}
          </Link>
          <div className="py-1 border-y border-[#383126]/60">
            <Link
              to="/services"
              className="block px-3 py-2 text-base font-semibold text-[#D6B878] flex items-center justify-between"
            >
              <span>{t('nav.services', 'Services')}</span>
              <span className="text-xs text-[#B6B0A4]">All 6 Practices</span>
            </Link>
            <div className="pl-4 space-y-1">
              {SERVICES_DATA.map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="block px-3 py-1.5 text-sm text-[#B6B0A4] hover:text-[#F0DDAA]"
                >
                  • {s.title}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/work"
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.work', 'Our Work')}
          </Link>
          <Link
            to="/atelier"
            className="block px-3 py-2 text-base font-medium text-[#D6B878] hover:bg-[#151515] rounded-md flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6B878]" />
              <span>3D Atelier & Studio</span>
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#241F16] border border-[#383126]">
              3D
            </span>
          </Link>
          <a
            href="/#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.process', 'Our 4-Step Process')}
          </a>
          <Link
            to="/blog"
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.blog', 'Editorial & Insights')}
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-base font-medium text-[#F5F1E8] hover:text-[#D6B878] hover:bg-[#151515] rounded-md"
          >
            {t('nav.contact', 'Contact')}
          </Link>

          {/* Language Switcher Row */}
          <div className="pt-3 pb-2 px-3 border-t border-[#383126]/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#B6B0A4] font-medium font-display uppercase tracking-wider">
              <span>{t('nav.languageLabel', 'Select Language')}</span>
              <span className="text-[10px] text-[#D6B878] font-mono">6 Global</span>
            </div>
            <LanguageSwitcher variant="grid" />
          </div>

          {/* Theme Switcher Row */}
          <div className="pt-2 pb-1 flex items-center justify-between px-3 border-t border-[#383126]/60">
            <span className="text-xs text-[#B6B0A4] font-medium font-display uppercase tracking-wider">{t('nav.themeLabel', 'Aesthetic Theme')}</span>
            <ThemeSwitcher />
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{t('nav.getQuote', 'Get a Free Quote')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
