import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app, auth } from './firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import firebaseConfig from './firebase-config';

class NotificationService {
  constructor() {
    this.messaging = null;
    this.initialized = false;
    this.messageHandlerUnsubscribe = null;
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
          // Unregister any existing service workers
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            await registration.unregister();
          }

          // Register the new service worker with root scope
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/'  // Changed scope to root
          });

          // Wait for the service worker to be active
          if (registration.installing) {
            await new Promise(resolve => {
              registration.installing.addEventListener('statechange', (e) => {
                if (e.target.state === 'activated') {
                  resolve();
                }
              });
            });
          }

          // Send Firebase config to service worker
          if (registration.active) {
            registration.active.postMessage({
              type: 'FIREBASE_CONFIG',
              config: firebaseConfig
            });
          }

          // Initialize Firebase messaging with the registration
          this.messaging = getMessaging(app);
          
          // Request permission explicitly
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            throw new Error('Notification permission denied');
          }

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

      // Get the token with proper VAPID key
      const token = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration('/')
      });

      if (!token) {
        throw new Error('No registration token available');
      }

      try {
        // Store the token in a user-specific collection
        const userTokensRef = doc(db, 'users', userId, 'fcmTokens', token);
        await setDoc(userTokensRef, {
          token,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          platform: 'web',
          userAgent: navigator.userAgent
        });

        console.log('FCM token stored successfully');
        return token;
      } catch (error) {
        console.error('Error storing FCM token:', error);
        // Still return the token even if storage fails
        return token;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw new Error('Failed to get notification token: ' + error.message);
    }
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

      // Set up new handler
      this.messageHandlerUnsubscribe = onMessage(this.messaging, (payload) => {
        try {
          console.log('Received message:', payload);
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
      const response = await fetch('/api/send-test-notification', {
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