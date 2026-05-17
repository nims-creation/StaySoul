/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D94F2B',   // Deeper, richer terracotta
          hover:   '#B83D1E',   // Dark hover state
          light:   '#F4E8E4',   // Warm tinted bg for active states
          glow:    'rgba(217,79,43,0.15)', // Soft radial glow
        },
        gold: {
          DEFAULT: '#C9963A',   // Warm gold accent
          light:   '#FBF3E4',   // Gold tint bg
        },
        dark:      '#0D0D0D',   // Near-black for headings
        charcoal:  '#3D3D3D',   // Body text
        muted:     '#8A8A8A',   // Captions / secondary text
        cream:     '#FDFAF6',   // Warm off-white background
        lightGray: '#E8E4DF',   // Warm gray borders (not cold gray)
        grayBg:    '#F5F1EC',   // Warm gray surfaces
        glass:     'rgba(255,255,255,0.72)', // Glassmorphism fill
        // ── Dark mode palette ───────────────────────────────────────────
        dark: {
          bg:      '#0F0F0F',   // Main dark background
          surface: '#1A1A1A',   // Card / panel background
          elevated:'#242424',   // Elevated surfaces (modals, dropdowns)
          border:  '#2E2E2E',   // Subtle borders
          muted:   '#6B6B6B',   // Muted / placeholder text
          text:    '#E8E4DF',   // Primary body text
          heading: '#FDFAF6',   // Headings
        },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:   ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-warm':   'linear-gradient(135deg, #FDFAF6 0%, #F5EDE6 100%)',
        'gradient-card':   'linear-gradient(to top, rgba(13,13,13,0.65) 0%, transparent 55%)',
        'gradient-primary':'linear-gradient(135deg, #D94F2B 0%, #E8764A 100%)',
      },
      boxShadow: {
        'card':    '0 2px 20px rgba(13,13,13,0.08), 0 0 0 1px rgba(13,13,13,0.04)',
        'card-hover': '0 12px 40px rgba(13,13,13,0.15), 0 2px 8px rgba(13,13,13,0.06)',
        'glow-primary': '0 0 0 3px rgba(217,79,43,0.25)',
        'navbar':  '0 4px 30px rgba(13,13,13,0.08)',
        'premium': '0 8px 32px rgba(13,13,13,0.12)',
      },
      backdropBlur: {
        xs: '4px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'shimmer': 'shimmer 1.8s infinite linear',
        'float':   'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
