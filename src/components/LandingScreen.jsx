// src/components/LandingScreen.jsx

import React, { useState } from 'react';

const LandingScreen = ({ next }) => {
  const [agreement, setAgreement] = useState(false);
  const [experience, setExperience] = useState(0);

  const handleProceed = () => {
    if (agreement) {
      next({ experience });
    } else {
      alert("You must agree to the terms to proceed.");
    }
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      {/* Logo added above the welcome text with rounded corners */}
      <img 
        src="/bk-logo.jpg" 
        alt="Bike Kitchen Logo" 
        className="mx-auto mb-6 rounded-lg"  /* Applying rounded corners */
        style={{ width: '200px', height: '200px' }} 
      />
      
      <h2 className="text-3xl font-bold mb-6 text-black">Welcome to the Bike Kitchen</h2>
      <p className="mb-4 text-black">
        At the Bike Kitchen, you can book an appointment to get assistance with your bike. Please note:
      </p>
      <ul className="list-disc list-inside mb-4 text-left text-black">
        <li>BK doesn't guarantee that your bike will be fixed.</li>
        <li>We have the tools, but you need to bring your own parts.</li>
        <li>This is a learning space - what do you want to learn?</li>
      </ul>
      <div className="text-left mb-4 text-black">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={agreement}
            onChange={() => setAgreement(!agreement)}
            className="mr-2 accent-primary-red"
          />
          I understand!
        </label>
        <label className="block mb-2">
          <span className="block mb-1">How much experience do you have fixing bikes?</span>
          <input
            type="range"
            min="0"
            max="10"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-black">
            <span>No experience at all</span>
            <span>Bike enthusiast</span>
          </div>
        </label>
      </div>
      <button onClick={handleProceed} className="btn-primary">
        Let's make an appointment
      </button>
    </div>
  );
};

export default LandingScreen;
