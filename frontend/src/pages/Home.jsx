import React, { useState, useEffect, useRef } from 'react';
import FilterBar from '../components/FilterBar';
import FilterModal from '../components/FilterModal';
import PropertyGrid from '../components/PropertyGrid';
import PropertyMap from '../components/PropertyMap';
import { useSearch } from '../context/SearchContext';
import { hotelApi } from '../api/apiClient';
import { mockProperties } from '../data/mockProperties';
import { Map as MapIcon, List as ListIcon } from 'lucide-react';

const Home = () => {
  const { searchParams, updateSearch, resetSearch } = useSearch();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const city = searchParams.location || 'Mumbai';
      const category = (searchParams.category === 'all' || !searchParams.category) ? null : searchParams.category;
      
      const data = await hotelApi.searchHotels(city, 0, 20, searchParams.minPrice, searchParams.maxPrice, category); 
      setProperties(data.content || []);
      setError(null);
    } catch (err) {
      console.error("Backend fetch failed, using mock data", err);
      setError("Server warming up. Showing demo data — refresh in ~30 seconds for live results.");
      // Always show ALL mock data on error so the page is never blank
      setProperties(mockProperties);
    } finally {
      setIsLoading(false);
    }
  };

  // Use a ref to track first mount and prevent double-fetch race condition
  const isMounted = useRef(false);

  // On first mount: reset stale location, then fetch
  useEffect(() => {
    isMounted.current = true;
    if (searchParams.location) {
      // Clear stale location — searchParams change will trigger the effect below
      updateSearch({ location: '' });
    } else {
      fetchHotels();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch on every subsequent searchParams change (debounced)
  useEffect(() => {
    if (!isMounted.current) return;
    const timer = setTimeout(fetchHotels, 500);
    return () => clearTimeout(timer);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="bg-white min-h-screen relative">
      <FilterBar 
        activeCategory={searchParams.category} 
        onCategoryChange={(cat) => updateSearch({ category: cat })}
        onToggleFilterModal={() => setIsFilterModalOpen(true)}
      />
      
      <main className={`transition-all duration-500 ${showMap ? 'flex h-[calc(100vh-160px)] overflow-hidden' : 'pb-20'}`}>
        {/* List View */}
        <div className={`transition-all duration-500 ${showMap ? 'w-full lg:w-3/5' : 'w-full'}`}>
           <PropertyGrid 
             properties={properties} 
             isLoading={isLoading} 
             error={error} 
             isSplitView={showMap}
           />
        </div>

        {/* Map View */}
        {showMap && (
          <div className="hidden lg:block lg:w-2/5 h-full p-4 pl-0">
             <PropertyMap properties={properties} />
          </div>
        )}
      </main>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setShowMap(!showMap)}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-dark text-white px-6 py-4 rounded-full font-black text-sm flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        {showMap ? <ListIcon size={18} /> : <MapIcon size={18} />}
        {showMap ? 'Show list' : 'Show map'}
      </button>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filters) => updateSearch(filters)}
        currentFilters={searchParams}
      />
    </div>
  );
};

export default Home;

