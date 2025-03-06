import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

class NotificationService {
  constructor() {
    this.messaging = null;
    this.initialized = false;
    this.registration = null;
  }

  async init() {
    if (this.initialized) {
      console.log('NotificationService already initialized');
      return;
    }

    try {
      if (!('Notification' in window)) {
        console.error('Notifications not supported in this browser');
        return;
      }

      const permission = await Notification.requestPermission();
      console.log('Notification permission status:', permission);
      
      if (permission === 'granted') {
        // Register service worker first
        if ('serviceWorker' in navigator) {
          try {
            // Initialize Firebase messaging first
            console.log('Initializing Firebase messaging...');
            this.messaging = getMessaging(app);

            // Unregister any existing service workers first
            const registrations = await navigator.serviceWorker.getRegistrations();
            console.log('Existing service workers:', registrations.length);
            
            for (let registration of registrations) {
              console.log('Unregistering service worker:', registration.scope);
              await registration.unregister();
            }

            console.log('Registering new service worker...');
            // Register the new service worker
            this.registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker registered with scope:', this.registration.scope);

            // Wait for the service worker to be ready
            await navigator.serviceWorker.ready;
            console.log('Service Worker is ready');

            this.initialized = true;
            console.log('Notification service initialized successfully');
          } catch (swError) {
            console.error('Service Worker registration failed:', swError);
            throw swError;
          }
        } else {
          console.error('Service Worker not supported in this browser');
          return;
        }
      } else {
        console.log('Notification permission was not granted');
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
      throw error;
    }
  }

  async getFCMToken(userId) {
    console.log('Getting FCM token for user:', userId);
    
    if (!this.initialized) {
      console.log('Initializing notification service...');
      await this.init();
    }

    if (!this.messaging) {
      console.error('Messaging not initialized. Permission might be denied.');
      return null;
    }

    try {
      if (!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
        console.error('VAPID key is missing in environment variables');
        return null;
      }

      if (!this.registration) {
        console.error('Service worker registration not found');
        return null;
      }

      console.log('Requesting FCM token with VAPID key...');
      const currentToken = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: this.registration
      });

      if (currentToken) {
        console.log('FCM token obtained successfully:', currentToken.substring(0, 10) + '...');
        // Save the token to the user's document
        const userDoc = doc(db, 'users', userId);
        await setDoc(userDoc, { fcmToken: currentToken }, { merge: true });
        console.log('FCM token saved to user document');
        return currentToken;
      }

      console.error('No registration token available');
      return null;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async setupOnMessage(callback) {
    console.log('Setting up onMessage handler...');
    
    if (!this.initialized) {
      console.log('Initializing before setting up onMessage...');
      await this.init();
    }

    if (!this.messaging) {
      console.error('Cannot setup onMessage: messaging not initialized');
      return;
    }

    onMessage(this.messaging, async (payload) => {
      console.log('Received foreground message:', payload);
      
      const { title, body } = payload.notification;
      const { type } = payload.data;
      
      // Show notification using service worker
      if (this.registration) {
        const notificationOptions = {
          body,
          icon: '/assets/contests/default.png',
          badge: '/assets/contests/default.png',
          vibrate: [100, 50, 100],
          data: payload.data,
          actions: this.getNotificationActions(type),
          requireInteraction: true
        };

        console.log('Showing foreground notification:', { title, options: notificationOptions });
        try {
          await this.registration.showNotification(title, notificationOptions);
          console.log('Foreground notification shown successfully');
        } catch (error) {
          console.error('Error showing foreground notification:', error);
        }
      } else {
        console.error('Service worker registration not available');
      }

      if (callback) {
        console.log('Executing callback for foreground message');
        callback(payload);
      }
    });

    console.log('onMessage handler setup complete');
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

export const notificationService = new NotificationService(); 