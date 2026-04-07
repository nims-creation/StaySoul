import React from 'react';
import { Search, Globe, Menu, UserCircle } from 'lucide-react';

const Navbar = () => {
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
          <div className="flex items-center justify-end space-x-1">
            <button className="hidden md:block text-sm font-semibold hover:bg-grayBg px-4 py-2 rounded-full transition-colors">
              StaySoul your home
            </button>
            <button className="p-2 hover:bg-grayBg rounded-full transition-colors hidden md:block">
              <Globe size={18} className="text-dark" />
            </button>
            
            <div className="flex items-center space-x-2 border border-lightGray rounded-full p-2 pl-3 ml-2 hover:shadow-md transition-shadow cursor-pointer">
              <Menu size={18} className="text-dark" />
              <UserCircle size={30} className="text-gray-500" />
            </div>
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
