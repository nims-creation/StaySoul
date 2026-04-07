import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import BookingSuccess from './pages/BookingSuccess';
import BookingCancel from './pages/BookingCancel';
import MyTrips from './pages/MyTrips';
import AdminDashboard from './pages/AdminDashboard';
import ManageProperty from './pages/ManageProperty';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <AuthModal />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotel/:id" element={<PropertyDetails />} />
              <Route path="/booking/success" element={<BookingSuccess />} />
              <Route path="/booking/cancel" element={<BookingCancel />} />
              <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/manage" element={<ProtectedRoute adminOnly={true}><ManageProperty /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
