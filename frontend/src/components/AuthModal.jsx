import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/apiClient';
import { X } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Assume backend returns { accessToken: "...", user: { ... } } or similar
        const data = await authApi.login(formData.email, formData.password);
        login(data.accessToken || data.token || data, { email: formData.email, name: formData.email.split('@')[0] });
      } else {
        const data = await authApi.signup(formData.name, formData.email, formData.password);
        login(data.accessToken || data.token || data, { email: formData.email, name: formData.name });
      }
      setIsAuthModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden transform transition-all">
        {/* Header */}
        <div className="relative border-b border-lightGray px-6 py-4 flex items-center justify-center">
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute left-4 p-2 hover:bg-grayBg rounded-full transition-colors"
          >
            <X size={18} />
          </button>
          <h2 className="font-bold text-[15px]">
            {isLoginMode ? 'Log in' : 'Sign up'}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Welcome to StaySoul</h3>
          
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            
            <div className="border border-gray-400 rounded-lg overflow-hidden flex flex-col">
              {!isLoginMode && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full p-3.5 outline-none border-b border-gray-400 text-dark placeholder:text-gray-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLoginMode}
                />
              )}
              <input 
                type="email" 
                placeholder="Email" 
                className={`w-full p-3.5 outline-none text-dark placeholder:text-gray-500 ${!isLoginMode || 'border-b border-gray-400'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3.5 outline-none text-dark placeholder:text-gray-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <p className="text-xs text-gray-500">
              We'll call or text you to confirm your number. Standard message and data rates apply. <span className="underline cursor-pointer font-semibold">Privacy Policy</span>
            </p>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-lg transition-colors flex justify-center items-center"
            >
              {isLoading ? <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : 'Continue'}
            </button>
            
          </form>

          <div className="mt-6 flex items-center justify-center space-x-2 text-[15px]">
            <span className="text-dark">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              onClick={() => {
                 setIsLoginMode(!isLoginMode);
                 setError('');
              }}
              className="font-semibold underline text-dark hover:text-primary transition-colors"
            >
              {isLoginMode ? 'Sign up' : 'Log in'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
