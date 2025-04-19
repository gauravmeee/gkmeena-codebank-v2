// Add these flags at the top of your notificationService.js
let isInitialized = false;
let isInitializing = false;
let onMessageCallback = null;
let messageHandlerUnsubscribe = null;

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
      // First check if we already have a service worker with the right scope
      const registrations = await navigator.serviceWorker.getRegistrations();
      const existingRegistration = registrations.find(reg => reg.scope === '/');
      
      if (existingRegistration) {
        console.log('Service worker already registered with scope:', existingRegistration.scope);
        return existingRegistration;
      }
      
      console.log('Registering new service worker...');
      
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

    // Prevent multiple simultaneous initializations
    if (isInitializing) {
      console.log('NotificationService initialization already in progress');
      // Wait for initialization to complete
      while (isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return isInitialized;
    }

    isInitializing = true;

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log('Not in browser environment, skipping initialization');
      isInitializing = false;
      return false;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('Service workers not supported');
      isInitializing = false;
      return false;
    }

    // Check if push notifications are supported
    if (!('PushManager' in window)) {
      console.log('Push notifications not supported');
      isInitializing = false;
      return false;
    }

    // Check notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission status:', permission);
    
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      isInitializing = false;
      return false;
    }

    // Register service worker
    const registration = await registerServiceWorker();
    if (!registration) {
      console.log('Failed to register service worker');
      isInitializing = false;
      return false;
    }

    // Initialize Firebase messaging
    console.log('Initializing Firebase messaging...');
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      isInitializing = false;
      return false;
    }

    isInitialized = true;
    isInitializing = false;
    console.log('Notification service initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing notification service:', error);
    isInitializing = false;
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

// Handle foreground messages
const setupOnMessage = (callback) => {
  if (typeof window === 'undefined') return;
  
  // Clean up existing handler if there is one
  if (messageHandlerUnsubscribe) {
    console.log('Cleaning up previous message handler');
    messageHandlerUnsubscribe();
    messageHandlerUnsubscribe = null;
  }
  
  console.log('Setting up new onMessage handler...');
  onMessageCallback = callback;
  
  // Store the unsubscribe function
  messageHandlerUnsubscribe = onMessage(messaging, (payload) => {
    console.log('[notificationService] Received foreground message:', payload);
    
    // Show notification if it's a test notification or app is not visible
    if (payload.data?.isTest === 'true' || document.visibilityState !== 'visible') {
      // Generate a unique notification ID
      const notificationId = payload.data?.id || `foreground-${Date.now()}`;
      
      // Check last notification time
      const lastNotificationTime = window.lastNotificationTime || 0;
      const now = Date.now();
      if (now - lastNotificationTime < 2000) {
        console.log('[notificationService] Skipping notification - too soon after last one');
        return;
      }
      
      // Customize notification here
      const notificationTitle = payload.notification.title || 'New Notification';
      const notificationOptions = {
        body: payload.notification.body || 'You have a new notification',
        icon: payload.data?.platform ? `/assets/contests/${payload.data.platform.toLowerCase()}.png` : '/assets/contests/default.png',
        badge: '/assets/contests/default.png',
        data: {
          ...payload.data,
          id: notificationId
        },
        tag: 'contest-reminder',
        requireInteraction: true
      };

      // Check if a notification with the same tag is already showing
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications({ tag: 'contest-reminder' })
          .then(notifications => {
            if (notifications.length > 0) {
              console.log('[notificationService] Closing existing notifications');
              notifications.forEach(notification => notification.close());
            }
            
            window.lastNotificationTime = now;
            // Show the notification
            return registration.showNotification(notificationTitle, notificationOptions);
          })
          .catch(error => {
            console.error('[notificationService] Error checking existing notifications:', error);
          });
      });
    }
  });
};

// Export the notification service
export const notificationService = {
  init,
  getFCMToken,
  setupOnMessage,
  requestFCMToken,
  registerServiceWorker
}; 