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

    // Check for notification permission when component mounts
    if (Notification.permission === 'default') {
      toast.message("Would you like to receive notifications?", {
        action: {
          label: "Enable",
          onClick: () => {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                toast.success("Notifications enabled successfully!");
              } else {
                toast.error("Notification permission denied");
              }
            });
          },
        },
        description: "Stay updated with contest reminders",
        duration: 10000,
      });
    }

    const checkNotifications = async () => {
      try {
        // Fetch user preferences
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        let notifications = userData.notifications || {};
        const platformNotifications = userData.platformNotifications;

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

              // Only set notification if:
              // 1. Notification time is in the future and within next 24 hours
              // 2. Contest doesn't already have an individual notification
              if (notificationTime > currentTime && 
                  notificationTime - currentTime <= 24 * 60 * 60 * 1000 && 
                  !notifications[contestId]) {
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
                    contestTime: contest.startTime
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

    const showNotification = (title, body) => {
      // Browser notification
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/assets/contests/default.png'
        });
      } else if (Notification.permission !== 'denied') {
        toast.message("Enable notifications?", {
          action: {
            label: "Enable",
            onClick: () => {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  toast.success("Notifications enabled!");
                  new Notification(title, {
                    body,
                    icon: '/assets/contests/default.png'
                  });
                } else {
                  toast.error("Notification permission denied");
                }
              });
            },
          },
          description: "Get instant updates about contests",
          duration: 5000,
        });
      }
      // Toast notification
      toast.info(body);
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