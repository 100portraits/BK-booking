import { db } from '../firebase.js'
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import inquirer from 'inquirer';

function generateTimeSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
}

const timeSlots = {
  1: { name: 'Monday', start: 14, end: 18 },
  3: { name: 'Wednesday', start: 12, end: 16 },
  4: { name: 'Thursday', start: 16, end: 20 }
};

async function findFirstDateWithoutSlots() {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  let currentDate = new Date(startDate);
  
  while (true) {
    // Create start and end of day timestamps
    const dayStart = new Date(currentDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(currentDate);
    dayEnd.setHours(23, 59, 59, 999);

    // Query for slots on this day
    const q = query(
      collection(db, 'availableSlots'),
      where('timestamp', '>=', Timestamp.fromDate(dayStart)),
      where('timestamp', '<=', Timestamp.fromDate(dayEnd))
    );

    const querySnapshot = await getDocs(q);
    
    // If no slots found for this day, return this date
    if (querySnapshot.empty) {
      return currentDate;
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

async function addAvailableSlots(endDate, selectedDays) {
  const startDate = await findFirstDateWithoutSlots();
  console.log(`Starting from first date without slots: ${startDate.toISOString().split('T')[0]}`);
  
  const finalEndDate = new Date(endDate);

  const schedule = {};
  selectedDays.forEach(day => {
    schedule[day] = generateTimeSlots(timeSlots[day].start, timeSlots[day].end);
  });

  let slotsAdded = 0;
  for (let day = new Date(startDate); day <= finalEndDate; day.setDate(day.getDate() + 1)) {
    const dayOfWeek = day.getDay();
    if (schedule[dayOfWeek]) {
      // Check if slots already exist for this day
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const existingSlots = await getDocs(
        query(
          collection(db, 'availableSlots'),
          where('timestamp', '>=', Timestamp.fromDate(dayStart)),
          where('timestamp', '<=', Timestamp.fromDate(dayEnd))
        )
      );

      if (!existingSlots.empty) {
        console.log(`Skipping ${day.toISOString().split('T')[0]} - slots already exist`);
        continue;
      }

      for (const time of schedule[dayOfWeek]) {
        const timestamp = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 
                                 parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
        
        try {
          const docRef = await addDoc(collection(db, 'availableSlots'), {
            booked: false,
            timestamp: Timestamp.fromDate(timestamp)
          });
          slotsAdded++;
          console.log(`Added slot: ${timestamp.toISOString()} with ID: ${docRef.id}`);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }
  
  console.log(`Finished adding ${slotsAdded} available slots`);
}

async function main() {
  const questions = [
    {
      type: 'input',
      name: 'endDate',
      message: 'Enter end date (YYYY-MM-DD):',
      validate: function(value) {
        const valid = /^\d{4}-\d{2}-\d{2}$/.test(value);
        return valid || 'Please enter date in YYYY-MM-DD format';
      }
    },
    {
      type: 'checkbox',
      name: 'days',
      message: 'Select days to generate slots for:',
      choices: [
        { name: 'Monday (14:00-18:00)', value: 1 },
        { name: 'Wednesday (12:00-16:00)', value: 3 },
        { name: 'Thursday (16:00-20:00)', value: 4 }
      ],
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one day.';
        }
        return true;
      }
    }
  ];

  try {
    const answers = await inquirer.prompt(questions);
    await addAvailableSlots(answers.endDate, answers.days);
    console.log('Script completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
