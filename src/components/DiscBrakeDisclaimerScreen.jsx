import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscBrakeDisclaimerScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/userinfo');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md max-w-md'>
        <h2 className="text-2xl font-bold mb-4 text-center">Disc Brake Disclaimer</h2>
        <p className="mb-4">
          We recommend making your appointment on Thursday, as our mechanic with more experience in disc brakes is available then. Please note that we don't guarantee a fix for disc brake-related issues, as they can be more complex and may require specialized tools that we might not have on hand.
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

export default DiscBrakeDisclaimerScreen;
