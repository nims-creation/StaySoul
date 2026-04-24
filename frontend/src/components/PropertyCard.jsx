import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtils';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28 },
  },
};

const PropertyCard = ({ property }) => {
  const title    = property.name   || property.title;
  const location = property.city   || property.location;
  const imageUrl = (property.photos && property.photos.length > 0)
    ? property.photos[0]
    : property.imageUrl;
  const dates       = property.dates  || 'Check availability';
  const price       = property.price  || 0;
  const rating      = property.averageRating ? property.averageRating.toFixed(1) : null;
  const reviewCount = property.reviewCount   || 0;

  const [imgError,    setImgError]    = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(property.isFavorite || false);
  const [heartPop,    setHeartPop]    = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 350);
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col group h-full">
      <Link to={`/hotel/${property.id}`} className="flex flex-col h-full">

        {/* ── Image Container ───────────────────────────────────────────── */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-grayBg mb-3 shadow-card group-hover:shadow-card-hover transition-shadow duration-300">

          {/* Image */}
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-grayBg to-lightGray flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Image unavailable</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              onError={() => setImgError(true)}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

          {/* Rating badge — glassmorphism */}
          {rating && (
            <div className="absolute top-3 left-3 glass-card flex items-center gap-1 px-2.5 py-1.5 rounded-xl">
              <Star size={11} className="fill-gold text-gold" />
              <span className="text-dark text-[11px] font-bold leading-none">{rating}</span>
              {reviewCount > 0 && (
                <span className="text-muted text-[10px] font-medium leading-none">({reviewCount})</span>
              )}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full glass-card hover:scale-110 active:scale-95 transition-all duration-200"
            style={{ transform: heartPop ? 'scale(1.3)' : undefined }}
          >
            <Heart
              size={16}
              className={`transition-colors duration-200 ${
                isWishlisted
                  ? 'fill-primary text-primary'
                  : 'fill-black/20 text-white'
              }`}
            />
          </button>
        </div>

        {/* ── Property Details ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-0.5 px-0.5">
          {/* Location + Title */}
          <h3 className="font-semibold text-dark text-[14.5px] leading-snug truncate">
            {location}
            {title && location && <span className="text-muted font-normal"> · </span>}
            {title}
          </h3>

          {/* Dates */}
          <p className="text-muted text-[13px]">{dates}</p>

          {/* Price */}
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-dark font-bold text-[15px]">
              {formatCurrency(price)}
            </span>
            <span className="text-muted text-[13px] font-normal">/ night</span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
};

export default PropertyCard;
