// src/components/ConfirmationScreen.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Make sure to install this package

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMember, setIsMember] = useState(null);
  
  useEffect(() => {
    const finalBooking = JSON.parse(sessionStorage.getItem('finalBooking'));
    const bookingSelection = JSON.parse(sessionStorage.getItem('bookingSelection'));
    setBookingDetails({...finalBooking, time: bookingSelection.time});
    console.log('Booking details:', {...finalBooking, time: bookingSelection.time});
  }, []);

  const handleConfirm = async () => {
    if (isMember === null) {
      alert('Please select whether you are a member or not');
      return;
    }
    
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

      const cancellationToken = uuidv4();
      const bookingData = {
        ...bookingDetails,
        userInfo,
        bookingSelection,
        experience,
        timestamp: Timestamp.fromDate(new Date(bookingDetails.selectedDate)),
        additionalMessage,
        customerNumber,
        wasteSaved,
        estimatedTime: bookingDetails.time || 'Not specified',
        cancellationToken,
        member: isMember,
      };

      const docRef = await addDoc(appointmentsRef, bookingData);

      // Create the cancellation link
      const cancellationLink = `https://bikekitchen.nl/cancel-booking/${cancellationToken}`;

      // Create a separate document in the 'mail' collection for the email
      const mailRef = collection(db, 'mail');
      await addDoc(mailRef, {
        to: userInfo.email,
        message: {
          subject: "Thank you for your Bike Kitchen UvA booking!",
          text: `Dear ${userInfo.name},

Thank you for booking an appointment with the Bike Kitchen UvA!

Your booking details:
Date: ${new Date(bookingDetails.selectedDate).toLocaleDateString()}
Time: ${bookingDetails.selectedTime}
Location: Bike garage of the UvA Roeterseilandcampus (building B/C/D)
Estimated repair time: ${bookingDetails.time || 'Not specified'} minutes

The repair could take longer than the estimated time, the most important thing is learning (and safety)!

NB: If you want to replace something on your bike, you have to bring your own parts in advance.

If you need to cancel your appointment, please use this link: ${cancellationLink}

For further questions: you can send an email to bikekitchenuva@gmail.com or reply to this mail.

If you're interested in joining the Bike Kitchen community for monthly borrels, rideouts, workshops and other fun stuff, join our WhatsApp chat: https://doneren.auf.nl/bike-kitchen

See you soon!

The Bike Kitchen UvA Team`,
          html: `<p>Dear ${userInfo.name},</p>

<p>Thank you for booking an appointment with the Bike Kitchen UvA!</p>

<h3>Your booking details:</h3>
<ul>
  <li><strong>Date:</strong> ${new Date(bookingDetails.selectedDate).toLocaleDateString()}</li>
  <li><strong>Time:</strong> ${bookingDetails.selectedTime}</li>
  <li><strong>Location:</strong> Bike garage of the UvA Roeterseilandcampus (building B/C/D)</li>
  <li><strong>Estimated repair time:</strong> ${bookingDetails.time || 'Not specified'} minutes</li>
</ul>

<p><em>The repair could take longer than the estimated time, the most important thing is learning (and safety)!</em></p>

<p><strong>NB: If you want to replace something on your bike, you have to bring your own parts in advance.</strong></p>

<p>If you need to cancel your appointment, please <a href="${cancellationLink}">click here</a>.</p>

<p>For further questions: you can send an email to <a href="mailto:bikekitchenuva@gmail.com">bikekitchenuva@gmail.com</a> or reply to this mail.</p>

<p>If you're interested in joining the Bike Kitchen community for monthly borrels, rideouts, workshops and other fun stuff, <a href="https://doneren.auf.nl/bike-kitchen">join our community</a>.</p>

<p>See you soon!</p>

<p>The Bike Kitchen UvA Team</p>`
        }
      });

      // Update the availableSlots collection to mark the slots as booked
      const startTime = new Date(bookingDetails.selectedDate);
      const endTime = new Date(startTime.getTime() + (bookingDetails.time * 60000)); // Convert minutes to milliseconds

      const slotsQuery = query(
        collection(db, 'availableSlots'),
        where('timestamp', '>=', Timestamp.fromDate(startTime)),
        where('timestamp', '<', Timestamp.fromDate(endTime))
      );

      const slotsSnapshot = await getDocs(slotsQuery);
      const updatePromises = slotsSnapshot.docs.map(slotDoc => 
        updateDoc(doc(db, 'availableSlots', slotDoc.id), { booked: true })
      );

      await Promise.all(updatePromises);

      // Clear session storage
      sessionStorage.clear();

      // Navigate to final screen with thank you message
      navigate('/thank-you', { state: { customerNumber, wasteSaved, bookingDetails }, replace: true });

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
        <p><strong>Estimated repair time:</strong> {bookingDetails.time || 'Not specified'} minutes</p>
      </div>
      <p className="text-sm text-gray-600 mb-4 italic w-fit">
        The repair could take longer than the estimated time<br></br>The most important thing is learning (and safety)!
      </p>
      
      <div className="mb-4">
        <p className="font-semibold mb-2">Are you a (paying) member? *</p>
        <p className="text-sm text-gray-600 mb-4  w-fit"><a href="https://doneren.auf.nl/bike-kitchen" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 underline">Sign in here to become a member (€4/month)</a></p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="member"
              value={true}
              checked={isMember === true}
              onChange={(e) => setIsMember(e.target.value === 'true')}
              className="mr-2"
              required
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="member"
              value={false}
              checked={isMember === false}
              onChange={(e) => setIsMember(e.target.value === 'true')}
              className="mr-2"
              required
            />
            No
          </label>
        </div>
        {isMember === false && (
          <div className="mt-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
            <p>Non-members pay €5 to use the space. Members use the space for free.</p>
            
          </div>
        )}
      </div>

      
      
      <button
        onClick={handleConfirm}
        className="bg-red-600 text-white px-4 py-2 rounded mb-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Confirming...' : 'Confirm'}
      </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
