import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'midnight-gold' | 'light-ivory';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bz_digital_theme') as ThemeMode;
      if (saved === 'midnight-gold' || saved === 'light-ivory') {
        return saved;
      }
    }
    return 'midnight-gold';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bz_digital_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Update browser chrome theme color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'midnight-gold' ? '#080808' : '#FBF8F2');
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'midnight-gold' ? 'light-ivory' : 'midnight-gold');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'midnight-gold' ? '#080808' : '#FBF8F2');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
