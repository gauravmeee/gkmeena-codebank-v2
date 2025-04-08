import { useState, useEffect, useCallback } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import { toast } from 'sonner';

export function useFirebaseMessaging() {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  // Check if Firebase messaging is supported
  useEffect(() => {
    const checkSupport = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setIsSupported(true);
        
        // Check current permission status
        const currentPermission = Notification.permission;
        setPermission(currentPermission);
        
        console.log('Notification permission status:', currentPermission);
      } else {
        setIsSupported(false);
        console.log('Notifications not supported in this browser');
      }
    };
    
    checkSupport();
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.log('Notifications not supported');
      return false;
    }
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      console.log('Notification permission result:', result);
      
      if (result === 'granted') {
        toast.success('Notifications enabled successfully!');
        return true;
      } else {
        toast.error('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  // Get FCM token
  const getFCMToken = useCallback(async () => {
    if (!isSupported || permission !== 'granted') {
      console.log('Cannot get FCM token: notifications not supported or permission not granted');
      return null;
    }
    
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      return null;
    }
    
    try {
      // Get the VAPID key from environment variables
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      
      if (!vapidKey) {
        console.error('VAPID key is missing');
        return null;
      }
      
      console.log('Requesting FCM token with VAPID key...');
      const currentToken = await getToken(messaging, { vapidKey });
      
      if (currentToken) {
        console.log('FCM token obtained successfully:', currentToken.substring(0, 10) + '...');
        setToken(currentToken);
        return currentToken;
      } else {
        console.log('No registration token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }, [isSupported, permission]);

  // Set up message handler
  const setupMessageHandler = useCallback((callback) => {
    if (!messaging) {
      console.error('Cannot setup message handler: messaging not initialized');
      return;
    }
    
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      
      // Show toast notification
      if (payload.notification) {
        toast.info(payload.notification.body || 'New notification');
      }
      
      // Call the callback if provided
      if (callback) {
        callback(payload);
      }
    });
    
    return unsubscribe;
  }, []);

  // Save token to server
  const saveTokenToServer = useCallback(async (userId) => {
    if (!token || !userId) {
      console.error('Cannot save token: missing token or userId');
      return false;
    }
    
    try {
      const response = await fetch('/api/update-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          userId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save token to server');
      }
      
      console.log('FCM token saved to server successfully');
      return true;
    } catch (error) {
      console.error('Error saving token to server:', error);
      return false;
    }
  }, [token]);

  return {
    token,
    permission,
    isSupported,
    requestPermission,
    getFCMToken,
    setupMessageHandler,
    saveTokenToServer
  };
} 