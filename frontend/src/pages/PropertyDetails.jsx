import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { hotelApi } from '../api/apiClient';
import { mockProperties } from '../data/mockProperties';
import { Star, Share, Heart, MapPin, Wifi, Car, Coffee, Tv, Utensils, Waves, Wind, Activity, Check } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import ReviewSection from '../components/ReviewSection';
import ReviewForm from '../components/ReviewForm';
import { formatCurrency } from '../utils/currencyUtils';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        // The API returns HotelInfoDto
        const data = await hotelApi.getHotelInfo(id);
        setProperty({
          ...data.hotel, // map core details out of the DTO
          price: data.hotel.price || (data.rooms && data.rooms.length > 0 ? data.rooms[0].price : 250), 
          rating: data.hotel.averageRating ? data.hotel.averageRating.toFixed(1) : "New",
          reviewCount: data.hotel.reviewCount || 0
        });
        setRooms(data.rooms || []);
      } catch (err) {
        console.error("Failed to fetch specific hotel, falling back to mock", err);
        // Fallback to mock data by ID
        const mockProp = mockProperties.find(p => p.id === parseInt(id)) || mockProperties[0];
        setProperty(mockProp);
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0); // scroll to top on mount
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 bg-grayBg dark:bg-ink-surface rounded-xl w-2/3 mb-3" />
        <div className="h-4 bg-grayBg dark:bg-ink-surface rounded-lg w-1/3 mb-8" />
        {/* Gallery skeleton */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <div className="col-span-2 row-span-2 bg-grayBg dark:bg-ink-surface" />
          <div className="bg-grayBg dark:bg-ink-surface" />
          <div className="bg-grayBg dark:bg-ink-surface" />
          <div className="bg-grayBg dark:bg-ink-surface" />
          <div className="bg-grayBg dark:bg-ink-surface" />
        </div>
        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 bg-grayBg dark:bg-ink-surface rounded-lg w-1/2" />
            <div className="h-4 bg-grayBg dark:bg-ink-surface rounded-lg w-full" />
            <div className="h-4 bg-grayBg dark:bg-ink-surface rounded-lg w-5/6" />
            <div className="h-4 bg-grayBg dark:bg-ink-surface rounded-lg w-4/6" />
          </div>
          <div className="lg:col-span-1 h-64 bg-grayBg dark:bg-ink-surface rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!property) return <div className="pt-24 text-center">Property not found.</div>;

  const title = property.name || property.title;
  const location = property.city || property.location;
  const host = property.host || property.contactInfo?.email || "Superhost";
  
  // High-end Gallery Logic
  const getImages = () => {
    let list = [];
    if (property.photos && property.photos.length > 0) {
      list = [...property.photos];
    } else if (property.imageUrl) {
      list = [property.imageUrl];
    }
    
    // Fill up to 5 images for the grid look
    const fallbacks = [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
    ];
    
    let i = 0;
    while(list.length < 5) {
      list.push(fallbacks[i % fallbacks.length]);
      i++;
    }
    return list;
  };

  const images = getImages();

  const getAmenityIcon = (name) => {
    const lower = name.toLowerCase();
    if(lower.includes('wifi')) return Wifi;
    if(lower.includes('pool') || lower.includes('swim') || lower.includes('beach')) return Waves;
    if(lower.includes('park') || lower.includes('car')) return Car;
    if(lower.includes('restaurant') || lower.includes('food') || lower.includes('dine')) return Utensils;
    if(lower.includes('spa') || lower.includes('gym') || lower.includes('fitness')) return Activity;
    if(lower.includes('tv') || lower.includes('screen')) return Tv;
    if(lower.includes('coffee') || lower.includes('work')) return Coffee;
    if(lower.includes('air') || lower.includes('ac')) return Wind;
    return Check;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      
      {/* Title & Header Metadata */}
      <div>
        <h1 className="text-[26px] font-semibold text-ink mb-1">{title}</h1>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-ink font-medium"><Star size={14} className="mr-1 fill-ink" /> {property.rating}</span>
            <span className="font-semibold underline">{property.reviewCount > 0 ? `${property.reviewCount} reviews` : 'No reviews yet'}</span>
            <span className="flex items-center text-gray-600"><MapPin size={14} className="mr-1" /> {location}</span>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center underline font-medium hover:bg-grayBg p-2 rounded-lg transition-colors"><Share size={16} className="mr-2" /> Share</button>
            <button className="flex items-center underline font-medium hover:bg-grayBg p-2 rounded-lg transition-colors"><Heart size={16} className="mr-2" /> Save</button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-6 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
        <div className="col-span-2 row-span-2 cursor-pointer relative group">
          <img src={images[0]} alt="main" className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
        </div>
        <div className="cursor-pointer group"><img src={images[1]} alt="img1" className="w-full h-full object-cover group-hover:brightness-90 transition-all" /></div>
        <div className="cursor-pointer group"><img src={images[2]} alt="img2" className="w-full h-full object-cover group-hover:brightness-90 transition-all" /></div>
        <div className="cursor-pointer group"><img src={images[3]} alt="img3" className="w-full h-full object-cover group-hover:brightness-90 transition-all" /></div>
        <div className="cursor-pointer group"><img src={images[4]} alt="img4" className="w-full h-full object-cover group-hover:brightness-90 transition-all" /></div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Info Column */}
        <div className="lg:col-span-2">
           <div className="flex justify-between items-center pb-6 border-b border-lightGray">
              <div>
                 <h2 className="text-2xl font-semibold mb-1">Entire place hosted by {host}</h2>
                 <p className="text-ink">4 guests · 2 bedrooms · 2 beds · 1 bath</p>
              </div>
           </div>

           {/* Description */}
           {property.description && (
             <div className="py-8 border-b border-lightGray">
               <p className="text-ink text-[16px] leading-relaxed whitespace-pre-line">{property.description}</p>
             </div>
           )}

           {/* Amenities */}
           <div className="py-8 border-b border-lightGray">
              <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4 text-ink text-[15px]">
                  {property.amenities ? property.amenities.map(a => {
                    const Icon = getAmenityIcon(a);
                    return <div key={a} className="flex items-center"><Icon size={24} className="mr-4 text-gray-500 font-light" /> {a}</div>;
                  }) : (
                    <>
                      <div className="flex items-center"><Wifi size={26} className="mr-4 font-light text-gray-600" /> Fast Wifi</div>
                      <div className="flex items-center"><Car size={26} className="mr-4 font-light text-gray-600" /> Free parking on premises</div>
                      <div className="flex items-center"><Tv size={26} className="mr-4 font-light text-gray-600" /> 55" HDTV with Netflix</div>
                      <div className="flex items-center"><Coffee size={26} className="mr-4 font-light text-gray-600" /> Dedicated workspace</div>
                    </>
                  )}
              </div>
           </div>
        </div>

        <div className="lg:col-span-1 relative">
           <BookingCard 
              price={property.price || 150} 
              rating={property.rating} 
              hotelId={id}
              roomId={rooms && rooms.length > 0 ? rooms[0].id : (property.id || 1)}
              hotelName={title}
              rooms={rooms}
           />
        </div>

      </div>

    </div>
  );
};

export default PropertyDetails;
