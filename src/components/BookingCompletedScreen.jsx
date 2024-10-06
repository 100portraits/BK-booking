import React from 'react';
import { Link } from 'react-router-dom';

const BookingCompletedScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
        <h2 className="text-3xl font-bold mb-6">Booking Completed</h2>
        <p className="text-lg mb-4">Your booking has been successfully completed.</p>
        <p className="text-lg mb-4">If you need to make changes to your appointment:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Check your email for the confirmation and cancellation link</li>
          <li>Contact us directly for any modifications</li>
        </ul>
        <p className="text-lg mb-4">To make a new booking, please start the process again.</p>
        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded inline-block">
          Start New Booking
        </Link>
      </div>  
    </div>
  );
};

export default BookingCompletedScreen;
