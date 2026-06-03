import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Menu, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/apiClient';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthModalOpen, logout } = useAuth();
  const { searchParams, updateSearch } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled]         = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    updateSearch({ [name]: value });
  };

  const handleBecomeHostClick = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      setIsDropdownOpen(false);
      return;
    }
    if (user?.roles?.includes('HOTEL_MANAGER')) {
      navigate('/admin');
      setIsDropdownOpen(false);
      return;
    }
    if (window.confirm('Would you like to upgrade your account to a Host so you can start listing properties?')) {
      try {
        await userApi.upgradeToHost();
        alert('Success! You are now a Host. Please log out and log back in to access the Host Dashboard.');
        setIsDropdownOpen(false);
      } catch (err) {
        console.error('Upgrade failed:', err);
        alert('Failed to upgrade account. Please try again later.');
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-navbar border-b border-lightGray dark:border-dark-border'
          : 'bg-cream dark:bg-dark-bg border-b border-lightGray/60 dark:border-dark-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <div
            onClick={() => navigate('/')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            {/* Flame icon mark */}
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="text-white text-base leading-none">✦</span>
            </div>
            <span className="text-gradient-primary font-extrabold text-xl tracking-tight">
              StaySoul
            </span>
          </div>

          {/* ── Search Bar — Center ───────────────────────────────────────── */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="flex items-center bg-white dark:bg-dark-surface border border-lightGray dark:border-dark-border rounded-full py-2.5 px-5 shadow-card hover:shadow-card-hover transition-all duration-200 w-full max-w-md">
              <div className="flex flex-col flex-1 pr-4 border-r border-lightGray dark:border-dark-border">
                <label className="text-[9px] font-bold uppercase tracking-widest text-muted mb-0.5">
                  Where
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Anywhere in the world"
                  className="text-[13px] font-semibold focus:outline-none bg-transparent placeholder:text-muted placeholder:font-normal text-dark dark:text-dark-text w-36"
                  value={searchParams.location}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex flex-col pl-4 pr-3">
                <label className="text-[9px] font-bold uppercase tracking-widest text-muted mb-0.5">
                  Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  className="text-[13px] font-semibold focus:outline-none bg-transparent w-10 text-dark dark:text-dark-text"
                  value={searchParams.guests}
                  onChange={handleSearchChange}
                />
              </div>
              {/* Search button */}
              <div className="ml-2 bg-gradient-primary p-2.5 rounded-full text-white cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-sm">
                <Search size={16} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* ── Right Menu ───────────────────────────────────────────────── */}
          <div className="flex items-center gap-1 relative" ref={dropdownRef}>
            {/* Become a host text */}
            <button
              onClick={handleBecomeHostClick}
              className="hidden lg:block text-[13px] font-semibold text-dark dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface px-4 py-2 rounded-full transition-all"
            >
              {user?.roles?.includes('HOTEL_MANAGER') ? 'Switch to hosting' : 'StaySoul your home'}
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            <button className="p-2 hover:bg-grayBg dark:hover:bg-dark-surface rounded-full transition-colors hidden md:flex items-center justify-center">
              <Globe size={17} strokeWidth={1.8} className="text-charcoal dark:text-dark-text" />
            </button>

            {/* Avatar + dropdown trigger */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-lightGray dark:border-dark-border rounded-full px-3 py-2 ml-1 cursor-pointer hover:shadow-premium transition-all duration-200"
            >
              <Menu size={16} strokeWidth={1.8} className="text-charcoal dark:text-dark-text" />
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                isAuthenticated
                  ? 'bg-gradient-primary text-white'
                  : 'bg-grayBg dark:bg-dark-elevated text-muted'
              }`}>
                {isAuthenticated && user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : <UserCircle size={18} className="text-muted" />
                }
              </div>
            </div>

            {/* ── Dropdown ───────────────────────────────────────────────── */}
            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-64 bg-white dark:bg-dark-elevated border border-lightGray dark:border-dark-border rounded-2xl shadow-premium py-2 flex flex-col z-50 overflow-hidden">
                {isAuthenticated ? (
                  <>
                    {/* User header */}
                    <div className="px-4 py-3 border-b border-lightGray dark:border-dark-border">
                      <p className="text-[11px] text-muted font-medium uppercase tracking-widest mb-0.5">Signed in as</p>
                      <p className="text-dark dark:text-dark-heading font-bold text-[14px] truncate">{user?.name || user?.email?.split('@')[0]}</p>
                    </div>

                    {[
                      { label: 'Messages',  action: null },
                      { label: 'Trips',     action: () => { navigate('/trips'); setIsDropdownOpen(false); } },
                      { label: 'Wishlists', action: null },
                      { label: 'Profile',   action: () => { navigate('/profile'); setIsDropdownOpen(false); } },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="text-left px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}

                    <div className="h-px bg-lightGray dark:bg-dark-border mx-4 my-1" />

                    {user?.roles?.includes('HOTEL_MANAGER') ? (
                      <button
                        onClick={() => { navigate('/admin'); setIsDropdownOpen(false); }}
                        className="text-left px-4 py-2.5 text-[13px] font-semibold text-primary hover:bg-primary-light transition-colors"
                      >
                        Host Dashboard ✦
                      </button>
                    ) : (
                      <button
                        onClick={handleBecomeHostClick}
                        className="text-left px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                      >
                        StaySoul your home
                      </button>
                    )}

                    <button
                      onClick={logout}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                    >
                      <LogOut size={14} strokeWidth={1.8} className="text-muted" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsAuthModalOpen(true); setIsDropdownOpen(false); }}
                      className="text-left px-4 py-2.5 text-[13px] font-bold text-dark dark:text-dark-heading hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => { setIsAuthModalOpen(true); setIsDropdownOpen(false); }}
                      className="text-left px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                    >
                      Sign up
                    </button>
                    <div className="h-px bg-lightGray dark:bg-dark-border mx-4 my-1" />
                    <button
                      onClick={handleBecomeHostClick}
                      className="text-left px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors"
                    >
                      StaySoul your home
                    </button>
                    <button className="text-left px-4 py-2.5 text-[13px] font-medium text-charcoal dark:text-dark-text hover:bg-grayBg dark:hover:bg-dark-surface transition-colors">
                      Help center
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Mobile Search Bar ─────────────────────────────────────────────── */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-white dark:bg-dark-surface border border-lightGray dark:border-dark-border rounded-full px-4 py-2.5 shadow-card">
          <Search size={15} strokeWidth={2} className="text-primary mr-3 shrink-0" />
          <input
            type="text"
            name="location"
            placeholder="Where to? Explore the world…"
            className="text-[13px] font-semibold focus:outline-none bg-transparent w-full text-dark dark:text-dark-text placeholder:text-muted placeholder:font-normal"
            value={searchParams.location}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
