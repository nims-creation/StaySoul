import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingApi } from '../api/apiClient';
import { formatCurrency } from '../utils/currencyUtils';

const BookingCard = ({ price: initialPrice, rating, dates, maxGuests, hotelId, roomId: initialRoomId, hotelName, rooms }) => {
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();
  const [isReserving, setIsReserving] = useState(false);
  const [error, setError] = useState('');
  
  // Multi-Room State
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const selectedRoom = rooms && rooms.length > 0 ? rooms[selectedRoomIdx] : null;
  
  // Safe price calculation
  const rawPrice = selectedRoom ? selectedRoom.price : initialPrice;
  const price = typeof rawPrice === 'number' ? rawPrice : 0;
  
  const roomId = selectedRoom ? selectedRoom.id : initialRoomId;

  const handleReserve = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!roomId) {
      setError("No available rooms to book at this time.");
      return;
    }

    try {
      setIsReserving(true);
      setError('');
      
      // Step 1: Initiate Booking
      // Note: In a real app, these would come from a date picker
      const checkInDate = new Date().toISOString().split('T')[0];
      const checkOutDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const booking = await bookingApi.initiateBooking(hotelId, roomId, checkInDate, checkOutDate, 1);
      
      // Step 2: Get Stripe Session URL
      const paymentResponse = await bookingApi.initiatePayment(booking.id);
      
      // Step 3: Redirect
      if (paymentResponse.sessionUrl) {
        window.location.href = paymentResponse.sessionUrl;
      } else {
         setError("Stripe payment session could not be established.");
      }

    } catch (err) {
      console.error("Booking Error:", err);
      setError(err.response?.data?.message || "Failed to initiate booking. Please try again.");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="bg-white border text-dark border-lightGray rounded-xl p-6 shadow-xl sticky top-28">
      <div className="flex justify-between items-baseline mb-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{formatCurrency(price)}</span>
          <span className="text-gray-500 font-medium">night</span>
        </div>
      </div>

      {/* Room Selection Dropdown */}
      {rooms && rooms.length > 1 && (
        <div className="mb-4">
          <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 ml-1">Select Room Type</label>
          <select 
            value={selectedRoomIdx}
            onChange={(e) => setSelectedRoomIdx(parseInt(e.target.value))}
            className="w-full p-3 bg-grayBg/30 border border-lightGray rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {rooms.map((room, idx) => (
              <option key={room.id} value={idx}>
                {room.type} - {formatCurrency(room.price)}/night
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border border-lightGray rounded-lg mb-4 flex flex-col">
        <div className="flex border-b border-lightGray">
          <div className="flex-1 p-3 border-r border-lightGray">
            <label className="block text-[10px] font-bold uppercase track-wide">Check-in</label>
            <div className="text-sm">Today</div>
          </div>
          <div className="flex-1 p-3">
            <label className="block text-[10px] font-bold uppercase track-wide">Checkout</label>
            <div className="text-sm">5 days from now</div>
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold uppercase track-wide">Guests</label>
          <div className="text-sm">1 guest</div>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm mb-3 font-medium bg-red-50 p-2 rounded">{error}</div>}

      <button 
        onClick={handleReserve}
        disabled={isReserving}
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-lg transition-colors flex justify-center items-center text-lg"
      >
        {isReserving ? <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : 'Reserve'}
      </button>

      <div className="text-center text-sm text-gray-500 mt-4 font-medium mb-4">
        You won't be charged yet
      </div>

      <div className="border-t border-lightGray pt-4 flex justify-between font-semibold text-lg">
        <span>Total before taxes</span>
        <span>{formatCurrency(price * 5)}</span>
      </div>
    </div>
  );
};

export default BookingCard;
