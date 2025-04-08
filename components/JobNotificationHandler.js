'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export default function JobNotificationHandler() {
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
        let notifications = userData.jobNotifications || {};
        const companyNotifications = userData.companyNotifications || {};

        // If user has notifications set but no browser permission, request it
        if ((Object.keys(notifications).length > 0 || Object.keys(companyNotifications).length > 0) && 
            Notification.permission !== 'granted') {
          await requestNotificationPermission();
        }

        // Clear existing timeouts
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];

        // Fetch jobs
        const response = await fetch('/api/jobs');
        const data = await response.json();
        const jobs = data.jobs || [];

        // Process company notifications first
        const enabledCompanies = Object.entries(companyNotifications)
          .filter(([_, settings]) => settings.enabled)
          .map(([company]) => company);

        if (enabledCompanies.length > 0) {
          // Get all jobs for enabled companies
          const companyJobs = jobs.filter(job => 
            enabledCompanies.includes(job.company)
          );

          // Process each company's jobs
          for (const company of enabledCompanies) {
            const companySettings = companyNotifications[company];
            const companySpecificJobs = companyJobs.filter(j => j.company === company);

            for (const job of companySpecificJobs) {
              const jobId = `${job.company}-${job.title}`;
              
              // Skip if there's already an individual notification for this job
              if (notifications[jobId] && !notifications[jobId].disabled) continue;

              const jobTime = new Date(job.postedDate);
              const reminderTime = companySettings.reminderTime;
              const notificationTime = new Date(jobTime.getTime() - (reminderTime * 60 * 1000));
              const currentTime = new Date();

              // For test notifications, show immediately
              if (notifications[jobId]?.isTest) {
                console.log(`Test notification detected for company ${company}, showing immediately`);
                
                // Send notification immediately without waiting
                showNotification(
                  'Test Job Alert',
                  `New job at ${job.company}: ${job.title} (COMPANY TEST)`
                );
                
                // Disable the test notification after sending
                disableNotification(jobId);
                
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
                
                console.log(`Scheduling company notification for ${jobId} in ${timeDisplay} (${reminderTime} minutes before job posting)`);
                
                const timeoutId = setTimeout(() => {
                  showNotification(
                    'New Job Alert',
                    `New job at ${job.company}: ${job.title}`
                  );
                  
                  // Disable the notification after sending
                  disableNotification(jobId);
                }, timeUntilNotification);
                
                timeoutIds.push(timeoutId);

                // Add to individual notifications for tracking
                notifications = {
                  ...notifications,
                  [jobId]: {
                    reminderTime,
                    jobTime: job.postedDate,
                    disabled: false,
                    isCompanyNotification: true,
                    company: job.company
                  }
                };
              }
            }
          }

          // Update notifications in Firestore
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            jobNotifications: notifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
        }

        // Process individual job notifications
        if (Object.keys(notifications).length > 0) {
          Object.entries(notifications).forEach(([jobId, data]) => {
            // Skip if notification is marked as disabled or is a company notification
            if (data.disabled || (data.isCompanyNotification && !data.isTest)) return;

            const jobTime = new Date(data.jobTime);
            const reminderTime = data.reminderTime;
            const notificationTime = new Date(jobTime.getTime() - (reminderTime * 60 * 1000));
            const currentTime = new Date();
            
            // For test notifications, show immediately
            if (data.isTest) {
              console.log(`Test notification detected for ${jobId}, showing immediately`);
              
              // Send notification immediately without waiting
              showNotification(
                'Test Job Alert',
                `${jobId.split('-')[1]} at ${jobId.split('-')[0]} (TEST)`
              );
              
              // Disable the test notification after sending
              disableNotification(jobId);
              
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
              
              console.log(`Scheduling notification for ${jobId} in ${timeDisplay} (${reminderTime} minutes before job posting)`);
              
              const timeoutId = setTimeout(() => {
                const jobTitle = jobId.split('-')[1];
                const company = jobId.split('-')[0];
                showNotification(
                  'New Job Alert',
                  `${jobTitle} at ${company}`
                );
                
                // Disable the notification after sending
                disableNotification(jobId);
              }, timeUntilNotification);
              
              timeoutIds.push(timeoutId);
            } else if (notificationTime <= currentTime) {
              console.log(`Notification time has passed for ${jobId}`);
              // Disable notifications that have already passed
              disableNotification(jobId);
            } else {
              console.log(`Notification for ${jobId} is scheduled for more than 24 hours away`);
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
              icon: '/assets/jobs/default.png',
              tag: 'job-alert',
              renotify: true,
              data: { type: 'job', url: '/jobs' }
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
    const disableNotification = async (jobId) => {
      try {
        console.log(`Disabling notification for ${jobId}`);
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (!userPrefsDoc.exists()) return;

        const userData = userPrefsDoc.data();
        const notifications = userData.jobNotifications || {};
        
        // If the notification exists, mark it as disabled
        if (notifications[jobId]) {
          notifications[jobId].disabled = true;
          
          // Update Firestore
          await setDoc(doc(db, 'userPreferences', currentUser.uid), {
            jobNotifications: notifications,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
          
          console.log(`Notification for ${jobId} disabled successfully`);
        }
      } catch (error) {
        console.error('Error disabling notification:', error);
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