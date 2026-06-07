import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative p-2 rounded-full transition-all duration-300 hover:bg-grayBg dark:hover:bg-ink-surface focus:outline-none group ${className}`}
    >
      {/* Track */}
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>

      {/* Animated icon swap */}
      <span className="relative block w-[18px] h-[18px]">
        {/* Sun */}
        <Sun
          size={18}
          strokeWidth={1.8}
          className={`absolute inset-0 text-gold transition-all duration-300 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        {/* Moon */}
        <Moon
          size={18}
          strokeWidth={1.8}
          className={`absolute inset-0 text-charcoal dark:text-ink-muted transition-all duration-300 ${
            isDark
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
