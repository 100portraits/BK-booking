import React from 'react';
import { useNavigate } from 'react-router-dom';

const WheelTruingDisclaimerScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/userinfo');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md max-w-md'>
        <h2 className="text-2xl font-bold mb-4 text-center">Wheel Truing Disclaimer</h2>
        <p className="mb-4">
          Truing a wheel can be a tricky process. Please keep the following in mind:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>If you need to buy new spokes, make sure they are measured correctly. We recommend taking your wheel to a bike shop for accurate measurements.</li>
          <li>If more than 4 spokes are broken or bent, there's a much lower chance that the wheel can be successfully trued.</li>
        </ul>
        <p className="mb-4">
          We'll do our best to help, but please understand that the success of wheel truing depends on the condition of your wheel.
        </p>
        <button
          onClick={handleContinue}
          className="w-full bg-red-600 text-white px-4 py-2 rounded"
        >
          I understand, continue to booking
        </button>
      </div>
    </div>
  );
};

export default WheelTruingDisclaimerScreen;
