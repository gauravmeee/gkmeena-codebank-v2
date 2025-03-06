'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Heart, Bell } from 'lucide-react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function FavoriteContests() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      const userPrefsDoc = await getDoc(doc(db, 'userPreferences', currentUser.uid));
      if (userPrefsDoc.exists()) {
        const data = userPrefsDoc.data();
        setFavorites(data.favorites || []);
        await fetchContests();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    }
  }, [currentUser, fetchContests]);

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
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [currentUser, fetchFavorites]);

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
              <div
                className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-5"
                style={{ backgroundImage: `url(${platformImage})` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
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