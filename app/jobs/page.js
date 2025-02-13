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
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No jobs available at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.role}</h3>
              <p className="text-md text-gray-600">Company: {job.company}</p>
              <p className="text-md text-gray-600">Batch Eligible: {job.batch_eligible}</p>
              <p className="text-md text-gray-600">Location: {job.location}</p>
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Apply Here
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobsPage;
