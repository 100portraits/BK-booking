import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisclaimerScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/calendar');
  };

  const handleGoBack = () => {
    // Clear the dontKnowSelected flag
    sessionStorage.setItem('dontKnowSelected', 'false');
    // Navigate back to the booking process
    navigate('/booking');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
      <div className='bg-white p-6 rounded shadow-md max-w-md'>
        <h2 className="text-2xl font-bold mb-4 text-center">Disclaimer</h2>
        <p className="mb-4">
          Since you selected "Don't know" for one or more questions, there is a chance your appointment will be a consultation rather than a repair. Additional parts may need to be purchased, and you may need to schedule a follow-up appointment.
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleGoBack}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go back and provide more information
          </button>
          <button
            onClick={handleContinue}
            className="w-full bg-red-600 text-white px-4 py-2 rounded"
          >
            I understand, continue to booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerScreen;
