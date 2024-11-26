import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CancelBookingScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isConfirming, setIsConfirming] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
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
        const startTime = bookingData.timestamp.toDate();
        const currentTime = new Date();
        const timeDifference = startTime - currentTime;

        if (timeDifference < 8 * 60 * 60 * 1000) {
          setError('We understand that plans can change, but we kindly ask that you do not cancel your appointment less than 8 hours in advance, as we value everyone who comes to their appointments in our busy space. If you need assistance, please email us at bikekitchenuva@gmail.com.');
          setIsLoading(false);
          return;
        }

        setBookingDetails({ ...bookingData, id: bookingDoc.id });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError('An error occurred while fetching your booking. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [token]);

  const handleCancellation = async () => {
    setIsCancelling(true);
    try {
      await deleteDoc(doc(db, 'appointments', bookingDetails.id));

      // Add the canceled appointment to the deletedAppointments collection
      await addDoc(collection(db, 'deletedAppointments'), {
        ...bookingDetails,
        cancelledAt: Timestamp.now()
      });

      // Update the availableSlots
      const startTime = bookingDetails.timestamp.toDate();
      const endTime = new Date(startTime.getTime() + (bookingDetails.estimatedTime * 60000));

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
      await sendCancellationEmail(bookingDetails);
      
      setIsConfirming(false);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('An error occurred while cancelling your booking. Please try again later.');
    }
    setIsCancelling(false);
  };

  const sendCancellationEmail = async (bookingData) => {
    const mailRef = collection(db, 'mail');
    await addDoc(mailRef, {
      to: bookingData.userInfo.email,
      message: {
        subject: "Your Bike Kitchen UvA appointment has been cancelled",
        text: `Dear ${bookingData.userInfo.name},

Your appointment with Bike Kitchen UvA has been successfully cancelled.

Cancelled appointment details:
Date: ${new Date(bookingData.timestamp.toDate()).toLocaleDateString()}
Time: ${new Date(bookingData.timestamp.toDate()).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}

If you need to make a new booking, please visit our website: https://bikekitchen.nl

Thank you for using Bike Kitchen UvA.

Best regards,
The Bike Kitchen UvA Team`,
        html: `<p>Dear ${bookingData.userInfo.name},</p>

<p>Your appointment with Bike Kitchen UvA has been successfully cancelled.</p>

<h3>Cancelled appointment details:</h3>
<ul>
  <li><strong>Date:</strong> ${new Date(bookingData.timestamp.toDate()).toLocaleDateString()}</li>
  <li><strong>Time:</strong> ${new Date(bookingData.timestamp.toDate()).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</li>
</ul>

<p>If you need to make a new booking, please visit our website: <a href="https://bikekitchen.nl">https://bikekitchen.nl</a></p>

<p>Thank you for using Bike Kitchen UvA.</p>

<p>Best regards,<br>The Bike Kitchen UvA Team</p>`
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
          <h2 className="text-2xl font-bold mb-4">Loading booking details...</h2>
          <p>Please wait while we fetch your booking information.</p>
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
        {isConfirming ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Cancel Booking</h2>
            <p className="mb-4">Are you sure you want to cancel this booking?</p>
            {bookingDetails && (
              <div className="mb-4">
                <p><strong>Date:</strong> {bookingDetails.timestamp.toDate().toLocaleDateString()}</p>
                <p><strong>Time:</strong> {bookingDetails.timestamp.toDate().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            )}
            <div className="flex gap-4">
              <button 
                onClick={handleCancellation} 
                className="bg-red-600 text-white px-4 py-2 rounded"
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="bg-gray-600 text-white px-4 py-2 rounded"
                disabled={isCancelling}
              >
                Go Back
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Booking Cancelled</h2>
            <p className="mb-4">Your booking has been successfully cancelled.</p>
            <p className="mb-4">If you need to make a new booking, please visit our website.</p>
            <button onClick={() => navigate('/')} className="bg-red-600 text-white px-4 py-2 rounded">
              Make a New Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CancelBookingScreen;
