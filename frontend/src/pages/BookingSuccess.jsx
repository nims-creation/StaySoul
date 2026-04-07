import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Home } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600" size={48} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-dark mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your stay has been successfully reserved. We've sent the confirmation details and receipt to your email address.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/trips')}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            View My Trips
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white text-dark border border-lightGray font-semibold py-3 rounded-xl hover:bg-grayBg transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Need help? <span className="underline cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default BookingSuccess;
