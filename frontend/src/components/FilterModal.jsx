import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

const AMENITY_LIST = ['Free WiFi', 'Pool', 'Kitchen', 'Free Parking', 'Air Conditioning', 'Dedicated Workspace'];

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || '');
  const [selectedAmenities, setSelectedAmenities] = useState(currentFilters.amenities || []);

  if (!isOpen) return null;

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleApply = () => {
    onApply({
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      amenities: selectedAmenities,
    });
    onClose();
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedAmenities([]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-lightGray flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-grayBg rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-black text-ink tracking-tight">Filters</h2>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>

        {/* Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          
          {/* Price Range */}
          <section className="mb-10">
             <h3 className="text-xl font-black text-ink mb-2 tracking-tight">Price range</h3>
             <p className="text-gray-500 mb-6 font-medium">Average nightly rate including taxes and fees.</p>
             
             <div className="flex items-center gap-4">
                <div className="flex-1 border-2 border-lightGray rounded-2xl p-4 focus-within:border-ink transition-all">
                   <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Minimum</label>
                   <div className="flex items-center">
                      <span className="text-gray-500 font-bold mr-1">₹</span>
                      <input 
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-transparent focus:outline-none text-ink font-black text-lg"
                      />
                   </div>
                </div>
                
                <div className="w-4 h-[2px] bg-lightGray"></div>

                <div className="flex-1 border-2 border-lightGray rounded-2xl p-4 focus-within:border-ink transition-all">
                   <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Maximum</label>
                   <div className="flex items-center">
                      <span className="text-gray-500 font-bold mr-1">₹</span>
                      <input 
                        type="number"
                        placeholder="1,00,000+"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-transparent focus:outline-none text-ink font-black text-lg"
                      />
                   </div>
                </div>
             </div>
          </section>

          {/* Amenities (Future expansion area) */}
          <section>
             <h3 className="text-xl font-black text-ink mb-4 tracking-tight">Essential Amenities</h3>
             <div className="grid grid-cols-2 gap-3">
                 {AMENITY_LIST.map(amenity => (
                   <label key={amenity} className="flex items-center gap-3 p-4 border border-lightGray rounded-2xl hover:bg-grayBg cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-primary rounded-lg"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      <span className="text-sm font-bold text-ink">{amenity}</span>
                   </label>
                 ))}
             </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-lightGray bg-white flex justify-between items-center">
           <button 
             onClick={handleReset}
             className="text-ink font-black underline underline-offset-4 hover:text-primary transition-colors flex items-center gap-2"
           >
             <RefreshCw size={18} />
             Reset All
           </button>
           
           <button 
             onClick={handleApply}
             className="px-10 py-4 bg-ink text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
           >
             Show results
           </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
