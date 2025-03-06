'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore
} from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase immediately
let app;
let auth;
let db;

// Initialize Firebase app if not already initialized
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore with settings for better offline support
    db = initializeFirestore(app, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      experimentalForceLongPolling: true,
      useFetchStreams: false
    });

    // Initialize Auth
    auth = getAuth(app);

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
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db }; 