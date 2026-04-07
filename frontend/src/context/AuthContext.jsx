import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      // Ensure the client has the token
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
