import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CancelBookingScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBookingAndCancel = async () => {
      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, where('cancellationToken', '==', token));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Invalid or expired cancellation link.');
          setIsLoading(false);
          return;
        }

        const bookingDoc = querySnapshot.docs[0];
        const bookingData = bookingDoc.data();
        setBookingDetails(bookingData);

        // Delete the appointment
        await deleteDoc(doc(db, 'appointments', bookingDoc.id));

        // Update the availableSlots to mark them as available again
        const startTime = bookingData.timestamp.toDate();
        const endTime = new Date(startTime.getTime() + (bookingData.estimatedTime * 60000));

        const slotsQuery = query(
          collection(db, 'availableSlots'),
          where('timestamp', '>=', Timestamp.fromDate(startTime)),
          where('timestamp', '<', Timestamp.fromDate(endTime))
        );

        const slotsSnapshot = await getDocs(slotsQuery);
        const updatePromises = slotsSnapshot.docs.map(slotDoc => 
          updateDoc(doc(db, 'availableSlots', slotDoc.id), { booked: false })
        );

        await Promise.all(updatePromises);

        setIsLoading(false);
      } catch (error) {
        console.error('Error cancelling booking:', error);
        setError('An error occurred while cancelling your booking. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBookingAndCancel();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
          <h2 className="text-2xl font-bold mb-4">Cancelling your booking...</h2>
          <p>Please wait while we process your cancellation.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
          <h2 className="text-2xl font-bold mb-4">Cancellation Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => navigate('/')} className="bg-red-600 text-white px-4 py-2 rounded">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
        <h2 className="text-2xl font-bold mb-4">Booking Cancelled</h2>
        <p className="mb-4">Your booking has been successfully cancelled.</p>
        {bookingDetails && (
          <div className="mb-4">
            <p><strong>Date:</strong> {bookingDetails.timestamp.toDate().toLocaleDateString()}</p>
            <p><strong>Time:</strong> {bookingDetails.timestamp.toDate().toLocaleTimeString()}</p>
          </div>
        )}
        <p className="mb-4">If you need to make a new booking, please visit our website.</p>
        <button onClick={() => navigate('/')} className="bg-red-600 text-white px-4 py-2 rounded">
          Make a New Booking
        </button>
      </div>
    </div>
  );
};

export default CancelBookingScreen;
