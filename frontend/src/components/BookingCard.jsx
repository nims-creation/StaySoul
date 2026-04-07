import React from 'react';

const BookingCard = ({ price, rating, dates, maxGuests }) => {
  return (
    <div className="bg-white border text-dark border-lightGray rounded-xl p-6 shadow-xl sticky top-28">
      <div className="flex justify-between items-baseline mb-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-gray-500 font-medium">night</span>
        </div>
      </div>

      <div className="border border-lightGray rounded-lg mb-4 flex flex-col">
        <div className="flex border-b border-lightGray">
          <div className="flex-1 p-3 border-r border-lightGray">
            <label className="block text-[10px] font-bold uppercase track-wide">Check-in</label>
            <div className="text-sm">Add date</div>
          </div>
          <div className="flex-1 p-3">
            <label className="block text-[10px] font-bold uppercase track-wide">Checkout</label>
            <div className="text-sm">Add date</div>
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold uppercase track-wide">Guests</label>
          <div className="text-sm">1 guest</div>
        </div>
      </div>

      <button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-lg transition-colors text-lg">
        Reserve
      </button>

      <div className="text-center text-sm text-gray-500 mt-4 font-medium mb-4">
        You won't be charged yet
      </div>

      <div className="border-t border-lightGray pt-4 flex justify-between font-semibold text-lg">
        <span>Total before taxes</span>
        <span>${price * 5}</span>
      </div>
    </div>
  );
};

export default BookingCard;
