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
    const bookingSelection = JSON.parse(sessionStorage.getItem('bookingSelection'));
    
    const finalBooking = {
      selectedDate: slot.timestamp.toISOString(),
      selectedTime: `${slot.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - ${slot.endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
      slotId: slot.id,
      time: bookingSelection.time
    };
    sessionStorage.setItem('finalBooking', JSON.stringify(finalBooking));

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
