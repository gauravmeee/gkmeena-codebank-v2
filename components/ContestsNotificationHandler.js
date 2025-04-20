'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, deleteField, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';

// Add the time formatting function
const formatTimeUntilNotification = (timeInMilliseconds) => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

// Add utility function for calculating reminder time
const calculateReminderTime = (data) => {
  const contestTime = new Date(data.contestTime);
  const createdAt = new Date(data.createdAt);
  
  // If it's a test notification, calculate time such that notification fires 5 sec after creation
  if (data.reminderTime === 'test' || data.isTest) {
    return (contestTime.getTime() - (createdAt.getTime() + 5000)) / (60 * 1000);
  }
  
  // Otherwise use the specified reminder time
  return parseInt(data.reminderTime);
};

export default function ContestsNotificationHandler() {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // Use Map instead of array for better timeout management
    const activeTimeouts = new Map();
    let notificationListener = null;

    // Check if browser supports notifications
    const checkNotificationSupport = () => {
      if (!('Notification' in window)) {
        toast.error("Your browser doesn't support notifications");
        return false;
      }
      return true;
    };

    // Request notification permission
    const requestNotificationPermission = async () => {
      if (!checkNotificationSupport()) return false;
      
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          toast.success("Notifications enabled successfully!");
          return true;
        } else {
          toast.error("Notification permission denied");
          return false;
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    };

    // Show notification function with better error handling
    const showNotification = async (title, body, data = {}) => {
      // Always show toast notification
      toast.info(body);

      // Handle browser notification
      if (!checkNotificationSupport()) return;

      if (Notification.permission === 'granted') {
        try {
          if ('serviceWorker' in navigator) {
            // Ensure service worker is ready
            const registration = await navigator.serviceWorker.ready;
            const platform = data.platform?.toLowerCase() || 'default';
            
            if (!registration.active) {
              throw new Error('Service worker not active');
            }

            await registration.showNotification(title, {
              body,
              icon: `/assets/contests/${platform}.png`,
              badge: '/assets/contests/badge.png',
              tag: 'contest-reminder',
              renotify: true,
              data: { 
                type: 'contest', 
                url: '/contests',
                platform: platform,
                ...data 
              }
            });
          }
        } catch (error) {
          console.error('Error showing notification:', error);
          // Fallback to just toast if browser notification fails
          toast.error('Failed to show browser notification');
        }
      } else if (Notification.permission !== 'denied') {
        const granted = await requestNotificationPermission();
        if (granted) {
          await showNotification(title, body, data);
        }
      }
    };

    // Improved schedule notification function
    const scheduleNotification = (contestId, data, notificationTime) => {
      // Clear existing timeout for this contest if it exists
      if (activeTimeouts.has(contestId)) {
        clearTimeout(activeTimeouts.get(contestId));
        activeTimeouts.delete(contestId);
      }

      const currentTime = new Date();
      const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
      const [platform, contestName] = contestId.split('-');
      
      // Don't schedule if the notification time is in the past
      if (timeUntilNotification <= 0) {
        removeNotificationImmediately(contestId);
        return;
      }

      console.log(`Scheduling notification for ${contestId} in ${formatTimeUntilNotification(timeUntilNotification)}`);
      
      const timeoutId = setTimeout(async () => {
        try {
          await showNotification(
            'Contest Reminder',
            `${contestName} on ${platform} starts in ${Math.round(data.reminderTime)} minutes!`,
            {
              platform: platform,
              contestName: contestName,
              contestId: contestId,
              startTime: data.contestTime
            }
          );
          await removeNotificationImmediately(contestId);
          activeTimeouts.delete(contestId);
        } catch (error) {
          console.error(`Error in notification timeout for ${contestId}:`, error);
        }
      }, timeUntilNotification);
      
      activeTimeouts.set(contestId, timeoutId);
    };

    // Improved check notifications function with proper async handling
    const checkNotifications = async () => {
      try {
        if (!currentUser) return;
        
        console.log('Checking for notifications...');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;
        
        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // Process notifications in sequence to avoid race conditions
        for (const [contestId, data] of Object.entries(notifications)) {
          try {
            // Skip if it's a platform notification that isn't a test
            if (data.isPlatformNotification && !data.isTest) continue;

            const contestTime = new Date(data.contestTime);
            
            // Skip if contest is already past
            if (contestTime < new Date()) {
              await removeNotificationImmediately(contestId);
              continue;
            }
            
            const reminderTime = calculateReminderTime(data);
            const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
            
            // Schedule notification
            scheduleNotification(contestId, { ...data, reminderTime }, notificationTime);
          } catch (error) {
            console.error(`Error processing notification for ${contestId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    // Improved notification listener with debouncing
    const setupNotificationListener = () => {
      let debounceTimeout;
      const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
      
      return onSnapshot(userPrefsRef, (doc) => {
        if (doc.exists()) {
          // Clear previous timeout
          if (debounceTimeout) clearTimeout(debounceTimeout);
          
          // Set new timeout
          debounceTimeout = setTimeout(() => {
            checkNotifications();
          }, 1000); // 1 second debounce
        }
      });
    };

    // Check notifications on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkNotifications();
      }
    };

    // Function to immediately remove a notification from Firestore
    const removeNotificationImmediately = async (contestId) => {
      try {
        console.log(`Immediately removing notification for ${contestId}`);
        
        // Directly delete the notification field from Firestore
        await updateDoc(doc(db, 'userPreferences', currentUser.uid), {
          [`notifications.${contestId}`]: deleteField(),
          lastUpdated: new Date().toISOString()
        });
        
        console.log(`Notification for ${contestId} removed immediately`);
        
        // Force a refresh of the notifications in the UI
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('notificationRemoved', { 
            detail: { contestId } 
          }));
        }
      } catch (error) {
        console.error(`Error removing notification for ${contestId}:`, error);
      }
    };

    // Function to clean up expired notifications
    const cleanupExpiredNotifications = async () => {
      try {
        console.log('Cleaning up expired notifications');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        const currentTime = new Date();
        
        // Find all expired notifications and test notifications
        const fieldsToDelete = {};
        let removedCount = 0;
        
        Object.entries(notifications).forEach(([contestId, data]) => {
          // Remove if it's a test notification or if notification time has passed
          if (data.isTest) {
            fieldsToDelete[`notifications.${contestId}`] = deleteField();
            removedCount++;
            console.log(`Marked test notification for removal: ${contestId}`);
            return;
          }

          if (new Date(data.notificationTime) <= currentTime) {
            fieldsToDelete[`notifications.${contestId}`] = deleteField();
            removedCount++;
            console.log(`Marked expired notification for removal: ${contestId}`);
          }
        });
        
        if (removedCount > 0) {
          await updateDoc(doc(db, 'userPreferences', currentUser.uid), {
            ...fieldsToDelete,
            lastUpdated: new Date().toISOString()
          });
          
          console.log(`Removed ${removedCount} notifications successfully`);
        }
      } catch (error) {
        console.error('Error cleaning up expired notifications:', error);
      }
    };

    // Initial setup
    checkNotifications();
    cleanupExpiredNotifications();
    
    // Set up event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    notificationListener = setupNotificationListener();

    // Check notifications less frequently (every minute instead of 15 seconds)
    const intervalId = setInterval(checkNotifications, 60000);

    // Improved cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (notificationListener) notificationListener();
      clearInterval(intervalId);
      // Clear all active timeouts
      for (const timeoutId of activeTimeouts.values()) {
        clearTimeout(timeoutId);
      }
      activeTimeouts.clear();
    };
  }, [currentUser]);

  return null;
}