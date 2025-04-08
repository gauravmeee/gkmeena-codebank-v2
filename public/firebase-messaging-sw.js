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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: payload.data
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
      
      // Show notification based on the push data
      const notificationTitle = data.notification?.title || 'New Notification';
      const notificationOptions = {
        body: data.notification?.body || 'You have a new notification',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data: data.data || {}
      };
      
      event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
      );
    } catch (error) {
      console.error('[firebase-messaging-sw.js] Error processing push data:', error);
    }
  }
}); 