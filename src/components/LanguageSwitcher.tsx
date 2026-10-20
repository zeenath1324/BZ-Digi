import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
  variant?: 'dropdown' | 'grid' | 'compact';
  align?: 'left' | 'right';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  compact = false,
  variant = 'dropdown',
  align = 'right',
}) => {
  const { language, languageInfo, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Grid variant for mobile drawer or comprehensive footers
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        {SUPPORTED_LANGUAGES.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] border-[var(--gold-primary)] font-semibold shadow-[0_0_12px_var(--gold-glow)]'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-gold)]/60 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--gold-primary)]/50'
              }`}
              aria-label={`Select ${item.name}`}
            >
              <span className="text-sm">{item.flag}</span>
              <span className="font-display font-semibold tracking-wider">{item.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant
  if (compact || variant === 'compact') {
    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-all duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--gold-primary)]"
          aria-label={`Language selector. Current: ${languageInfo.name}`}
          aria-expanded={isOpen}
        >
          <span className="text-sm">{languageInfo.flag}</span>
          <span className="text-xs font-semibold tracking-wider font-display text-[var(--text-main)]">
            {language}
          </span>
          <ChevronDown className={`w-3 h-3 text-[var(--gold-primary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            className={`absolute top-full mt-2 w-64 ${
              align === 'right' ? 'right-0' : 'left-0'
            } z-50 bg-[#121212] border border-[#383126] rounded-xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150`}
          >
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)] border-b border-[#383126]/60 mb-1">
              Select Language / Sprache / Langue
            </div>
            <div className="space-y-1">
              {SUPPORTED_LANGUAGES.map((item) => {
                const isActive = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1C1812] text-[var(--gold-light)] font-medium border border-[#383126]'
                        : 'text-[#B6B0A4] hover:bg-[#181818] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.flag}</span>
                      <div className="text-left rtl:text-right">
                        <div className="font-semibold">{item.nativeName}</div>
                        <div className="text-[10px] text-[#8E877B]">{item.region}</div>
                      </div>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-[var(--gold-primary)] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard luxury dropdown for Navbar desktop
  return (
    <div className="relative inline-block shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-main)] hover:border-[var(--gold-primary)] hover:shadow-[0_0_12px_var(--gold-glow)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--gold-primary)]"
        aria-label={`Language: ${languageInfo.name}. Click to change language.`}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[var(--gold-primary)] group-hover:rotate-45 transition-transform duration-300 shrink-0" />
        <span className="text-xs font-semibold tracking-wider font-display text-[var(--text-main)] flex items-center gap-1">
          <span>{languageInfo.flag}</span>
          <span className="text-[11px] font-bold">{language}</span>
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--gold-primary)] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-64 ${
            align === 'right' ? 'right-0' : 'left-0'
          } z-50 bg-[#121212] border border-[#383126] rounded-xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150`}
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--gold-primary)] border-b border-[#383126]/60 mb-1 flex items-center justify-between">
            <span>Global Prestige Languages</span>
            <span className="text-[9px] text-[#8E877B]">6 Regions</span>
          </div>

          <div className="space-y-1">
            {SUPPORTED_LANGUAGES.map((item) => {
              const isActive = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1812] text-[var(--gold-light)] font-medium border border-[#383126]'
                      : 'text-[#B6B0A4] hover:bg-[#181818] hover:text-[#F5F1E8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div className="text-left rtl:text-right">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{item.nativeName}</span>
                        <span className="text-[10px] text-[#8E877B] font-mono">({item.code})</span>
                      </div>
                      <div className="text-[10px] text-[#8E877B]">{item.region}</div>
                    </div>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[var(--gold-primary)] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
