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
    console.log('Booking details:', finalBooking);
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
      const bookingSelection = JSON.parse(sessionStorage.getItem('bookingSelection'));
      const experience = sessionStorage.getItem('experience');

      const bookingData = {
        ...bookingDetails,
        userInfo,
        bookingSelection,
        experience,
        timestamp: Timestamp.fromDate(new Date(bookingDetails.selectedDate)),
        additionalMessage,
        customerNumber,
        wasteSaved,
      };

      const docRef = await addDoc(appointmentsRef, bookingData);

      // Create a separate document in the 'mail' collection for the email
      const mailRef = collection(db, 'mail');
      await addDoc(mailRef, {
        to: userInfo.email,
        message: {
          subject: "Thank you for your Bike Kitchen booking!",
          text: `Dear ${userInfo.name},

Thank you for booking an appointment with the Bike Kitchen!

Your booking details:
Date: ${new Date(bookingDetails.selectedDate).toLocaleDateString()}
Time: ${bookingDetails.selectedTime}

We're excited to help you with your bike and contribute to a more sustainable future. Remember, the Bike Kitchen is all about empowering you to repair and maintain your own bicycle, reducing waste and promoting self-sufficiency.

If you have any questions before your appointment, please don't hesitate to reach out.

See you soon!

The Bike Kitchen Team`,
          html: `<p>Dear ${userInfo.name},</p>

<p>Thank you for booking an appointment with the Bike Kitchen!</p>

<h3>Your booking details:</h3>
<ul>
  <li><strong>Date:</strong> ${new Date(bookingDetails.selectedDate).toLocaleDateString()}</li>
  <li><strong>Time:</strong> ${bookingDetails.selectedTime}</li>
</ul>

<p>We're excited to help you with your bike and contribute to a more sustainable future. Remember, the Bike Kitchen is all about empowering you to repair and maintain your own bicycle, reducing waste and promoting self-sufficiency.</p>

<p>If you have any questions before your appointment, please don't hesitate to reach out.</p>

<p>See you soon!</p>

<p>The Bike Kitchen Team</p>`
        }
      });

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
