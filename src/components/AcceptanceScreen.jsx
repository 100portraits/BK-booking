// src/components/AcceptanceScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptanceScreen = () => {
  const [accepted, setAccepted] = useState(false);
  const [experience, setExperience] = useState(1);
  const navigate = useNavigate();


  const handleNext = () => {
    if (accepted) {
      sessionStorage.setItem('experience', experience);
      navigate('/booking');
    } else {
      alert('Please accept the conditions to proceed.');
    }
  };

  const handleAcceptance = () => {
    setAccepted(!accepted);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-6 ">
        <div className='flex flex-col  bg-white p-6 rounded shadow-md lg:w-[40vw]'>
        {/* Logo added above the welcome text with rounded corners */}
      <img 
        src="/bk-logo.jpg" 
        alt="Bike Kitchen Logo" 
        className="mx-auto my-6 rounded-lg"  /* Applying rounded corners */
        style={{ width: '200px', height: '200px' }} 
      />
      
      <h2 className="text-3xl font-bold mb-6 text-black text-center">Welcome to the Bike Kitchen</h2>
      <p className="mb-4 text-black">
        At the Bike Kitchen, you repair your own bike:
      </p>
      <ul className="list-disc list-inside mb-4 text-left text-black">
        <li>We have the tools, but you need to bring your own parts.</li>
        <li>This is a learning space - are you ready to get your hands dirty?</li>
      </ul>
      <div className="text-left mb-4 text-black">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={handleAcceptance}
            className="mr-2 accent-primary-red"
          />
          I understand!
        </label>
        <label className="block mb-2">
          <span className="block mb-1">How much experience do you have fixing bikes?</span>
          <input
            type="range"
            min="1"
            max="5"
            value={experience}
            className="w-full"
            onChange={(e) => setExperience(e.target.value)}

          />
          <div className="flex justify-between text-sm text-black">
            <span>No experience at all</span>
            <span>Bike enthusiast</span>
          </div>
        </label>
      </div>
      <button
        onClick={handleNext}
        className="bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Let's make an appointment!
      </button>
      <p className="mt-4 text-sm text-gray-600 text-center">
        By proceeding, you agree to the{' '}
        <a 
          href="https://www.uva.nl/home/disclaimers/privacy.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-red-700 hover:underline"
        >
          UvA Privacy Policy
        </a>.
      </p>
      </div>
    </div>
  );
};

export default AcceptanceScreen;
