import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { hotelApi, bookingApi } from '../api/apiClient';

const ReviewSection = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/hotels/${hotelId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [hotelId]);

  if (isLoading) return <div className="py-10 animate-pulse text-gray-400 font-medium">Loading guest stories...</div>;

  return (
    <div className="py-12 border-t border-lightGray">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark flex items-center gap-3">
            <Star className="text-primary fill-primary" size={24} />
            {reviews.length > 0 ? `${(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} · ${reviews.length} reviews` : "No reviews yet"}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-grayBg rounded-full flex items-center justify-center font-black text-primary text-xl shadow-sm border border-lightGray">
                {review.userName?.[0]}
              </div>
              <div>
                <h4 className="font-bold text-dark">{review.userName}</h4>
                <p className="text-gray-400 text-xs font-medium">
                  {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < review.rating ? "text-dark fill-dark" : "text-gray-200 fill-gray-100"} 
                />
              ))}
            </div>

            <p className="text-dark leading-relaxed font-normal text-[15px]">
              {review.comment}
            </p>

            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {review.photos.map((photo, idx) => (
                  <img 
                    key={idx} 
                    src={photo} 
                    alt="guest-stay" 
                    className="w-24 h-24 object-cover rounded-xl border border-lightGray hover:scale-105 transition-all cursor-zoom-in"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 pt-2">
               <button className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-dark transition-colors">
                 <ThumbsUp size={14} /> Helpful
               </button>
               <button className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-dark transition-colors">
                 <MessageSquare size={14} /> Reply
               </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="bg-grayBg/20 border border-dashed border-lightGray rounded-3xl p-12 text-center">
           <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
           <h3 className="text-xl font-black text-dark mb-2">Be the first to share!</h3>
           <p className="text-gray-500 font-medium">Help other travelers by sharing your experience at this property.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
