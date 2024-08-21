// src/components/SecondScreen.jsx

import React from 'react';

const SecondScreen = ({ next }) => {
  const handleSelection = (serviceType) => {
    next({ serviceType });
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6">Select Service Type</h2>
      <div className="grid grid-cols-2 gap-8">
        <div onClick={() => handleSelection('Tire')} className="cursor-pointer">
          <img src="https://placehold.co/250x150" alt="Tire Service" className="mx-auto mb-4" />
          <button className="btn-primary text-lg">Tire</button>
        </div>
        <div onClick={() => handleSelection('Chain')} className="cursor-pointer">
          <img src="https://placehold.co/250x150" alt="Chain Service" className="mx-auto mb-4" />
          <button className="btn-primary text-lg">Chain</button>
        </div>
        <div onClick={() => handleSelection('Derailler')} className="cursor-pointer">
          <img src="https://placehold.co/250x150" alt="Derailler Service" className="mx-auto mb-4" />
          <button className="btn-primary text-lg">Derailler</button>
        </div>
        <div onClick={() => handleSelection('Brakes')} className="cursor-pointer">
          <img src="https://placehold.co/250x150" alt="Brakes Service" className="mx-auto mb-4" />
          <button className="btn-primary text-lg">Brakes</button>
        </div>
      </div>
    </div>
  );
};

export default SecondScreen;
