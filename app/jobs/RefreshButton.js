'use client';

import { useTransition, useEffect, useState, useRef } from 'react';
import { RefreshCcw } from 'lucide-react';
import updateJobs from './updateJobs';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

// Helper to format relative time
function getRelativeTime(date) {
  if (!date) return '';
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // in seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

function getShortRelativeTime(date) {
  if (!date) return '';
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // in seconds
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} d ago`;
}

export default function RefreshButton() {
  const [isPending, startTransition] = useTransition();
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef(null);

  // Fetch last refreshed time from Firestore
  const fetchLastRefreshed = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'public', 'jobsData'));
      if (docSnap.exists()) {
        const data = docSnap.data();
        let lastRefreshed = null;
        if (data.updatedAt) {
          if (typeof data.updatedAt.toDate === 'function') {
            lastRefreshed = data.updatedAt.toDate();
          } else if (typeof data.updatedAt === 'string' || typeof data.updatedAt === 'number') {
            lastRefreshed = new Date(data.updatedAt);
          }
        }
        setLastRefreshed(lastRefreshed && !isNaN(lastRefreshed) ? lastRefreshed : null);
      } else {
        setLastRefreshed(null);
      }
    } catch (e) {
      setLastRefreshed(null);
    }
  };

  useEffect(() => {
    fetchLastRefreshed();
  }, []);

  const handleShowTooltip = () => {
    setShowTooltip(true);
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 2000);
  };
  const handleHideTooltip = () => {
    setShowTooltip(false);
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  };

  const handleClick = () => {
    startTransition(async () => {
      try {
        const res = await updateJobs();
        toast.success(res.message || 'Jobs updated successfully');
        await fetchLastRefreshed(); // Refresh the time after update
      } catch (error) {
        toast.error('Failed to refresh jobs. Please try again.');
      }
    });
  };

  return (
    <div>
      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
        <div style={{ position: 'relative' }}>
          {showTooltip && (
            <span className="absolute bottom-16 right-0 mb-2 text-xs text-neutral-700 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 bg-opacity-90 dark:bg-opacity-90 rounded px-3 py-1 shadow border border-neutral-300 dark:border-neutral-700 whitespace-nowrap transition-opacity duration-200" style={{zIndex: 100}}>
              Last updated
              {lastRefreshed ? (' ' + getShortRelativeTime(lastRefreshed)) : '--'}
            </span>
          )}
          <button
            onClick={handleClick}
            onMouseEnter={handleShowTooltip}
            onFocus={handleShowTooltip}
            onMouseLeave={handleHideTooltip}
            onBlur={handleHideTooltip}
            disabled={isPending}
            className="p-3 bg-blue-500 text-white rounded-full shadow flex items-center justify-center w-14 h-14"
            aria-label="Refresh jobs"
          >
            <RefreshCcw className={`h-6 w-6 ${isPending ? 'animate-spin' : ''}`} style={{ animationDirection: 'reverse' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
