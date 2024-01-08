import { initializeApp } from 'firebase/app';

console.log(process.env.REACT_APP_FIREBASE_API_KEY);
console.log(process.env);

const firebaseConfig = {
  apiKey: 'AIzaSyCk-G4-bHktbOkPp0I6LxZNehY6V9pAasA',
  authDomain: 'learnlingo-ccc63.firebaseapp.com',
  projectId: 'learnlingo-ccc63',
  storageBucket: 'learnlingo-ccc63.appspot.com',
  messagingSenderId: '756189185901',
  appId: '1:756189185901:web:e3b5a96cb2bd3a4cdffc64',
};

export const app = initializeApp(firebaseConfig);


