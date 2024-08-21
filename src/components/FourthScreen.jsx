// src/components/FourthScreen.jsx

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Dialog,
  Heading,
  Button,
} from 'react-aria-components';
import ChevronLeftIcon from '@spectrum-icons/workflow/ChevronLeft';
import ChevronRightIcon from '@spectrum-icons/workflow/ChevronRight';

const FourthScreen = ({ next, selection }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDate) {
        try {
          const startOfDay = new Date(selectedDate).setHours(0, 0, 0, 0);
          const endOfDay = new Date(selectedDate).setHours(23, 59, 59, 999);
          const q = query(
            collection(db, 'availableSlots'),
            where('timestamp', '>=', Timestamp.fromDate(new Date(startOfDay))),
            where('timestamp', '<=', Timestamp.fromDate(new Date(endOfDay)))
          );
          const querySnapshot = await getDocs(q);

          const slots = querySnapshot.docs
            .map(doc => doc.data())
            .filter(slot => !slot.booked)
            .map(slot => slot.timestamp.toDate());

          setAvailableSlots(slots);
        } catch (error) {
          console.error("Error fetching available slots: ", error);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (selectedDate && selectedTime) {
      const selectedTimestamp = new Date(selectedTime);
  
      const updatedSelection = {
        ...selection,
        timestamp: selectedTimestamp,
      };
  
      const newBooking = {
        ...updatedSelection,
      };
  
      const appointmentsRef = collection(db, 'appointments');
      await addDoc(appointmentsRef, newBooking);
  
      const slotDocRef = query(
        collection(db, 'availableSlots'),
        where('timestamp', '==', Timestamp.fromDate(selectedTimestamp))
      );
  
      const slotSnapshot = await getDocs(slotDocRef);
      if (slotSnapshot.docs.length > 0) {
        const slotDoc = slotSnapshot.docs[0];
        await updateDoc(slotDoc.ref, { booked: true });
      }
  
      next(updatedSelection); // Pass the updated selection including timestamp to the next screen
    } else {
      alert("Please select a date and time.");
    }
  };
  

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date.toDate());
      setSelectedTime(''); // Clear previously selected time when the date changes
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const renderCalendarCell = (date) => {
    const jsDate = date.toDate(); // Convert the special date object to a JavaScript Date object
    const dayOfWeek = jsDate.getDay();
    const isWeekendOrTuesday = dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 6;
    const today = new Date().setHours(0, 0, 0, 0); // Normalize today to start of day
    const isPastDate = jsDate < today;

    return (
      <CalendarCell
        date={date}
        className={`w-12 h-12 outline-none cursor-default rounded-full flex items-center justify-center 
          ${isWeekendOrTuesday || isPastDate ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 pressed:bg-gray-200 selected:bg-red-700 selected:text-white focus-visible:ring ring-red-600/70 ring-offset-2'}`}
        disabled={isWeekendOrTuesday || isPastDate}
      />
    );
  };

  return (
    <div className="bg-white p-10 rounded shadow-md text-center mb-8 w-full max-w-3xl">
      <h2 className="text-3xl mb-6 text-black">Select Date & Time</h2>

      {/* Inline Calendar */}
      <div className="mb-4 flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-none flex justify-center">
          <Calendar onChange={handleDateChange} className="flex flex-col max-w-md justify-center">
            <header className="flex items-center gap-1 pb-4 px-1 w-full justify-between">
              <RoundButton slot="previous">
                <ChevronLeftIcon />
              </RoundButton>
              <Heading className="flex-1 font-semibold text-xl text-center" />
              <RoundButton slot="next">
                <ChevronRightIcon />
              </RoundButton>
            </header>
            <CalendarGrid className="border-spacing-2 border-separate ">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs text-gray-500 font-semibold text-center">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => renderCalendarCell(date)}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </div>
      </div>

      {selectedDate && (
        <div className="mb-4">
          {availableSlots.length > 0 ? (
            <p className="text-lg text-black mb-2">Available Appointments:</p>
          ) : (
            <p className="text-lg text-red-600 mb-2">No available appointments for this date.</p>
          )}

          <div className="flex justify-center space-x-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot.toISOString())}
                className={`p-3 border rounded text-lg ${
                  selectedTime === slot.toISOString() ? 'bg-red-700 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                {slot.getHours().toString().padStart(2, '0')}:{slot.getMinutes().toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      )}
            <button onClick={handleBooking} className="btn-primary text-lg">Confirm Booking</button>
    </div>
  );
};

function RoundButton(props) {
  return (
    <Button
      {...props}
      className="w-9 h-9 outline-none cursor-default bg-transparent text-gray-600 border-0 rounded-full flex items-center justify-center hover:bg-gray-100 pressed:bg-gray-200 focus-visible:ring ring-red-600/70 ring-offset-2"
    />
  );
}

export default FourthScreen;
