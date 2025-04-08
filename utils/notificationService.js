// Request FCM token with VAPID key
const requestFCMToken = async () => {
  try {
    console.log('Requesting FCM token with VAPID key...');
    
    // Ensure VAPID key is properly formatted
    let vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    
    // If we're in a browser environment and the key is in the wrong format
    if (typeof window !== 'undefined' && vapidKey) {
      // Check if the key is already in the correct format
      if (!vapidKey.includes('-----BEGIN PUBLIC KEY-----')) {
        // Try to convert the key to the correct format
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
      }
    }
    
    const currentToken = await getToken(messaging, { vapidKey });
    
    if (currentToken) {
      console.log('FCM token obtained successfully:', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available.');
      return null;
    }
  } catch (error) {
    console.error('Error requesting FCM token:', error);
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