// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

// Log when service worker starts
console.log('[firebase-messaging-sw.js] Initializing Firebase app...');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: 'AIzaSyDxGXZxXZxXZxXZxXZxXZxXZxXZxXZxXZx',
  authDomain: 'gkmeena-codebank.firebaseapp.com',
  projectId: 'gkmeena-codebank',
  storageBucket: 'gkmeena-codebank.appspot.com',
  messagingSenderId: '309464152113',
  appId: '1:309464152113:web:9f9f9f9f9f9f9f9f9f9f9f',
  measurementId: 'G-XXXXXXXXXX'
});

console.log('[firebase-messaging-sw.js] Firebase app initialized');

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
console.log('[firebase-messaging-sw.js] Firebase messaging initialized');

// Track processed request IDs to prevent duplicates
const processedRequests = new Set();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  // Skip if this is a test notification (it will be handled by the foreground handler)
  if (payload.data && payload.data.isTest) {
    console.log('[firebase-messaging-sw.js] Skipping test notification in background');
    return;
  }
  
  // Check for duplicate request
  const requestId = payload.data?.requestId;
  if (requestId && processedRequests.has(requestId)) {
    console.log('[firebase-messaging-sw.js] Duplicate request detected, skipping:', requestId);
    return;
  }
  
  // Add request to processed set
  if (requestId) {
    processedRequests.add(requestId);
    // Clean up old request IDs after 1 hour
    setTimeout(() => processedRequests.delete(requestId), 60 * 60 * 1000);
  }
  
  // Customize notification here
  const notificationTitle = payload.notification.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new notification',
    icon: payload.data?.platform ? `/assets/contests/${payload.data.platform.toLowerCase()}.png` : '/assets/contests/default.png',
    badge: '/assets/contests/default.png',
    data: payload.data,
    tag: 'contest-reminder',
    requireInteraction: true
  };

  // Check if a notification with the same tag is already showing
  self.registration.getNotifications({ tag: 'contest-reminder' })
    .then(notifications => {
      if (notifications.length > 0) {
        console.log('[firebase-messaging-sw.js] Notification with same tag already exists, skipping');
        return;
      }
      
      // Show the notification
      return self.registration.showNotification(notificationTitle, notificationOptions);
    })
    .catch(error => {
      console.error('[firebase-messaging-sw.js] Error checking existing notifications:', error);
    });
});

// Log when service worker receives any message
self.addEventListener('message', (event) => {
  console.log('[firebase-messaging-sw.js] Received message event:', event.data);
});

// Log when service worker is installed
self.addEventListener('install', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker installed');
});

// Log when service worker is activated
self.addEventListener('activate', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker activated');
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);
  
  // Close the notification
  event.notification.close();
  
  // Open the app or a specific URL
  const urlToOpen = new URL('/', self.location.origin).href;
  
  // Check if there's already a tab open with this URL
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // If a window client is found, focus it
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window client is found, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event received:', event);
  
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('[firebase-messaging-sw.js] Push data:', data);
      
      // Skip if this is a test notification
      if (data.data && data.data.isTest) {
        console.log('[firebase-messaging-sw.js] Skipping test notification in push event');
        return;
      }
      
      // Check for duplicate request
      const requestId = data.data?.requestId;
      if (requestId && processedRequests.has(requestId)) {
        console.log('[firebase-messaging-sw.js] Duplicate request detected, skipping:', requestId);
        return;
      }
      
      // Add request to processed set
      if (requestId) {
        processedRequests.add(requestId);
        // Clean up old request IDs after 1 hour
        setTimeout(() => processedRequests.delete(requestId), 60 * 60 * 1000);
      }
      
      // Check if a notification with the same tag is already showing
      event.waitUntil(
        self.registration.getNotifications({ tag: 'contest-reminder' })
          .then(notifications => {
            if (notifications.length > 0) {
              console.log('[firebase-messaging-sw.js] Notification with same tag already exists, skipping');
              return;
            }
            
            // Show notification based on the push data
            const notificationTitle = data.notification?.title || 'New Notification';
            const notificationOptions = {
              body: data.notification?.body || 'You have a new notification',
              icon: data.data?.platform ? `/assets/contests/${data.data.platform.toLowerCase()}.png` : '/assets/contests/default.png',
              badge: '/assets/contests/default.png',
              data: data.data || {},
              tag: 'contest-reminder',
              requireInteraction: true
            };
            
            return self.registration.showNotification(notificationTitle, notificationOptions);
          })
      );
    } catch (error) {
      console.error('[firebase-messaging-sw.js] Error processing push data:', error);
    }
  }
}); 