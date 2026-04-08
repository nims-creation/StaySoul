import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Loader2 } from 'lucide-react';

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      try {
        // Decode token to get user info
        const decoded = jwtDecode(token);
        const userData = {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.email.split('@')[0], // Fallback name if missing
          roles: decoded.roles
        };

        // Complete login
        login(token, userData);
        
        // Redirect to home or intended page
        navigate('/', { replace: true });
      } catch (error) {
        console.error("Failed to decode OAuth2 token", error);
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-500 font-medium">Completing your secure login...</p>
      </div>
    </div>
  );
};

export default OAuth2Callback;
