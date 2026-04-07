import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/apiClient';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';

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
        // Login flow
        const data = await authApi.login(formData.email, formData.password);
        // data expected: { accessToken: "...", user: { id, name, email, role } }
        login(data.accessToken || data.token || data, data.user || { email: formData.email, name: formData.email.split('@')[0] });
      } else {
        // Signup flow
        const data = await authApi.signup(formData.name, formData.email, formData.password);
        // data expected: { accessToken: "...", user: { id, name, email, role } }
        login(data.accessToken || data.token || data, data.user || { email: formData.email, name: formData.name });
      }
      setIsAuthModalOpen(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
       console.error("Auth error:", err);
       const message = err.response?.data?.message || err.message || 'Authentication failed.';
       setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
         className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-300"
         onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-lightGray px-6 py-5 flex items-center justify-center">
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute left-6 p-2 hover:bg-grayBg rounded-full transition-colors"
          >
            <X size={20} className="text-dark" />
          </button>
          <h2 className="font-bold text-lg text-dark">
            {isLoginMode ? 'Welcome back' : 'Create an account'}
          </h2>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-dark mb-2">Experience StaySoul</h3>
            <p className="text-gray-500 text-sm">Discover unique stays and local experiences around the world.</p>
          </div>
          
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm animate-in shake-1">
               <AlertCircle size={18} className="shrink-0" />
               <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            
            <div className="space-y-4">
              {!isLoginMode && (
                 <div className="relative group">
                    <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full p-4 pl-12 bg-gray-50 border border-lightGray rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={!isLoginMode}
                    />
                 </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-4 pl-12 bg-gray-50 border border-lightGray rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-4 pl-12 bg-gray-50 border border-lightGray rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex justify-center items-center text-lg active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? <div className="h-6 w-6 border-3 border-white border-t-transparent animate-spin rounded-full"></div> : isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
            
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-500">
              {isLoginMode ? "First time using StaySoul?" : "Already have an account?"}
            </span>
            <button 
              onClick={() => {
                 setIsLoginMode(!isLoginMode);
                 setError('');
              }}
              className="font-bold text-dark hover:text-primary border-b-2 border-dark hover:border-primary transition-all pb-0.5"
            >
              {isLoginMode ? 'Create an account' : 'Log back in'}
            </button>
          </div>

          <p className="mt-10 text-[11px] text-gray-400 text-center leading-relaxed">
            By continuing, you agree to StaySoul's <span className="underline cursor-pointer font-medium">Terms of Service</span> and <span className="underline cursor-pointer font-medium">Privacy Policy</span>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
