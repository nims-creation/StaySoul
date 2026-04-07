import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { hotelApi } from '../api/apiClient';
import { mockProperties } from '../data/mockProperties';
import { SearchX, Loader2 } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const PropertyGrid = () => {
  const { searchParams } = useSearch();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        // Map search parameters to API call
        // The API expects 'city', 'startDate', 'endDate', 'roomsCount' (guests/2 roughly, but we can send 1 for simplicity or map it)
        const city = searchParams.location || 'Mumbai';
        const data = await hotelApi.searchHotels(city, 0, 20); 
        
        setProperties(data.content || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch backend hotels, falling back to mock data.", err);
        setError("Could not connect to backend database.");
        // Apply local filtering to mock data if backend fails
        const filteredMock = mockProperties.filter(p => 
          !searchParams.location || 
          p.location.toLowerCase().includes(searchParams.location.toLowerCase()) ||
          p.city?.toLowerCase().includes(searchParams.location.toLowerCase())
        );
        setProperties(filteredMock); 
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchHotels();
    }, 500); // Debounce search requests

    return () => clearTimeout(debounceTimer);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-gray-500 font-medium">Finding the perfect stays for you...</p>
      </div>
    );
  }

  if (!isLoading && properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center text-center">
        <div className="bg-grayBg p-6 rounded-full mb-4">
          <SearchX size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-dark mb-2">No hotels found {searchParams.location && `in "${searchParams.location}"`}</h2>
        <p className="text-gray-500 max-w-md">
          {error 
            ? "We're having trouble connecting to the server. Please try again later."
            : "Try adjusting your search filters or searching for another location."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {error && !isLoading && properties.length > 0 && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center border border-red-100">
           ⚠️ {error} - Showing matching mock data instead.
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
