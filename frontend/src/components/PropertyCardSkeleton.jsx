import React from 'react';

/**
 * PropertyCardSkeleton — shimmer placeholder that mirrors PropertyCard layout.
 * Used by PropertyGrid during the initial data fetch to prevent layout shift.
 */
const PropertyCardSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-square rounded-2xl bg-lightGray dark:bg-dark-elevated mb-3 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skeleton-shimmer" />
    </div>

    {/* Title / location line */}
    <div className="h-3.5 bg-lightGray dark:bg-dark-elevated rounded-full w-3/4 mb-2" />

    {/* Subtitle / dates line */}
    <div className="h-3 bg-lightGray dark:bg-dark-elevated rounded-full w-1/2 mb-3" />

    {/* Price line */}
    <div className="h-3.5 bg-lightGray dark:bg-dark-elevated rounded-full w-2/5" />
  </div>
);

export default PropertyCardSkeleton;
