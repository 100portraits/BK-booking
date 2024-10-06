// src/components/UserInfoScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoScreen = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    // Simple validation
    if (!userInfo.name || !userInfo.phoneNumber || !userInfo.email) {
      alert('Please fill out all fields.');
      return;
    }

    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

    // Check if "Don't know" was selected during the booking process
    const dontKnowSelected = sessionStorage.getItem('dontKnowSelected') === 'true';

    if (dontKnowSelected) {
      navigate('/disclaimer');
    } else {
      navigate('/calendar');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white p-4 rounded shadow-md'>
      <h2 className="text-2xl font-bold mb-4">Your Information</h2>
      <input
        type="text"
        name="name"
        value={userInfo.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userInfo.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleNext} className="bg-red-600 text-white px-4 py-2 rounded">
        Next
      </button>
      </div>
    </div>
  );
};

export default UserInfoScreen;
