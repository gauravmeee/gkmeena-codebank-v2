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

export default function ContestsNotificationHandler() {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    let timeoutIds = [];
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

    // Show notification function
    const showNotification = async (title, body) => {
      // Always show toast notification
      toast.info(body);

      // Handle browser notification
      if (!checkNotificationSupport()) return;

      if (Notification.permission === 'granted') {
        try {
          if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(title, {
              body,
              icon: '/assets/contests/default.png',
              tag: 'contest-reminder',
              renotify: true,
              data: { type: 'contest', url: '/contests' }
            });
          }
        } catch (error) {
          console.error('Error showing notification:', error);
        }
      } else if (Notification.permission !== 'denied') {
        const granted = await requestNotificationPermission();
        if (granted) {
          showNotification(title, body);
        }
      }
    };

    // Function to schedule a notification
    const scheduleNotification = (contestId, data, notificationTime) => {
      const currentTime = new Date();
      const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
      
      if (timeUntilNotification <= 0) {
        // Show notification immediately if we're past the notification time
        showNotification(
          'Contest Reminder',
          `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${Math.round(data.reminderTime)} minutes!`
        );
        removeNotificationImmediately(contestId);
      } else {
        console.log(`Scheduling notification for ${contestId} in ${formatTimeUntilNotification(timeUntilNotification)}`);
        
        const timeoutId = setTimeout(async () => {
          showNotification(
            'Contest Reminder',
            `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${Math.round(data.reminderTime)} minutes!`
          );
          await removeNotificationImmediately(contestId);
        }, timeUntilNotification);
        
        timeoutIds.push(timeoutId);
      }
    };

    const checkNotifications = async () => {
      try {
        if (!currentUser) return;
        
        console.log('Checking for notifications...');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;
        
        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        const currentTime = new Date();
        
        // Clear existing timeouts
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];
        
        // Process individual contest notifications
        Object.entries(notifications).forEach(async ([contestId, data]) => {
          // Skip if it's a platform notification that isn't a test
          if (data.isPlatformNotification && !data.isTest) return;

          // Calculate the contest time and creation time
          const contestTime = new Date(data.contestTime);
          const createdAt = new Date(data.createdAt);

          // For test: calculate reminderTime in minutes such that notification fires 2 sec after creation
          const reminderTime = data.isTest
            ? (contestTime.getTime() - (createdAt.getTime() + 2000)) / (60 * 1000)
            : data.reminderTime;
          
          // Calculate the time when the notification should be shown
          const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
          
          // For test notifications, show immediately if within 2 seconds of creation
          if (data.isTest && currentTime.getTime() - createdAt.getTime() <= 2000) {
            console.log(`Test notification detected for ${contestId}, showing immediately`);
            
            await showNotification(
              'Test Contest Reminder',
              `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${Math.round(reminderTime)} minutes! (TEST)`
            );
            
            await removeNotificationImmediately(contestId);
            return;
          }
          
          // Schedule or show the notification
          scheduleNotification(contestId, { ...data, reminderTime }, notificationTime);
        });
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    // Set up real-time listener for notification changes
    const setupNotificationListener = () => {
      const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
      return onSnapshot(userPrefsRef, (doc) => {
        if (doc.exists()) {
          checkNotifications();
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

    // Check more frequently (every 15 seconds) for upcoming notifications
    const intervalId = setInterval(checkNotifications, 15000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (notificationListener) notificationListener();
      clearInterval(intervalId);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [currentUser]);

  return null;
}