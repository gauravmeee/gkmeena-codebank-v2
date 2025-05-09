'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Heart, Bell } from 'lucide-react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FavoriteContests() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContests = useCallback(async () => {
    try {
      const response = await fetch('https://flask-contest-api.onrender.com/', {
        next: { 
          revalidate: 3600,
          tags: ['contests']
        }
      });
      const data = await response.json();
      setContests(data.contests || []);
    } catch (error) {
      console.error('Error fetching contests:', error);
      toast.error('Failed to fetch contests');
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setFavorites(data.favorites || []);
      }
      await fetchContests();
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  }, [currentUser, fetchContests]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (contest) => {
    if (!currentUser) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const contestId = `${contest.platform}-${contest.contestName}`;
      const newFavorites = favorites.filter(id => id !== contestId);
      
      await setDoc(doc(db, 'userPreferences', currentUser.uid), {
        favorites: newFavorites
      }, { merge: true });

      setFavorites(newFavorites);
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Failed to update favorites');
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
        <h1 className="text-2xl font-semibold">Please sign in to view your favorite contests</h1>
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const favoriteContests = contests.filter(contest => 
    favorites.includes(`${contest.platform}-${contest.contestName}`)
  );

  if (favoriteContests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">No favorite contests yet</h1>
        <Link href="/contests">
          <Button>Browse Contests</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Favorite Contests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteContests.map((contest) => {
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
            <div key={`${contest.platform}-${contest.contestName}`} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => toggleFavorite(contest)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
              </button>
              <div
                className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-5"
                style={{ backgroundImage: `url(${platformImage})` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4 pr-12">
                  <a href={contest.contestLink} target="_blank" className="text-blue-500 hover:underline">
                    {contest.contestName}
                  </a>
                </h3>
                <p><strong>Platform:</strong> {contest.platform}</p>
                <p><strong>Start Time:</strong> {formattedDate}</p>
                <p><strong>Duration:</strong> {contest.contestDuration}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 