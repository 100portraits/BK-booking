// src/firebase.js

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
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
  apiKey: context.env.apiKey,
  authDomain: context.env.authDomain,
  projectId: context.env.projectId,
  storageBucket: context.env.storageBucket,
  messagingSenderId: context.env.messagingSenderId,
  appId: context.env.appId,
  measurementId: context.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app, 
  { experimentalForceLongPolling: true }
);

export { db };
