'use client';

import Image from 'next/image';

const getCompanyLogo = (company) => {
  return `https://logo.clearbit.com/${company.replace(/\s+/g, '').toLowerCase()}.com`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export default function JobCard({ job }) {
  return (
    <li className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      {/* Date - Positioned top right for all screens */}
      <div className="absolute top-2 right-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {formatDate(job.date_posted)}
      </div>

      {/* Mobile Logo - Top right corner for mobile only */}
      <div className="sm:hidden absolute right-2 top-8">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={getCompanyLogo(job.company)}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.currentTarget.parentNode.innerHTML = `<div class="w-12 h-12 flex items-center justify-center text-xs font-bold text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md">${job.company.substring(0, 3)}</div>`;
            }}
            alt={`${job.company} logo`}
          />
        </div>
      </div>

      {/* Main content container - Row on desktop, Column on mobile */}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-8 sm:mt-4">
        {/* Left side - Job details */}
        <div className="flex-grow pr-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 pr-14 sm:pr-0">
            {job.role}
          </h3>

          <div className="grid grid-cols-1 gap-2 mt-3">
            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
              <span className="font-medium">Company:</span>{' '}
              <span className="text-cyan-500 font-bold dark:text-cyan-100">{job.company}</span>
            </p>

            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
              <span className="font-medium">Batch Eligible:</span>{' '}
              <span className="text-cyan-500 font-bold dark:text-cyan-100">{job.batch_eligible}</span>
            </p>

            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
              <span className="font-medium">Location:</span>{' '}
              <span className="text-cyan-500 font-bold dark:text-cyan-100">{job.location}</span>
            </p>

            {job.expected_stipend && (
              <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
                <span className="font-medium">Expected Stipend:</span>{' '}
                <span className="text-cyan-500 font-bold dark:text-cyan-100">{job.expected_stipend}</span>
              </p>
            )}

            {job.expected_benefits && (
              <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
                <span className="font-medium">Extra Benefits:</span>{' '}
                <span className="text-cyan-500 font-bold dark:text-cyan-100">{job.expected_benefits}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right side - Logo/Company Name and Apply button for desktop */}
        <div className="hidden sm:flex flex-col items-center justify-between min-w-[200px] pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <Image
                src={getCompanyLogo(job.company)}
                width={96}
                height={96}
                className="w-24 h-24 object-contain"
                onError={(e) => {
                  e.currentTarget.parentNode.innerHTML = `<div class="w-24 h-24 font-bold text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">${job.company}</div>`;
                }}
                alt={`${job.company}`}
              />
            </div>
          </div>
          
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center px-6 py-2.5 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Apply Now
          </a>
        </div>

        {/* Apply button for mobile - Full width at bottom */}
        <div className="sm:hidden mt-4">
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-2.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </li>
  );
}