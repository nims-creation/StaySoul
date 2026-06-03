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

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
