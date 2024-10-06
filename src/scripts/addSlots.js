import { db } from '../firebase.js'
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function generateTimeSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
}

async function addAvailableSlots() {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7); // Start a week from now
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30); // End 30 days after start date

  const schedule = {
    1: generateTimeSlots(14, 18), // Monday
    3: generateTimeSlots(12, 16), // Wednesday
    4: generateTimeSlots(16, 20), // Thursday
  };

  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const dayOfWeek = day.getDay();
    if (schedule[dayOfWeek]) {
      for (const time of schedule[dayOfWeek]) {
        const timestamp = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 
                                   parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
        
        try {
          const docRef = await addDoc(collection(db, 'availableSlots'), {
            booked: false,
            timestamp: Timestamp.fromDate(timestamp)
          });
          console.log(`Added slot: ${timestamp.toISOString()} with ID: ${docRef.id}`);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }
  
  console.log('Finished adding available slots');
}

addAvailableSlots().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
