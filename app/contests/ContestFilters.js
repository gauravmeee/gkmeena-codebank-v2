'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContestFilters({ 
  platforms, 
  selectedPlatforms, 
  setSelectedPlatforms,
  currentGroupBy,
  setGroupBy
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlatformChange = (platform) => {
    const newPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    setSelectedPlatforms(newPlatforms);
  };

  const handleGroupByChange = (value) => {
    if (value === currentGroupBy) {
      setGroupBy('none');
    } else {
      setGroupBy(value);
    }
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setGroupBy('none');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
        >
          Filter & Group
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 z-50">
          {/* Filter by Platform Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Filter by Platform</h3>
            <div className="space-y-2">
              {platforms.map(platform => (
                <label key={platform} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group By Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Group By</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentGroupBy === 'date'}
                  onChange={() => handleGroupByChange('date')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">By Date</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentGroupBy === 'platform'}
                  onChange={() => handleGroupByChange('platform')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">By Platform</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedPlatforms.length > 0 || currentGroupBy !== 'none') && (
            <div className="p-4">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 