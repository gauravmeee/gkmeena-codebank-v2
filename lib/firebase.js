'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore
} from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
let app;
let auth;
let db;

const initializeFirebaseApp = async () => {
  try {
    // Initialize Firebase app if not already initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Initialize Auth
    auth = getAuth(app);

    // Initialize Firestore with settings for better offline support
    db = initializeFirestore(app, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      experimentalForceLongPolling: true,
      useFetchStreams: false
    });

    // Enable offline persistence with multi-tab support
    if (typeof window !== 'undefined') {
      try {
        await enableMultiTabIndexedDbPersistence(db);
        console.log('Firestore offline persistence enabled with multi-tab support');
      } catch (enableError) {
        if (enableError.code === 'failed-precondition') {
          // Multiple tabs might be open, fall back to single-tab persistence
          try {
            await enableIndexedDbPersistence(db);
            console.log('Firestore offline persistence enabled for single tab');
          } catch (singleTabError) {
            console.warn('Failed to enable Firestore offline persistence:', singleTabError);
          }
        } else if (enableError.code === 'unimplemented') {
          console.warn('This browser doesn\'t support offline persistence');
        } else {
          console.error('Error enabling offline persistence:', enableError);
        }
      }
    }

    // Enable auth emulator in development if needed
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_AUTH_EMULATOR === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }

    return { app, auth, db };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

// Initialize Firebase and export the instances
let initialized = false;
try {
  if (!initialized) {
    initializeFirebaseApp().then(() => {
      initialized = true;
    }).catch(error => {
      console.error('Failed to initialize Firebase:', error);
    });
  }
} catch (error) {
  console.error('Error in Firebase initialization:', error);
  throw error;
}

export { app, auth, db }; 