import React from 'react';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import { SearchX } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// SkeletonCard extracted to PropertyCardSkeleton.jsx for reuse across pages

const PropertyGrid = ({ properties, isLoading, error, isSplitView }) => {
  const { searchParams } = useSearch();

  const gridCls = isSplitView
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  const wrapperCls = isSplitView
    ? 'flex-1 px-4 overflow-y-auto max-h-[calc(100vh-160px)] thin-scrollbar pt-6'
    : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24';

  if (isLoading) {
    return (
      <div className={wrapperCls}>
        <div className={`grid gap-x-5 gap-y-8 ${gridCls}`}>
          {[...Array(8)].map((_, i) => <PropertyCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!isLoading && properties.length === 0) {
    return (
      <div className="flex-1 px-4 pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <div className="bg-grayBg p-7 rounded-3xl mb-5 shadow-card">
          <SearchX size={44} className="text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">No stays found</h2>
        <p className="text-muted max-w-sm text-[14px] leading-relaxed">
          Try adjusting your filters or exploring a different destination.
        </p>
      </div>
    );
  }

  return (
    <div className={wrapperCls}>
      {/* Error / demo banner */}
      {error && !isLoading && properties.length > 0 && (
        <div className="mb-6 px-4 py-3 bg-gold-light border border-gold/30 text-charcoal rounded-2xl text-[13px] font-medium flex items-center gap-2">
          <span>⏳</span>
          <span>{error}</span>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-x-5 gap-y-8 ${gridCls}`}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;
