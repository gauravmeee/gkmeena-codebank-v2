// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: self.FIREBASE_CONFIG?.apiKey,
  authDomain: self.FIREBASE_CONFIG?.authDomain,
  projectId: self.FIREBASE_CONFIG?.projectId,
  storageBucket: self.FIREBASE_CONFIG?.storageBucket,
  messagingSenderId: self.FIREBASE_CONFIG?.messagingSenderId,
  appId: self.FIREBASE_CONFIG?.appId
};

try {
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve an instance of Firebase Messaging so that it can handle background messages.
  const messaging = firebase.messaging();

  // Handle background messages
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'New Notification';
    const notificationOptions = {
      body: payload.notification?.body || 'You have a new notification',
      icon: payload.data?.icon || '/assets/contests/default.png',
      badge: '/assets/contests/default.png',
      tag: payload.data?.tag || 'contest-notification',
      data: payload.data,
      requireInteraction: true
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

  // Handle notification clicks
  self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification clicked:', event);
    event.notification.close();

    const data = event.notification.data;
    if (data?.url) {
      const urlToOpen = new URL(data.url, self.location.origin).href;

      event.waitUntil(
        clients.matchAll({
          type: 'window',
          includeUncontrolled: true
        })
        .then((windowClients) => {
          // Try to focus an existing window
          for (let i = 0; i < windowClients.length; i++) {
            const client = windowClients[i];
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          // If no window is found, open a new one
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
      );
    }
  });

  console.log('[firebase-messaging-sw.js] Service Worker initialized successfully');
} catch (error) {
  console.error('[firebase-messaging-sw.js] Service Worker initialization failed:', error);
}

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

// Log when service worker is installed
self.addEventListener('install', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker installed');
});

// Log when service worker is activated
self.addEventListener('activate', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker activated');
});

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event received:', event);

  try {
    const data = event.data.json();
    
    // Generate a notification ID if not provided
    const notificationId = data.data?.id || `push-${Date.now()}`;
    
    // Store last notification time in service worker
    const lastNotificationTime = self.lastNotificationTime || 0;
    const now = Date.now();
    
    // Skip if we've shown a notification in the last 2 seconds
    if (now - lastNotificationTime < 2000) {
      console.log('[firebase-messaging-sw.js] Skipping notification - too soon after last one');
      return;
    }
    
    // Check for existing notifications
    event.waitUntil(
      self.registration.getNotifications({ tag: 'contest-reminder' })
        .then(notifications => {
          if (notifications.length > 0) {
            console.log('[firebase-messaging-sw.js] Notification with same tag already exists, closing old ones');
            notifications.forEach(notification => notification.close());
          }
          
          // Show notification based on the push data
          const notificationTitle = data.notification?.title || 'New Notification';
          const baseUrl = self.location.origin;
          const notificationOptions = {
            body: data.notification?.body || 'You have a new notification',
            icon: data.data?.platform ? `${baseUrl}/assets/contests/${data.data.platform.toLowerCase()}.png` : `${baseUrl}/assets/contests/default.png`,
            badge: `${baseUrl}/assets/contests/default.png`,
            data: {
              ...data.data,
              id: notificationId
            },
            tag: 'contest-reminder',
            requireInteraction: true
          };
          
          self.lastNotificationTime = now;
          return self.registration.showNotification(notificationTitle, notificationOptions);
        })
    );
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error processing push data:', error);
  }
}); 