// src/components/OptionButton.jsx

import React from 'react';

const OptionButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-100 p-4 rounded text-left hover:bg-gray-200 transition-colors"
    >
      {children}
    </button>
  );
};

export default OptionButton;
