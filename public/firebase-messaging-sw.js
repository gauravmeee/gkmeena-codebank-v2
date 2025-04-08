// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Log when service worker starts
console.log('[firebase-messaging-sw.js] Initializing Firebase app...');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: 'AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-app',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
  measurementId: 'G-XXXXXXXXXX'
});

console.log('[firebase-messaging-sw.js] Firebase app initialized');

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
console.log('[firebase-messaging-sw.js] Firebase messaging initialized');

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  // Extract notification data
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || '/assets/contests/default.png',
    badge: '/assets/contests/default.png',
    data: payload.data || {},
    tag: payload.data?.type || 'notification',
    renotify: true,
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  // Show the notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
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
  
  // Handle different actions
  if (event.action === 'view') {
    // Get the URL from the notification data or use a default
    const url = event.notification.data?.url || '/';
    
    // Open the URL in a new tab
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event received:', event);
  
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('[firebase-messaging-sw.js] Push data:', data);
      
      // Show notification based on the push data
      const notificationTitle = data.notification?.title || 'New Notification';
      const notificationOptions = {
        body: data.notification?.body || 'You have a new notification',
        icon: data.notification?.icon || '/assets/contests/default.png',
        badge: '/assets/contests/default.png',
        data: data.data || {},
        tag: data.data?.type || 'notification',
        renotify: true,
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Details'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      };
      
      event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
      );
    } catch (error) {
      console.error('[firebase-messaging-sw.js] Error processing push data:', error);
    }
  }
}); 