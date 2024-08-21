// src/components/SecondScreen.jsx

import React from 'react';

const SecondScreen = ({ next, selection }) => {
  const { bikeType } = selection;

  const handleSelection = (serviceType) => {
    next({ serviceType });
  };

  const serviceOptions = {
    'Dutch Bike': [
      { type: 'Tire', img: '/omafietsflat.jpg' },
      { type: 'Chain', img: '/omafietschain.jpg' },
      { type: 'Derailler', img: '/omafietsgear.jpg' },
      { type: 'Brakes', img: '/omafietsbrakes.jpg' },
    ],
    'Road Bike': [
      { type: 'Tire', img: '/racefietsflat.jpg' },
      { type: 'Chain', img: '/racefietschain.jpg' },
      { type: 'Derailler', img: '/racefietsgear.jpg' },
      { type: 'Brakes', img: '/racefietsbrakes.jpg' },
    ],
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Select Service Type</h2>
      <div className="grid grid-cols-2 gap-8">
        {serviceOptions[bikeType].map((service, index) => (
          <div key={index} onClick={() => handleSelection(service.type)} className="cursor-pointer">
            <img 
              src={service.img} 
              alt={`${service.type} Service`} 
              className="mx-auto mb-4 rounded-lg shadow-md" 
              style={{ width: '250px', height: '150px', objectFit: 'cover' }} 
            />
            <button className="btn-primary text-lg">{service.type}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondScreen;
