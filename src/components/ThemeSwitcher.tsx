import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'midnight-gold';

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--gold-primary)]"
        aria-label={`Switch to ${isDark ? 'Light Ivory' : 'Midnight Gold'} theme`}
        title={`Current: ${isDark ? 'Midnight Gold' : 'Light Ivory'}. Click to switch.`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-[#A4813D] transition-transform duration-300 rotate-0 hover:rotate-45" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--gold-primary)]"
      aria-label={`Switch to ${isDark ? 'Light Ivory' : 'Midnight Gold'} theme`}
      title={`Current: ${isDark ? 'Midnight Gold' : 'Light Ivory'}. Click to toggle.`}
    >
      {/* Icon Capsule */}
      <div className="w-5 h-5 rounded-full bg-[var(--bg-card)] border border-[var(--border-gold)] group-hover:border-[var(--gold-primary)] flex items-center justify-center text-[var(--gold-primary)] transition-colors shadow-xs">
        {isDark ? (
          <Moon className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-3 h-3 text-[#A4813D] transition-transform duration-300 group-hover:rotate-45" />
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] font-semibold tracking-wider uppercase font-display text-[var(--text-main)] group-hover:text-[var(--gold-primary)] transition-colors">
        {isDark ? 'Midnight Gold' : 'Light Ivory'}
      </span>

      {/* Micro Status Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] transition-all duration-300 group-hover:scale-125" />
    </button>
  );
};
