import React from 'react';
import Navbar from './components/Navbar';
import CategoryFilters from './components/CategoryFilters';
import PropertyGrid from './components/PropertyGrid';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoryFilters />
      <main>
        <PropertyGrid />
      </main>
    </div>
  );
}

export default App;
