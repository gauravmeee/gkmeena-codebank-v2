'use client';

import { useState } from 'react';
import ContestFilters from './ContestFilters';

export default function ContestsClient({ initialContests, platforms }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [groupBy, setGroupBy] = useState('none');

  // Filter contests based on selected platforms
  const filteredContests = selectedPlatforms.length > 0
    ? initialContests.filter(contest => selectedPlatforms.includes(contest.platform))
    : initialContests;

  // Group contests based on groupBy selection
  const groupedContests = (() => {
    if (groupBy === 'none') return { '': filteredContests };
    
    return filteredContests.reduce((groups, contest) => {
      let key;
      if (groupBy === 'date') {
        // Format date with month name
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
  })();

  // Sort the groups by date when grouping by date
  const sortedEntries = Object.entries(groupedContests).sort(([keyA, _a], [keyB, _b]) => {
    if (groupBy === 'date' && keyA && keyB) {
      // Convert the formatted date strings back to Date objects for comparison
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


  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
      {/* Responsive header with flex layout instead of absolute positioning */}
      <div className="flex flex-col sm:flex-row items-center justify-center relative mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Coding Contests
        </h2>
        
        <div className="sm:absolute sm:right-0 mt-2 sm:mt-0">
          <ContestFilters
            platforms={platforms}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            currentGroupBy={groupBy}
            setGroupBy={setGroupBy}
          />
        </div>
      </div>

      {sortedEntries.map(([group, groupContests]) => (
        <div key={group} className="mb-8">
          {group && <h3 className="text-xl font-semibold mb-2">{group}</h3>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupContests.map((contest) => {
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
                <div key={contest.contestName} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-5"
                    style={{ backgroundImage: `url(${platformImage})` }}
                  ></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
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
      ))}
    </div>
  );
}