import React from 'react';
import CategoryFilters from '../components/CategoryFilters';
import PropertyGrid from '../components/PropertyGrid';

const Home = () => {
  return (
    <>
      <CategoryFilters />
      <main>
        <PropertyGrid />
      </main>
    </>
  );
};

export default Home;
