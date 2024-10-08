// src/components/AvailableSlots.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AvailableSlots = ({ selectedDate, onTimeSelect }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');
  const [allBooked, setAllBooked] = useState(false);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDate) {
        try {
          const startOfDay = new Date(selectedDate);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(selectedDate);
          endOfDay.setHours(23, 59, 59, 999);
          
          const q = query(
            collection(db, 'availableSlots'),
            where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
            where('timestamp', '<=', Timestamp.fromDate(endOfDay))
          );
          const querySnapshot = await getDocs(q);

          const slots = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .map(slot => ({ ...slot, timestamp: slot.timestamp.toDate() }))
            .sort((a, b) => a.timestamp - b.timestamp);

          const bookingSelection = JSON.parse(sessionStorage.getItem('bookingSelection'));
          const requiredSlots = Math.ceil(bookingSelection.time / 30);

          const availableConsecutiveSlots = [];
          for (let i = 0; i < slots.length - requiredSlots + 1; i++) {
            let consecutive = true;
            for (let j = 0; j < requiredSlots; j++) {
              if (slots[i + j].booked) {
                consecutive = false;
                break;
              }
            }
            if (consecutive) {
              availableConsecutiveSlots.push({
                ...slots[i],
                endTime: new Date(slots[i].timestamp.getTime() + requiredSlots * 30 * 60000)
              });
            }
          }

          setAvailableSlots(availableConsecutiveSlots);
          setAllBooked(slots.length > 0 && availableConsecutiveSlots.length === 0);
          setError('');
        } catch (error) {
          console.error("Error fetching available slots: ", error);
          setError('Failed to load available slots. Please try again later.');
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const handleTimeClick = (slot) => {
    onTimeSelect(slot);
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {availableSlots.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleTimeClick(slot)}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded"
            >
              {slot.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - 
              {slot.endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          {allBooked 
            ? "All time slots on this date are booked." 
            : "No available time slots for this date."}
        </p>
      )}
    </div>
  );
};

export default AvailableSlots;
