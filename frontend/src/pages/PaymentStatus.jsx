import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookingApi } from '../api/apiClient';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Home, Calendar } from 'lucide-react';
import useDocumentTitle from '../utils/useDocumentTitle';

const PaymentStatus = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, failure
  const [attempts, setAttempts] = useState(0);

  const titleMap = { loading: 'Verifying Payment…', success: 'Booking Confirmed!', failure: 'Payment Unsuccessful' };
  useDocumentTitle(titleMap[status] ?? 'Payment Status');

  useEffect(() => {
    let intervalId;

    const checkStatus = async () => {
      try {
        const response = await bookingApi.getBookingStatus(bookingId);
        const currentStatus = response.status;

        if (currentStatus === 'CONFIRMED') {
          setStatus('success');
          clearInterval(intervalId);
        } else if (currentStatus === 'CANCELLED' || currentStatus === 'EXPIRED') {
          setStatus('failure');
          clearInterval(intervalId);
        } else if (attempts > 20) {
          // Timeout after ~1 minute of polling
          setStatus('failure');
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error("Error polling status:", err);
      }
      setAttempts(prev => prev + 1);
    };

    // Start polling every 3 seconds
    intervalId = setInterval(checkStatus, 3000);
    checkStatus(); // Initial check

    return () => clearInterval(intervalId);
  }, [bookingId, attempts]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-grayBg/30 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-lightGray">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 className="text-primary" size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-dark">Verifying Payment...</h1>
            <p className="text-gray-500">Please wait while we confirm your reservation with the hotel.</p>
            <div className="bg-grayBg p-4 rounded-2xl flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider justify-center">
               <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
               Transaction sync in progress
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 border-4 border-white shadow-lg">
               <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-black text-dark tracking-tight">Booking Confirmed!</h1>
            <p className="text-gray-500 leading-relaxed font-medium">
              We've secured your stay at <span className="text-dark font-bold">your selected hotel</span>. 
              A confirmation receipt in <span className="text-dark font-bold">Rupees (₹)</span> has been sent to your email.
            </p>
            
            <div className="pt-6 border-t border-lightGray space-y-3">
               <Link 
                 to="/trips" 
                 className="w-full py-4 bg-dark text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all"
               >
                 View My Trips <ArrowRight size={18} />
               </Link>
               <Link 
                 to="/" 
                 className="w-full py-4 text-gray-500 font-bold flex items-center justify-center gap-2"
               >
                 Back to Home
               </Link>
            </div>
          </div>
        )}

        {status === 'failure' && (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 border-4 border-white shadow-lg">
               <XCircle size={48} />
            </div>
            <h1 className="text-2xl font-bold text-dark">Payment Unsuccessful</h1>
            <p className="text-gray-500">
              Something went wrong, or the payment was cancelled. No charges were made to your account.
            </p>
            
            <div className="pt-6 border-t border-lightGray space-y-3">
               <button 
                 onClick={() => navigate(-1)}
                 className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-all"
               >
                 Try Again
               </button>
               <Link 
                 to="/" 
                 className="w-full py-4 text-gray-500 font-bold flex items-center justify-center gap-2 underline underline-offset-4"
               >
                 Return to Search
               </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
