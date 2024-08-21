// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6MJHrgOkb7_6wRuERYD-CyQ_6HA1emOY",
    authDomain: "bk-digitalisation.firebaseapp.com",
    projectId: "bk-digitalisation",
    storageBucket: "bk-digitalisation.appspot.com",
    messagingSenderId: "871735118074",
    appId: "1:871735118074:web:d5180aa4e1da262e902143",
    measurementId: "G-GV7JDCZNLQ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
