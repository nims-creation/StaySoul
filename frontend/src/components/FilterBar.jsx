import React, { useState } from 'react';
import { 
  Wifi, 
  Waves, 
  Wind, 
  Coffee, 
  Tv, 
  Car, 
  Utensils, 
  Dumbbell, 
  Sparkles, 
  Trees, 
  Palmtree, 
  Building2,
  SlidersHorizontal
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Stays', icon: Building2 },
  { id: 'beachfront', name: 'Beachfront', icon: Palmtree },
  { id: 'pool', name: 'Amazing Pools', icon: Waves },
  { id: 'nature', name: 'Nature', icon: Trees },
  { id: 'modern', name: 'Modern', icon: Sparkles },
  { id: 'wifi', name: 'WiFi Included', icon: Wifi },
  { id: 'gym', name: 'Fitness', icon: Dumbbell },
  { id: 'spa', name: 'Wellness', icon: Wind },
  { id: 'breakfast', name: 'Breakfast', icon: Coffee },
];

const FilterBar = ({ activeCategory, onCategoryChange, onToggleFilterModal }) => {
  return (
    <div className="sticky top-20 z-40 bg-white border-b border-lightGray shadow-sm pt-4 pb-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
        
        {/* Categories List */}
        <div className="flex gap-10 items-center flex-1 pr-6">
           {categories.map((cat) => {
             const Icon = cat.icon;
             const isActive = activeCategory === cat.id;
             return (
               <button
                 key={cat.id}
                 onClick={() => onCategoryChange(cat.id)}
                 className={`flex flex-col items-center gap-2 min-w-max pb-2 border-b-2 transition-all group ${
                   isActive 
                     ? 'border-dark text-dark font-bold' 
                     : 'border-transparent text-gray-400 font-medium hover:text-gray-600 hover:border-lightGray'
                 }`}
               >
                 <Icon size={24} className={isActive ? 'text-primary' : 'group-hover:text-gray-600'} />
                 <span className="text-xs whitespace-nowrap">{cat.name}</span>
               </button>
             );
           })}
        </div>

        {/* Global Filter Button */}
        <button 
           onClick={onToggleFilterModal}
           className="hidden md:flex items-center gap-2 px-4 py-3 border border-lightGray rounded-xl text-dark font-bold text-xs hover:bg-grayBg transition-all shrink-0 shadow-sm"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>

      </div>
    </div>
  );
};

export default FilterBar;
