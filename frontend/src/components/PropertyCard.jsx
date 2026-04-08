import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtils';

const PropertyCard = ({ property }) => {
  // If property is from backend, map its fields, otherwise use mock field structure
  const title = property.name || property.title;
  const location = property.city || property.location;
  const imageUrl = (property.photos && property.photos.length > 0) ? property.photos[0] : property.imageUrl;
  // Fallbacks for data not returned directly on search card DTO yet
  const host = property.host || property.contactInfo?.phoneNumber || "New Listing";
  const dates = property.dates || "Check availability";
  const price = property.price || 0;
  const rating = property.averageRating ? property.averageRating.toFixed(1) : "New";
  const reviewCount = property.reviewCount || 0;

  return (
    <Link to={`/hotel/${property.id}`} className="flex flex-col cursor-pointer group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-grayBg mb-3">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-1 hover:scale-110 transition-transform">
          <Heart 
             size={24}   
             className={property.isFavorite ? "fill-primary text-primary" : "fill-black/30 text-white"} 
          />
        </button>
      </div>

      {/* Property Details */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-dark text-[15px] leading-tight truncate max-w-[220px]">
            {location} • {title}
          </h3>
          <p className="text-gray-500 text-[15px] mt-0.5">{host}</p>
          <p className="text-gray-500 text-[15px]">{dates}</p>
          <div className="flex items-center gap-1 mt-1 font-semibold">
            <span className="text-dark">{formatCurrency(price)}</span>
            <span className="text-gray-500 font-normal">night</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mt-0.5">
          <Star size={14} className="fill-dark text-dark" />
          <span className="text-[15px] font-light text-dark">{rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
