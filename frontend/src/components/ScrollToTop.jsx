import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className="fixed bottom-24 lg:bottom-10 right-5 z-50 w-11 h-11 bg-white dark:bg-dark-elevated border border-lightGray dark:border-dark-border rounded-2xl shadow-premium flex items-center justify-center hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200"
    >
      <ChevronUp size={20} className="text-dark dark:text-dark-text" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;
