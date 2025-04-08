'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export default function NotificationHandler() {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    let timeoutIds = [];

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

    const checkNotifications = async () => {
      try {
        if (!currentUser) return;
        
        console.log('Checking for notifications...');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;
        
        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // Process individual contest notifications
        if (Object.keys(notifications).length > 0) {
          Object.entries(notifications).forEach(async ([contestId, data]) => {
            // Skip if notification is marked as disabled or is a platform notification
            if (data.disabled || (data.isPlatformNotification && !data.isTest)) return;

            const contestTime = new Date(data.contestTime);
            const reminderTime = data.reminderTime;
            const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
            const currentTime = new Date();
            
            // For test notifications, show immediately
            if (data.isTest) {
              console.log(`Test notification detected for ${contestId}, showing immediately`);
              
              // Send notification immediately without waiting
              await showNotification(
                'Test Contest Reminder',
                `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${reminderTime} minutes! (TEST)`
              );
              
              // Immediately remove the notification from Firestore
              await removeNotificationImmediately(contestId);
              
              // Also update the local state to reflect the removal
              delete notifications[contestId];
              
              return;
            }
            
            // For regular notifications, check if it's time to show
            if (notificationTime <= currentTime) {
              console.log(`Time to show notification for ${contestId}`);
              
              // Show the notification
              showNotification(
                'Contest Reminder',
                `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${reminderTime} minutes!`
              );
              
              // Immediately remove the notification from Firestore
              await removeNotificationImmediately(contestId);
              
              // Also update the local state to reflect the removal
              notifications[contestId] = undefined;
            } else {
              // Schedule the notification for later
              const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
              const timeDisplay = formatTimeUntilNotification(timeUntilNotification);
              
              console.log(`Scheduling notification for ${contestId} in ${timeDisplay} (${reminderTime} minutes before contest)`);
              
              const timeoutId = setTimeout(async () => {
                const contestName = contestId.split('-')[1];
                const platform = contestId.split('-')[0];
                showNotification(
                  'Contest Reminder',
                  `${contestName} on ${platform} starts in ${reminderTime} minutes!`
                );
                
                // Immediately remove the notification from Firestore
                await removeNotificationImmediately(contestId);
              }, timeUntilNotification);
              
              // Store the timeout ID for cleanup
              timeoutIds.push(timeoutId);
            }
          });
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

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
          showNotification(title, body); // Retry showing notification if permission granted
        }
      }
    };

    // Function to disable a notification after it's sent
    const disableNotification = async (contestId) => {
      try {
        console.log(`Removing notification for ${contestId}`);
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // If the notification exists, remove it completely
        if (notifications[contestId]) {
          const newNotifications = { ...notifications };
          delete newNotifications[contestId];
          
          // Update Firestore with the notification removed
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications: newNotifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Notification for ${contestId} removed successfully`);
        }
      } catch (error) {
        console.error('Error removing notification:', error);
      }
    };

    // Function to clean up test notifications
    const cleanupTestNotifications = async () => {
      try {
        console.log('Cleaning up test notifications');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // Find and remove all test notifications
        const newNotifications = { ...notifications };
        let removedCount = 0;
        
        Object.keys(newNotifications).forEach(contestId => {
          if (newNotifications[contestId].isTest) {
            delete newNotifications[contestId];
            removedCount++;
          }
        });
        
        if (removedCount > 0) {
          // Update Firestore with test notifications removed
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications: newNotifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Removed ${removedCount} test notifications successfully`);
        }
      } catch (error) {
        console.error('Error cleaning up test notifications:', error);
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
        
        // Find and remove all expired notifications
        const newNotifications = { ...notifications };
        let removedCount = 0;
        
        Object.entries(newNotifications).forEach(([contestId, data]) => {
          const contestTime = new Date(data.contestTime);
          const reminderTime = data.reminderTime;
          const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
          
          // Remove if notification time has passed
          if (notificationTime <= currentTime) {
            delete newNotifications[contestId];
            removedCount++;
            console.log(`Removed expired notification for ${contestId}`);
          }
        });
        
        if (removedCount > 0) {
          // Update Firestore with expired notifications removed
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications: newNotifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Removed ${removedCount} expired notifications successfully`);
        }
      } catch (error) {
        console.error('Error cleaning up expired notifications:', error);
      }
    };

    // Function to clean up disabled notifications
    const cleanupDisabledNotifications = async () => {
      try {
        console.log('Cleaning up disabled notifications');
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // Find and remove all disabled notifications
        const newNotifications = { ...notifications };
        let removedCount = 0;
        
        Object.entries(newNotifications).forEach(([contestId, data]) => {
          if (data.disabled) {
            delete newNotifications[contestId];
            removedCount++;
            console.log(`Removed disabled notification for ${contestId}`);
          }
        });
        
        if (removedCount > 0) {
          // Update Firestore with disabled notifications removed
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications: newNotifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Removed ${removedCount} disabled notifications successfully`);
        }
      } catch (error) {
        console.error('Error cleaning up disabled notifications:', error);
      }
    };

    // Function to immediately remove a notification from Firestore
    const removeNotificationImmediately = async (contestId) => {
      try {
        console.log(`Immediately removing notification for ${contestId}`);
        
        // Get current user preferences
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) {
          console.log(`No user preferences found for ${currentUser.uid}`);
          return;
        }

        const userData = userPrefsDoc.data();
        const notifications = userData.notifications || {};
        
        // If the notification exists, remove it completely
        if (notifications[contestId]) {
          // Create a new notifications object without this notification
          const newNotifications = { ...notifications };
          delete newNotifications[contestId];
          
          // Update Firestore with the notification removed
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            ...userData,
            notifications: newNotifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Notification for ${contestId} removed immediately`);
          
          // Force a refresh of the notifications in the UI
          if (typeof window !== 'undefined') {
            // Dispatch a custom event to notify other components
            window.dispatchEvent(new CustomEvent('notificationRemoved', { 
              detail: { contestId } 
            }));
          }
        } else {
          console.log(`Notification for ${contestId} not found in user preferences`);
        }
      } catch (error) {
        console.error(`Error removing notification for ${contestId}:`, error);
      }
    };

    // Initial check
    checkNotifications();
    
    // Clean up notifications on component mount
    cleanupTestNotifications();
    cleanupExpiredNotifications();
    cleanupDisabledNotifications();

    // Check every minute for new notifications and clean up expired ones
    const intervalId = setInterval(() => {
      checkNotifications();
      cleanupExpiredNotifications();
      cleanupDisabledNotifications();
    }, 60000);

    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [currentUser]);

  return null;
} 