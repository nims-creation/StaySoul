import React from 'react';
import PropertyCard from './PropertyCard';
import { SearchX, Loader2 } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const PropertyGrid = ({ properties, isLoading, error, isSplitView }) => {
  const { searchParams } = useSearch();

  if (isLoading) {
    return (
      <div className="flex-1 px-4 pt-20 pb-12 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-gray-500 font-medium italic">Finding the perfect stays...</p>
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
      
      <div className={`grid gap-x-6 gap-y-10 ${
        isSplitView 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
