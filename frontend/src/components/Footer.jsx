import React from 'react';
import { Instagram, Twitter, Facebook, Globe, DollarSign } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-lightGray pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          <div>
            <h4 className="text-sm font-bold text-dark mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:underline cursor-pointer">Help Centre</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li className="hover:underline cursor-pointer">Disability support</li>
              <li className="hover:underline cursor-pointer">Cancellation options</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-dark mb-4">Hosting</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:underline cursor-pointer">StaySoul your home</li>
              <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li className="hover:underline cursor-pointer">Hosting resources</li>
              <li className="hover:underline cursor-pointer">Community forum</li>
              <li className="hover:underline cursor-pointer">Hosting responsibly</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-dark mb-4">StaySoul</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:underline cursor-pointer">Newsroom</li>
              <li className="hover:underline cursor-pointer">New features</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Investors</li>
              <li className="hover:underline cursor-pointer">Gift cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-dark mb-4">Social</h4>
            <div className="flex space-x-4">
              <Instagram className="text-dark hover:text-primary cursor-pointer transition-colors" size={20} />
              <Twitter className="text-dark hover:text-primary cursor-pointer transition-colors" size={20} />
              <Facebook className="text-dark hover:text-primary cursor-pointer transition-colors" size={20} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-lightGray pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2">
            <span>© 2026 StaySoul, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
          </div>
          
          <div className="flex items-center space-x-6 font-semibold text-dark">
            <button className="flex items-center gap-1 hover:bg-grayBg p-2 rounded-lg transition-colors">
              <Globe size={16} />
              <span>English (IN)</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-grayBg p-2 rounded-lg transition-colors">
              <DollarSign size={16} />
              <span>USD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
