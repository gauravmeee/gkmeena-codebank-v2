// Request FCM token with VAPID key
const requestFCMToken = async () => {
  try {
    console.log('Requesting FCM token with VAPID key...');
    
    // Ensure VAPID key is properly formatted
    let vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    
    // Ensure vapidKey is a string
    if (vapidKey && typeof vapidKey !== 'string') {
      console.log('Converting VAPID key to string');
      vapidKey = String(vapidKey);
    }
    
    // If we're in a browser environment and the key is in the wrong format
    if (typeof window !== 'undefined' && vapidKey) {
      // Only format the key if it's not already in the correct format
      // and doesn't match the expected VAPID key pattern
      if (typeof vapidKey === 'string' && 
          !vapidKey.includes('-----BEGIN PUBLIC KEY-----') && 
          !/^[A-Za-z0-9_-]+$/.test(vapidKey)) {
        try {
          // If it's a base64 string, try to convert it
          if (/^[A-Za-z0-9+/=]+$/.test(vapidKey)) {
            // This is a base64 string, we need to format it as a proper VAPID key
            vapidKey = `-----BEGIN PUBLIC KEY-----\n${vapidKey}\n-----END PUBLIC KEY-----`;
            console.log('Converted VAPID key to proper format');
          }
        } catch (e) {
          console.error('Error formatting VAPID key:', e);
        }
      } else {
        console.log('Using VAPID key as-is (already in correct format)');
      }
    }
    
    // Add retry mechanism for FCM token requests
    let retryCount = 0;
    const maxRetries = 3;
    let currentToken = null;
    
    while (retryCount < maxRetries && !currentToken) {
      try {
        currentToken = await getToken(messaging, { vapidKey });
        if (currentToken) {
          console.log('FCM token obtained successfully:', currentToken);
          break;
        }
      } catch (error) {
        console.error(`Error requesting FCM token (attempt ${retryCount + 1}/${maxRetries}):`, error);
        retryCount++;
        
        // Wait before retrying
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }
    }
    
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available after retries.');
      return null;
    }
  } catch (error) {
    console.error('Error in requestFCMToken function:', error);
    return null;
  }
};

// Register service worker
const registerServiceWorker = async () => {
  try {
    if ('serviceWorker' in navigator) {
      console.log('Registering new service worker...');
      
      // Get all existing service workers
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log('Existing service workers:', registrations.length);
      
      // Unregister all existing service workers
      for (const registration of registrations) {
        console.log('Unregistering service worker:', registration.scope);
        await registration.unregister();
      }
      
      // Register new service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/'
      });
      
      console.log('Service Worker registered with scope:', registration.scope);
      
      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready;
      console.log('Service Worker is ready');
      
      return registration;
    } else {
      console.log('Service Worker not supported in this browser');
      return null;
    }
  } catch (error) {
    console.error('Error registering service worker:', error);
    return null;
  }
};

// Initialize notification service
const init = async () => {
  try {
    if (isInitialized) {
      console.log('NotificationService already initialized');
      return true;
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log('Not in browser environment, skipping initialization');
      return false;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('Service workers not supported');
      return false;
    }

    // Check if push notifications are supported
    if (!('PushManager' in window)) {
      console.log('Push notifications not supported');
      return false;
    }

    // Check notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission status:', permission);
    
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return false;
    }

    // Register service worker
    const registration = await registerServiceWorker();
    if (!registration) {
      console.log('Failed to register service worker');
      return false;
    }

    // Initialize Firebase messaging
    console.log('Initializing Firebase messaging...');
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      return false;
    }

    // Set up message handler
    onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      if (onMessageCallback) {
        onMessageCallback(payload);
      }
    });

    isInitialized = true;
    console.log('Notification service initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing notification service:', error);
    return false;
  }
};

// Get FCM token
const getFCMToken = async (userId) => {
  try {
    if (!isInitialized) {
      console.log('Notification service not initialized, initializing now...');
      const initialized = await init();
      if (!initialized) {
        console.error('Failed to initialize notification service');
        return null;
      }
    }

    console.log('Getting FCM token for user:', userId);
    const token = await requestFCMToken();
    
    if (token) {
      console.log('FCM token obtained successfully:', token);
      
      // Save token to user document
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        fcmToken: token,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      console.log('FCM token saved to user document');
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}; 