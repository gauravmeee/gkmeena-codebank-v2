// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Log when service worker starts
console.log('[firebase-messaging-sw.js] Initializing Firebase app...');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: 'AIzaSyAv-xZrl1rJsb8Syw8IFt8_j4SmWdu9uoI',
  authDomain: 'codebank-6db5e.firebaseapp.com',
  projectId: 'codebank-6db5e',
  storageBucket: 'codebank-6db5e.firebasestorage.app',
  messagingSenderId: '09464152113',
  appId: '1:309464152113:web:703da19d79fa1f35ed3d10'
});

console.log('[firebase-messaging-sw.js] Firebase app initialized');

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
console.log('[firebase-messaging-sw.js] Firebase messaging initialized');

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  try {
    const { title, body } = payload.notification || {};
    const { type, platform } = payload.data || {};

    console.log('[firebase-messaging-sw.js] Processing message:', { title, body, type, platform });

    if (!title) {
      console.error('[firebase-messaging-sw.js] No title in notification payload');
      return;
    }

    // Get platform-specific icon
    let icon = '/assets/contests/default.png';
    if (platform) {
      icon = `/assets/contests/${platform.toLowerCase()}.png`;
    }

    const notificationOptions = {
      body: body || 'No message content',
      icon: self.location.origin + icon,
      badge: self.location.origin + '/assets/contests/default.png',
      vibrate: [100, 50, 100],
      data: payload.data || {},
      actions: getNotificationActions(type),
      requireInteraction: true // Keep the notification visible until user interacts with it
    };

    console.log('[firebase-messaging-sw.js] Showing notification with options:', notificationOptions);

    return self.registration.showNotification(title, notificationOptions)
      .then(() => {
        console.log('[firebase-messaging-sw.js] Notification shown successfully');
      })
      .catch((error) => {
        console.error('[firebase-messaging-sw.js] Error showing notification:', error);
      });
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error processing message:', error);
  }
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

function getNotificationActions(type) {
  switch (type) {
    case 'contest':
      return [
        { action: 'view', title: 'View Contest' },
        { action: 'dismiss', title: 'Dismiss' }
      ];
    case 'job':
      return [
        { action: 'view', title: 'View Job' },
        { action: 'dismiss', title: 'Dismiss' }
      ];
    case 'platform':
      return [
        { action: 'settings', title: 'Settings' },
        { action: 'dismiss', title: 'Dismiss' }
      ];
    default:
      return [];
  }
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const { type, url } = event.notification.data;

  if (event.action === 'dismiss') return;

  let targetUrl = '/';
  switch (type) {
    case 'contest':
      targetUrl = url || '/contests';
      break;
    case 'job':
      targetUrl = url || '/jobs';
      break;
    case 'platform':
      targetUrl = '/contests';
      break;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
}); 