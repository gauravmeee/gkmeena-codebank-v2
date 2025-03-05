'use client';

import { useState, useEffect } from 'react';
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

export default function PlatformNotificationSettings({ platforms }) {
  const { currentUser } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [platformSettings, setPlatformSettings] = useState({});
  const [defaultReminderTime, setDefaultReminderTime] = useState('30');

  useEffect(() => {
    if (currentUser) {
      fetchPlatformSettings();
    }
  }, [currentUser]);

  const fetchPlatformSettings = async () => {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setPlatformSettings(data.platformNotifications || {});
      }
    } catch (error) {
      console.error('Error fetching platform settings:', error);
    }
  };

  const togglePlatformNotification = async (platform) => {
    if (!currentUser) {
      toast.error('Please sign in to manage notifications');
      return;
    }

    try {
      const newSettings = {
        ...platformSettings,
        [platform]: platformSettings[platform] 
          ? null 
          : { enabled: true, reminderTime: parseInt(defaultReminderTime) }
      };

      // Remove null values
      Object.keys(newSettings).forEach(key => {
        if (newSettings[key] === null) {
          delete newSettings[key];
        }
      });

      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        platformNotifications: newSettings
      }, { merge: true });

      setPlatformSettings(newSettings);
      toast.success(
        platformSettings[platform]
          ? `Disabled notifications for ${platform}`
          : `Enabled notifications for ${platform}`
      );
    } catch (error) {
      console.error('Error updating platform settings:', error);
      toast.error('Failed to update notification settings');
    }
  };

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
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center justify-between">
                  <span>{platform}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePlatformNotification(platform)}
                    className={platformSettings[platform] ? "text-yellow-500" : ""}
                  >
                    <Bell 
                      className="h-5 w-5" 
                      fill={platformSettings[platform] ? "currentColor" : "none"} 
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 