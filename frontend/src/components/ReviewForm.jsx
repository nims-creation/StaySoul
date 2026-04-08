import React, { useState } from 'react';
import { Star, Send, ShieldCheck, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ hotelId, onReviewSubmitted }) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/hotels/${hotelId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating,
          comment,
          photos
        })
      });

      if (response.ok) {
        setSuccess(true);
        onReviewSubmitted();
      } else if (response.status === 403) {
        setError("Security Check: You must have a confirmed booking at this property to leave a review.");
      } else {
        setError("We couldn't post your review. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-100 p-8 rounded-[32px] text-center animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
           <ShieldCheck size={32} />
        </div>
        <h3 className="text-xl font-black text-dark mb-2">Review Published!</h3>
        <p className="text-gray-500 font-medium">Thank you for helping the StaySoul community.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-lightGray rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
         <div className="bg-primary/10 p-2.5 rounded-2xl text-primary">
            <Send size={20} />
         </div>
         <h2 className="text-xl font-black text-dark">Share your experience</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={`transition-all ${s <= rating ? 'text-primary scale-110' : 'text-gray-200 hover:text-gray-300'}`}
              >
                <Star size={32} className={s <= rating ? "fill-primary" : ""} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Comments</label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 bg-grayBg/30 border border-lightGray rounded-2xl focus:ring-2 focus:ring-primary outline-none min-h-[120px]"
            placeholder="Tell us about the room, the service, and the neighborhood..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guest Photos</label>
          <ImageUpload onUploadSuccess={(urls) => setPhotos(urls)} />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 italic">
             ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isAuthenticated}
          className="w-full py-4 bg-dark text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-40"
        >
          {isSubmitting ? "Syncing..." : "Post Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
