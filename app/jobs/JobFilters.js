'use client';

import { useState, useEffect, useRef } from 'react';

export default function JobFilters({ 
  selectedBatchYears,
  setSelectedBatchYears,
  selectedJobTypes,
  setSelectedJobTypes,
  currentGroupBy,
  setGroupBy
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const batchYears = ['<2024', '2024', '2025', '2026', '>2026'];
  const jobTypes = ['FTE', 'Intern', 'Trainee'];

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

  const handleBatchYearChange = (year) => {
    const newBatchYears = selectedBatchYears.includes(year)
      ? selectedBatchYears.filter(y => y !== year)
      : [...selectedBatchYears, year];
    setSelectedBatchYears(newBatchYears);
  };

  const handleJobTypeChange = (type) => {
    const newJobTypes = selectedJobTypes.includes(type)
      ? selectedJobTypes.filter(t => t !== type)
      : [...selectedJobTypes, type];
    setSelectedJobTypes(newJobTypes);
  };

  const handleGroupByChange = (value) => {
    if (value === currentGroupBy) {
      setGroupBy('none');
    } else {
      setGroupBy(value);
    }
  };

  const clearFilters = () => {
    setSelectedBatchYears([]);
    setSelectedJobTypes([]);
    setGroupBy('none');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm p-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Filter and Group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {(selectedBatchYears.length > 0 || selectedJobTypes.length > 0 || currentGroupBy !== 'none') && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-600"></span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 mt-2 min-w-[16rem] whitespace-nowrap rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 z-50">
          {/* Filter by Job Type Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Filter by Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => handleJobTypeChange(type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Batch Year Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Filter by Batch Year</h3>
            <div className="space-y-2">
              {batchYears.map(year => (
                <label key={year} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBatchYears.includes(year)}
                    onChange={() => handleBatchYearChange(year)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{year}</span>
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
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedBatchYears.length > 0 || selectedJobTypes.length > 0 || currentGroupBy !== 'none') && (
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