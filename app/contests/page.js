// In an API route or server action where you update data
import { revalidateTag } from 'next/cache';

// Server Action to update contests and revalidate cache
export async function updateJobs() {
  try {
    await fetch("https://flask-jobs-api.onrender.com/update", { method: "POST" });
    revalidateTag("contests");
    return { message: "Jobs updated and cache revalidated" };
  } catch (error) {
    console.error("Failed to update jobs:", error);
    return { message: "Failed to update jobs" };
  }
}

async function getContests() {
  try {
    const response = await fetch('https://flask-contest-api.onrender.com/', {
      next: { 
        revalidate: 3600,
        tags: ['contests'] // Add a cache tag
      }
    });

    const data = await response.json();
    return data.contests || [];
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return [];
  }
}

export default async function ContestsPage() {
  const contests = await getContests();
  
  if (!contests.length) {
    return (
      <div className="flex justify-center items-center pt-40">
        <p className="text-xl text-red-500">No contests available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto p-6 backdrop-blur">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center">Contest Updates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contests.map((contest) => {
          const formattedDate = new Date(contest.startTime).toLocaleString('en-GB', {
            timeZone: 'Asia/Kolkata', // Force IST timezone
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
                className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-5"
                style={{ backgroundImage: `url(${platformImage})` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold  text-gray-600 dark:text-gray-300">
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

