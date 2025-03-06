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
        // Fetch user preferences
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        let notifications = userData.notifications || {};
        const platformNotifications = userData.platformNotifications;

        // If user has notifications set but no browser permission, request it
        if ((Object.keys(notifications).length > 0 || platformNotifications) && 
            Notification.permission !== 'granted') {
          await requestNotificationPermission();
        }

        // Clear existing timeouts
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];

        // Fetch contests
        const response = await fetch('https://flask-contest-api.onrender.com/', {
          next: { 
            revalidate: 3600,
            tags: ['contests']
          }
        });
        const data = await response.json();
        const contests = data.contests || [];

        // Process individual contest notifications
        if (Object.keys(notifications).length > 0) {
          Object.entries(notifications).forEach(([contestId, data]) => {
            // Skip if notification is marked as disabled
            if (data.disabled) return;

            const contestTime = new Date(data.contestTime);
            const reminderTime = data.reminderTime;
            const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
            const currentTime = new Date();
            
            // Only set notification if the time hasn't passed and it's within the next 24 hours
            if (notificationTime > currentTime && notificationTime - currentTime <= 24 * 60 * 60 * 1000) {
              const timeoutId = setTimeout(() => {
                showNotification(
                  'Contest Reminder',
                  `${contestId.split('-')[1]} starts in ${reminderTime} minutes!`
                );
              }, notificationTime.getTime() - currentTime.getTime());
              
              timeoutIds.push(timeoutId);
            }
          });
        }

        // Process platform-wide notifications
        if (platformNotifications) {
          contests.forEach(contest => {
            const platformSettings = platformNotifications[contest.platform];
            if (platformSettings?.enabled) {
              const contestTime = new Date(contest.startTime);
              const reminderTime = platformSettings.reminderTime;
              const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
              const currentTime = new Date();
              const contestId = `${contest.platform}-${contest.contestName}`;

              // Skip if there's already an individual notification for this contest
              if (notifications[contestId] && !notifications[contestId].disabled) return;

              if (notificationTime > currentTime && 
                  notificationTime - currentTime <= 24 * 60 * 60 * 1000) {
                const timeoutId = setTimeout(() => {
                  showNotification(
                    'Contest Reminder',
                    `${contest.contestName} starts in ${reminderTime} minutes!`
                  );
                }, notificationTime.getTime() - currentTime.getTime());
                
                timeoutIds.push(timeoutId);

                // Add to individual notifications for tracking
                notifications = {
                  ...notifications,
                  [contestId]: {
                    reminderTime,
                    contestTime: contest.startTime,
                    disabled: false
                  }
                };
              }
            }
          });

          // Update notifications in Firestore
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications
          }, { merge: true });
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

    // Initial check
    checkNotifications();

    // Check every minute for new notifications
    const intervalId = setInterval(checkNotifications, 60000);

    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [currentUser]);

  return null;
} 