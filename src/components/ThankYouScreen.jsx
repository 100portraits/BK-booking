// src/components/ThankYouScreen.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouScreen = () => {
  const location = useLocation();
  const { customerNumber, wasteSaved, bookingDetails } = location.state || {};

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
        <p className="text-lg mt-4">With the new booking system, you are our <strong>{newSystemNumber}</strong> customer!</p>
        <p className="text-lg mb-4">You are our <strong>{totalCustomerNumber}</strong> total customer!</p>
         {/* <p className="text-lg mb-4">You've contributed to saving <strong>{wasteSaved}kg</strong> of waste!</p> */}
        <a href="https://bikekitchen.nl" className="text-red-600 underline" target="_blank" rel="noopener noreferrer">
          Visit Bike Kitchen Website
        </a>
      </div>  
    </div>
  );
};

export default ThankYouScreen;
