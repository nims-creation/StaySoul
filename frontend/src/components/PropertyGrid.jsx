import React from 'react';
import PropertyCard from './PropertyCard';
import { SearchX } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SkeletonCard = () => (
  <div className="flex flex-col animate-pulse">
    <div className="relative aspect-square rounded-xl bg-gray-200 mb-3 border border-gray-100"></div>
    <div className="flex justify-between items-start">
      <div className="w-full">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-3"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
    </div>
  </div>
);

const PropertyGrid = ({ properties, isLoading, error, isSplitView }) => {
  const { searchParams } = useSearch();

  if (isLoading) {
    return (
      <div className={`flex-1 ${isSplitView ? 'px-4 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar pt-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20'}`}>
        <div className={`grid gap-x-6 gap-y-10 ${
          isSplitView 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && properties.length === 0) {
    return (
      <div className="flex-1 px-4 pt-20 pb-12 flex flex-col items-center justify-center text-center">
        <div className="bg-grayBg p-6 rounded-full mb-4">
          <SearchX size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-black text-dark mb-2 tracking-tight">No stays found</h2>
        <p className="text-gray-500 max-w-md font-medium leading-relaxed">
          Try adjusting your filters or searching for another location.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex-1 ${isSplitView ? 'px-4 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar pt-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20'}`}>
      {error && !isLoading && properties.length > 0 && (
        <div className="col-span-full bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl mb-6 text-sm font-medium flex items-center gap-2">
          ⏳ {error}
        </div>
      )}
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-x-6 gap-y-10 ${
          isSplitView 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;
