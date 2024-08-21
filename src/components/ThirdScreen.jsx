// src/components/ThirdScreen.jsx

import React, { useState } from 'react';

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

  const [name, setName] = useState(selection.name || '');
  const [email, setEmail] = useState(selection.email || '');
  const [phone, setPhone] = useState(selection.phone || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^[0-9]{10,15}$/; // Adjust the regex as per your desired format
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      next({
        estimatedTime,
        name,
        email,
        phone,
      });
    }
  };

  return (
    <div className="bg-white p-10 rounded shadow-md  mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Summary & Contact Information</h2>
      <div className='grid grid-cols-2 justify-start gap-2 mb-4'>
        
      <p className="text-md text-black"><strong>Bike Type:</strong> {selection.bikeType}</p>
      <p className="text-md text-black"><strong>Service Type:</strong> {selection.serviceType}</p>
      <p className="text-md text-black"><strong>Estimated Time:</strong> {estimatedTime} minutes</p>
      <p className="text-md text-black"><strong>Cost:</strong> €5/30 minutes</p>

      </div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`w-full mb-4 p-3 border rounded text-lg ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className="text-red-500 w-full text-sm mb-4 -mt-4">{errors.name}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full mb-4 p-3 border rounded text-lg ${errors.email ? 'border-red-500' : ''}`}
      />
      {errors.email && <p className="text-red-500 w-full text-sm mb-4 -mt-4">{errors.email}</p>}
      
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={`w-full mb-4 p-3 border rounded text-lg ${errors.phone ? 'border-red-500' : ''}`}
      />
      {errors.phone && <p className="text-red-500 w-full text-sm mb-4 -mt-4">{errors.phone}</p>}

      <button onClick={handleNext} className="btn-primary mt-6 text-lg">Next</button>
    </div>
  );
};

export default ThirdScreen;
