import React, { useState } from 'react';
import {  
  Palmtree, 
  Home, 
  Mountain, 
  Waves, 
  Tent, 
  Castle, 
  TreePine,
  Coffee,
  Map
} from 'lucide-react';

const CategoryFilters = () => {
  const [active, setActive] = useState('Beachfront');

  const categories = [
    { name: 'Beachfront', icon: Palmtree },
    { name: 'Amazing Views', icon: Mountain },
    { name: 'Minimalist', icon: Home },
    { name: 'Lakefront', icon: Waves },
    { name: 'Cabins', icon: TreePine },
    { name: 'Castles', icon: Castle },
    { name: 'Camping', icon: Tent },
    { name: 'Bed & Breakfasts', icon: Coffee },
    { name: 'National Parks', icon: Map },
  ];

  return (
    <div className="pt-24 md:pt-20 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4 hide-scrollbar items-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = active === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => setActive(category.name)}
                className={`flex flex-col items-center justify-center min-w-max gap-2 pb-2 border-b-2 transition-colors ${
                  isActive 
                    ? 'border-ink text-ink' 
                    : 'border-transparent text-gray-500 hover:text-ink hover:border-gray-300'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
