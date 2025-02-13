"use client";  // This makes this a Client Component

import { useEffect, useState } from "react";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'https://flask-contest-api.onrender.com/'; // URL for the API


  // Fetch contests data
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.contests && data.contests.length > 0) {
          setContests(data.contests);
        } else {
          setError("No contests available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching contests:", err);
        setError("Failed to load contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading contests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 backdrop-blur">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center py-5">Upcoming Contests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contests.map((contest) => {
          const formattedDate = new Date(contest.startTime).toLocaleDateString('en-GB', {
            day: '2-digit',
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
                className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-10"
                style={{ backgroundImage: `url(${platformImage})` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">
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
};

export default Contests;
