'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';
import { 
  enableIndexedDbPersistence, 
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Cloud Messaging
let messaging = null;

// Only initialize messaging in browser environment
if (typeof window !== 'undefined') {
  // Check if messaging is supported
  isSupported().then(supported => {
    if (supported) {
      messaging = getMessaging(app);
      console.log('Firebase messaging initialized');
    } else {
      console.log('Firebase messaging not supported in this browser');
    }
  }).catch(err => {
    console.error('Error checking messaging support:', err);
  });
}

// Enable offline persistence with multi-tab support
if (typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db).catch((enableError) => {
    if (enableError.code === 'failed-precondition') {
      // Multiple tabs might be open, fall back to single-tab persistence
      enableIndexedDbPersistence(db).catch((singleTabError) => {
        console.warn('Failed to enable Firestore offline persistence:', singleTabError);
      });
    } else if (enableError.code === 'unimplemented') {
      console.warn('This browser doesn\'t support offline persistence');
    } else {
      console.error('Error enabling offline persistence:', enableError);
    }
  });
}

export { app, db, auth, messaging }; 