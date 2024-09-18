import admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import serviceAccount from '../bk-digitalisation-firebase-adminsdk-t2oz2-f66a2f770a.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const createSlots = async () => {
  const today = new Date();
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  const daysToGenerate = [1, 3, 4]; // 1 = Monday, 3 = Wednesday, 4 = Thursday

  const slotsByDay = {
    1: { start: 14, end: 18 }, // Monday: 14:00 - 18:00
    3: { start: 12, end: 16 }, // Wednesday: 12:00 - 16:00
    4: { start: 16, end: 20 }, // Thursday: 16:00 - 20:00
  };

  const batch = db.batch();

  for (let d = new Date(today); d <= oneMonthLater; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();

    if (daysToGenerate.includes(dayOfWeek)) {
      const { start, end } = slotsByDay[dayOfWeek];

      for (let hour = start; hour < end; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotTime = new Date(d);
          slotTime.setHours(hour, minute, 0, 0);

          const slotRef = db.collection('availableSlots').doc();

          batch.set(slotRef, {
            booked: false,
            timestamp: Timestamp.fromDate(slotTime),
          });
        }
      }
    }
  }

  await batch.commit();
  console.log('Slots generated for the next month.');
};

createSlots()
  .then(() => process.exit())
  .catch((error) => {
    console.error('Error generating slots:', error);
    process.exit(1);
  });
