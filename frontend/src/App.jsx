import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import PaymentStatus from './pages/PaymentStatus';
import OAuth2Callback from './pages/OAuth2Callback';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <AuthModal />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotel/:id" element={<PropertyDetails />} />
                <Route path="/booking/success" element={<BookingSuccess />} />
                <Route path="/booking/cancel" element={<BookingCancel />} />
                <Route path="/oauth2/callback" element={<OAuth2Callback />} />
                <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/manage" element={<ProtectedRoute adminOnly={true}><ManageProperty /></ProtectedRoute>} />
                <Route path="/payments/:bookingId/status" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <MobileBottomNav />
            {/* <Footer /> */}
          </div>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
