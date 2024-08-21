// src/components/ContactInfoScreen.jsx

import React, { useState } from 'react';

const ContactInfoScreen = ({ next, selection }) => {
  const [name, setName] = useState(selection.name || '');
  const [email, setEmail] = useState(selection.email || '');
  const [phone, setPhone] = useState(selection.phone || '');

  const handleNext = () => {
    if (name && email && phone) {
      next({ name, email, phone });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Contact Information</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-lg"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-lg"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-lg"
      />
      <button onClick={handleNext} className="btn-primary mt-6 text-lg">Next</button>
    </div>
  );
};

export default ContactInfoScreen;
