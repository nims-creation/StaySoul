import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/apiClient';
import { Calendar, MapPin, CheckCircle, Clock, XCircle, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle className="text-green-500" size={18} />;
      case 'PENDING': return <Clock className="text-amber-500" size={18} />;
      case 'CANCELLED': return <XCircle className="text-red-500" size={18} />;
      default: return <Clock className="text-gray-400" size={18} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <h1 className="text-3xl font-bold text-dark mb-8">Trips</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {bookings.length === 0 && !error ? (
        <div className="text-center py-20 border-2 border-dashed border-lightGray rounded-3xl">
          <div className="bg-grayBg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
             <Calendar className="text-gray-400" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-dark mb-2">No trips booked...yet!</h2>
          <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-dark text-white font-bold rounded-xl hover:bg-black transition-colors"
          >
            Start searching
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="group bg-white border border-lightGray rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col md:flex-row">
              {/* Hotel Preview (Mock Image or Backend Photo) */}
              <div className="w-full md:w-64 h-48 bg-grayBg relative">
                <img 
                  src={booking.hotel?.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  className="w-full h-full object-cover"
                  alt="hotel"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                   {getStatusIcon(booking.bookingStatus)}
                   <span className="text-xs font-bold text-dark">{booking.bookingStatus}</span>
                </div>
              </div>

              {/* Booking Info */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors cursor-pointer">
                       {booking.hotel?.name || "StaySoul Managed Hotel"}
                    </h3>
                    <ChevronRight className="text-gray-300 group-hover:text-dark transition-colors" />
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={14} className="mr-1" />
                    <span>{booking.hotel?.city || "Remote Location"}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-lightGray pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Dates</span>
                      <span className="text-sm font-semibold">{formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Reference</span>
                      <span className="text-sm font-semibold font-mono">#{booking.id.toString().slice(-8).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-sm">
                   <div className="flex items-center gap-2 text-gray-600">
                     <CreditCard size={16} />
                     <span>Paid ${booking.totalPrice?.toFixed(2)}</span>
                   </div>
                   <button className="text-primary font-bold hover:underline">Manage Booking</button>
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
