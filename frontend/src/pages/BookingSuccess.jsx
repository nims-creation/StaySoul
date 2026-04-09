import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * BookingSuccess is the Stripe success redirect landing page.
 * Since the success URL is /booking/success (Stripe doesn't support dynamic URLs easily),
 * this page reads the bookingId stored in sessionStorage during the payment initiation
 * and immediately redirects to the live PaymentStatus polling page.
 */
const BookingSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Try to get bookingId from query param or sessionStorage
    const bookingIdFromParam = searchParams.get('bookingId');
    const bookingIdFromStorage = sessionStorage.getItem('pendingBookingId');
    const bookingId = bookingIdFromParam || bookingIdFromStorage;

    if (bookingId) {
      // Clean up storage
      sessionStorage.removeItem('pendingBookingId');
      // Redirect to live payment status poller
      navigate(`/payments/${bookingId}/status`, { replace: true });
    } else {
      // Fallback: no bookingId found, go to trips page
      navigate('/trips', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-grayBg/30">
      <div className="text-center space-y-4">
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="text-primary" size={24} />
          </div>
        </div>
        <p className="text-gray-500 font-semibold">Confirming your booking...</p>
      </div>
    </div>
  );
};

export default BookingSuccess;
