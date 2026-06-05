import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * ScrollToTop — floats in the bottom-right corner once the user scrolls
 * past 400 px. Uses a requestAnimationFrame throttle to keep the scroll
 * listener off the main thread between frames.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => setVisible(window.scrollY > 400));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll back to top"
      title="Back to top"
      className="fixed bottom-24 lg:bottom-10 right-5 z-50 w-11 h-11 bg-white dark:bg-dark-elevated border border-lightGray dark:border-dark-border rounded-2xl shadow-premium flex items-center justify-center hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 group"
    >
      <ChevronUp
        size={20}
        aria-hidden="true"
        className="text-dark dark:text-dark-text group-hover:text-primary transition-colors duration-200"
        strokeWidth={2.5}
      />
    </button>
  );
};

export default ScrollToTop;

