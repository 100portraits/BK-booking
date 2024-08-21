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
  apiKey: "AIzaSyC6MJHrgOkb7_6wRuERYD-CyQ_6HA1emOY",
  authDomain: "bk-digitalisation.firebaseapp.com",
  projectId: "bk-digitalisation",
  storageBucket: "bk-digitalisation.appspot.com",
  messagingSenderId: "871735118074",
  appId: "1:871735118074:web:d5180aa4e1da262e902143",
  measurementId: "G-GV7JDCZNLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app, 
  { experimentalForceLongPolling: true }
);

export { db };
