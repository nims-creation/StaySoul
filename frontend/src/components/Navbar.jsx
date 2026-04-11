import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Menu, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthModalOpen, logout } = useAuth();
  const { searchParams, updateSearch } = useSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    updateSearch({ [name]: value });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="fixed w-full bg-white z-[9999] border-b border-lightGray shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-primary font-bold text-2xl tracking-tighter">StaySoul</span>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="flex items-center border border-lightGray rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col px-3 border-r border-lightGray">
                <label className="text-[10px] font-bold uppercase text-dark">Location</label>
                <input 
                  type="text" 
                  name="location"
                  placeholder="Where are you going?" 
                  className="text-sm font-semibold focus:outline-none w-40 placeholder:font-normal"
                  value={searchParams.location}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex flex-col px-4 border-r border-lightGray">
                <label className="text-[10px] font-bold uppercase text-dark">Guests</label>
                <input 
                  type="number" 
                  name="guests"
                  min="1"
                  className="text-sm font-semibold focus:outline-none w-16"
                  value={searchParams.guests}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="bg-primary p-2.5 rounded-full text-white ml-2 cursor-pointer hover:bg-primary-hover transition-colors">
                <Search size={18} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center justify-end space-x-1 relative" ref={dropdownRef}>
            <button 
              onClick={() => navigate('/admin')}
              className="hidden lg:block text-sm font-semibold hover:bg-grayBg px-4 py-2 rounded-full transition-colors"
            >
              StaySoul your home
            </button>
            <button className="p-2 hover:bg-grayBg rounded-full transition-colors hidden md:block">
              <Globe size={18} className="text-dark" />
            </button>
            
            <div 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="flex items-center space-x-2 border border-lightGray rounded-full p-2 pl-3 ml-2 hover:shadow-md transition-shadow cursor-pointer"
            >
              <Menu size={18} className="text-dark" />
              <UserCircle size={30} className={isAuthenticated ? "text-primary" : "text-gray-500"} />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-60 bg-white border border-lightGray rounded-xl shadow-lg py-2 flex flex-col z-50 animate-in fade-in zoom-in duration-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm font-bold text-dark border-b border-lightGray mb-1">
                      Hi, {user?.name || user?.email?.split('@')[0]}
                    </div>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-medium cursor-pointer">Messages</button>
                    <button 
                      onClick={() => { navigate('/trips'); setIsDropdownOpen(false); }}
                      className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-medium cursor-pointer"
                    >
                      Trips
                    </button>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-medium cursor-pointer">Wishlists</button>
                    <div className="h-[1px] bg-lightGray my-1"></div>
                    <button onClick={logout} className="flex space-x-2 items-center text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer">
                       <LogOut size={16} className="text-gray-600" />
                       <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => { setIsAuthModalOpen(true); setIsDropdownOpen(false); }} 
                      className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-bold cursor-pointer"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => { setIsAuthModalOpen(true); setIsDropdownOpen(false); }} 
                      className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer"
                    >
                      Sign up
                    </button>
                    <div className="h-[1px] bg-lightGray my-1"></div>
                    <button 
                      onClick={() => { navigate('/admin'); setIsDropdownOpen(false); }}
                      className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer"
                    >
                      StaySoul your home
                    </button>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer">Help center</button>
                  </>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
          <div className="flex items-center justify-center border border-lightGray rounded-full p-2.5 shadow-sm bg-white">
              <Search size={18} className="text-dark mr-3" />
              <input 
                type="text" 
                name="location"
                placeholder="Anywhere • Any week • Guests" 
                className="text-sm font-semibold focus:outline-none w-full"
                value={searchParams.location}
                onChange={handleSearchChange}
              />
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
