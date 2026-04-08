import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, Map, User, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = () => {
  const { user, isAuthenticated, setIsAuthModalOpen } = useAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lightGray flex items-center justify-around py-3 px-2 z-[60] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
      >
        <Search size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
      </NavLink>

      <NavLink 
        to="/favorites" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
      >
        <Heart size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Wishlist</span>
      </NavLink>

      <NavLink 
        to="/trips" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
      >
        <Briefcase size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Trips</span>
      </NavLink>

      {isAuthenticated ? (
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </NavLink>
      ) : (
        <button 
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <User size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Log in</span>
        </button>
      )}
    </div>
  );
};

export default MobileBottomNav;
