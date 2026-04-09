import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/apiClient';
import { Calendar, MapPin, CheckCircle, Clock, XCircle, CreditCard, ChevronRight, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtils';

const MyTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const data = await bookingApi.getUserBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setError("Unable to load your trips. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This will initiate a refund if already paid.")) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await bookingApi.cancelBooking(bookingId);
      // Refresh state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, bookingStatus: 'CANCELLED' } : b
      ));
    } catch (err) {
      alert("Failed to cancel booking. Only confirmed bookings can be cancelled.");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'CONFIRMED': { icon: CheckCircle, text: 'Confirmed', style: 'bg-green-100 text-green-700' },
      'RESERVED': { icon: Clock, text: 'Reserved', style: 'bg-amber-100 text-amber-700' },
      'PAYMENTS_PENDING': { icon: CreditCard, text: 'Payment Pending', style: 'bg-blue-100 text-blue-700' },
      'CANCELLED': { icon: XCircle, text: 'Cancelled', style: 'bg-red-100 text-red-700' },
      'EXPIRED': { icon: AlertTriangle, text: 'Expired', style: 'bg-gray-100 text-gray-500' }
    };

    const s = config[status] || { icon: Clock, text: status, style: 'bg-gray-100 text-gray-700' };
    const Icon = s.icon;

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${s.style}`}>
        <Icon size={14} />
        {s.text}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
        <p className="text-gray-400 font-medium italic">Loading your adventures...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div className="flex justify-between items-baseline mb-10">
         <h1 className="text-4xl font-black text-dark tracking-tight">Trips</h1>
         <span className="text-gray-400 font-bold">{bookings.length} reservations</span>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-5 rounded-3xl mb-10 flex items-center gap-3 border border-red-100 shadow-sm animate-in slide-in-from-top-4 duration-500">
          <AlertTriangle size={20} />
          <span className="font-semibold">{error}</span>
          <button onClick={() => fetchBookings()} className="ml-auto underline font-bold">Try again</button>
        </div>
      )}

      {bookings.length === 0 && !error ? (
        <div className="text-center py-24 bg-grayBg/20 border-2 border-dashed border-lightGray rounded-[40px]">
          <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-200">
             <Calendar className="text-primary" size={40} />
          </div>
          <h2 className="text-2xl font-black text-dark mb-3">No trips booked... yet!</h2>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
            Time to dust off your bags and start planning your next holiday. We've got thousands of stays waiting.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
          >
            Start exploring
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {bookings.map((booking) => (
            <div key={booking.id} className="group bg-white border border-lightGray rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 flex flex-col lg:flex-row">
              {/* Hotel Preview */}
              <div className="w-full lg:w-80 h-64 lg:h-auto bg-grayBg relative overflow-hidden">
                <img 
                  src={booking.hotel?.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="hotel"
                />
                <div className="absolute top-5 left-5">
                   {getStatusBadge(booking.bookingStatus)}
                </div>
              </div>

              {/* Booking Info */}
              <div className="flex-1 p-8 flex flex-col justify-between relative">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-2xl font-black text-dark group-hover:text-primary transition-colors pr-8">
                       {booking.hotel?.name || "StaySoul Managed Hotel"}
                    </h3>
                    <div className="p-3 bg-grayBg rounded-2xl text-gray-400 group-hover:text-dark transition-colors">
                       <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 font-medium text-sm mb-8">
                    <MapPin size={16} className="mr-1.5 text-primary" />
                    <span>{booking.hotel?.city || "Remote Location"}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-8 border-b border-lightGray">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Check-in</span>
                        <span className="text-base font-bold text-dark">{formatDate(booking.checkInDate)}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Checkout</span>
                        <span className="text-base font-bold text-dark">{formatDate(booking.checkOutDate)}</span>
                     </div>
                     <div className="flex flex-col gap-1 col-span-2 md:col-span-1 border-t md:border-t-0 pt-6 md:pt-0">
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Booking Ref</span>
                        <span className="text-base font-mono font-bold text-dark">#{booking.id.toString().padStart(6, '0')}</span>
                     </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-grayBg flex items-center justify-center text-dark border border-lightGray">
                         <CreditCard size={20} />
                      </div>
                      <div>
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amount Paid</div>
                         <div className="text-xl font-black text-dark">{formatCurrency(booking.amount || 0)}</div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                      {(booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'RESERVED') && (
                        <button 
                           onClick={() => handleCancelBooking(booking.id)}
                           disabled={cancellingId === booking.id}
                           className="flex-1 sm:flex-none px-6 py-3.5 border-2 border-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                           {cancellingId === booking.id ? <Loader2 className="animate-spin" size={18} /> : <XCircle size={18} />}
                           Cancel
                        </button>
                      )}
                      
                      <button 
                        onClick={() => navigate(`/hotel/${booking.hotel?.id}`)}
                        className="flex-1 sm:flex-none px-8 py-4 bg-grayBg text-dark font-bold rounded-2xl hover:bg-lightGray transition-all flex items-center justify-center gap-2"
                      >
                         View Details
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
