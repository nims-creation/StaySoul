import React, { useState } from 'react';
import { Search, Globe, Menu, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthModalOpen, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white z-50 border-b border-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-primary font-bold text-2xl tracking-tighter">StaySoul</span>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 justify-center px-2">
            <div className="flex items-center border border-lightGray rounded-full p-2 pl-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-sm font-semibold px-2 border-r border-lightGray">Anywhere</span>
              <span className="text-sm font-semibold px-4 border-r border-lightGray">Any week</span>
              <span className="text-sm font-normal text-gray-500 px-4">Add guests</span>
              <div className="bg-primary p-2 rounded-full text-white">
                <Search size={16} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center justify-end space-x-1 relative">
            <button className="hidden md:block text-sm font-semibold hover:bg-grayBg px-4 py-2 rounded-full transition-colors">
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
              <div className="absolute top-14 right-0 w-60 bg-white border border-lightGray rounded-xl shadow-lg py-2 flex flex-col z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm font-bold text-dark border-b border-lightGray mb-1">
                      Hi, {user?.name}
                    </div>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-medium cursor-pointer">Messages</button>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark font-medium cursor-pointer">Trips</button>
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
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer">StaySoul your home</button>
                    <button className="text-left px-4 py-2.5 text-sm hover:bg-grayBg transition-colors text-dark cursor-pointer">Help center</button>
                  </>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Mobile Search Bar (shows only on small screens below the main navbar) */}
      <div className="md:hidden px-4 pb-4">
          <div className="flex items-center justify-center border border-lightGray rounded-full p-3 shadow-sm bg-white">
              <Search size={20} className="text-dark mr-3" />
              <div className="flex flex-col items-start w-full">
                  <span className="text-sm font-semibold">Anywhere</span>
                  <span className="text-xs text-gray-500">Any week • Add guests</span>
              </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
