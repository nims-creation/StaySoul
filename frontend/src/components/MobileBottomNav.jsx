import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, Briefcase, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/',         icon: Search,    label: 'Explore'  },
  { to: '/favorites',icon: Heart,     label: 'Wishlist' },
  { to: '/trips',    icon: Briefcase, label: 'Trips'    },
];

const MobileBottomNav = () => {
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60]">
      {/* Frosted glass bar */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-lightGray shadow-[0_-8px_32px_rgba(13,13,13,0.08)]">
        <div className="flex items-center justify-around py-2.5 px-2 max-w-sm mx-auto">

          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted hover:text-charcoal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-primary-light' : ''
                  }`}>
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={isActive ? 'text-primary' : 'text-muted'}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-light rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {/* Profile / Login */}
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted hover:text-charcoal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                    isActive ? 'bg-primary-light' : ''
                  }`}>
                    <User size={20} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-primary' : 'text-muted'} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-muted'}`}>Profile</span>
                </>
              )}
            </NavLink>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl text-muted hover:text-charcoal transition-all"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl">
                <User size={20} strokeWidth={1.8} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider">Log in</span>
            </button>
          )}

        </div>
      </div>

      {/* Safe area spacer for phones with home bar */}
      <div className="bg-white/80 backdrop-blur-xl h-safe-bottom" />
    </div>
  );
};

export default MobileBottomNav;
