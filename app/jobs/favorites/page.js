'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import JobCard from '../JobCard';

export default function FavoriteJobs() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch('https://flask-jobs-api.onrender.com/', {
        next: { 
          revalidate: 3600,
          tags: ['jobs']
        }
      });
      const data = await response.json();
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setFavorites(data.jobFavorites || []);
        await fetchJobs();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    }
  }, [currentUser, fetchJobs]);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [currentUser, fetchFavorites]);

  const toggleFavorite = async (job) => {
    if (!currentUser) return;

    try {
      const jobId = `${job.company}-${job.role}`;
      const newFavorites = favorites.filter(id => id !== jobId);
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        jobFavorites: newFavorites
      }, { merge: true });

      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Please sign in to view your favorite jobs</h1>
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const favoriteJobs = jobs.filter(job => 
    favorites.includes(`${job.company}-${job.role}`)
  );

  if (favoriteJobs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">No favorite jobs yet</h1>
        <Link href="/jobs">
          <Button>Browse Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Favorite Jobs</h1>
      <div className="space-y-4">
        {favoriteJobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            isFavorite={true}
            onFavoriteToggle={() => toggleFavorite(job)}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
} 