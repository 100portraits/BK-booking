// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Your environment variables from VSCODE
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

// Your environment variables from Cloudflare Pages
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalAutoDetectLongPolling: true , merge: true });

const db = initializeFirestore(app, 
  { experimentalAutoDetectLongPolling: true }
);

export { db };
