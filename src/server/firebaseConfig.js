import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseDefaults = {
  apiKey: 'AIzaSyCk-G4-bHktbOkPp0I6LxZNehY6V9pAasA',
  authDomain: 'learnlingo-ccc63.firebaseapp.com',
  projectId: 'learnlingo-ccc63',
  storageBucket: 'learnlingo-ccc63.appspot.com',
  messagingSenderId: '756189185901',
  appId: '1:756189185901:web:e3b5a96cb2bd3a4cdffc64',
  databaseURL:
    'https://learnlingo-ccc63-default-rtdb.europe-west1.firebasedatabase.app/',
};

const getFirebaseConfigValue = (envValue, defaultValue) => {
  return envValue && envValue.trim() ? envValue : defaultValue;
};

const firebaseConfig = {
  apiKey: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_API_KEY,
    firebaseDefaults.apiKey
  ),
  authDomain: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    firebaseDefaults.authDomain
  ),
  projectId: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_PROJECT_ID,
    firebaseDefaults.projectId
  ),
  storageBucket: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    firebaseDefaults.storageBucket
  ),
  messagingSenderId: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    firebaseDefaults.messagingSenderId
  ),
  appId: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_APP_ID,
    firebaseDefaults.appId
  ),
  databaseURL: getFirebaseConfigValue(
    process.env.REACT_APP_FIREBASE_DATABASE_URL,
    firebaseDefaults.databaseURL
  ),
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export const dbRef = ref(db);
