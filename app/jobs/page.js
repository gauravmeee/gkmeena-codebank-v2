"use client";  // This makes this a Client Component
import { useState, useEffect } from 'react';
import axios from 'axios';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch jobs from the Flask API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://flask-jobs-api.onrender.com/'); // URL of your Flask API
        setJobs(response.data); // Set jobs data to state
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center mt-40">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
        <p className="text-xl text-gray-500 mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center pt-40">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto p-6">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center">Job Updates</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No jobs available at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job, index) => (
            <li
              key={index}
              className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{job.role}</h3>
              <p className="text-md text-gray-600 dark:text-gray-300">Company: {job.company}</p>
              <p className="text-md text-gray-600 dark:text-gray-300">Batch Eligible: {job.batch_eligible}</p>
              <p className="text-md text-gray-600 dark:text-gray-300">Location: {job.location}</p>
              <p className="text-md text-gray-600 dark:text-gray-300">Date Posted: {job.date_posted}</p>
              
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Apply Link
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobsPage;
