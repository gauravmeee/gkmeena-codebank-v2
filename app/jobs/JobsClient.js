'use client';

import { useState, useEffect, useCallback } from 'react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Heart, Bell } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function JobsClient({ initialJobs = [] }) {
  const { currentUser } = useAuth();
  const [selectedBatchYears, setSelectedBatchYears] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [currentGroupBy, setGroupBy] = useState('none');
  const [jobs] = useState(initialJobs);
  const [favorites, setFavorites] = useState([]);
  const [notifyNewJobs, setNotifyNewJobs] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchUserPreferences();
    }
  }, [currentUser, fetchUserPreferences]);

  const fetchUserPreferences = useCallback(async () => {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setFavorites(data.jobFavorites || []);
        setNotifyNewJobs(data.notifyNewJobs || false);
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  }, [currentUser]);

  const toggleFavorite = async (job) => {
    if (!currentUser) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const jobId = `${job.company}-${job.role}`;
      const newFavorites = favorites.includes(jobId)
        ? favorites.filter(id => id !== jobId)
        : [...favorites, jobId];
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        jobFavorites: newFavorites
      }, { merge: true });

      setFavorites(newFavorites);
      toast.success(
        favorites.includes(jobId)
          ? 'Removed from favorites'
          : 'Added to favorites'
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Failed to update favorites');
    }
  };

  const toggleNotifications = async () => {
    if (!currentUser) {
      toast.error('Please sign in to manage notifications');
      return;
    }

    try {
      const newNotifyNewJobs = !notifyNewJobs;
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        notifyNewJobs: newNotifyNewJobs
      }, { merge: true });

      setNotifyNewJobs(newNotifyNewJobs);
      toast.success(
        newNotifyNewJobs
          ? 'You will be notified of new job posts'
          : 'Job notifications disabled'
      );
    } catch (error) {
      console.error('Error updating notification settings:', error);
      toast.error('Failed to update notification settings');
    }
  };

  // Filter jobs based on selected batch years and job types
  const filteredJobs = jobs.filter(job => {
    // Check batch year filter
    const passesBatchFilter = selectedBatchYears.length === 0 || selectedBatchYears.some(year => {
      if (year === '<2024') {
        // Check for any year before 2024 in the batch_eligible string
        return /\b20[0-1][0-9]|2023\b/.test(job.batch_eligible);
      }
      if (year === '>2026') {
        // Check for any year after 2026 in the batch_eligible string
        return /\b20(2[7-9]|[3-9][0-9])\b/.test(job.batch_eligible);
      }
      // Check if the exact year exists in the batch_eligible string
      return job.batch_eligible.includes(year);
    });

    // Check job type filter
    const passesTypeFilter = selectedJobTypes.length === 0 || selectedJobTypes.some(type => {
      const roleLower = job.role.toLowerCase();
      if (type === 'FTE') {
        // FTE should not contain Intern or Trainee
        return !roleLower.includes('intern') && !roleLower.includes('trainee');
      }
      return roleLower.includes(type.toLowerCase());
    });

    return passesBatchFilter && passesTypeFilter;
  });

  // Group jobs by date if needed
  const groupedJobs = currentGroupBy === 'date'
    ? Object.entries(
        filteredJobs.reduce((groups, job) => {
          const date = new Date(job.date_posted).toLocaleDateString();
          if (!groups[date]) groups[date] = [];
          groups[date].push(job);
          return groups;
        }, {})
      ).sort((a, b) => new Date(b[0]) - new Date(a[0]))
    : null;


  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Tech Jobs
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/jobs/favorites">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleNotifications}
          >
            <Bell className="h-4 w-4" fill={notifyNewJobs ? "currentColor" : "none"} />
            Notifications
          </Button>
          <JobFilters
            selectedBatchYears={selectedBatchYears}
            setSelectedBatchYears={setSelectedBatchYears}
            selectedJobTypes={selectedJobTypes}
            setSelectedJobTypes={setSelectedJobTypes}
            currentGroupBy={currentGroupBy}
            setGroupBy={setGroupBy}
          />
        </div>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-center text-base sm:text-lg text-gray-500">
            No jobs available for the selected filters.
          </p>
        </div>
      ) : currentGroupBy === 'date' ? (
        <div className="space-y-8">
          {groupedJobs.map(([date, jobsInGroup]) => (
            <div key={date}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <ul className="space-y-4">
                {jobsInGroup.map((job, index) => (
                  <JobCard 
                    key={`${date}-${index}`} 
                    job={job}
                    isFavorite={favorites.includes(`${job.company}-${job.role}`)}
                    onFavoriteToggle={() => toggleFavorite(job)}
                    currentUser={currentUser}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {filteredJobs.map((job, index) => (
            <JobCard 
              key={index} 
              job={job}
              isFavorite={favorites.includes(`${job.company}-${job.role}`)}
              onFavoriteToggle={() => toggleFavorite(job)}
              currentUser={currentUser}
            />
          ))}
        </ul>
      )}
    </div>
  );
} 