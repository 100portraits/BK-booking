// src/components/ThankYouScreen.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingCompletedScreen from './BookingCompletedScreen';

const ThankYouScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerNumber, wasteSaved, bookingDetails } = location.state || {};

  useEffect(() => {
    // Prevent going back
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);

    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', window.location.pathname);
  };

  // If booking details are missing, show the BookingCompletedScreen
  if (!bookingDetails) {
    return <BookingCompletedScreen />;
  }

  const getOrdinalSuffix = (number) => {
    const j = number % 10,
          k = number % 100;
    if (j == 1 && k != 11) {
      return number + "st";
    }
    if (j == 2 && k != 12) {
      return number + "nd";
    }
    if (j == 3 && k != 13) {
      return number + "rd";
    }
    return number + "th";
  };

  const newSystemNumber = getOrdinalSuffix(customerNumber);
  const totalCustomerNumber = getOrdinalSuffix(customerNumber + 947);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
        <h2 className="text-3xl font-bold mb-6">Thank you for your booking!</h2>
        <p className="text-lg mb-4">Your appointment is confirmed for:</p>
        <p><strong>Date:</strong> {new Date(bookingDetails.selectedDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {bookingDetails.selectedTime}</p>
        <p><strong>Estimated repair time:</strong> {bookingDetails.time || 'Not specified'} minutes</p>
        <p className="text-lg mt-4">With the new booking system, you are our <strong>{newSystemNumber}</strong> customer!</p>
        <p className="text-lg mb-4">You are our <strong>{totalCustomerNumber}</strong> total customer!</p>
        
        <p className="mb-4 text-red-600 font-semibold">
          NB: If you want to replace something on your bike, you have to bring your own parts in advance.
        </p>
        
        <div className="mt-6 text-center">
          <p className="mb-2">Interested in joining the Bike Kitchen community?</p>
          <p>Join us for monthly borrels, rideouts, workshops and other fun stuff!</p>
          <a 
            href="https://doneren.auf.nl/bike-kitchen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Join our WhatsApp chat
          </a>
        </div>
        
        <div className="mt-6">
          <a href="https://bikekitchen.nl" className="text-red-600 underline" target="_blank" rel="noopener noreferrer">
            Visit Bike Kitchen Website
          </a>
        </div>
      </div>  
    </div>
  );
};

export default ThankYouScreen;
