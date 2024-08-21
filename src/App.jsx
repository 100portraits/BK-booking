// src/App.jsx

import React, { useState, useRef, useEffect } from 'react';
import LandingScreen from './components/LandingScreen';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen'; // Using the combined ThirdScreen
import FourthScreen from './components/FourthScreen';
import FifthScreen from './components/FifthScreen';

const App = () => {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    experience: 0,
    bikeType: '',
    serviceType: '',
    estimatedTime: 0,
    timestamp: '',
    name: '',
    email: '',
    phone: ''
  });

  const stepRefs = useRef([]);
  
  const handleNextStep = (newSelection) => {
    setSelection({ ...selection, ...newSelection });
    setStep(step + 1);
  };

  useEffect(() => {
    if (step > 0) {
      stepRefs.current[step].scrollIntoView({ behavior: 'smooth' });
    }

    // Disable scrolling completely
    document.body.style.overflow = 'hidden';
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]  bg-red-300 overflow-hidden m-auto">
      <div
        ref={(el) => (stepRefs.current[0] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 m-auto ${
          step === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step === 0 && <LandingScreen next={handleNextStep} />}
      </div>

      <div
        ref={(el) => (stepRefs.current[1] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 ${
          step === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step >= 1 && <FirstScreen next={handleNextStep} />}
      </div>
      <div
        ref={(el) => (stepRefs.current[2] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 ${
          step === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step >= 2 && <SecondScreen next={handleNextStep} selection={selection} />}
      </div>
      <div
        ref={(el) => (stepRefs.current[3] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 ${
          step === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step >= 3 && <ThirdScreen next={handleNextStep} selection={selection} />}
      </div>
      <div
        ref={(el) => (stepRefs.current[4] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 ${
          step === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step >= 4 && <FourthScreen next={handleNextStep} selection={selection} />}
      </div>
      <div
        ref={(el) => (stepRefs.current[5] = el)}
        className={`flex justify-center items-center min-h-screen transition-opacity duration-500 ${
          step === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {step >= 5 && <FifthScreen selection={selection} />}
      </div>
    </div>
  );
};

export default App;
