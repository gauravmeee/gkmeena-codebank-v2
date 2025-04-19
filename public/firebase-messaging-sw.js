// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

let messaging;

// Listen for config from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    self.FIREBASE_CONFIG = event.data.config;
    initializeFirebase();
  }
});

function initializeFirebase() {
  if (!self.FIREBASE_CONFIG) {
    console.error('Firebase config not available');
    return;
  }

  try {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: self.FIREBASE_CONFIG.apiKey,
      authDomain: self.FIREBASE_CONFIG.authDomain,
      projectId: self.FIREBASE_CONFIG.projectId,
      storageBucket: self.FIREBASE_CONFIG.storageBucket,
      messagingSenderId: self.FIREBASE_CONFIG.messagingSenderId,
      appId: self.FIREBASE_CONFIG.appId
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    messaging = firebase.messaging();

    // Handle background messages
    messaging.onBackgroundMessage((payload) => {
      console.log('[SW] Received background message:', payload);

      const platform = payload.data?.platform?.toLowerCase() || 'default';
      const notificationTitle = payload.notification?.title || 'Contest Reminder';
      const notificationOptions = {
        body: payload.notification?.body || 'A contest is starting soon!',
        icon: `/assets/contests/${platform}.png`,
        badge: '/assets/contests/badge.png',
        tag: payload.data?.tag || 'contest-reminder',
        data: {
          ...payload.data,
          platform: platform
        },
        requireInteraction: true,
        actions: [
          { action: 'view', title: 'View Contest' },
          { action: 'dismiss', title: 'Dismiss' }
        ]
      };

      return self.registration.showNotification(notificationTitle, notificationOptions);
    });

    console.log('[SW] Firebase initialized successfully');
  } catch (error) {
    console.error('[SW] Firebase initialization error:', error);
  }
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  event.notification.close();

  // Handle notification click
  const urlToOpen = event.notification.data?.url || '/contests';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Try to focus an existing window
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window is found, open a new one
        return clients.openWindow(urlToOpen);
      })
  );
});

// Log installation
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installed');
  self.skipWaiting();
});

// Log activation
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activated');
  event.waitUntil(clients.claim());
});

// Track processed request IDs to prevent duplicates
const processedRequests = new Set();

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data.type === 'INIT') {
    // Store user ID for later use
    self.userId = event.data.userId;
  }
});

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received:', event);

  try {
    const data = event.data.json();
    
    // Generate a notification ID if not provided
    const notificationId = data.data?.id || `push-${Date.now()}`;
    
    // Store last notification time in service worker
    const lastNotificationTime = self.lastNotificationTime || 0;
    const now = Date.now();
    
    // Skip if we've shown a notification in the last 2 seconds
    if (now - lastNotificationTime < 2000) {
      console.log('[SW] Skipping notification - too soon after last one');
      return;
    }
    
    // Check for existing notifications
    event.waitUntil(
      self.registration.getNotifications({ tag: 'contest-reminder' })
        .then(notifications => {
          if (notifications.length > 0) {
            console.log('[SW] Notification with same tag already exists, closing old ones');
            notifications.forEach(notification => notification.close());
          }
          
          // Show notification based on the push data
          const notificationTitle = data.notification?.title || 'Contest Reminder';
          const platform = data.data?.platform?.toLowerCase() || 'default';
          const notificationOptions = {
            body: data.notification?.body || 'A contest is starting soon!',
            icon: `/assets/contests/${platform}.png`,
            badge: '/assets/contests/default.png',
            data: {
              ...data.data,
              id: notificationId,
              platform: platform
            },
            tag: 'contest-reminder',
            requireInteraction: true,
            actions: [
              { action: 'view', title: 'View Contest' },
              { action: 'dismiss', title: 'Dismiss' }
            ]
          };
          
          self.lastNotificationTime = now;
          return self.registration.showNotification(notificationTitle, notificationOptions);
        })
    );
  } catch (error) {
    console.error('[SW] Error processing push data:', error);
  }
}); 