import React from 'react';
import { Heart, Star } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="flex flex-col cursor-pointer group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-grayBg mb-3">
        <img 
          src={property.imageUrl} 
          alt={property.title}
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
            {property.location}
          </h3>
          <p className="text-gray-500 text-[15px] mt-0.5">{property.host}</p>
          <p className="text-gray-500 text-[15px]">{property.dates}</p>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="font-semibold text-dark text-[15px]">${property.price}</span>
            <span className="text-dark text-[15px] font-normal">night</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mt-0.5">
          <Star size={14} className="fill-dark text-dark" />
          <span className="text-[15px] font-light text-dark">{property.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
