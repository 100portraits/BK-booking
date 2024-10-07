// src/components/BookingProcessScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import decisionTreeConfig from '../config/decisionTreeConfig';
// import decisionTreeConfigNL from '../config/decisionTreeConfigNL';
import OptionButton from './OptionButton';

const BookingProcessScreen = () => {
  const navigate = useNavigate();
  // const [language, setLanguage] = useState('en');
  const [currentNode, setCurrentNode] = useState(decisionTreeConfig);
  const [selections, setSelections] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [dontKnowSelected, setDontKnowSelected] = useState(false);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      goBack();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Commented out language change effect
  // useEffect(() => {
  //   setCurrentNode(language === 'en' ? decisionTreeConfig : decisionTreeConfigNL);
  //   setHistory([]);
  //   setSelections({});
  // }, [language]);

  const goBack = () => {
    if (history.length > 0) {
      const prevNode = history[history.length - 1];
      setCurrentNode(prevNode);
      setHistory(history.slice(0, -1));
      setSelections((prev) => {
        const { [prevNode.question]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const findTimeValue = (node) => {
    if (node.time) return node.time;
    if (node.options) {
      for (let key in node.options) {
        const time = findTimeValue(node.options[key]);
        if (time) return time;
      }
    }
    return null;
  };

  const handleOptionClick = (optionKey) => {
    const selectedOption = currentNode.options[optionKey];
    const time = findTimeValue(selectedOption);
    
    const newSelections = { 
      ...selections, 
      [currentNode.question]: optionKey,
      time: time || selections.time // Keep previous time if new time is not found
    };

    setSelections(newSelections);
    sessionStorage.setItem('bookingSelection', JSON.stringify(newSelections));

    setHistory([...history, currentNode]);

    if (selectedOption.summary === "summary") {
      sessionStorage.setItem('bookingSelection', JSON.stringify(newSelections));
      sessionStorage.setItem('dontKnowSelected', dontKnowSelected);
      
      // Check for specific selections that require disclaimers
      if (newSelections['Select Brake Type'] === 'Disc') {
        navigate('/disc-brake-disclaimer');
      } else if (newSelections['What do you need help with?'] === 'Truing Wheel') {
        navigate('/wheel-truing-disclaimer');
      } else {
        navigate('/userinfo');
      }
    } else if (selectedOption.input) {
      setCurrentNode(selectedOption);
      setInputValue('');
    } else {
      setCurrentNode(selectedOption);
    }
  };

  const handleDontKnow = () => {
    setDontKnowSelected(true);
    const newSelections = { ...selections, [currentNode.question]: "Don't know" };
    setSelections(newSelections);
    sessionStorage.setItem('bookingSelection', JSON.stringify(newSelections));

    // Check if the current question is "What do you need help with?"
    if (currentNode.question === "What do you need help with?") {
      // If so, skip directly to the disclaimer screen
      sessionStorage.setItem('dontKnowSelected', 'true');
      navigate('/disclaimer');
    } else if (currentNode.options && currentNode.options["Don't know"]) {
      handleOptionClick("Don't know");
    } else {
      // If there are no more options or we're at the last step, go to summary
      sessionStorage.setItem('dontKnowSelected', 'true');
      navigate('/userinfo');
    }
  };

  const handleInputSubmit = () => {
    const newSelections = { ...selections, [currentNode.question]: inputValue.trim() };
    setSelections(newSelections);
    sessionStorage.setItem('bookingSelection', JSON.stringify(newSelections));

    if (currentNode.options) {
      // If there are more options after the input, show them
      setCurrentNode({ ...currentNode, input: false });
    } else {
      // If there are no more options, go to summary
      navigate('/userinfo');
    }
  };

  const showDontKnowButton = () => {
    // Don't show the "Don't know" button if the user selected "Other" for "What do you need help with?"
    return !(selections['What do you need help with?'] === 'Other');
  };

  // Commented out toggleLanguage function
  // const toggleLanguage = () => {
  //   setLanguage(prevLang => prevLang === 'en' ? 'nl' : 'en');
  // };

  const renderCurrentStep = () => {
    if (!currentNode || !currentNode.question) {
      navigate('/userinfo'); // Redirect to summary if currentNode is invalid
      return null;
    }

    if (currentNode.input) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">{currentNode.question}</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder={currentNode.placeholder || "Enter your response..."}
          />
          <button
            onClick={handleInputSubmit}
            className="w-full bg-primary text-white p-4 rounded mb-2"
          >
            Next
          </button>
          {showDontKnowButton() && (
            <button
              onClick={handleDontKnow}
              className="w-full bg-gray-400 text-white p-4 rounded"
            >
              Don't know
            </button>
          )}
        </>
      );
    }

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{currentNode.question}</h2>
        <div className="space-y-2">
          {currentNode.options && Object.entries(currentNode.options).map(([optionKey, optionValue]) => (
            <OptionButton 
              key={optionKey} 
              onClick={() => handleOptionClick(optionKey)}
              time={optionValue.time}
            >
              {optionKey}
            </OptionButton>
          ))}
          {showDontKnowButton() && (
            <button
              onClick={handleDontKnow}
              className="w-full bg-gray-400 text-white p-4 rounded"
            >
              Don't know
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 p-4 relative">
      {/* Commented out language toggle button */}
      {/* <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
        >
          {language === 'en' ? 'NL' : 'EN'}
        </button>
      </div> */}
      <div className='bg-white p-6 rounded shadow-md'>
        <div className="w-full max-w-md text-center">
          {history.length > 0 && (
            <button
              onClick={goBack}
              className="mb-4 text-blue-500 hover:text-blue-700"
            >
              ← Back
            </button>
          )}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default BookingProcessScreen;