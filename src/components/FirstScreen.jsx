// src/components/FirstScreen.jsx

import React from 'react';

const FirstScreen = ({ next }) => {
  const handleSelection = (bikeType) => {
    next({ bikeType });
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Select Bike Type</h2>
      <div className="flex justify-center space-x-8">
        <div onClick={() => handleSelection('Dutch Bike')} className="cursor-pointer">
          <img 
            src="/omafiets.jpg" 
            alt="Dutch Bike" 
            className="mx-auto mb-4 rounded-lg" 
            style={{ width: '300px', height: '200px', objectFit: 'cover' }} 
          />
          <button className="btn-primary text-lg">Dutch Bike</button>
        </div>
        <div onClick={() => handleSelection('Road Bike')} className="cursor-pointer">
          <img 
            src="/racefiets.jpg" 
            alt="Road Bike" 
            className="mx-auto mb-4 rounded-lg" 
            style={{ width: '300px', height: '200px', objectFit: 'cover' }} 
          />
          <button className="btn-primary text-lg">Road Bike</button>
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;
