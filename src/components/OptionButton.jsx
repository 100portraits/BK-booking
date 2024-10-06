// src/components/OptionButton.jsx

import React from 'react';

const OptionButton = ({ onClick, children, time }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-100 p-4 rounded text-left hover:bg-gray-200 transition-colors flex justify-between items-center"
    >
      <span>{children}</span>
      {time && <span className="text-sm text-gray-600">({time} mins)</span>}
    </button>
  );
};

export default OptionButton;
