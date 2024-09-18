import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen';
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

  const handleNextStep = (newSelection) => {
    setSelection({ ...selection, ...newSelection });
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const renderPage = () => {
    switch (step) {
      case 0:
        return <LandingScreen next={handleNextStep} />;
      case 1:
        return <FirstScreen next={handleNextStep} back={handleBackStep} />;
      case 2:
        return <SecondScreen next={handleNextStep} back={handleBackStep} selection={selection} />;
      case 3:
        return <ThirdScreen next={handleNextStep} back={handleBackStep} selection={selection} />;
      case 4:
        return <FourthScreen next={handleNextStep} back={handleBackStep} selection={selection} />;
      case 5:
        return <FifthScreen selection={selection} />;
      default:
        return <LandingScreen next={handleNextStep} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300">
      {renderPage()}
    </div>
  );
};

export default App;
