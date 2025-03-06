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

  // Memoize filtered contests to prevent recalculation on every render
  const filteredContests = useMemo(() => {
    return selectedPlatforms.length > 0
      ? initialContests.filter(contest => selectedPlatforms.includes(contest.platform))
      : initialContests;
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

  useEffect(() => {
    if (currentUser) {
      fetchUserPreferences();
      checkAdminStatus();
    }
  }, [currentUser, fetchUserPreferences, checkAdminStatus]);

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

  const setNotificationReminder = useCallback(async () => {
    if (!currentUser) {
      toast.error('Please sign in to set reminders');
      return;
    }

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      
      const contestId = `${selectedContest.platform}-${selectedContest.contestName}`;
      const newNotifications = {
        ...userData.notifications || {},
        [contestId]: {
          reminderTime: parseInt(reminderTime),
          contestTime: selectedContest.startTime
        }
      };

      const platformContests = filteredContests.filter(c => c.platform === selectedContest.platform);
      const platformContestIds = platformContests.map(c => `${c.platform}-${c.contestName}`);
      const allPlatformContestsHaveNotifications = platformContestIds.every(id => newNotifications[id]);

      const newPlatformNotifications = { ...userData.platformNotifications || {} };
      if (allPlatformContestsHaveNotifications) {
        newPlatformNotifications[selectedContest.platform] = {
          enabled: true,
          reminderTime: parseInt(reminderTime)
        };
      } else {
        delete newPlatformNotifications[selectedContest.platform];
      }

      const updatedUserPrefs = {
        ...userData,
        notifications: newNotifications,
        platformNotifications: newPlatformNotifications
      };

      await setDoc(doc(db, 'userPreferences', currentUser.uid), updatedUserPrefs);

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

  const testNotification = useCallback(async (contest) => {
    if (!currentUser || !isAdmin) {
      toast.error('Only admins can test notifications');
      return;
    }

    if (!('Notification' in window)) {
      toast.error("Your browser doesn't support notifications");
      return;
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast.error('Notification permission denied');
        return;
      }
    }

    try {
      toast.success('Sending test notification...');
      const notification = new Notification('Test Notification', {
        body: `Test notification for ${contest.contestName}`,
        icon: '/assets/contests/default.png'
      });
      setTimeout(() => notification.close(), 3000);
    } catch (error) {
      console.error('Error in test notification:', error);
      toast.error('Failed to show test notification');
    }
  }, [currentUser, isAdmin]);

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
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testNotification(contest)}
                >
                  Test
                </Button>
              )}
            </div>
          </div>
          <p><strong>Platform:</strong> {contest.platform}</p>
          <p><strong>Start Time:</strong> {formattedDate}</p>
          <p><strong>Duration:</strong> {contest.contestDuration}</p>
          {notifications[contestId] && (
            <p className="text-sm text-yellow-500 mt-2">
              Reminder set for {notifications[contestId].reminderTime} minutes before
            </p>
          )}
        </div>
      </div>
    );
  }, [favorites, notifications, isAdmin, handleNotificationClick, toggleFavorite, testNotification]);

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