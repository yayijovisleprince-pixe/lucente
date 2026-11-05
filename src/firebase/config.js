import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyARa2J3YVWQtW1rWchEDnnjiAA6egnOkxI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lucente-milano.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lucente-milano",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lucente-milano.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "788837729474",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:788837729474:web:e5b7ffcc78d61f7b8fe75b"
};

let app = null;
let db = null;
let auth = null;
let googleProvider = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn('LUCENTE: Firebase initialization notice:', error.message);
}

export { app, db, auth, googleProvider };
export default db;

