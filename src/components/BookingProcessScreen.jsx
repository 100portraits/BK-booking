// src/components/BookingProcessScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decisionTreeConfig from '../config/decisionTreeConfig';
import OptionButton from './OptionButton';

const BookingProcessScreen = () => {
  const navigate = useNavigate();
  const [currentNode, setCurrentNode] = useState(decisionTreeConfig);
  const [selections, setSelections] = useState({});
  const [inputValue, setInputValue] = useState('');

  const handleOptionClick = (optionKey) => {
    const selectedOption = currentNode.options[optionKey];
    const newSelections = { ...selections, [currentNode.question]: optionKey };

    setSelections(newSelections);

    if (typeof selectedOption === 'string' && selectedOption === 'summary') {
      // When we reach the end of the decision tree, navigate to the UserInfoScreen
      sessionStorage.setItem('bookingSelection', JSON.stringify(newSelections));
      navigate('/userinfo');
    } else if (selectedOption.input) {
      // Move to input step
      setCurrentNode(selectedOption);
    } else {
      setCurrentNode(selectedOption);
    }
  };

  const handleInputSubmit = () => {
    if (inputValue.trim() === '') {
      alert('Please provide a description.');
      return;
    }
    const newSelections = { ...selections, [currentNode.question]: inputValue.trim() };
    setSelections(newSelections);
    setCurrentNode({ question: 'Summary', options: {} });
  };

  const renderCurrentStep = () => {
    if (currentNode.input) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">{currentNode.question}</h2>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="Describe your issue..."
          ></textarea>
          <button
            onClick={handleInputSubmit}
            className="w-full bg-primary text-white p-4 rounded"
            disabled={inputValue.trim() === ''}
          >
            Next
          </button>
        </>
      );
    }

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{currentNode.question}</h2>
        <div className="space-y-2">
          {Object.keys(currentNode.options).map((optionKey) => (
            <OptionButton key={optionKey} onClick={() => handleOptionClick(optionKey)}>
              {optionKey}
            </OptionButton>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4">
        <div className='bg-white p-4 rounded shadow-md '>
        <div className="w-full max-w-md text-center">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default BookingProcessScreen;
