import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { hotelApi } from '../api/apiClient';
import { mockProperties } from '../data/mockProperties'; // Fallback if API fails
import { SearchX } from 'lucide-react';

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        // By default we search Mumbai but the API handles the pagination!
        const data = await hotelApi.searchHotels(); 
        setProperties(data.content || []); // Paged response has 'content' array
        setError(null);
      } catch (err) {
        console.error("Failed to fetch backend hotels, falling back to mock data.", err);
        setError("Could not connect to backend database.");
        // Fallback to mock data for presentation purposes if backend fails/unavailable
        setProperties(mockProperties); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Display empty state if backend succeeds but DB is totally empty
  if (!isLoading && properties.length === 0 && !error) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center text-center">
        <div className="bg-grayBg p-6 rounded-full mb-4">
          <SearchX size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-dark mb-2">No hotels found</h2>
        <p className="text-gray-500 max-w-md">
          Your database is currently empty. Login as an admin manager and create a hotel listing to see it appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center">
           ⚠️ {error} - Showing mock data instead.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
