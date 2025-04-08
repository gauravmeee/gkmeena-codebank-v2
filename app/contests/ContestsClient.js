'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ContestFilters from './ContestFilters';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Heart, Bell } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import PlatformNotificationSettings from './PlatformNotificationSettings';
import { notificationService } from '@/lib/notificationService';

export default function ContestsClient({ initialContests, platforms }) {
  const { currentUser } = useAuth();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [groupBy, setGroupBy] = useState('none');
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState({});
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [reminderTime, setReminderTime] = useState('30');
  const [isAdmin, setIsAdmin] = useState(false);
  const [platformNotifications, setPlatformNotifications] = useState({});

  // Remove duplicates and memoize filtered contests
  const filteredContests = useMemo(() => {
    // First, remove duplicates based on platform and contest name
    const uniqueContests = initialContests.reduce((acc, contest) => {
      const normalizedPlatform = contest.platform.trim();
      const key = `${normalizedPlatform}-${contest.contestName.trim()}`;
      
      // If we already have this contest, only keep the one with the shorter URL
      // This helps handle cases where the same contest has multiple URLs
      if (!acc[key] || contest.contestLink.length < acc[key].contestLink.length) {
        acc[key] = {
          ...contest,
          platform: normalizedPlatform // Store normalized platform name
        };
      }
      return acc;
    }, {});

    const contests = Object.values(uniqueContests);

    // Then apply platform filtering
    return selectedPlatforms.length > 0
      ? contests.filter(contest => {
          const contestPlatform = contest.platform.toLowerCase();
          return selectedPlatforms.some(platform => 
            platform.toLowerCase().trim() === contestPlatform
          );
        })
      : contests;
  }, [selectedPlatforms, initialContests]);

  // Memoize grouped contests
  const groupedContests = useMemo(() => {
    if (groupBy === 'none') return { '': filteredContests };
    
    return filteredContests.reduce((groups, contest) => {
      let key;
      if (groupBy === 'date') {
        const date = new Date(contest.startTime);
        key = date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      } else if (groupBy === 'platform') {
        key = contest.platform;
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(contest);
      return groups;
    }, {});
  }, [filteredContests, groupBy]);

  // Memoize sorted entries
  const sortedEntries = useMemo(() => {
    return Object.entries(groupedContests).sort(([keyA, _a], [keyB, _b]) => {
      if (groupBy === 'date' && keyA && keyB) {
        const dateA = new Date(keyA.split(' ').map(part => 
          isNaN(part) ? part : part.padStart(2, '0')
        ).join(' '));
        const dateB = new Date(keyB.split(' ').map(part => 
          isNaN(part) ? part : part.padStart(2, '0')
        ).join(' '));
        return dateA - dateB;
      }
      return 0;
    });
  }, [groupedContests, groupBy]);

  const fetchUserPreferences = useCallback(async () => {
    if (!currentUser) return;

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setFavorites(data.favorites || []);
        setNotifications(data.notifications || {});
        setPlatformNotifications(data.platformNotifications || {});
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  }, [currentUser]);

  const checkAdminStatus = useCallback(async () => {
    if (!currentUser) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setIsAdmin(userDoc.data().isAdmin === true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }, [currentUser]);

  // Initialize notifications when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchUserPreferences();
      checkAdminStatus();
      initializeNotifications();
    }
  }, [currentUser, fetchUserPreferences, checkAdminStatus]);

  const initializeNotifications = useCallback(async () => {
    try {
      await notificationService.init();
      const token = await notificationService.getFCMToken(currentUser.uid);
      
      if (token) {
        notificationService.setupOnMessage((payload) => {
          console.log('Received foreground message:', payload);
        });
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }, [currentUser]);

  // Listen for platform notification changes
  useEffect(() => {
    const handlePlatformNotificationsChange = (event) => {
      const { notifications: newNotifications, platformNotifications: newPlatformNotifications } = event.detail;
      setNotifications(newNotifications);
      setPlatformNotifications(newPlatformNotifications);
    };

    window.addEventListener('platformNotificationsChanged', handlePlatformNotificationsChange);
    return () => {
      window.removeEventListener('platformNotificationsChanged', handlePlatformNotificationsChange);
    };
  }, []);

  // Listen for notification removal events
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleNotificationRemoved = (event) => {
        const { contestId } = event.detail;
        console.log(`Notification removed event received for ${contestId}`);
        
        // Update the local state to reflect the removal
        setFavorites(prevFavorites => {
          const newFavorites = { ...prevFavorites };
          if (newFavorites[contestId]) {
            // Remove the notification from the favorites
            newFavorites[contestId] = {
              ...newFavorites[contestId],
              notification: false,
              reminderTime: null
            };
          }
          return newFavorites;
        });
      };
      
      window.addEventListener('notificationRemoved', handleNotificationRemoved);
      
      return () => {
        window.removeEventListener('notificationRemoved', handleNotificationRemoved);
      };
    }
  }, []);

  const toggleFavorite = useCallback(async (contest) => {
    if (!currentUser) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const contestId = `${contest.platform}-${contest.contestName}`;
      const newFavorites = favorites.includes(contestId)
        ? favorites.filter(id => id !== contestId)
        : [...favorites, contestId];
      
      // Get current preferences to preserve all data
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        ...userData,
        favorites: newFavorites,
      }, { merge: true });

      setFavorites(newFavorites);
      toast.success(
        favorites.includes(contestId)
          ? 'Removed from favorites'
          : 'Added to favorites'
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Failed to update favorites');
    }
  }, [currentUser, favorites]);

  const handleNotificationClick = useCallback(async (contest) => {
    if (!currentUser) {
      toast.error('Please sign in to set reminders');
      return;
    }

    const contestId = `${contest.platform}-${contest.contestName}`;

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      const currentNotifications = userData.notifications || {};
      
      const hasNotification = Boolean(currentNotifications[contestId]);

      if (hasNotification) {
        const newNotifications = { ...currentNotifications };
        delete newNotifications[contestId];
        
        const platformContests = Object.keys(newNotifications).filter(id => id.startsWith(`${contest.platform}-`));
        const newPlatformNotifications = { ...userData.platformNotifications || {} };
        
        if (platformContests.length === 0) {
          delete newPlatformNotifications[contest.platform];
        }

        const updatedUserPrefs = {
          ...userData,
          notifications: newNotifications,
          platformNotifications: newPlatformNotifications
        };

        await setDoc(doc(db, 'userPreferences', currentUser.uid), updatedUserPrefs);

        setNotifications(newNotifications);
        setPlatformNotifications(newPlatformNotifications);

        // Emit event for platform settings
        window.dispatchEvent(new CustomEvent('contestNotificationsChanged', {
          detail: { 
            notifications: newNotifications,
            platformNotifications: newPlatformNotifications
          }
        }));

        toast.success('Reminder disabled');
      } else {
        setSelectedContest(contest);
        setShowNotificationDialog(true);
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
      toast.error('Failed to update notification');
    }
  }, [currentUser]);

  const testNotification = useCallback(async (contest) => {
    if (!currentUser || !isAdmin) {
      toast.error('Only admins can test notifications');
      return;
    }

    try {
      console.log('Testing notification for contest:', contest);

      // Initialize if not already initialized
      console.log('Initializing notification service...');
      await notificationService.init();
      
      // Get or refresh FCM token
      console.log('Getting FCM token...');
      const token = await notificationService.getFCMToken(currentUser.uid);
      
      if (!token) {
        console.error('Failed to get FCM token');
        toast.error('Failed to get notification permission');
        return;
      }

      // Set a 2-second delay before sending the notification
      setTimeout(async () => {
        console.log('Sending test notification request...');
        // Send test notification through your backend
        const response = await fetch('/api/send-test-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            type: 'contest',
            notification: {
              title: 'Test Contest Notification',
              body: `${contest.contestName} on ${contest.platform}`
            },
            data: {
              name: contest.contestName,
              platform: contest.platform,
              startTime: contest.startTime,
              url: contest.contestLink,
              type: 'contest'
            }
          }),
        });

        const responseData = await response.json();
        console.log('Server response:', responseData);

        if (!response.ok) {
          console.error('Test notification error:', responseData);
          throw new Error(responseData.error || 'Failed to send test notification');
        }

        console.log('Test notification sent successfully:', responseData);
        toast.success('Test notification sent successfully');

        // Show a local notification using ServiceWorkerRegistration
        if ('serviceWorker' in navigator && 'Notification' in window && Notification.permission === 'granted') {
          try {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification('Test Notification Sent', {
              body: 'Check your device for the test notification',
              icon: '/assets/contests/default.png',
              tag: 'test-notification',
              renotify: true
            });
          } catch (error) {
            console.error('Error showing local notification:', error);
          }
        }
      }, 2000); // 2-second delay
    } catch (error) {
      console.error('Error in test notification:', error);
      toast.error(error.message || 'Failed to send test notification');
    }
  }, [currentUser, isAdmin]);

  const setNotificationReminder = useCallback(async () => {
    if (!currentUser) {
      toast.error('Please sign in to set reminders');
      return;
    }

    try {
      // If test option is selected, trigger test notification with dynamic timing
      if (reminderTime === 'test') {
        // Calculate time until contest starts
        const contestTime = new Date(selectedContest.startTime);
        const currentTime = new Date();
        const timeUntilContest = contestTime.getTime() - currentTime.getTime();
        const minutesUntilContest = Math.floor(timeUntilContest / (60 * 1000));
        
        // Use the remaining time as the reminder time
        const dynamicReminderTime = Math.max(1, minutesUntilContest);
        
        console.log(`Test notification: Contest starts in ${minutesUntilContest} minutes, setting reminder for ${dynamicReminderTime} minutes before`);
        
        // Store the test notification with the dynamic reminder time
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
        
        const contestId = `${selectedContest.platform}-${selectedContest.contestName}`;
        const newNotifications = {
          ...userData.notifications || {},
          [contestId]: {
            reminderTime: dynamicReminderTime,
            contestTime: selectedContest.startTime,
            isTest: true, // Mark as test notification
            createdAt: new Date().toISOString() // Add creation timestamp
          }
        };

        // Use setDoc with merge option to update only the notifications field
        await setDoc(doc(db, 'userPreferences', currentUser.uid), {
          notifications: newNotifications,
          lastUpdated: new Date().toISOString()
        }, { merge: true });

        setNotifications(newNotifications);
        setShowNotificationDialog(false);
        
        // Show immediate notification for test
        toast.success(`Test notification set for ${dynamicReminderTime} minutes before contest start (${minutesUntilContest} minutes remaining)`);
        
        // Send a direct test notification
        try {
          // Initialize if not already initialized
          await notificationService.init();
          
          // Get or refresh FCM token
          const token = await notificationService.getFCMToken(currentUser.uid);
          
          if (token) {
            // Send test notification through your backend
            const response = await fetch('/api/send-test-notification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                type: 'contest',
                notification: {
                  title: 'Test Contest Notification',
                  body: `${selectedContest.contestName} on ${selectedContest.platform}`
                },
                data: {
                  name: selectedContest.contestName,
                  platform: selectedContest.platform,
                  startTime: selectedContest.startTime,
                  url: selectedContest.contestLink,
                  type: 'contest'
                }
              }),
            });

            if (!response.ok) {
              console.error('Test notification error:', await response.json());
            } else {
              console.log('Test notification sent successfully');
            }
          }
        } catch (error) {
          console.error('Error sending test notification:', error);
        }
        
        // Trigger the notification handler to process this immediately
        window.dispatchEvent(new CustomEvent('contestNotificationsChanged', {
          detail: { 
            notifications: newNotifications,
            platformNotifications: userData.platformNotifications || {}
          }
        }));
        
        return;
      }

      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      
      const contestId = `${selectedContest.platform}-${selectedContest.contestName}`;
      const newNotifications = {
        ...userData.notifications || {},
        [contestId]: {
          reminderTime: parseInt(reminderTime),
          contestTime: selectedContest.startTime,
          createdAt: new Date().toISOString() // Add creation timestamp
        }
      };

      const platformContests = filteredContests.filter(c => c.platform === selectedContest.platform);
      const platformContestIds = platformContests.map(c => `${c.platform}-${c.contestName}`);
      const allPlatformContestsHaveNotifications = platformContestIds.every(id => newNotifications[id]);

      const newPlatformNotifications = { ...userData.platformNotifications || {} };
      if (allPlatformContestsHaveNotifications) {
        newPlatformNotifications[selectedContest.platform] = {
          enabled: true,
          reminderTime: parseInt(reminderTime),
          updatedAt: new Date().toISOString() // Add update timestamp
        };
      } else {
        delete newPlatformNotifications[selectedContest.platform];
      }

      const updatedUserPrefs = {
        ...userData,
        notifications: newNotifications,
        platformNotifications: newPlatformNotifications,
        lastUpdated: new Date().toISOString() // Add last updated timestamp
      };

      // Use setDoc with merge option to update only changed fields
      await setDoc(doc(db, 'userPreferences', currentUser.uid), updatedUserPrefs, { merge: true });

      setNotifications(newNotifications);
      setPlatformNotifications(newPlatformNotifications);
      setShowNotificationDialog(false);

      // Emit event for platform settings
      window.dispatchEvent(new CustomEvent('platformNotificationsChanged', {
        detail: { 
          notifications: newNotifications,
          platformNotifications: newPlatformNotifications
        }
      }));

      toast.success('Reminder set successfully');
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast.error('Failed to set reminder');
    }
  }, [currentUser, selectedContest, reminderTime, filteredContests]);

  const handlePlatformNotification = useCallback(async (platform, isTest = false) => {
    if (!currentUser) {
      toast.error('Please sign in to set reminders');
      return;
    }

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      const platformNotifications = userData.platformNotifications || {};
      const currentPlatformSettings = platformNotifications[platform] || { enabled: false };

      // If this is a test notification, we'll handle it differently
      if (isTest) {
        // Get all contests for this platform
        const platformContests = filteredContests.filter(c => c.platform === platform);
        if (platformContests.length === 0) {
          toast.error('No contests found for this platform to test');
          return;
        }

        // Use the first upcoming contest for testing
        const testContest = platformContests[0];
        const contestTime = new Date(testContest.startTime);
        const currentTime = new Date();
        const timeUntilContest = contestTime.getTime() - currentTime.getTime();
        const minutesUntilContest = Math.floor(timeUntilContest / (60 * 1000));
        
        // Use the remaining time as the reminder time
        const dynamicReminderTime = Math.max(1, minutesUntilContest);
        
        console.log(`Test notification for platform ${platform}: Contest starts in ${minutesUntilContest} minutes, setting reminder for ${dynamicReminderTime} minutes before`);
        
        const contestId = `${testContest.platform}-${testContest.contestName}`;
        const newNotifications = {
          ...userData.notifications || {},
          [contestId]: {
            reminderTime: dynamicReminderTime,
            contestTime: testContest.startTime,
            isTest: true,
            isPlatformNotification: true,
            platform: testContest.platform,
            createdAt: new Date().toISOString()
          }
        };

        // Update Firestore
        await setDoc(doc(db, 'userPreferences', currentUser.uid), {
          notifications: newNotifications,
          lastUpdated: new Date().toISOString()
        }, { merge: true });

        setNotifications(newNotifications);
        
        // Show immediate notification for test
        toast.success(`Test notification set for ${platform} (${dynamicReminderTime} minutes before contest start)`);
        
        // Send a direct test notification
        try {
          // Initialize if not already initialized
          await notificationService.init();
          
          // Get or refresh FCM token
          const token = await notificationService.getFCMToken(currentUser.uid);
          
          if (token) {
            // Send test notification through your backend
            const response = await fetch('/api/send-test-notification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                type: 'contest',
                notification: {
                  title: `Test ${platform} Contest Notification`,
                  body: `${testContest.contestName} on ${platform} (Platform Test)`
                },
                data: {
                  name: testContest.contestName,
                  platform: platform,
                  startTime: testContest.startTime,
                  url: testContest.contestLink,
                  type: 'contest'
                }
              }),
            });

            if (!response.ok) {
              console.error('Test notification error:', await response.json());
            } else {
              console.log('Test notification sent successfully');
            }
          }
        } catch (error) {
          console.error('Error sending test notification:', error);
        }
        
        // Trigger the notification handler to process this immediately
        window.dispatchEvent(new CustomEvent('platformNotificationsChanged', {
          detail: { 
            notifications: newNotifications,
            platformNotifications: platformNotifications
          }
        }));
        
        return;
      }

      // Regular platform notification toggle
      const newPlatformNotifications = {
        ...platformNotifications,
        [platform]: {
          enabled: !currentPlatformSettings.enabled,
          reminderTime: currentPlatformSettings.reminderTime || 30, // Default to 30 minutes if not set
          updatedAt: new Date().toISOString()
        }
      };

      // Update Firestore
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        platformNotifications: newPlatformNotifications,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      setPlatformNotifications(newPlatformNotifications);

      // If enabling platform notifications, add all current platform contests
      if (!currentPlatformSettings.enabled) {
        const platformContests = filteredContests.filter(c => c.platform === platform);
        const notifications = userData.notifications || {};
        const newNotifications = { ...notifications };

        platformContests.forEach(contest => {
          const contestId = `${contest.platform}-${contest.contestName}`;
          if (!notifications[contestId]) {
            newNotifications[contestId] = {
              reminderTime: newPlatformNotifications[platform].reminderTime,
              contestTime: contest.startTime,
              disabled: false,
              isPlatformNotification: true,
              platform: contest.platform,
              createdAt: new Date().toISOString()
            };
          }
        });

        // Update notifications in Firestore
        await setDoc(doc(db, 'userPreferences', currentUser.uid), {
          notifications: newNotifications,
          lastUpdated: new Date().toISOString()
        }, { merge: true });

        setNotifications(newNotifications);
      }

      // Emit event for notification handler
      window.dispatchEvent(new CustomEvent('platformNotificationsChanged', {
        detail: { 
          notifications: userData.notifications || {},
          platformNotifications: newPlatformNotifications
        }
      }));

      toast.success(`${platform} notifications ${!currentPlatformSettings.enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error toggling platform notification:', error);
      toast.error('Failed to update platform notifications');
    }
  }, [currentUser, filteredContests]);

  // Memoize the contest card to prevent unnecessary re-renders
  const ContestCard = useCallback(({ contest }) => {
    const contestId = `${contest.platform}-${contest.contestName}`;
    const formattedDate = new Date(contest.startTime).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      weekday: 'short',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const platformImage = `/assets/contests/${contest.platform}.png` || "/assets/contests/default.png";
    
    // Calculate time until notification if one is set
    let notificationInfo = null;
    if (notifications[contestId]) {
      const contestTime = new Date(contest.startTime);
      const reminderTime = notifications[contestId].reminderTime;
      const notificationTime = new Date(contestTime.getTime() - (reminderTime * 60 * 1000));
      const currentTime = new Date();
      
      if (notificationTime > currentTime) {
        const timeUntilNotification = notificationTime.getTime() - currentTime.getTime();
        const hoursUntilNotification = Math.floor(timeUntilNotification / (60 * 60 * 1000));
        const minutesUntilNotification = Math.floor((timeUntilNotification % (60 * 60 * 1000)) / (60 * 1000));
        
        notificationInfo = {
          timeUntil: hoursUntilNotification > 0 
            ? `${hoursUntilNotification}h ${minutesUntilNotification}m` 
            : `${minutesUntilNotification}m`,
          reminderTime,
          isTest: notifications[contestId].isTest || false
        };
      }
    }

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url(${platformImage})` }}
        ></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 flex-1">
              <a href={contest.contestLink} target="_blank" className="text-blue-500 hover:underline">
                {contest.contestName}
              </a>
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(contest)}
                className={favorites.includes(contestId) ? "text-red-500" : ""}
              >
                <Heart className="h-5 w-5" fill={favorites.includes(contestId) ? "currentColor" : "none"} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNotificationClick(contest)}
                className={notifications[contestId] ? "text-yellow-500" : ""}
              >
                <Bell className="h-5 w-5" fill={notifications[contestId] ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
          <p><strong>Platform:</strong> {contest.platform}</p>
          <p><strong>Start Time:</strong> {formattedDate}</p>
          <p><strong>Duration:</strong> {contest.contestDuration}</p>
          {notifications[contestId] && (
            <p className="text-sm text-yellow-500 mt-2">
              Reminder set for {notifications[contestId].reminderTime} minutes before
              {notificationInfo && (
                <span> (Notification in {notificationInfo.timeUntil})</span>
              )}
              {notificationInfo?.isTest && (
                <span className="ml-1 text-xs">(TEST)</span>
              )}
            </p>
          )}
        </div>
      </div>
    );
  }, [favorites, notifications, handleNotificationClick, toggleFavorite]);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
      {/* Responsive header with flex layout instead of absolute positioning */}
      <div className="flex flex-col sm:flex-row items-center justify-center relative mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Coding Contests
        </h2>
        
        <div className="sm:absolute sm:right-0 mt-2 sm:mt-0 flex items-center gap-4">
          <Link href="/contests/favorites">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </Link>
          <PlatformNotificationSettings 
            platforms={platforms} 
            initialContests={initialContests}
          />
          <ContestFilters
            platforms={platforms}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            currentGroupBy={groupBy}
            setGroupBy={setGroupBy}
          />
        </div>
      </div>

      {/* Notification Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Contest Reminder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">When would you like to be reminded?</p>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select reminder time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="180">3 hours before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
                <SelectItem value="test">Test (2 sec)</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 flex justify-end">
              <Button onClick={setNotificationReminder}>Set Reminder</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {sortedEntries.map(([group, groupContests]) => (
        <div key={group} className="mb-8">
          {group && <h3 className="text-xl font-semibold mb-2">{group}</h3>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupContests.map((contest) => (
              <ContestCard key={`${contest.platform}-${contest.contestName}`} contest={contest} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}