import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app, auth } from './firebase';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import firebaseConfig from './firebase-config';

class NotificationService {
  constructor() {
    this.messaging = null;
    this.initialized = false;
    this.messageHandlerUnsubscribe = null;
    this.registrationPromise = null;
  }

  async init() {
    try {
      if (this.initialized) return true;

      if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
      }

      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('User must be authenticated to initialize notifications');
      }

      // Request notification permission if needed
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error('Notification permission was not granted');
        }
      }

      // Register service worker first
      if ('serviceWorker' in navigator) {
        try {
          // Don't unregister existing service workers, just get the active one or register new
          this.registrationPromise = this.getOrRegisterServiceWorker();
          const registration = await this.registrationPromise;

          if (!registration) {
            throw new Error('Failed to register service worker');
          }

          // Send Firebase config to service worker
          if (registration.active) {
            // Send Firebase config
            registration.active.postMessage({
              type: 'FIREBASE_CONFIG',
              config: firebaseConfig
            });

            // Send base URL
            registration.active.postMessage({
              type: 'BASE_URL',
              url: window.location.origin
            });
          }

          // Initialize Firebase messaging with the registration
          this.messaging = getMessaging(app);
          
          // Request permission explicitly
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            throw new Error('Notification permission denied');
          }

          // Set up periodic health check
          this.startHealthCheck();

          this.initialized = true;
          console.log('Notification service initialized successfully');
          return true;
        } catch (error) {
          console.error('Service Worker registration failed:', error);
          throw error;
        }
      } else {
        throw new Error('Service Worker not supported in this browser');
      }
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      throw new Error('Failed to initialize notifications: ' + error.message);
    }
  }

  async getOrRegisterServiceWorker() {
    try {
      // Check for existing service worker
      const registrations = await navigator.serviceWorker.getRegistrations();
      const existingRegistration = registrations.find(reg => reg.scope === '/');

      if (existingRegistration) {
        // If service worker exists but is waiting/installing, wait for it to become active
        if (existingRegistration.installing || existingRegistration.waiting) {
          await new Promise((resolve) => {
            existingRegistration.addEventListener('activate', () => resolve());
          });
        }
        return existingRegistration;
      }

      // Register new service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready;
      return registration;
    } catch (error) {
      console.error('Error in getOrRegisterServiceWorker:', error);
      throw error;
    }
  }

  startHealthCheck() {
    // Perform health check every 5 minutes
    setInterval(async () => {
      try {
        const registration = await this.registrationPromise;
        if (!registration?.active) {
          console.log('Service worker not active, re-initializing...');
          this.initialized = false;
          await this.init();
        }
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, 5 * 60 * 1000);
  }

  async getFCMToken(userId) {
    try {
      if (!auth.currentUser) {
        throw new Error('User must be authenticated to get FCM token');
      }

      if (!this.initialized) {
        await this.init();
      }

      if (!this.messaging) {
        throw new Error('Firebase messaging not initialized');
      }

      // Get the token with proper VAPID key and retry logic
      const token = await this.getTokenWithRetry();

      if (!token) {
        throw new Error('No registration token available');
      }
      else{
        console.log("FCM Token:", token) // Comment if not use. Used for developing Notification
      }

      try {
        // Store the token with additional metadata
        const userTokensRef = doc(db, 'users', userId, 'fcmTokens', token);
        await setDoc(userTokensRef, {
          token,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          platform: 'web',
          userAgent: navigator.userAgent,
          lastHealthCheck: new Date().toISOString()
        });

        // Store token in IndexedDB for persistence
        await this.storeTokenLocally(token);

        console.log('FCM token stored successfully');
        return token;
      } catch (error) {
        console.error('Error storing FCM token:', error);
        return token;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw new Error('Failed to get notification token: ' + error.message);
    }
  }

  async getTokenWithRetry(maxRetries = 3) {
    let retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        const registration = await this.registrationPromise;
        const token = await getToken(this.messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration
        });
        if (token) return token;
      } catch (error) {
        console.error(`Token retrieval attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }
    }
    return null;
  }

  async storeTokenLocally(token) {
    try {
      const db = await this.openIndexedDB();
      const transaction = db.transaction(['fcmTokens'], 'readwrite');
      const store = transaction.objectStore('fcmTokens');
      await store.put({ token, timestamp: Date.now() });
    } catch (error) {
      console.error('Error storing token in IndexedDB:', error);
    }
  }

  async openIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('NotificationServiceDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('fcmTokens')) {
          db.createObjectStore('fcmTokens', { keyPath: 'token' });
        }
      };
    });
  }

  setupOnMessage(callback) {
    try {
      if (!this.initialized || !this.messaging) {
        throw new Error('Notification service not initialized');
      }

      // Clean up previous handler if it exists
      if (this.messageHandlerUnsubscribe) {
        this.messageHandlerUnsubscribe();
      }

      // Set up new handler with improved error handling
      this.messageHandlerUnsubscribe = onMessage(this.messaging, async (payload) => {
        try {
          console.log('Received message:', payload);
          
          // Store message in IndexedDB for reliability
          await this.storeMessage(payload);
          
          // Process the message
          await this.processMessage(payload);
          
          // Call the user's callback
          callback(payload);
        } catch (error) {
          console.error('Error in message handler:', error);
        }
      });

      return true;
    } catch (error) {
      console.error('Error setting up message handler:', error);
      throw new Error('Failed to setup notification handler: ' + error.message);
    }
  }

  async storeMessage(payload) {
    try {
      const db = await this.openIndexedDB();
      const transaction = db.transaction(['messages'], 'readwrite');
      const store = transaction.objectStore('messages');
      await store.add({
        id: payload.data?.id || Date.now().toString(),
        payload,
        timestamp: Date.now(),
        processed: false
      });
    } catch (error) {
      console.error('Error storing message:', error);
    }
  }

  async processMessage(payload) {
    // Handle the message based on its type and data
    if (payload.data?.scheduledTime) {
      const scheduledTime = parseInt(payload.data.scheduledTime);
      if (scheduledTime > Date.now()) {
        // Store for later processing
        await this.scheduleNotification(payload);
        return;
      }
    }

    // Show the notification if needed
    if (payload.data?.isTest === 'true' || document.visibilityState !== 'visible') {
      await this.showNotification(payload);
    }
  }

  async scheduleNotification(payload) {
    try {
      const db = await this.openIndexedDB();
      const transaction = db.transaction(['scheduledNotifications'], 'readwrite');
      const store = transaction.objectStore('scheduledNotifications');
      await store.add({
        id: payload.data?.id || Date.now().toString(),
        payload,
        scheduledTime: parseInt(payload.data.scheduledTime),
        created: Date.now()
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async showNotification(payload) {
    const registration = await this.registrationPromise;
    if (!registration) {
      throw new Error('Service worker registration not found');
    }

    const notificationId = payload.data?.id || `notification-${Date.now()}`;
    const platform = payload.data?.platform?.toLowerCase() || 'default';

    // Use absolute URLs for icons
    const iconUrl = new URL(`/assets/contests/${platform}.png`, window.location.origin).href;
    const badgeUrl = new URL('/assets/contests/badge.png', window.location.origin).href;

    // Preload the icon
    try {
      await fetch(iconUrl);
    } catch (error) {
      console.warn('Failed to preload icon, falling back to default');
      iconUrl = new URL('/assets/contests/default.png', window.location.origin).href;
    }

    await registration.showNotification(
      payload.notification?.title || 'New Notification',
      {
        body: payload.notification?.body || 'You have a new notification',
        icon: iconUrl,
        badge: badgeUrl,
        tag: payload.data?.tag || 'notification',
        data: {
          ...payload.data,
          id: notificationId
        },
        requireInteraction: true,
        timestamp: Date.now()
      }
    );
  }

  async cleanup() {
    try {
      if (this.messageHandlerUnsubscribe) {
        await this.messageHandlerUnsubscribe();
        this.messageHandlerUnsubscribe = null;
      }
      this.initialized = false;
      this.messaging = null;
    } catch (error) {
      console.error('Error cleaning up notification service:', error);
    }
  }

  getDefaultUrl(type, platform) {
    switch (type) {
      case 'contest':
        return '/contests';
      case 'job':
        return '/jobs';
      case 'platform':
        return `/contests?platform=${encodeURIComponent(platform)}`;
      default:
        return '/';
    }
  }

  getNotificationActions(type) {
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

  async sendTestNotification(token, data, type) {
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          data,
          type
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send test notification');
      }

      return true;
    } catch (error) {
      console.error('Error sending test notification:', error);
      return false;
    }
  }
}

// Create a singleton instance
const notificationService = new NotificationService();

export { notificationService }; 