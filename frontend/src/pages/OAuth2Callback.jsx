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
        const decoded = jwtDecode(token);
        console.log('OAuth2 decoded JWT:', decoded);

        // Check token is not already expired
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < now) {
          console.error('OAuth2 token is already expired');
          navigate('/', { replace: true });
          return;
        }

        // JWT claims from JWTService:
        //   sub    → user id (Long as string)
        //   email  → user's email
        //   roles  → "[GUEST]" or "[HOTEL_MANAGER]" (string from Set.toString())
        const email = decoded.email || '';
        const rawRoles = decoded.roles || '';

        // Parse "[GUEST]" → ["GUEST"]
        const roles = typeof rawRoles === 'string'
          ? rawRoles.replace(/[\[\]]/g, '').split(',').map(r => r.trim()).filter(Boolean)
          : Array.isArray(rawRoles) ? rawRoles : [];

        // Derive a display name from the email (before the @)
        const name = email.split('@')[0] || 'User';

        const userData = {
          id: decoded.sub,
          email,
          name,
          roles,
        };

        login(token, userData);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to process OAuth2 token:', error);
        navigate('/', { replace: true });
      }
    } else {
      // No token — possibly user denied Google access or an error occurred
      console.warn('OAuth2 callback received without a token');
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
