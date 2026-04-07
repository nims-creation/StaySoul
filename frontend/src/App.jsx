import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AuthModal from './components/AuthModal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <AuthModal />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotel/:id" element={<PropertyDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
