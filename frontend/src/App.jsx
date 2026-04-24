import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';

const Home = lazy(() => import('./pages/Home'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
const BookingCancel = lazy(() => import('./pages/BookingCancel'));
const MyTrips = lazy(() => import('./pages/MyTrips'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ManageProperty = lazy(() => import('./pages/ManageProperty'));
const PaymentStatus = lazy(() => import('./pages/PaymentStatus'));
const OAuth2Callback = lazy(() => import('./pages/OAuth2Callback'));


const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
    {/* Gradient spinner ring */}
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
    <p className="text-muted text-[13px] font-medium tracking-wide italic">
      Curating the perfect stay…
    </p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen bg-cream flex flex-col">
            <AuthModal />
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
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
              </Suspense>
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
