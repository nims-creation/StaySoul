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
  const [totalCount, setTotalCount] = useState(0);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const city = searchParams.location || '';
      const category = (searchParams.category === 'all' || !searchParams.category) ? null : searchParams.category;
      
      const data = await hotelApi.searchHotels(city, 0, 20, searchParams.minPrice, searchParams.maxPrice, category); 
      setProperties(data.content || []);
      setTotalCount(data.totalElements || 0);
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

  // Track whether initial mount is done to prevent double-fetch
  const isMounted = useRef(false);
  // Track whether we just reset location to skip the triggered re-fetch
  const skipNextFetch = useRef(false);

  // On first mount: reset stale location if needed, then fetch
  useEffect(() => {
    if (searchParams.location) {
      skipNextFetch.current = true; // next searchParams change is just our own reset, skip it
      updateSearch({ location: '' });
    } else {
      fetchHotels();
    }
    isMounted.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch on every subsequent searchParams change (debounced)
  useEffect(() => {
    if (!isMounted.current) return; // skip on initial mount (handled above)
    if (skipNextFetch.current) {
      skipNextFetch.current = false; // consume the flag, then fetch after reset
      const timer = setTimeout(fetchHotels, 100);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(fetchHotels, 500);
    return () => clearTimeout(timer);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update page title based on active search
  useEffect(() => {
    const city = searchParams.location;
    document.title = city
      ? `StaySoul – Hotels in ${city}`
      : 'StaySoul – Find Your Perfect Stay';
    return () => { document.title = 'StaySoul'; };
  }, [searchParams.location]);


  return (
    <div className="bg-cream min-h-screen relative">
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
        className="fixed bottom-[72px] lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gradient-primary text-white px-6 py-3.5 rounded-full font-bold text-[13px] flex items-center gap-2.5 shadow-premium hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
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

