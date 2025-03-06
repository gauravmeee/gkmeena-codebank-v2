'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlatformNotificationSettings({ platforms, initialContests }) {
  const { currentUser } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [platformSettings, setPlatformSettings] = useState({});
  const [defaultReminderTime, setDefaultReminderTime] = useState('30');
  const [notifications, setNotifications] = useState({});

  // Memoize the platform contests to avoid recalculation on every render
  const platformContestsMap = useMemo(() => {
    const map = {};
    platforms.forEach(platform => {
      map[platform] = initialContests.filter(contest => contest.platform === platform);
    });
    return map;
  }, [platforms, initialContests]);

  // Fetch user preferences when user changes or dialog opens
  useEffect(() => {
    if (currentUser && showSettings) {
      fetchPlatformSettings();
    }
  }, [currentUser, showSettings]);

  const fetchPlatformSettings = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setPlatformSettings(data.platformNotifications || {});
        setNotifications(data.notifications || {});
      }
    } catch (error) {
      console.error('Error fetching platform settings:', error);
    }
  }, [currentUser]);

  // Memoize the notification check function
  const allPlatformContestsHaveNotifications = useCallback((platform) => {
    const platformContests = platformContestsMap[platform];
    return platformContests.every(contest => {
      const contestId = `${platform}-${contest.contestName}`;
      return notifications[contestId];
    });
  }, [platformContestsMap, notifications]);

  const togglePlatformNotification = useCallback(async (platform) => {
    if (!currentUser) {
      toast.error('Please sign in to manage notifications');
      return;
    }

    try {
      // Get current user preferences including individual notifications
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      const userData = userPrefsDoc.exists() ? userPrefsDoc.data() : {};
      let individualNotifications = userData.notifications || {};
      let existingPlatformNotifications = userData.platformNotifications || {};
      
      const isCurrentlyEnabled = existingPlatformNotifications[platform]?.enabled === true;
      
      const newSettings = {
        ...existingPlatformNotifications,
        [platform]: isCurrentlyEnabled 
          ? null 
          : { enabled: true, reminderTime: parseInt(defaultReminderTime) }
      };

      // Remove null values
      Object.keys(newSettings).forEach(key => {
        if (newSettings[key] === null) {
          delete newSettings[key];
        }
      });

      const updatedIndividualNotifications = { ...individualNotifications };

      // First, remove any existing notifications for this platform
      Object.keys(updatedIndividualNotifications).forEach(contestId => {
        if (contestId.startsWith(`${platform}-`)) {
          delete updatedIndividualNotifications[contestId];
        }
      });

      // If enabling platform notifications, use the cached platform contests
      if (newSettings[platform]) {
        const platformContests = platformContestsMap[platform];
        platformContests.forEach(contest => {
          const contestId = `${platform}-${contest.contestName}`;
          updatedIndividualNotifications[contestId] = {
            reminderTime: newSettings[platform].reminderTime,
            contestTime: contest.startTime
          };
        });
      }

      const updatedUserPrefs = {
        ...userData,
        platformNotifications: newSettings,
        notifications: updatedIndividualNotifications,
      };

      await setDoc(doc(db, 'userPreferences', currentUser.uid), updatedUserPrefs);

      // Update local state
      setPlatformSettings(newSettings);
      setNotifications(updatedIndividualNotifications);

      toast.success(
        isCurrentlyEnabled
          ? `Disabled notifications for ${platform}`
          : `Enabled notifications for ${platform}`
      );

      // Emit event with updated data
      window.dispatchEvent(new CustomEvent('platformNotificationsChanged', {
        detail: { 
          platform, 
          notifications: updatedIndividualNotifications,
          platformNotifications: newSettings
        }
      }));
    } catch (error) {
      console.error('Error updating platform settings:', error);
      toast.error('Failed to update notification settings');
    }
  }, [currentUser, defaultReminderTime, platformContestsMap]);

  // Memoize the platform buttons to prevent unnecessary re-renders
  const PlatformButtons = useMemo(() => {
    return platforms.map((platform) => {
      const hasAllNotifications = allPlatformContestsHaveNotifications(platform);
      return (
        <div key={platform} className="flex items-center justify-between">
          <span>{platform}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => togglePlatformNotification(platform)}
            className={hasAllNotifications ? "text-yellow-500" : ""}
          >
            <Bell 
              className="h-5 w-5" 
              fill={hasAllNotifications ? "currentColor" : "none"} 
            />
          </Button>
        </div>
      );
    });
  }, [platforms, allPlatformContestsHaveNotifications, togglePlatformNotification]);

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowSettings(true)}
      >
        <Bell className="h-4 w-4" />
        notifications
      </Button>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Default Reminder Time
              </label>
              <Select value={defaultReminderTime} onValueChange={setDefaultReminderTime}>
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
              <p className="text-sm text-muted-foreground mt-1">
                This will be used for new platform notifications
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Enable Notifications by Platform</h3>
              {PlatformButtons}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 