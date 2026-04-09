import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, setIsAuthModalOpen } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to home and open auth modal
    setIsAuthModalOpen(true);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (adminOnly && !user?.roles?.includes('HOTEL_MANAGER')) {
     // If user is not HOTEL_MANAGER but page requires admin, redirect to home
     return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
