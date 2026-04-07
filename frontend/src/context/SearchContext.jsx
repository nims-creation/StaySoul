import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    startDate: '',
    endDate: '',
    guests: 1
  });

  const updateSearch = (newParams) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  const resetSearch = () => {
    setSearchParams({
      location: '',
      startDate: '',
      endDate: '',
      guests: 1
    });
  };

  return (
    <SearchContext.Provider value={{ searchParams, updateSearch, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
