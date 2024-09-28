// src/components/CustomCalendar.jsx

import React, { useState, useEffect } from 'react';
import { getStartOfWeek, generateWeeks, isPastDate, isUnclickableDay } from '../helpers/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';


const CustomCalendar = ({ onDateSelect }) => {
  const [currentStartDate, setCurrentStartDate] = useState(getStartOfWeek(new Date()));
  const [weeks, setWeeks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date(currentStartDate));

  useEffect(() => {
    const generatedWeeks = generateWeeks(currentStartDate, 2);
    setWeeks(generatedWeeks);

    if (generatedWeeks.length > 0) {
      const lastWeek = generatedWeeks[generatedWeeks.length - 1];
      const lastDate = lastWeek[lastWeek.length - 1];
      setEndDate(lastDate);
    }
  }, [currentStartDate]);

  const handlePrevWeeks = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(newStartDate.getDate() - 14); // Move back two weeks
    setCurrentStartDate(getStartOfWeek(newStartDate));
  };

  const handleNextWeeks = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(newStartDate.getDate() + 14); // Move forward two weeks
    setCurrentStartDate(getStartOfWeek(newStartDate));
  };

  

  const handleDateClick = (date) => {
    if (!isPastDate(date) && !isUnclickableDay(date)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevWeeks}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
          aria-label="Previous two weeks"
        >
         &lt;
          </button>
        <h3 className="text-lg font-semibold text-center flex-1 mx-2">
          {currentStartDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </h3>
        <button
          onClick={handleNextWeeks}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
          aria-label="Next two weeks"
        >
          &gt;
        </button>
      </div>
      {/* Weekday Labels */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      {/* Weeks */}
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-5 gap-2 mb-4">
          {week.map((date, dayIndex) => {
            const isSelected =
              selectedDate &&
              date.toDateString() === new Date(selectedDate).toDateString();

            const unclickable = isUnclickableDay(date);
            const disabled = isPastDate(date) || unclickable;

            return (
              <button
                key={dayIndex}
                onClick={() => handleDateClick(date)}
                className={`p-3 rounded-md text-sm flex flex-col items-center justify-center ${
                  disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-primary text-white'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}
                disabled={disabled}
                aria-pressed={isSelected}
                aria-disabled={disabled}
                title={unclickable ? 'This day is not selectable' : undefined} // Optional: Tooltip for unclickable days
              >
                <span className="text-base font-semibold">{date.getDate()}</span>
                <span className="text-xs">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CustomCalendar;
