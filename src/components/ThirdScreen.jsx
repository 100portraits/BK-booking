// src/components/ThirdScreen.jsx

import React from 'react';

const ThirdScreen = ({ next, selection }) => {
  const summaryData = {
    'Dutch Bike': {
      'Tire': { estimatedTime: 25 },
      'Chain': { estimatedTime: 30 },
      'Derailler': { estimatedTime: 45 },
      'Brakes': { estimatedTime: 35 },
    },
    'Road Bike': {
      'Tire': { estimatedTime: 20 },
      'Chain': { estimatedTime: 30 },
      'Derailler': { estimatedTime: 40 },
      'Brakes': { estimatedTime: 30 },
    },
  };

  const { estimatedTime } = summaryData[selection.bikeType][selection.serviceType];

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Summary</h2>
      <p className="text-lg text-black">Bike Type: {selection.bikeType}</p>
      <p className="text-lg text-black">Service Type: {selection.serviceType}</p>
      <p className="text-lg text-black">Estimated Time: {estimatedTime} minutes</p>
      <p className="text-lg text-black">Cost: €5/30 minutes</p>
      <button onClick={() => next({ estimatedTime })} className="btn-primary mt-6 text-lg">Next</button>
    </div>
  );
};

export default ThirdScreen;
