'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ContestFilters from './ContestFilters';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
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
import { ErrorBoundary } from 'react-error-boundary';

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <pre className="text-red-500 mb-4">{error.message}</pre>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  );
}

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Error handling wrapper
  const handleAsyncError = useCallback(async (operation) => {
    try {
      await operation();
    } catch (err) {
      console.error('Operation failed:', err);
      setError(err);
      toast.error(err.message || 'An error occurred');
    }
  }, []);

  // Add cleanup function for notifications with error handling
  const cleanupNotification = useCallback(async (contestId) => {
    if (!currentUser || !contestId) return;

    await handleAsyncError(async () => {
      console.log(`Cleaning up notification for ${contestId}`);
      
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (!userPrefsDoc.exists()) return;

      const userData = userPrefsDoc.data();
      const currentNotifications = userData.notifications || {};
      
      if (!currentNotifications[contestId]) {
        console.log('No notification found to clean up');
        return;
      }

      const newNotifications = { ...currentNotifications };
      delete newNotifications[contestId];
      
      const platform = contestId.split('-')[0];
      const platformContests = Object.keys(newNotifications).filter(id => id.startsWith(`${platform}-`));
      const newPlatformNotifications = { ...userData.platformNotifications || {} };
      
      if (platformContests.length === 0) {
        delete newPlatformNotifications[platform];
      }

      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        notifications: newNotifications,
        platformNotifications: newPlatformNotifications,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      setNotifications(newNotifications);
      setPlatformNotifications(newPlatformNotifications);
    });
  }, [currentUser, handleAsyncError]);

  // Add event listener for notification sent
  useEffect(() => {
    const handleNotificationSent = (event) => {
      const { contestId } = event.detail;
      if (contestId) {
        // Add a small delay before cleanup to ensure notification is processed
        setTimeout(() => {
          cleanupNotification(contestId);
        }, 2000); // 2 second delay
      }
    };

    window.addEventListener('contestNotificationSent', handleNotificationSent);

    return () => {
      window.removeEventListener('contestNotificationSent', handleNotificationSent);
    };
  }, [cleanupNotification]);

  // Initialize notifications
  useEffect(() => {
    let isMounted = true;
    
    const setupNotifications = async () => {
      if (!currentUser || !isMounted || isInitialized) return;
      
      try {
        // Fetch user preferences
        const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
        if (userPrefsDoc.exists()) {
          const data = userPrefsDoc.data();
          setNotifications(data.notifications || {});
          setPlatformNotifications(data.platformNotifications || {});
        }

        // Initialize notification service
        console.log('Initializing notifications...');
        const initialized = await notificationService.init();
        
        if (initialized) {
          const token = await notificationService.getFCMToken(currentUser.uid);
          
          if (token) {
            notificationService.setupOnMessage((payload) => {
              console.log('Received foreground message:', payload);
              // Don't trigger cleanup for test notifications
              if (payload.data?.isTest === 'true') {
                console.log('Skipping cleanup for test notification');
                return;
              }
            });
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error in notification setup:', error);
      }
    };

    setupNotifications();

    return () => {
      isMounted = false;
    };
  }, [currentUser, isInitialized]);

  // Add real-time notification updates listener
  useEffect(() => {
    if (!currentUser) return;

    const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
    const unsubscribe = onSnapshot(userPrefsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setNotifications(data.notifications || {});
        setPlatformNotifications(data.platformNotifications || {});
      }
    });

    return () => unsubscribe();
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

  const handlePlatformNotificationsChange = useCallback((event) => {
    const { notifications: newNotifications, platformNotifications: newPlatformNotifications } = event.detail;
    setNotifications(newNotifications);
    setPlatformNotifications(newPlatformNotifications);
  }, []);

  const handleNotificationRemoved = useCallback((event) => {
    const { contestId } = event.detail;
    console.log(`Notification removed event received for ${contestId}`);
    
    setFavorites(prevFavorites => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[contestId]) {
        newFavorites[contestId] = {
          ...newFavorites[contestId],
          notification: false,
          reminderTime: null
        };
      }
      return newFavorites;
    });
  }, []);

  // Define all hooks after functions
  const filteredContests = useMemo(() => {
    return initialContests.filter(contest => {
      if (selectedPlatforms.length === 0) return true;
      return selectedPlatforms.includes(contest.platform);
    });
  }, [initialContests, selectedPlatforms]);

  const groupedContests = useMemo(() => {
    if (groupBy === 'none') return { '': filteredContests };
    
    return filteredContests.reduce((groups, contest) => {
      const key = groupBy === 'date' 
        ? new Date(contest.startTime).toLocaleDateString()
        : contest[groupBy];
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(contest);
      return groups;
    }, {});
  }, [filteredContests, groupBy]);

  const sortedEntries = useMemo(() => {
    return Object.entries(groupedContests).sort(([a], [b]) => {
      if (groupBy === 'date') {
        return new Date(a) - new Date(b);
      }
      return a.localeCompare(b);
    });
  }, [groupedContests, groupBy]);

  // Single useEffect for event listeners
  useEffect(() => {
    window.addEventListener('platformNotificationsChanged', handlePlatformNotificationsChange);
    window.addEventListener('notificationRemoved', handleNotificationRemoved);
    
    return () => {
      window.removeEventListener('platformNotificationsChanged', handlePlatformNotificationsChange);
      window.removeEventListener('notificationRemoved', handleNotificationRemoved);
    };
  }, [handlePlatformNotificationsChange, handleNotificationRemoved]);

  // Initialize admin status
  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  const toggleFavorite = useCallback(async (contest) => {
    if (!currentUser) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const contestId = `${contest.platform}-${contest.contestName}-${contest.startTime}`;
      const currentFavorites = Array.isArray(favorites) ? favorites : [];
      const newFavorites = currentFavorites.includes(contestId)
        ? currentFavorites.filter(id => id !== contestId)
        : [...currentFavorites, contestId];
      
      // Get current preferences to preserve all data
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        ...userData,
        favorites: newFavorites,
      }, { merge: true });

      setFavorites(newFavorites);
      toast.success(
        currentFavorites.includes(contestId)
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

    const contestId = `${contest.platform}-${contest.contestName}-${contest.startTime}`;

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
      toast.error('You must be logged in as an admin to test notifications');
      return;
    }

    // Prevent multiple simultaneous requests
    const requestId = `${currentUser.uid}-${contest.platform}-${contest.contestName}-${Date.now()}`;
    const isRequestInProgress = sessionStorage.getItem('notificationRequestInProgress');
    
    if (isRequestInProgress) {
      console.log('Notification request already in progress, skipping');
      return;
    }

    try {
      // Mark request as in progress
      sessionStorage.setItem('notificationRequestInProgress', requestId);

      // Get user's FCM token
      const fcmToken = await notificationService.getFCMToken(currentUser.uid);
      if (!fcmToken) {
        toast.error('Failed to get FCM token. Please ensure notifications are enabled.');
        return;
      }

      // Show loading state
      const loadingToast = toast.loading('Sending test notification...');

      // For test notifications, set reminder time to immediate (0 minutes)
      const reminderTime = 0;
      
      console.log('Sending immediate test notification');

      // Check for existing notification in Firestore
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      const notifications = userData.notifications || {};
      const contestId = `${contest.platform}-${contest.contestName}-${contest.startTime}`;
      
      // Store the notification in Firestore
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        ...userData,
        notifications: {
          ...notifications,
          [contestId]: {
            reminderTime: reminderTime,
            contestTime: contest.startTime,
            isTest: true,
            requestId: requestId,
            createdAt: new Date().toISOString()
          }
        },
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      // Send test notification immediately through your backend
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: fcmToken,
          data: {
            name: contest.contestName,
            platform: contest.platform,
            startTime: contest.startTime,
            url: contest.contestLink,
            type: 'contest',
            isTest: true,
            contestId: contestId,
            icon: `/assets/contests/${contest.platform.toLowerCase()}.png`,
            tag: `contest-reminder-${Date.now()}`, // Unique tag for each test
            requestId: requestId
          },
          type: 'contest'
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send test notification');
      }

      // Clear loading state and show success
      toast.dismiss(loadingToast);
      toast.success('Test notification sent successfully');

      // Trigger immediate UI update
      window.dispatchEvent(new CustomEvent('contestNotificationSent', {
        detail: { contestId }
      }));

    } catch (error) {
      console.error('Error sending test notification:', error);
      toast.error(error.message || 'Failed to send test notification');
    } finally {
      // Clear the request in progress flag
      sessionStorage.removeItem('notificationRequestInProgress');
    }
  }, [currentUser, isAdmin]);

  const handleSetNotification = useCallback(async () => {
    if (!currentUser || !selectedContest) return;

    await handleAsyncError(async () => {
      const contestTime = new Date(selectedContest.startTime);
      const createdAt = new Date();
      const isTest = reminderTime === 'test';
      
      // Generate contestId using the consistent format
      const contestId = `${selectedContest.platform}-${selectedContest.contestName}-${selectedContest.startTime}`;

      // Store notification data without calculating reminder time
      const notificationData = {
        contestTime: contestTime.toISOString(),
        createdAt: createdAt.toISOString(),
        platform: selectedContest.platform,
        isTest,
        reminderTime: isTest ? 'test' : parseInt(reminderTime),
        contestName: selectedContest.contestName
      };

      const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
      await setDoc(userPrefsRef, {
        notifications: {
          [contestId]: notificationData
        },
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      toast.success(`Reminder set for ${isTest ? '5 seconds' : reminderTime + ' minutes'} before contest start`);
      setShowNotificationDialog(false);
    });
  }, [currentUser, selectedContest, reminderTime, handleAsyncError]);

  const handleSetPlatformNotification = useCallback(async (platform) => {
    if (!currentUser) return;

    await handleAsyncError(async () => {
      const contestTime = new Date();
      contestTime.setSeconds(contestTime.getSeconds() + 5); // Set contest time 5 seconds from now for testing
      const createdAt = new Date();
      const dynamicReminderTime = 'test'; // For platform test notifications, always use test mode

      const notificationData = {
        contestTime: contestTime.toISOString(),
        createdAt: createdAt.toISOString(),
        platform,
        isTest: true,
        reminderTime: dynamicReminderTime,
        isPlatformNotification: true
      };

      const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
      const testContestId = `${platform}-test-${Date.now()}`;

      await setDoc(userPrefsRef, {
        notifications: {
          [testContestId]: notificationData
        },
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      toast.success(`Test notification set for ${platform}`);
    });
  }, [currentUser, handleAsyncError]);

  // Memoize the contest card to prevent unnecessary re-renders
  const ContestCard = useCallback(({ contest }) => {
    const contestId = `${contest.platform}-${contest.contestName}-${contest.startTime}`;
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
    const isFavorite = Array.isArray(favorites) && favorites.includes(contestId);
    
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
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
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

  const filtersApplied = selectedPlatforms.length > 0 || groupBy !== 'none';

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setError(null);
        setIsInitialized(false);
        window.location.reload();
      }}
    >
      {error ? (
        <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />
      ) : (
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
            <DialogContent aria-describedby="notification-dialog-description">
              <DialogHeader>
                <DialogTitle>Set Contest Reminder</DialogTitle>
                <p id="notification-dialog-description" className="text-sm text-muted-foreground">
                  Choose when you want to be reminded about this contest
                </p>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-4">When would you like to be reminded?</p>
                <Select value={reminderTime} onValueChange={setReminderTime}>
                  <SelectTrigger aria-label="Select reminder time">
                    <SelectValue placeholder="Select reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="180">3 hours before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                    <SelectItem value="test">Test (5 sec)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSetNotification}>Set Reminder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {initialContests.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-center text-base sm:text-lg text-gray-500">
                No contests available right now.
              </p>
            </div>
          ) : filteredContests.length === 0 && filtersApplied ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-center text-base sm:text-lg text-gray-500">
                No contests available for the selected filters.
              </p>
            </div>
          ) : (
            sortedEntries.map(([group, groupContests]) => (
              <div key={group} className="mb-8">
                {group && <h3 className="text-xl font-semibold mb-2">{group}</h3>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {groupContests.map((contest) => (
                    <ContestCard 
                      key={`${contest.platform}-${contest.contestName}-${contest.startTime}`} 
                      contest={contest} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </ErrorBoundary>
  );
}