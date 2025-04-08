// Initialize Firebase
let app;
let auth;
let db;
let storage;
let messaging;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize Firebase only in browser environment
if (isBrowser) {
  try {
    // Check if Firebase is already initialized
    if (!getApps().length) {
      console.log('Initializing Firebase...');
      
      // Initialize Firebase with config
      app = initializeApp(firebaseConfig);
      
      // Initialize services
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      
      // Initialize messaging only if the browser supports it
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          messaging = getMessaging(app);
          console.log('Firebase messaging initialized successfully');
        } catch (error) {
          console.error('Error initializing Firebase messaging:', error);
        }
      } else {
        console.log('Push notifications not supported in this browser');
      }
      
      console.log('Firebase initialized successfully');
    } else {
      // Use existing Firebase instance
      app = getApps()[0];
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          messaging = getMessaging(app);
        } catch (error) {
          console.error('Error getting existing Firebase messaging:', error);
        }
      }
      
      console.log('Using existing Firebase instance');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export { app, auth, db, storage, messaging, isBrowser }; 