'use client';

import { useState } from 'react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

export default function JobsClient({ initialJobs = [] }) {
  const [selectedBatchYears, setSelectedBatchYears] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [currentGroupBy, setGroupBy] = useState('none');
  const [jobs] = useState(initialJobs);

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
      <div className="flex flex-col sm:flex-row items-center justify-center relative mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Tech Jobs
        </h2>
        
        <div className="sm:absolute sm:right-0 mt-2 sm:mt-0">
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
                  <JobCard key={`${date}-${index}`} job={job} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
} 