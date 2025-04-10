'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notificationService } from '@/lib/notificationService';

export function useNotifications(currentUser) {
  const [notifications, setNotifications] = useState({});
  const [platformNotifications, setPlatformNotifications] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchUserPreferences = useCallback(async () => {
    if (!currentUser) return;

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setNotifications(data.notifications || {});
        setPlatformNotifications(data.platformNotifications || {});
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  }, [currentUser]);

  const initializeNotifications = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      console.log('Initializing notifications...');
      const initialized = await notificationService.init();
      
      if (initialized) {
        const token = await notificationService.getFCMToken(currentUser.uid);
        
        if (token) {
          notificationService.setupOnMessage((payload) => {
            console.log('Received foreground message:', payload);
          });
        }
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    let isMounted = true;
    
    const setup = async () => {
      if (currentUser && isMounted && !isInitialized) {
        try {
          await fetchUserPreferences();
          await initializeNotifications();
          setIsInitialized(true);
        } catch (error) {
          console.error('Error in setup:', error);
        }
      }
    };
    
    setup();
    
    return () => {
      isMounted = false;
      if (notificationService.messageHandlerUnsubscribe) {
        notificationService.messageHandlerUnsubscribe();
        notificationService.messageHandlerUnsubscribe = null;
      }
    };
  }, [currentUser, fetchUserPreferences, initializeNotifications, isInitialized]);

  return {
    notifications,
    platformNotifications,
    isInitialized,
    setNotifications,
    setPlatformNotifications
  };
} 