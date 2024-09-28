// src/components/CalendarScreen.jsx
import React, { useState } from 'react';
import CustomCalendar from './CustomCalendar';
import AvailableSlots from './AvailableSlots';
import { useNavigate } from 'react-router-dom';

const CalendarScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (slot) => {
    // Save selected date and time to sessionStorage without sending to Firestore yet
    const finalBooking = {
      selectedDate: slot.timestamp.toISOString(),
      selectedTime: slot.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      slotId: slot.id,
    };
    sessionStorage.setItem('finalBooking', JSON.stringify(finalBooking));

    // Navigate to confirmation screen
    navigate('/confirmation');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300">
      <div className='bg-white p-6 rounded shadow-md w-[90vw] lg:w-fit'>
      <h2 className="text-2xl font-bold mb-4">Select Date and Time</h2>
      <CustomCalendar onDateSelect={handleDateSelect} />
      {selectedDate && <AvailableSlots selectedDate={selectedDate} onTimeSelect={handleTimeSelect} />}
      </div>
    </div>
  );
};

export default CalendarScreen;
