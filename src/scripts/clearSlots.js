import { db } from '../firebase.js';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

async function clearAvailableSlots() {
  const availableSlotsRef = collection(db, 'availableSlots');

  try {
    const querySnapshot = await getDocs(availableSlotsRef);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    
    await Promise.all(deletePromises);
    
    console.log(`Cleared ${querySnapshot.size} documents from availableSlots collection`);
  } catch (error) {
    console.error('Error clearing availableSlots collection:', error);
  }
}

clearAvailableSlots().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
