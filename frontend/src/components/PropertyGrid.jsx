import React from 'react';
import PropertyCard from './PropertyCard';
import { mockProperties } from '../data/mockProperties';

const PropertyGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
        {mockProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
