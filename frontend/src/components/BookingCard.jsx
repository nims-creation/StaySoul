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

  // Date State
  const [checkInDate, setCheckInDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(1);

  // Price & Nights Calc
  const nights = Math.max(1, Math.round((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) || 1);
  
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
      const booking = await bookingApi.initiateBooking(hotelId, roomId, checkInDate, checkOutDate, 1);
      
      // Step 2: Get Stripe Session URL
      const paymentResponse = await bookingApi.initiatePayment(booking.id);
      
      // Step 3: Save bookingId so BookingSuccess page can redirect to live status
      if (paymentResponse.sessionUrl) {
        sessionStorage.setItem('pendingBookingId', booking.id);
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
      <div className="flex justify-between items-baseline mb-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{formatCurrency(price)}</span>
          <span className="text-gray-500 font-medium">night</span>
        </div>
      </div>
      <div className="text-xs text-amber-600 font-semibold mb-4 bg-amber-50 p-2 rounded-lg inline-block border border-amber-100">
         Dynamic pricing active based on local demand
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

      <div className="border border-lightGray rounded-lg mb-4 flex flex-col focus-within:ring-2 focus-within:ring-dark transition-all">
        <div className="flex border-b border-lightGray">
          <div className="flex-1 p-3 border-r border-lightGray relative">
            <label className="block text-[10px] font-bold uppercase track-wide mb-1">Check-in</label>
            <input 
              type="date"
              className="text-sm w-full outline-none bg-transparent cursor-pointer"
              value={checkInDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                 setCheckInDate(e.target.value);
                 if (new Date(e.target.value) >= new Date(checkOutDate)) {
                    setCheckOutDate(new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                 }
              }}
            />
          </div>
          <div className="flex-1 p-3 relative">
            <label className="block text-[10px] font-bold uppercase track-wide mb-1">Checkout</label>
            <input 
              type="date"
              className="text-sm w-full outline-none bg-transparent cursor-pointer"
              value={checkOutDate}
              min={new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold uppercase track-wide mb-1">Guests</label>
          <select 
              value={guests} 
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="text-sm w-full outline-none bg-transparent cursor-pointer"
          >
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
          </select>
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

      <div className="border-t border-lightGray pt-4 flex justify-between text-gray-600 mb-2 font-medium">
        <span>{formatCurrency(price)} x {nights} nights</span>
        <span>{formatCurrency(price * nights)}</span>
      </div>
      <div className="border-t border-lightGray pt-4 flex justify-between font-bold text-lg">
        <span>Total before taxes</span>
        <span>{formatCurrency(price * nights)}</span>
      </div>
    </div>
  );
};

export default BookingCard;
