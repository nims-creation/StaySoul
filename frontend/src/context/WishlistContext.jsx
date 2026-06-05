import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('staysoul_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('staysoul_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (hotelId) => {
    setWishlist(prev =>
      prev.includes(hotelId) ? prev.filter(id => id !== hotelId) : [...prev, hotelId]
    );
  };

  const isWishlisted = (hotelId) => wishlist.includes(hotelId);

  /** Total number of wishlisted properties — useful for badge counters in Navbar */
  const wishlistCount = wishlist.length;

  /** Remove all saved properties at once */
  const clearAll = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, wishlistCount, clearAll }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
