import React from 'react';
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
  SlidersHorizontal,
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all',       name: 'All Stays',   icon: Building2 },
  { id: 'beachfront',name: 'Beachfront',  icon: Palmtree  },
  { id: 'pool',      name: 'Pools',       icon: Waves     },
  { id: 'nature',    name: 'Nature',      icon: Trees     },
  { id: 'modern',    name: 'Modern',      icon: Sparkles  },
  { id: 'wifi',      name: 'Wi‑Fi',       icon: Wifi      },
  { id: 'gym',       name: 'Fitness',     icon: Dumbbell  },
  { id: 'spa',       name: 'Wellness',    icon: Wind      },
  { id: 'breakfast', name: 'Breakfast',   icon: Coffee    },
];

const FilterBar = ({ activeCategory, onCategoryChange, onToggleFilterModal }) => {
  return (
    <div className="sticky top-20 z-40 bg-cream/90 backdrop-blur-md border-b border-lightGray shadow-sm pt-3 pb-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">

        {/* Categories List */}
        <div className="flex gap-2 items-center flex-1 pr-4">
          {categories.map((cat) => {
            const Icon    = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0
                  ${isActive
                    ? 'bg-dark text-white shadow-premium'
                    : 'bg-white text-charcoal border border-lightGray hover:border-charcoal hover:text-dark hover:shadow-sm'
                  }`}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? 'text-white' : 'text-muted'}
                />
                <span>{cat.name}</span>

                {/* Active glow dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Filter Button */}
        <button
          onClick={onToggleFilterModal}
          className="hidden md:flex items-center gap-2 px-4 py-2.5 border border-lightGray rounded-full text-dark font-semibold text-sm hover:border-dark hover:shadow-sm transition-all shrink-0 bg-white"
        >
          <SlidersHorizontal size={15} strokeWidth={1.8} />
          <span>Filters</span>
        </button>

      </div>
    </div>
  );
};

export default FilterBar;
