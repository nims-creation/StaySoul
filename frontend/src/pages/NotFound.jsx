import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import useDocumentTitle from '../utils/useDocumentTitle';

const NotFound = () => {
  const navigate = useNavigate();
  useDocumentTitle('Page Not Found');

  return (
    <div className="min-h-screen bg-cream dark:bg-ink-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[160px] font-black text-gradient-primary leading-none select-none opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-premium">
              <span className="text-white text-4xl">✦</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-ink dark:text-ink-heading mb-3">
          Lost in paradise?
        </h2>
        <p className="text-muted dark:text-ink-muted text-base leading-relaxed mb-10">
          The page you're looking for has checked out. Let's get you back to
          finding your perfect stay.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-lightGray dark:border-ink-border text-ink dark:text-ink-text font-bold rounded-2xl hover:bg-grayBg dark:hover:bg-ink-surface transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-primary text-white font-bold rounded-2xl shadow-premium hover:opacity-90 transition-all active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-grayBg dark:bg-ink-surface text-ink dark:text-ink-text font-bold rounded-2xl hover:bg-lightGray dark:hover:bg-ink-elevated transition-all active:scale-95"
          >
            <Search size={18} />
            Explore stays
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
