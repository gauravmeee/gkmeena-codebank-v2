// Cache name for offline support
const CACHE_NAME = 'notification-cache-v1';

// Import and configure firebase from CDN in the service worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

let messaging;
let FIREBASE_CONFIG;
let BASE_URL = self.location.origin;

// Store scheduled notifications
const scheduledNotifications = new Map();

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    FIREBASE_CONFIG = event.data.config;
    initializeFirebase();
  }
  // Handle base URL updates
  if (event.data && event.data.type === 'BASE_URL') {
    BASE_URL = event.data.url;
  }
});

// Helper function to get absolute URL for assets
function getAssetUrl(path) {
  // Remove leading slash if present
  path = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}/${path}`;
}

function initializeFirebase() {
  if (!FIREBASE_CONFIG) {
    console.error('[SW] Firebase config not available');
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }

    messaging = firebase.messaging();

    // Handle background messages with improved error handling and retries
    messaging.onBackgroundMessage(async (payload) => {
      console.log('[SW] Received background message:', payload);
      
      try {
        await handleBackgroundMessage(payload);
      } catch (error) {
        console.error('[SW] Error handling background message:', error);
        // Retry once after a short delay
        setTimeout(async () => {
          try {
            await handleBackgroundMessage(payload);
          } catch (retryError) {
            console.error('[SW] Retry failed:', retryError);
          }
        }, 1000);
      }
    });

    console.log('[SW] Firebase initialized successfully');
  } catch (error) {
    console.error('[SW] Firebase initialization error:', error);
    // Retry initialization after a delay
    setTimeout(initializeFirebase, 5000);
  }
}

async function handleBackgroundMessage(payload) {
  const platform = payload.data?.platform?.toLowerCase() || 'default';
  const notificationId = payload.data?.id || `background-${Date.now()}`;
  
  // Check if this is a scheduled notification
  if (payload.data?.scheduledTime) {
    const scheduledTime = parseInt(payload.data.scheduledTime);
    const now = Date.now();
    
    if (scheduledTime > now) {
      // Store for later delivery
      scheduledNotifications.set(notificationId, {
        payload,
        scheduledTime
      });
      console.log(`[SW] Scheduled notification ${notificationId} for later delivery`);
      return;
    }
  }

  // Rate limiting check
  const lastNotificationTime = self.lastNotificationTime || 0;
  const now = Date.now();
  if (now - lastNotificationTime < 2000) {
    console.log('[SW] Rate limiting - delaying notification');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Show the notification
  const notificationTitle = payload.notification?.title || 'Contest Reminder';
  const notificationOptions = {
    body: payload.notification?.body || 'A contest is starting soon!',
    icon: getAssetUrl(`assets/contests/${platform}.png`),
    badge: getAssetUrl('assets/contests/badge.png'),
    tag: payload.data?.tag || 'contest-reminder',
    data: {
      ...payload.data,
      platform: platform,
      id: notificationId
    },
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Contest' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    timestamp: Date.now()
  };

  // Preload the icon
  try {
    await fetch(notificationOptions.icon);
  } catch (error) {
    console.warn('[SW] Failed to preload icon, falling back to default');
    notificationOptions.icon = getAssetUrl('assets/contests/default.png');
  }

  await self.registration.showNotification(notificationTitle, notificationOptions);
  self.lastNotificationTime = Date.now();
}

// Handle push events with improved reliability
self.addEventListener('push', async (event) => {
  console.log('[SW] Push event received:', event);

  try {
    const data = event.data.json();
    event.waitUntil(handleBackgroundMessage(data));
  } catch (error) {
    console.error('[SW] Error handling push event:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);

  event.notification.close();

  if (event.action === 'view') {
    const urlToOpen = event.notification.data?.url || '/contests';
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Periodic check for scheduled notifications
setInterval(() => {
  const now = Date.now();
  scheduledNotifications.forEach((notification, id) => {
    if (notification.scheduledTime <= now) {
      handleBackgroundMessage(notification.payload);
      scheduledNotifications.delete(id);
    }
  });
}, 30000); // Check every 30 seconds

// Service worker installation
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/assets/contests/default.png',
        '/assets/contests/badge.png'
      ]);
    })
  );
  self.skipWaiting();
});

// Service worker activation
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activating');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
    ])
  );
}); 