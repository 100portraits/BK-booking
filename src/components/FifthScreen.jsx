// src/components/FifthScreen.jsx

import React, { useEffect } from 'react';

const FifthScreen = ({ selection }) => {
  useEffect(() => {
    console.log('Booking Information:', selection);
  }, [selection]);

  const formattedDate = selection.timestamp
    ? new Date(selection.timestamp).toLocaleDateString()
    : '';
  const formattedTime = selection.timestamp
    ? new Date(selection.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false})
    : '';

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Thank You for Booking!</h2>
      <p className="text-lg text-black">Bike Type: {selection.bikeType}</p>
      <p className="text-lg text-black">Service Type: {selection.serviceType}</p>
      <p className="text-lg text-black">Estimated Time: {selection.estimatedTime} minutes</p>
      <p className="text-lg text-black">Cost: €5/30 minutes</p>
      <p className="text-lg text-black">Date: {formattedDate}</p>
      <p className="text-lg text-black">Time: {formattedTime}</p>
      <p className="text-lg text-black">Name: {selection.name}</p>
      <p className="text-lg text-black">Email: {selection.email}</p>
      <p className="text-lg text-black">Phone: {selection.phone}</p>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">You are the 100th customer of the Bike Kitchen!</h3>
        <p>You are contributing to a total of 50kg waste saved.</p>
      </div>
    </div>
  );
};

export default FifthScreen;
