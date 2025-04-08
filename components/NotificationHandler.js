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
        const platformNotifications = userData.platformNotifications || {};

        // If user has notifications set but no browser permission, request it
        if ((Object.keys(notifications).length > 0 || Object.keys(platformNotifications).length > 0) && 
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

        // Process platform notifications first
        const enabledPlatforms = Object.entries(platformNotifications)
          .filter(([_, settings]) => settings.enabled)
          .map(([platform]) => platform);

        if (enabledPlatforms.length > 0) {
          // Get all contests for enabled platforms
          const platformContests = contests.filter(contest => 
            enabledPlatforms.includes(contest.platform)
          );

          // Process each platform's contests
          for (const platform of enabledPlatforms) {
            const platformSettings = platformNotifications[platform];
            const platformSpecificContests = platformContests.filter(c => c.platform === platform);

            for (const contest of platformSpecificContests) {
              const contestId = `${contest.platform}-${contest.contestName}`;
              
              // Skip if there's already an individual notification for this contest
              if (notifications[contestId] && !notifications[contestId].disabled) continue;

              const contestTime = new Date(contest.startTime);
              const reminderTime = platformSettings.reminderTime;
              const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
              const currentTime = new Date();

              // For test notifications, show immediately
              if (notifications[contestId]?.isTest) {
                console.log(`Test notification detected for platform ${platform}, showing immediately`);
                
                // Send notification immediately without waiting
                showNotification(
                  'Test Contest Reminder',
                  `${contest.contestName} on ${platform} starts in ${reminderTime} minutes! (PLATFORM TEST)`
                );
                
                // Disable the test notification after sending
                disableNotification(contestId);
                
                continue;
              }

              // Only set notification if the time hasn't passed and it's within the next 24 hours
              if (notificationTime > currentTime && 
                  notificationTime - currentTime <= 24 * 60 * 60 * 1000) {
                const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
                const minutesUntilNotification = Math.floor(timeUntilNotification / (60 * 1000));
                const hoursUntilNotification = Math.floor(minutesUntilNotification / 60);
                const remainingMinutes = minutesUntilNotification % 60;
                
                const timeDisplay = hoursUntilNotification > 0 
                  ? `${hoursUntilNotification}h ${remainingMinutes}m` 
                  : `${minutesUntilNotification}m`;
                
                console.log(`Scheduling platform notification for ${contestId} in ${timeDisplay} (${reminderTime} minutes before contest)`);
                
                const timeoutId = setTimeout(() => {
                  showNotification(
                    'Contest Reminder',
                    `${contest.contestName} on ${contest.platform} starts in ${reminderTime} minutes!`
                  );
                  
                  // Disable the notification after sending
                  disableNotification(contestId);
                }, timeUntilNotification);
                
                timeoutIds.push(timeoutId);

                // Add to individual notifications for tracking
                notifications = {
                  ...notifications,
                  [contestId]: {
                    reminderTime,
                    contestTime: contest.startTime,
                    disabled: false,
                    isPlatformNotification: true,
                    platform: contest.platform
                  }
                };
              }
            }
          }

          // Update notifications in Firestore
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            notifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
        }

        // Process individual contest notifications
        if (Object.keys(notifications).length > 0) {
          Object.entries(notifications).forEach(([contestId, data]) => {
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
              showNotification(
                'Test Contest Reminder',
                `${contestId.split('-')[1]} on ${contestId.split('-')[0]} starts in ${reminderTime} minutes! (TEST)`
              );
              
              // Disable the test notification after sending
              disableNotification(contestId);
              
              return;
            }
            
            // Only set notification if the time hasn't passed and it's within the next 24 hours
            if (notificationTime > currentTime && notificationTime - currentTime <= 24 * 60 * 60 * 1000) {
              const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
              const minutesUntilNotification = Math.floor(timeUntilNotification / (60 * 1000));
              const hoursUntilNotification = Math.floor(minutesUntilNotification / 60);
              const remainingMinutes = minutesUntilNotification % 60;
              
              const timeDisplay = hoursUntilNotification > 0 
                ? `${hoursUntilNotification}h ${remainingMinutes}m` 
                : `${minutesUntilNotification}m`;
              
              console.log(`Scheduling notification for ${contestId} in ${timeDisplay} (${reminderTime} minutes before contest)`);
              
              const timeoutId = setTimeout(() => {
                const contestName = contestId.split('-')[1];
                const platform = contestId.split('-')[0];
                showNotification(
                  'Contest Reminder',
                  `${contestName} on ${platform} starts in ${reminderTime} minutes!`
                );
                
                // Disable the notification after sending
                disableNotification(contestId);
              }, timeUntilNotification);
              
              timeoutIds.push(timeoutId);
            } else if (notificationTime <= currentTime) {
              console.log(`Notification time has passed for ${contestId}`);
              // Disable notifications that have already passed
              disableNotification(contestId);
            } else {
              console.log(`Notification for ${contestId} is scheduled for more than 24 hours away`);
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
            const baseUrl = window.location.origin;
            await registration.showNotification(title, {
              body,
              icon: `${baseUrl}/assets/contests/default.png`,
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