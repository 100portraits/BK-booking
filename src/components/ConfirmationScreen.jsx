// src/components/ConfirmationScreen.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const finalBooking = JSON.parse(sessionStorage.getItem('finalBooking'));
    setBookingDetails(finalBooking);
  }, []);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      // Fetch number of previous bookings to calculate customer number
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const customerNumber = querySnapshot.size + 1;

      // Calculate waste savings (this could be based on some logic or a random value)
      const wasteSaved = (customerNumber * 0.25).toFixed(2); // Example: 0.25 kg per booking

      // Add the booking data to Firestore
      const appointmentsRef = collection(db, 'appointments');
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      const experience = sessionStorage.getItem('experience');

      const bookingData = {
        ...bookingDetails,
        userInfo,
        experience,
        timestamp: Timestamp.fromDate(new Date(bookingDetails.selectedDate)),
        additionalMessage,
        customerNumber,
        wasteSaved,
      };

      await addDoc(appointmentsRef, bookingData);

      // Update the availableSlots collection to mark the slot as booked
      const slotRef = doc(db, 'availableSlots', bookingDetails.slotId);
      await updateDoc(slotRef, { booked: true });

      // Navigate to final screen with thank you message
      navigate('/thank-you', { state: { customerNumber, wasteSaved, bookingDetails } });

    } catch (error) {
      console.error('Error confirming appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bookingDetails) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white rounded shadow-md w-[90vw] lg:w-fit p-6'> 
      <h2 className="text-2xl font-bold mb-4 text-black">Booking Confirmation</h2>
      <div className="text-left w-full max-w-md bg-gray-100 p-4 rounded mb-4">
        <p><strong>Date:</strong> {new Date(bookingDetails.selectedDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {bookingDetails.selectedTime}</p>
      </div>
      <textarea
        placeholder="Additional questions or messages"
        value={additionalMessage}
        onChange={(e) => setAdditionalMessage(e.target.value)}
        className="w-full max-w-md p-2 mb-4 border rounded"
        rows="4"
      ></textarea>
      <button
        onClick={handleConfirm}
        className="bg-red-600 text-white px-4 py-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Confirming...' : 'Confirm'}
      </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
