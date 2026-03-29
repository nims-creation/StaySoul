import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', res.data.accessToken);
    await checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const handleOAuthCallback = async (token) => {
    localStorage.setItem('accessToken', token);
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleOAuthCallback, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
